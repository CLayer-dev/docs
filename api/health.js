export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-api-key');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Only allow GET requests
    if (req.method !== 'GET') {
        return res.status(405).json({
            error: 'Method not allowed',
            message: 'Only GET requests are supported'
        });
    }

    try {
        // Check environment variables
        const grokApiKey = process.env.GROK_API_KEY;
        const circleLayerApiKey = process.env.Circle_Layer_Docs_API_KEY;

        const response = {
            status: 'healthy',
            message: 'Circle Layer AI API is running',
            timestamp: new Date().toISOString(),
            environment: {
                grok_api_key_configured: !!grokApiKey,
                circle_layer_api_key_configured: !!circleLayerApiKey
            },
            endpoints: {
                health: '/api/health',
                chat: '/api/chat'
            },
            version: '1.0.0'
        };

        return res.status(200).json(response);
    } catch (error) {
        console.error('Health check error:', error);
        return res.status(500).json({
            error: 'Internal server error',
            message: 'Health check failed'
        });
    }
} 