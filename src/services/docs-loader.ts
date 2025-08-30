import { DocumentationContent, DocumentationIndex } from '../types/docs';

// Try to import the generated docs index if available
let generatedDocsIndex: DocumentationIndex | null = null;
try {
    // webpack ignore comment to suppress dynamic require warnings
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const docsModule = require(/* webpackIgnore: true */ '../data/docs-index');
    generatedDocsIndex = docsModule.DOCS_INDEX;
} catch (error) {
    // Generated index not available, will use fallback content
    console.debug('Generated docs index not available, using fallback content');
}

// Dynamic documentation loader that works with Docusaurus
// Uses webpack require.context to dynamically import documentation files
class DocumentationLoader {
    private docsCache: DocumentationIndex = {};
    private lastUpdated: number = 0;
    private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

    constructor() { }

    /**
     * Get all documentation content, with caching
     */
    async getAllDocs(): Promise<DocumentationIndex> {
        const now = Date.now();

        // Return cached docs if still fresh
        if (now - this.lastUpdated < this.CACHE_DURATION && Object.keys(this.docsCache).length > 0) {
            return this.docsCache;
        }

        try {
            const docs = await this.loadDocsFromFiles();
            this.docsCache = docs;
            this.lastUpdated = now;
            return docs;
        } catch (error) {
            console.error('Failed to load documentation:', error);
            return this.docsCache; // Return cached version on error
        }
    }

    /**
     * Load documentation from generated index or fallback
     */
    private async loadDocsFromFiles(): Promise<DocumentationIndex> {
        // First, try to use the generated docs index (built at build time)
        if (generatedDocsIndex && Object.keys(generatedDocsIndex).length > 0) {
            console.debug('Using generated documentation index with', Object.keys(generatedDocsIndex).length, 'documents');
            return generatedDocsIndex;
        }

        // Fallback to basic content if generated index is not available
        console.debug('Generated docs index not available, using fallback content');
        return this.getFallbackContent();
    }



