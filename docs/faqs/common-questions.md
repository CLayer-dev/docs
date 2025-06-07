---
sidebar_position: 1
---

# Common Questions

## General Questions

### What is Circle Layer?
Circle Layer is a high-performance, EVM-compatible blockchain platform powered by Delegated Proof of Stake (DPoS) consensus mechanism with AI-enhanced security features, designed to deliver up to 50,000 TPS with 1-3 second finality.

### How does Circle Layer differ from Ethereum?
- **Performance**: Up to 50,000 TPS vs 15 TPS
- **Block Time**: 3 seconds vs 12+ seconds
- **Finality**: 1-3 seconds vs 6-10 minutes
- **Consensus**: DPoS vs Proof of Stake
- **Energy Efficiency**: 99.9% less energy consumption
- **Security**: AI-enhanced security features
- **Gas Fees**: Lower fees with CLAYER token

### Is Circle Layer EVM compatible?
Yes, Circle Layer is fully EVM compatible, allowing Ethereum developers to easily port their applications using the same tools and libraries.

## Network Information

### What is the current network status?
- **Status**: Development & Testing Phase
- **Chain ID**: 28525
- **Currency**: CLAYER
- **Block Time**: 3 seconds
- **Finality**: 1-3 second
- **Target Performance**: 50,000 TPS
- **Current Performance**: 2,000+ TPS
- **Target Uptime**: 99.95%

### Where can I find network resources?
*The following resources will be available when testnet launches:*
<!-- - **RPC**: https://rpc-testnet.circlelayer.com -->
<!-- - **Explorer**: https://explorer-testnet.circlelayer.com/ -->
<!-- - **Faucet**: https://faucet.circlelayer.com -->
<!-- - **API Docs**: https://testnet.circlelayer.com/api-docs -->

- **RPC**: *Coming soon*
- **Explorer**: *Coming soon*
- **Faucet**: *Coming soon*
- **API Docs**: *Coming soon*

## Technical Questions

### How do I connect to Circle Layer testnet?
*Configuration for when testnet becomes available:*

```javascript
// Using ethers.js
// const provider = new ethers.providers.JsonRpcProvider('https://rpc-testnet.circlelayer.com');

// Network configuration for MetaMask
{
  chainId: '0x6F75', // 28525 in hex
  chainName: 'Circle Layer Testnet',
  nativeCurrency: {
    name: 'CLAYER',
    symbol: 'CLAYER',
    decimals: 18
  },
  // rpcUrls: ['https://rpc-testnet.circlelayer.com'],
  // blockExplorerUrls: ['https://explorer-testnet.circlelayer.com/']
  rpcUrls: ['*Coming soon*'],
  blockExplorerUrls: ['*Coming soon*']
}
```

### What wallets are supported?
- **MetaMask** (Recommended with testnet configuration)
- **WalletConnect** (Register and follow their guidelines)
- **Custom Wallets** (Same as EVM integration)
- **Mobile Wallets** (Same as EVM integration)

### How do I get testnet tokens?
*When testnet launches, the faucet will be available with the following process:*

<!-- 1. Visit the faucet: https://faucet.circlelayer.com -->
1. Visit the faucet: *Coming soon*
2. Paste your EVM wallet address
3. Click "Get 1 CLAYER coin"
4. Wait 24 hours between requests (1 CLAYER per day limit)

## Development Questions

### How do I deploy a smart contract?
See our [Deployment Guide](/docs/development/deploying-contracts) with Hardhat and Truffle configurations for Circle Layer testnet.

### What development tools are available?
- **Hardhat** (with Circle Layer testnet configuration)
- **Truffle** (with CLAYER gas settings)
- **Remix** (using Injected Provider - MetaMask)
- **Web3.js / Ethers.js** (standard EVM integration)

### How do I interact with contracts?
See our [Web3 Integration Guide](/docs/development/web3-integration) for detailed instructions. 
<!-- Example contract when testnet is live: 0xfCb4Ce5953dE22cbF04d015df88a3a9895E86bEB -->

