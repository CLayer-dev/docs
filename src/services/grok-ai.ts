import DocumentationLoader from './docs-loader';
import { AIResponse, AIServiceOptions, DocumentationContent } from '../types/docs';
import { getEnvVar } from '../clientModules/env';

class GrokAI {
    private docsLoader: DocumentationLoader;
    private allDocsStructured: DocumentationContent[] = [];
    private isInitialized: boolean = false;
    private apiKey: string | null = null;
    private readonly baseURL = 'https://api.x.ai/v1/chat/completions';

    // Budget optimization: Simple response cache
    private responseCache: Map<string, { response: AIResponse; timestamp: number }> = new Map();
    private readonly CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

    constructor() {
        this.docsLoader = new DocumentationLoader();
        // Don't initialize during SSG - do it lazily when needed
    }

    /**
     * Initialize Grok API when needed (lazy loading)
     */
    private initializeGrok(): void {
        if (this.apiKey || this.isInitialized) return;

        try {
            // Get API key from environment (client-side compatible)
            let apiKey = getEnvVar('GROK_API_KEY');

            // Also try direct process.env access as fallback
            if (!apiKey && typeof process !== 'undefined') {
                // @ts-ignore - webpack DefinePlugin should have injected this
                apiKey = process.env.GROK_API_KEY;
            }

            console.log('🔍 DEBUG: Checking Grok API key availability...');
            console.log('🔍 DEBUG: GROK_API_KEY length:', apiKey ? apiKey.length : 'undefined');
            console.log('🔍 DEBUG: API key starts with xai-:', apiKey ? apiKey.startsWith('xai-') : false);

            if (!apiKey) {
                console.error('❌ Grok API key not found in environment variables - AI features will be disabled');
                console.error('❌ Please ensure GROK_API_KEY is set in your .env file');
                this.isInitialized = true;
                return;
            }

            console.log('✅ Grok API key loaded from environment, initializing...');
            this.apiKey = apiKey;
            this.loadDocs();
            this.isInitialized = true;
            console.log('✅ Grok AI service initialized successfully!');
        } catch (error) {
            console.error('❌ Failed to initialize Grok AI:', error);
            this.isInitialized = true;
        }
    }

    /**
     * Load all documentation content into structured format for smart retrieval
     */
    private async loadDocs(): Promise<void> {
        try {
            const allDocs = await this.docsLoader.getAllDocs();

            // Keep docs in structured format for smart retrieval
            this.allDocsStructured = Object.values(allDocs);

        } catch (error) {
            console.error('Failed to load docs:', error);
            this.allDocsStructured = [];
        }
    }

    /**
     * Make API call to Grok (Budget-optimized)
     */
    private async callGrok(messages: Array<{ role: string, content: string }>, maxTokens: number = 400): Promise<string> {
        if (!this.apiKey) {
            throw new Error('Grok API key not available');
        }

        const response = await fetch(this.baseURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.apiKey}`,
            },
            body: JSON.stringify({
                messages,
                model: 'grok-3-mini',  // Switched to mini for budget savings
                stream: false,
                temperature: 0.3,      // Lower temperature for more focused responses
                max_tokens: maxTokens, // Reduced default tokens
            }),
        });

        if (!response.ok) {
            throw new Error(`Grok API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data.choices[0]?.message?.content || 'No response generated';
    }

    /**
     * STEP 1: Budget-optimized smart document selection
     */
    private async findRelevantDocsWithAI(query: string): Promise<DocumentationContent[]> {
        // Check if query is simple/common - use fallback to save API calls
        if (this.isSimpleQuery(query)) {
            return this.findRelevantDocsFallback(query);
        }

        try {
            // Create a shorter list of available documentation sections
            const docsList = this.allDocsStructured
                .slice(0, 20) // Limit to first 20 docs to reduce tokens
                .map((doc, index) => `${index}: ${doc.title}`)
                .join('\n');

            // Shorter, more focused prompt
            const selectionPrompt = `Pick 3 most relevant docs for: "${query}"

Docs:
${docsList}

Return numbers only (e.g., 0, 5, 12):`;

            const selectionResponse = await this.callGrok([
                { role: 'user', content: selectionPrompt }
            ], 30); // Reduced tokens further

            // Parse the AI response to get section numbers
            const selectedIndices = this.parseSelectedIndices(selectionResponse);

            // Return the selected documentation sections
            const selectedDocs = selectedIndices
                .filter(index => index < this.allDocsStructured.length)
                .map(index => this.allDocsStructured[index]);

            // Fallback to keyword-based selection if AI selection fails
            if (selectedDocs.length === 0) {
                return this.findRelevantDocsFallback(query);
            }

            console.log('✅ Grok selected docs:', selectedDocs.map(d => d.title));
            return selectedDocs;

        } catch (error) {
            console.error('Grok document selection failed, using fallback:', error);
            return this.findRelevantDocsFallback(query);
        }
    }

