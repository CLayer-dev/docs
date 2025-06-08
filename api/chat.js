export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-api-key');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({
            error: 'Method not allowed',
            message: 'Only POST requests are supported'
        });
    }

    try {
        // Check API key authentication
        const providedApiKey = req.headers['x-api-key'];
        const requiredApiKey = process.env.Circle_Layer_Docs_API_KEY;

        if (!providedApiKey) {
            return res.status(401).json({
                error: 'Unauthorized',
                message: 'API key is required. Please provide x-api-key header.'
            });
        }

        if (providedApiKey !== requiredApiKey) {
            return res.status(403).json({
                error: 'Forbidden',
                message: 'Invalid API key'
            });
        }

        // Validate request body
        const { query, options = {} } = req.body;

        if (!query || typeof query !== 'string' || query.trim().length === 0) {
            return res.status(400).json({
                error: 'Bad request',
                message: 'Query is required and must be a non-empty string'
            });
        }

        // Validate options
        const {
            responseType = 'detailed',
            technicalLevel = 'intermediate'
        } = options;

        const validResponseTypes = ['brief', 'detailed', 'comprehensive'];
        const validTechnicalLevels = ['beginner', 'intermediate', 'advanced'];

        if (!validResponseTypes.includes(responseType)) {
            return res.status(400).json({
                error: 'Bad request',
                message: `Invalid responseType. Must be one of: ${validResponseTypes.join(', ')}`
            });
        }

        if (!validTechnicalLevels.includes(technicalLevel)) {
            return res.status(400).json({
                error: 'Bad request',
                message: `Invalid technicalLevel. Must be one of: ${validTechnicalLevels.join(', ')}`
            });
        }

        // Check Grok API key
        const grokApiKey = process.env.GROK_API_KEY;
        if (!grokApiKey) {
            console.error('GROK_API_KEY environment variable is not set');
            return res.status(500).json({
                error: 'Internal server error',
                message: 'AI service configuration error'
            });
        }

        // Create enhanced prompt based on response type and technical level
        let systemPrompt = `You are an AI assistant specialized in Circle Layer blockchain technology. 
        
Circle Layer is a high-performance, EVM-compatible, Proof of Stake Layer 1 blockchain designed to power the next generation of decentralized applications.

Key Features:
- High Performance: Target 50,000 TPS (currently 2,000 TPS on testnet)
- AI Security: Real-time smart contract auditing and threat detection
- EVM Compatible: Seamless migration from Ethereum
- Energy Efficient: Proof of Stake consensus mechanism
- Current Status: Testnet with 2,000 TPS, targeting mainnet with 50,000 TPS

Technical Details:
- Block Time: 3 seconds
- Finality: 1-3 seconds
- Uptime: 99.95%
- Chain ID: 28525 (testnet)
- Energy Usage: 99.9% less than traditional PoW

Response Style: ${responseType}
Technical Level: ${technicalLevel}

Please provide accurate, helpful responses about Circle Layer based on this information. If asked about specific features not mentioned above, explain what Circle Layer offers in general terms and suggest checking the official documentation for detailed implementation specifics.`;

        const userPrompt = `${query}

Please respond with a ${responseType} explanation suitable for someone with ${technicalLevel} technical knowledge.`;

        // Make request to Grok API
        const grokResponse = await fetch('https://api.x.ai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${grokApiKey}`
            },
            body: JSON.stringify({
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: userPrompt }
                ],
                model: 'grok-beta',
                stream: false,
                temperature: 0.7
            })
        });

        if (!grokResponse.ok) {
            console.error('Grok API error:', grokResponse.status, grokResponse.statusText);
            const errorText = await grokResponse.text();
            console.error('Grok API error details:', errorText);

            return res.status(500).json({
                error: 'AI service error',
                message: 'Failed to get response from AI service'
            });
        }

        const grokData = await grokResponse.json();

        if (!grokData.choices || !grokData.choices[0] || !grokData.choices[0].message) {
            console.error('Invalid Grok API response structure:', grokData);
            return res.status(500).json({
                error: 'AI service error',
                message: 'Invalid response from AI service'
            });
        }

        const aiResponse = grokData.choices[0].message.content;

        // Return successful response
        return res.status(200).json({
            success: true,
            query: query,
            response: aiResponse,
            options: {
                responseType,
                technicalLevel
            },
            timestamp: new Date().toISOString(),
            version: '1.0.0'
        });

    } catch (error) {
        console.error('Chat API error:', error);
        return res.status(500).json({
            error: 'Internal server error',
            message: 'An unexpected error occurred'
        });
    }
} 