    /**
     * Extract title from content if not in frontmatter
     */
    private extractTitleFromContent(content: string): string | null {
        const titleMatch = content.match(/^#\s+(.+)$/m);
        return titleMatch ? titleMatch[1].trim() : null;
    }

    /**
     * Fallback content when dynamic loading fails
     */
    private getFallbackContent(): DocumentationIndex {
        return {
            'intro': {
                id: 'intro',
                title: 'Welcome to CLayer',
                content: `CLayer is a high-performance, EVM-compatible, Proof of Stake Layer 1 blockchain designed to power the next generation of decentralized applications.

## Key Features

- **High Performance**: 3-second block time, targeting 50,000 TPS
- **EVM Compatible**: Use all your existing Ethereum tools
- **Energy Efficient**: 99.9% less energy than Proof of Work
- **AI Security**: Real-time smart contract auditing

## Network Specifications

- Chain ID: 28525
- Block Time: 3 seconds
- Finality: 1-3 seconds
- Consensus: Delegated Proof of Stake (DPoS)
- Target TPS: 50,000`,
                frontmatter: { title: 'Welcome to CLayer' },
                filePath: 'docs/intro.mdx',
                category: 'introduction'
            },

            'set-up-wallet': {
                id: 'set-up-wallet',
                title: 'Set Up Wallet',
                content: `To get started with CLayer, you'll need to set up a compatible wallet.

## MetaMask Setup

1. Install MetaMask browser extension
2. Add CLayer testnet:
   - Network Name: CLayer Testnet
   - RPC URL: https://testnet-rpc.clayer.io
   - Chain ID: 28525
   - Currency Symbol: CLAYER
   - Block Explorer: https://explorer-testnet.clayer.io

## Other Supported Wallets

- WalletConnect
- Trust Wallet
- Coinbase Wallet`,
                frontmatter: { title: 'Set Up Wallet' },
                filePath: 'docs/getting-started/set-up-wallet.md',
                category: 'getting-started'
            },
            'writing-smart-contracts': {
                id: 'writing-smart-contracts',
                title: 'Writing Smart Contracts',
                content: `CLayer is fully EVM compatible, so you can use all your existing Ethereum development tools and knowledge.

## Supported Tools

- **Hardhat**: Full support for deployment and testing
- **Truffle**: Complete compatibility
- **Remix**: Works out of the box
- **Foundry**: Full support for advanced development

## Development Libraries

- **Web3.js**: Standard Ethereum library
- **Ethers.js**: Modern Ethereum library
- **Wagmi**: React hooks for Ethereum

## Smart Contract Languages

- **Solidity**: Full compatibility
- **Vyper**: Supported

## Example Contract Deployment

Using Hardhat:
npx hardhat run scripts/deploy.js --network clayer`,
                frontmatter: { title: 'Writing Smart Contracts' },
                filePath: 'docs/development/writing-smart-contracts.md',
                category: 'development'
            },
            'becoming-validator': {
                id: 'becoming-validator',
                title: 'Becoming a Validator',
                content: `CLayer uses Delegated Proof of Stake (DPoS) consensus. Here's how to become a validator.

## Requirements

- **Minimum Stake**: 100,000 CLAYER tokens
- **Hardware**: Reliable server with good uptime
- **Network**: Stable internet connection

## Validator Rewards

- **Block Rewards**: 2 CLAYER per block
- **Transaction Fees**: 45% of transaction fees (delegators)
- **Burn Mechanism**: 25% of gas fees are burned (max 1M CLAYER)

## Staking Process

1. Acquire 100,000 CLAYER tokens
2. Set up validator node
3. Submit staking transaction
4. Wait for network activation

## Network Security

- Minimum 5 active validators required
- Slashing for malicious behavior
- Automatic failover mechanisms`,
                frontmatter: { title: 'Becoming a Validator' },
                filePath: 'docs/nodes-validation/becoming-validator.md',
                category: 'nodes-validation'
            },
            'rpc-endpoints': {
                id: 'rpc-endpoints',
                title: 'RPC Endpoints',
                content: `CLayer provides standard JSON-RPC endpoints compatible with Ethereum.

## Testnet Endpoints

- **HTTP RPC**: https://rpc-testnet.clayer.io
- **WebSocket**: wss://ws-testnet.clayer.io
- **Chain ID**: 28525

## Supported Methods

All standard Ethereum JSON-RPC methods are supported:

- eth_getBalance
- eth_sendTransaction
- eth_call
- eth_getTransactionReceipt
- eth_getLogs
- And many more...

## Rate Limits

- Public endpoints: 100 requests/minute
- Authenticated: 1000 requests/minute

## Example Usage

const Web3 = require('web3');
const web3 = new Web3('https://rpc-testnet.clayer.io');

// Get latest block
const block = await web3.eth.getBlock('latest');
console.log(block);`,
                frontmatter: { title: 'RPC Endpoints' },
                filePath: 'docs/apis-sdks/rpc-endpoints.md',
                category: 'apis-sdks'
            }
        };
    }

    /**
     * Search documentation content
     */
    async searchDocs(query: string, category?: string): Promise<DocumentationContent[]> {
        const docs = await this.getAllDocs();
        const searchTerm = query.toLowerCase();

        return Object.values(docs)
            .filter(doc => {
                // Filter by category if specified
                if (category && doc.category !== category) {
                    return false;
                }

                // Search in title and content
                return doc.title.toLowerCase().includes(searchTerm) ||
                    doc.content.toLowerCase().includes(searchTerm);
            })
            .sort((a, b) => {
                // Sort by relevance (title matches first)
                const aTitle = a.title.toLowerCase().includes(searchTerm);
                const bTitle = b.title.toLowerCase().includes(searchTerm);

                if (aTitle && !bTitle) return -1;
                if (!aTitle && bTitle) return 1;
                return 0;
            });
    }

    /**
     * Force refresh the documentation cache
     */
    async refreshCache(): Promise<void> {
        this.lastUpdated = 0;
        this.docsCache = {};
        await this.getAllDocs();
    }
}

export default DocumentationLoader; 