    /**
     * Check if query is simple enough to skip AI selection
     */
    private isSimpleQuery(query: string): boolean {
        const simplePatterns = [
            /^what is circle layer/i,
            /^how to start/i,
            /^getting started/i,
            /^installation/i,
            /^setup/i,
            /^basic/i,
            /^simple/i,
            /^quick/i
        ];

        return simplePatterns.some(pattern => pattern.test(query)) || query.length < 15;
    }

    /**
     * Parse AI response to extract section numbers
     */
    private parseSelectedIndices(response: string): number[] {
        try {
            return response
                .split(',')
                .map(s => parseInt(s.trim()))
                .filter(n => !isNaN(n) && n >= 0);
        } catch {
            return [];
        }
    }

    /**
     * Fallback: Find relevant docs using keyword matching
     */
    private findRelevantDocsFallback(query: string): DocumentationContent[] {
        const queryLower = query.toLowerCase();
        const queryWords = queryLower.split(/\s+/).filter(word => word.length > 2);

        // Score each document based on relevance
        const scoredDocs = this.allDocsStructured.map(doc => {
            let score = 0;
            const docText = `${doc.title} ${doc.content}`.toLowerCase();

            // Score based on title matches (higher weight)
            queryWords.forEach(word => {
                if (doc.title.toLowerCase().includes(word)) {
                    score += 10;
                }
            });

            // Score based on content matches
            queryWords.forEach(word => {
                const matches = (docText.match(new RegExp(word, 'g')) || []).length;
                score += matches;
            });

            // Boost score for exact phrase matches
            if (docText.includes(queryLower)) {
                score += 20;
            }

            return { doc, score };
        });

        // Sort by score and take top relevant docs
        const topDocs = scoredDocs
            .filter(item => item.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, 5) // Take top 5 most relevant docs
            .map(item => item.doc);

        // If no relevant docs found, return a general overview
        if (topDocs.length === 0) {
            return this.allDocsStructured.slice(0, 3);
        }

        return topDocs;
    }

    /**
     * STEP 2: Create system prompt with Grok-selected relevant documentation
     */
    private createSystemPrompt(relevantDocs: DocumentationContent[]): string {
        // Budget-optimized: Combine docs with tighter token limits
        const contextContent = relevantDocs
            .map(doc => `${doc.title}:\n${doc.content.substring(0, 2000)}`) // Limit each doc content
            .join('\n\n')
            .substring(0, 8000); // Reduced overall limit for budget savings

        return `Circle Layer blockchain assistant. Answer ONLY Circle Layer questions using provided docs.

Rules:
- Circle Layer topics only
- 200-300 words max
- Use markdown (##, \`\`\`, bullets)
- If non-Circle Layer: "I help with Circle Layer blockchain only. Ask about Circle Layer development, staking, or setup."

Circle Layer Documentation:
${contextContent}`;
    }

    /**
     * Create user prompt with the query
     */
    private createUserPrompt(query: string): string {
        return `Question: ${query}

Please provide a helpful answer based on the Circle Layer documentation provided in the system prompt.`;
    }

    /**
     * Detect if query is related to Circle Layer
     */
    private isCircleLayerRelated(query: string): boolean {
        const circleLayerTerms = [
            'circle layer', 'circlelayer', 'clayer', 'circle-layer',
            'testnet', 'mainnet', 'blockchain', 'validator', 'staking',
            'rpc', 'network', 'deploy', 'contract', 'gas', 'node',
            'consensus', 'development', 'smart contract', 'evm',
            'hardhat', 'web3', 'ethers', 'getting started'
        ];

        const queryLower = query.toLowerCase();

        // Check for explicit Circle Layer mentions
        if (queryLower.includes('circle layer') || queryLower.includes('circlelayer')) {
            return true;
        }

        // Check for blockchain-related terms that could be Circle Layer related
        return circleLayerTerms.some(term =>
            queryLower.includes(term.toLowerCase())
        );
    }

