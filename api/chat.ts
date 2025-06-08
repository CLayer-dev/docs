import { VercelRequest, VercelResponse } from '@vercel/node';
import GrokAI from '../src/services/grok-ai';
import { AIServiceOptions } from '../src/types/docs';

// Valid API key - using existing Circle Layer docs API key
const VALID_API_KEY = process.env.Circle_Layer_Docs_API_KEY;

// Rate limiting storage (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(apiKey: string): { allowed: boolean; remaining: number } {
    const now = Date.now();
    const windowMs = 60 * 60 * 1000; // 1 hour
    const maxRequests = 100;

    const key = `rate_limit_${apiKey}`;
    const existing = rateLimitStore.get(key);

    if (!existing || now > existing.resetTime) {
        rateLimitStore.set(key, { count: 1, resetTime: now + windowMs });
        return { allowed: true, remaining: maxRequests - 1 };
    }

    if (existing.count >= maxRequests) {
        return { allowed: false, remaining: 0 };
    }

    existing.count++;
    return { allowed: true, remaining: maxRequests - existing.count };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-api-key');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({
            error: 'Method not allowed',
            message: 'Only POST requests are allowed'
        });
    }

    // Authentication
    const apiKey = req.headers['x-api-key'] as string;

    if (!apiKey) {
        return res.status(401).json({
            error: 'API key required',
            message: 'Please provide an API key in the x-api-key header'
        });
    }

    if (!VALID_API_KEY || apiKey !== VALID_API_KEY) {
        return res.status(403).json({
            error: 'Invalid API key',
            message: 'The provided API key is not valid'
        });
    }

    // Rate limiting
    const rateCheck = checkRateLimit(apiKey);
    res.setHeader('X-RateLimit-Remaining', rateCheck.remaining.toString());

    if (!rateCheck.allowed) {
        return res.status(429).json({
            error: 'Too many requests',
            message: 'Rate limit exceeded. Please try again later.',
            retryAfter: '1 hour'
        });
    }

    try {
        const { query, options } = req.body;

        if (!query || typeof query !== 'string') {
            return res.status(400).json({
                error: 'Invalid request',
                message: 'Query is required and must be a string'
            });
        }

        if (query.length > 1000) {
            return res.status(400).json({
                error: 'Query too long',
                message: 'Query must be less than 1000 characters'
            });
        }

        const aiOptions: AIServiceOptions = {
            responseType: options?.responseType || 'brief',
            technicalLevel: options?.technicalLevel || 'basic'
        };

        const grokAI = new GrokAI();
        const response = await grokAI.chat(query, aiOptions);

        return res.status(200).json({
            success: true,
            data: response,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Chat API error:', error);
        return res.status(500).json({
            error: 'Internal server error',
            message: 'An error occurred while processing your request',
            timestamp: new Date().toISOString()
        });
    }
} 