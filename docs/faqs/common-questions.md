---
sidebar_position: 1
---

# Common Questions

## General Questions

### What is Circle Layer?
Circle Layer is a high-performance, EVM-compatible blockchain platform powered by Delegated Proof of Stake (DPoS) consensus mechanism with standard EVM security features.

### How does Circle Layer differ from Ethereum?
- **Block Time**: 3 seconds vs 12+ seconds
- **Finality**: 1-3 seconds vs 6-10 minutes
- **Consensus**: DPoS vs Proof of Work
- **Energy Efficiency**: 99.9% less energy consumption
- **Gas Fees**: Lower fees with CLAYER token

### Is Circle Layer EVM compatible?
Yes, Circle Layer is fully EVM compatible, allowing Ethereum developers to easily port their applications using the same tools and libraries.

## Network Information

### What is the current network status?
- **Status**: In Development
- **Chain ID**: 28525
- **Currency**: CLAYER
- **Block Time**: 3 seconds
- **Finality**: 1-3 seconds
- **Uptime**: 99.95% (Last 30 days)

### Where can I find network resources?
- **RPC**: https://rpc-testnet.circlelayer.com
- **Explorer**: https://explorer-testnet.circlelayer.com/
- **Faucet**: https://faucet.circlelayer.com
- **API Docs**: https://testnet.circlelayer.com/api-docs

## Technical Questions

### How do I connect to Circle Layer testnet?
```javascript
// Using ethers.js
const provider = new ethers.providers.JsonRpcProvider('https://rpc-testnet.circlelayer.com');

// Network configuration for MetaMask
{
  chainId: '0x6F75', // 28525 in hex
  chainName: 'Circle Layer Testnet',
  nativeCurrency: {
    name: 'CLAYER',
    symbol: 'CLAYER',
    decimals: 18
  },
  rpcUrls: ['https://rpc-testnet.circlelayer.com'],
  blockExplorerUrls: ['https://explorer-testnet.circlelayer.com/']
}
```

### What wallets are supported?
- **MetaMask** (Recommended with testnet configuration)
- **WalletConnect** (Register and follow their guidelines)
- **Custom Wallets** (Same as EVM integration)
- **Mobile Wallets** (Same as EVM integration)

### How do I get testnet tokens?
1. Visit the faucet: https://faucet.circlelayer.com
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
See our [Web3 Integration Guide](/docs/development/web3-integration) and check the example contract: 0xfCb4Ce5953dE22cbF04d015df88a3a9895E86bEB

### What are the gas requirements?
- **Minimum Gas Price**: 0.000021 CLAYER
- **Block Gas Limit**: 10,000,000,000,000 per block
- **Fee Calculation**: gas price × gas amount (Ethereum standard)

## Security Questions

### What security features are implemented?
- **Standard EVM Security**: Applied across the network
- **DPoS Consensus**: Delegated Proof of Stake security model
- **Burn Mechanism**: 25% from gas fees (maximum 1,000,000 CLAYER)
- **Network Requirements**: Minimum 5 active validators for security

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

## 🚧 Development Roadmap

### What features are coming soon?
The following features are currently in development:

**Smart Contract Infrastructure**
- Automated staking contracts (currently manual staking)
- On-chain governance system
- Cross-chain bridge contracts
- Decentralized oracle network

**Network Monitoring & Tools**
- Real-time network status dashboard
- Comprehensive analytics dashboard
- Automated alert and monitoring system
- Enhanced API rate limiting

### When will these features be available?
These features are part of our ongoing development roadmap and will be released in phases as they complete testing and security audits.