import { VercelRequest, VercelResponse } from '@vercel/node';
import GrokAI from '../src/services/grok-ai';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'GET') {
        return res.status(405).json({
            error: 'Method not allowed',
            message: 'Only GET requests are allowed'
        });
    }

    try {
        const grokAI = new GrokAI();
        const healthStatus = await grokAI.getHealthStatus();

        return res.status(200).json({
            status: 'ok',
            timestamp: new Date().toISOString(),
            ai_service: healthStatus,
            version: '1.0.0',
            endpoints: {
                chat: '/api/chat',
                health: '/api/health'
            }
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Health check failed',
            timestamp: new Date().toISOString()
        });
    }
} 