    /**
     * Simple technical detection
     */
    private detectTechnical(query: string): boolean {
        const technicalTerms = [
            'api', 'rpc', 'deploy', 'contract', 'gas', 'validator',
            'node', 'stake', 'consensus', 'development', 'code',
            'smart contract', 'evm', 'hardhat', 'web3', 'ethers'
        ];

        return technicalTerms.some(term =>
            query.toLowerCase().includes(term.toLowerCase())
        );
    }

    /**
     * Generate AI response using Grok with 2-step AI process
     */
    async chat(userQuery: string, options: AIServiceOptions = {}): Promise<AIResponse> {
        try {
            // Budget optimization: Check cache first
            const cacheKey = userQuery.toLowerCase().trim();
            const cached = this.responseCache.get(cacheKey);
            if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
                console.log('✅ Returning cached response for:', userQuery);
                return cached.response;
            }

            // Initialize Grok if not already done
            this.initializeGrok();

            // Check if Grok is available
            if (!this.apiKey) {
                return {
                    message: "AI service is not available. Please check your configuration and try again.",
                    isDetailed: false,
                    isTechnical: false,
                    timestamp: Date.now(),
                    sources: []
                };
            }

            // Check if query is related to Circle Layer
            if (!this.isCircleLayerRelated(userQuery)) {
                return {
                    message: "I'm specifically designed to help with Circle Layer blockchain topics. I can assist you with:\n\n• Circle Layer development and deployment\n• Smart contract development on Circle Layer\n• Network configurations and RPC endpoints\n• Staking and validator information\n• Getting started guides\n• Circle Layer testnet and mainnet information\n\nPlease ask me anything about Circle Layer! 🚀",
                    isDetailed: true,
                    isTechnical: false,
                    timestamp: Date.now(),
                    sources: []
                };
            }

            // Ensure docs are loaded
            if (this.allDocsStructured.length === 0) {
                await this.loadDocs();
            }

            // STEP 1: Use Grok AI to intelligently find relevant documentation
            const relevantDocs = await this.findRelevantDocsWithAI(userQuery);

            // STEP 2: Generate final answer using selected relevant content
            const systemPrompt = this.createSystemPrompt(relevantDocs);
            const userPrompt = this.createUserPrompt(userQuery);

            const response = await this.callGrok([
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userPrompt }
            ], 800); // Reduced tokens for budget savings

            console.log('✅ Grok response generated successfully');

            const aiResponse: AIResponse = {
                message: response,
                isDetailed: response.length > 150,
                isTechnical: this.detectTechnical(userQuery),
                timestamp: Date.now(),
                sources: ['Circle Layer Documentation']
            };

            // Budget optimization: Cache the response
            this.responseCache.set(cacheKey, { response: aiResponse, timestamp: Date.now() });

            // Keep cache size reasonable
            if (this.responseCache.size > 50) {
                const oldestKey = Array.from(this.responseCache.keys())[0];
                this.responseCache.delete(oldestKey);
            }

            return aiResponse;

        } catch (error) {
            console.error('❌ Grok API error:', error);
            return {
                message: "I'm sorry, I'm having trouble connecting to my AI service right now. Please try again in a moment.",
                isDetailed: false,
                isTechnical: false,
                timestamp: Date.now(),
                sources: []
            };
        }
    }

    /**
     * Refresh documentation cache
     */
    async refreshDocs(): Promise<void> {
        await this.docsLoader.refreshCache();
        await this.loadDocs();
    }

    /**
     * Get service health status
     */
    async getHealthStatus(): Promise<{ status: 'healthy' | 'degraded'; message: string }> {
        try {
            this.initializeGrok();

            if (!this.apiKey) {
                return {
                    status: 'degraded',
                    message: 'Grok API key not configured'
                };
            }

            // Test Grok connection with a simple request
            await this.callGrok([
                { role: 'user', content: 'test' }
            ], 1);

            return {
                status: 'healthy',
                message: 'Grok AI service is working properly'
            };
        } catch (error) {
            return {
                status: 'degraded',
                message: 'Grok AI service is experiencing issues'
            };
        }
    }
}

export default GrokAI; 