### What are the gas requirements?
- **Minimum Gas Price**: 0.000021 CLAYER
- **Block Gas Limit**: 10,000,000,000,000 per block
- **Fee Calculation**: gas price × gas amount (Ethereum standard)

## Security Questions

### What security features are implemented?
- **DPoS Consensus**: Delegated Proof of Stake security model  
- **Multi-Layer Security**: Network, validator, and transaction-level protection
- **Economic Security**: Token burn mechanism (25% of transaction fees)
- **Network Requirements**: Minimum 5 active validators for security

### What security features are coming in Phase 2?
- **AI-Enhanced Security**: Advanced threat detection targeting 99.8% accuracy
- **Real-time Monitoring**: Continuous threat detection and response
- **Automated Security Auditing**: AI-powered contract analysis

### How do I report security issues?
- Use our bug bounty program
- Contact security team
- Follow responsible disclosure protocols

## Network Questions

### How do I become a validator?
See our [Validator Guide](/docs/nodes-validation/becoming-validator)

### What are the current staking requirements?
- **Minimum Stake**: 100,000 CLAYER
- **Hardware**: Ubuntu ≥ 20.04 LTS, 8GB RAM minimum (32GB recommended)
- **Storage**: 25GB minimum (100GB SSD recommended)
- **Network**: Multiple RPC endpoints required
- **Security**: Minimum 5 validators active required

### What can validators earn?
**Revenue Sources:**
- **Block Rewards**: 2 CLAYER per block + performance bonuses
- **Transaction Fees**: 50% of network transaction fees
- **Delegation Commission**: 5-20% from delegated stakes

**Expected Annual Revenue (estimates):**
- **Conservative**: $25,000 - $58,000
- **Moderate**: $83,000 - $223,000  
- **Optimistic**: $328,000 - $1,340,000

*Revenue depends on network activity, token price, delegation amount, and validator performance.*

### What ports do validators need?
- **Required Ports**: 32668, 32669, 8545, 6060, 80, 22
- **Firewall**: Not required

### How do I run a node?
See our [Node Guide](/docs/nodes-validation/running-full-node) with current hardware and software requirements.

## Integration Questions

### Is Circle Layer the same as other EVM chains?
Yes, Circle Layer follows standard EVM integration patterns, making it compatible with existing Ethereum development tools and workflows.

### Can I use existing Ethereum tools?
Yes, all standard Ethereum development tools work with Circle Layer testnet:
- Same Web3 libraries
- Same wallet integrations  
- Same development frameworks
- Same smart contract languages (Solidity)

## 🚧 Development Status & Roadmap

### What is the current development status?
Circle Layer is currently in active development and testing phase with the following progress:

**Completed Components:**
- Core blockchain architecture (DPoS consensus)
- EVM compatibility layer
- Basic smart contract infrastructure
- Network configuration and tooling
- Documentation and developer resources

**In Development:**
- **AI security framework** (targeting 99.8% threat detection accuracy)
- Testnet deployment and testing
- Advanced validator tooling
- Enhanced monitoring systems
- Cross-chain bridge development

### What features are coming in each phase?

**Phase 1: Testnet Launch (Current Focus)**
- Public testnet availability
- Faucet and explorer services
- Developer tooling and SDKs
- Community validator onboarding

**Phase 2: Ecosystem Development**
- DeFi protocol partnerships
- Developer grants program
- Advanced staking mechanisms
- Cross-chain integrations

**Phase 3: Mainnet Preparation**
- Security audits and testing
- Performance optimization
- Governance system activation
- Economic model finalization

**Phase 4: Mainnet & Expansion**
- Full mainnet launch
- Enterprise partnerships
- Scaling to 50,000 TPS
- Global ecosystem growth

### When will testnet be available?
We're currently in the final development and testing phase. Testnet availability will be announced through our official channels when ready.