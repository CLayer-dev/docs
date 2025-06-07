// Client-side environment variables
// This module makes environment variables available in the browser

declare global {
    interface Window {
        __CIRCLE_LAYER_ENV__?: {
            OPENAI_API_KEY?: string;
            GROK_API_KEY?: string;
        };
        __GROK_API_KEY__?: string;
    }

    // Global variables injected by webpack DefinePlugin
    const __GROK_API_KEY__: string;
}

// Initialize window object and environment variables
if (typeof window !== 'undefined') {
    window.__CIRCLE_LAYER_ENV__ = window.__CIRCLE_LAYER_ENV__ || {};

    console.log('🔍 CLIENT ENV: Initializing client environment...');
    console.log('🔍 CLIENT ENV: process.env available:', typeof process !== 'undefined');

    // Direct access to webpack DefinePlugin variables
    try {
        // @ts-ignore - webpack DefinePlugin should have defined this
        const grokKey = process.env.GROK_API_KEY;
        console.log('🔍 CLIENT ENV: Direct process.env.GROK_API_KEY:', grokKey ? `${grokKey.length} chars` : 'undefined');

        if (grokKey) {
            window.__CIRCLE_LAYER_ENV__.GROK_API_KEY = grokKey;
            console.log('✅ CLIENT ENV: GROK_API_KEY stored in window');
        }

        // @ts-ignore - webpack DefinePlugin should have defined this
        const openaiKey = process.env.OPENAI_API_KEY;
        if (openaiKey) {
            window.__CIRCLE_LAYER_ENV__.OPENAI_API_KEY = openaiKey;
        }
    } catch (error) {
        console.error('❌ CLIENT ENV: Error accessing process.env:', error);
    }
}

// Helper function to get environment variables
export function getEnvVar(key: string): string | undefined {
    console.log(`🔍 CLIENT ENV: Getting ${key}...`);

    // For GROK_API_KEY specifically, try multiple sources
    if (key === 'GROK_API_KEY') {
        // Try global variable first
        try {
            // @ts-ignore - webpack DefinePlugin global
            const globalKey = __GROK_API_KEY__;
            if (globalKey && globalKey !== '') {
                console.log(`✅ CLIENT ENV: Found GROK_API_KEY in global __GROK_API_KEY__ (${globalKey.length} chars)`);
                return globalKey;
            }
        } catch (error) {
            console.log('🔍 CLIENT ENV: Global __GROK_API_KEY__ not available:', error);
        }

        // Try window variable
        try {
            // @ts-ignore - webpack DefinePlugin window variable
            const windowKey = window.__GROK_API_KEY__;
            if (windowKey && windowKey !== '') {
                console.log(`✅ CLIENT ENV: Found GROK_API_KEY in window.__GROK_API_KEY__ (${windowKey.length} chars)`);
                return windowKey;
            }
        } catch (error) {
            console.log('🔍 CLIENT ENV: window.__GROK_API_KEY__ not available:', error);
        }
    }

    // Check window object (for client-side)
    if (typeof window !== 'undefined') {
        const envValue = window.__CIRCLE_LAYER_ENV__?.[key as keyof typeof window.__CIRCLE_LAYER_ENV__];
        if (envValue) {
            console.log(`✅ CLIENT ENV: Found ${key} in window (${envValue.length} chars)`);
            return envValue;
        }
    }

    // Fallback to process.env (webpack DefinePlugin should have injected these)
    try {
        // @ts-ignore - webpack DefinePlugin should have defined this
        const envValue = process.env[key];
        if (envValue && envValue !== '') {
            console.log(`✅ CLIENT ENV: Found ${key} in process.env (${envValue.length} chars)`);
            return envValue;
        }
    } catch (error) {
        console.log(`❌ CLIENT ENV: Error accessing process.env.${key}:`, error);
    }

    console.log(`❌ CLIENT ENV: ${key} not found anywhere`);
    return undefined;
}

export { }; 