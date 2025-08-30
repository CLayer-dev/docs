---
sidebar_position: 1
---

# Common Questions

## General Questions

### What is Core Layer?
Core Layer is a high-performance, EVM-compatible blockchain platform powered by Delegated Proof of Stake (DPoS) consensus mechanism with AI-enhanced security features, designed to deliver up to 50,000 TPS with 1-3 second finality.

### How does Core Layer differ from Ethereum?
- **Performance**: Up to 50,000 TPS vs 15 TPS
- **Block Time**: 3 seconds vs 12+ seconds
- **Finality**: 1-3 seconds vs 6-10 minutes
- **Consensus**: DPoS vs Proof of Stake
- **Energy Efficiency**: 99.9% less energy consumption
- **Security**: AI-enhanced security features
- **Gas Fees**: Lower fees with CLAYER token

### Is Core Layer EVM compatible?
Yes, Core Layer is fully EVM compatible, allowing Ethereum developers to easily port their applications using the same tools and libraries.

## Network Information

### What is the current network status?
- **Status**: Development & Testing Phase
- **Chain ID**: 28525
- **Currency**: CLAYER
- **Block Time**: 3 seconds
- **Finality**: 1-3 second
- **Target Performance**: 50,000 TPS
- **Current Performance**: ~5,000 TPS
- **Target Uptime**: 99.95%

### Where can I find network resources?
*Core Layer testnet resources:*

- **RPC**: https://testnet-rpc.clayer.io
- **Explorer**: https://explorer-testnet.clayer.io
- **Faucet**: https://faucet.clayer.io
- **Faucet API**: https://faucet-api.clayer.io

## Technical Questions

### How do I connect to Core Layer testnet?
*Configuration for Core Layer testnet:*

```javascript
// Using ethers.js
const provider = new ethers.providers.JsonRpcProvider('https://testnet-rpc.clayer.io');

// Network configuration for MetaMask
{
  chainId: '0x6F75', // 28525 in hex
  chainName: 'Core Layer Testnet',
  nativeCurrency: {
    name: 'CLAYER',
    symbol: 'CLAYER',
    decimals: 18
  },
  rpcUrls: ['https://testnet-rpc.clayer.io'],
  blockExplorerUrls: ['https://explorer-testnet.clayer.io']
}
```

### What wallets are supported?
- **MetaMask** (Recommended with testnet configuration)
- **WalletConnect** (Register and follow their guidelines)
- **Custom Wallets** (EVM-compatible software wallets)
- **Mobile Wallets** (Trust Wallet, Rainbow, Coinbase Wallet, etc.)

**Note**: Ledger and other hardware wallets are NOT currently supported.

### How do I get testnet tokens?
*Core Layer testnet faucet:*

1. Visit the faucet: https://faucet.clayer.io
2. Paste your EVM wallet address
3. Click "Get 1 CLAYER coin"
4. Wait 24 hours between requests (1 CLAYER per day limit)

## Development Questions

### How do I deploy a smart contract?
See our [Deployment Guide](/development/deploying-contracts) with Hardhat and Truffle configurations for Core Layer testnet.

### What development tools are available?
- **Hardhat** (with Core Layer testnet configuration)
- **Truffle** (with CLAYER gas settings)
- **Remix** (using Injected Provider - MetaMask)
- **Web3.js / Ethers.js** (standard EVM integration)

### How do I interact with contracts?
See our [Web3 Integration Guide](/development/web3-integration) for detailed instructions. 
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
See our [Validator Guide](/nodes-validation/becoming-validator)

### What are the current staking requirements?
- **Testnet Validator Minimum Stake**: 32 CLAYER
- **Mainnet Validator Minimum Stake**: 100,000 CLAYER
- **Delegator Minimum Stake**: 32 CLAYER
- **Maximum Validators**: 21 (testnet), 10,000 (mainnet)
- **Hardware**: Ubuntu ≥ 20.04 LTS, 8GB RAM minimum (32GB recommended)
- **Storage**: 25GB minimum (100GB SSD recommended)
- **Network**: Multiple RPC endpoints required
- **Security**: Minimum 5 validators active required

### What can validators earn?
**Revenue Sources:**
- **Block Rewards**: 2 CLAYER per block + performance bonuses
- **Transaction Fees**: 30% of network transaction fees
- **Delegation Commission**: 5-20% from delegated stakes

**Fee Distribution:**
- **Delegators**: 45% of gas fees
- **Validators**: 30% of gas fees  
- **Burn Mechanism**: 25% of gas fees (stops at 1,000,000 CLAYER threshold)

**Expected Annual Revenue (estimates):**
- **Conservative**: $25,000 - $58,000
- **Moderate**: $83,000 - $223,000  
- **Optimistic**: $328,000 - $1,340,000

*Revenue depends on network activity, token price, delegation amount, and validator performance.*

### What ports do validators need?
- **Required Ports**: 32668, 32669, 8545, 6060, 80, 22
- **Firewall**: Not required

### How do I run a node?
See our [Node Guide](/nodes-validation/running-full-node) with current hardware and software requirements.

## Integration Questions

### Is Core Layer the same as other EVM chains?
Yes, Core Layer follows standard EVM integration patterns, making it compatible with existing Ethereum development tools and workflows.

### Can I use existing Ethereum tools?
Yes, all standard Ethereum development tools work with Core Layer testnet:
- Same Web3 libraries
- Same wallet integrations  
- Same development frameworks
- Same smart contract languages (Solidity)

## 🚧 Development Status & Roadmap

### What is the current development status?
Core Layer is currently in active development and testing phase with the following progress:

**Completed Components:**
- Core blockchain architecture (DPoS consensus)
- EVM compatibility layer
- Basic smart contract infrastructure
- Network configuration and tooling
- Documentation and developer resources

**In Development:**
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

**Phase 4: Mainnet & Expansion** (Future Vision)
- Planned mainnet launch
- Enterprise partnerships (future goals)
- Performance scaling goals
- Global ecosystem growth plans

### When will testnet be available?
We're currently in the final development and testing phase. Testnet availability will be announced through our official channels when ready.

### What makes Core Layer economically secure?

Core Layer's economic security is built on several mechanisms:

- **Stake-based Consensus**: Validators must stake CLAYER tokens to participate
- **Economic Incentives**: Validators earn rewards proportional to their stake
- **Punishment System**: Poor performance results in slashing and income loss
- **Economic Security**: Token burn mechanism (25% of transaction fees) *[Mainnet only]*

### How does the fee distribution work?

Core Layer implements a sophisticated fee distribution system:

- **Delegator Rewards**: 45% from gas fees (distributed by stake proportion)
- **Validator Rewards**: 30% from gas fees (distributed by stake proportion)
- **Burn Mechanism**: 25% of gas fees (stops at 1,000,000 CLAYER threshold) *[Mainnet only]*
- **Proportional Distribution**: All rewards based on stake percentage

*Note: The ETH token launch uses a simplified model with 5% trading fees. Full fee distribution and burn mechanisms will be implemented on mainnet migration.*