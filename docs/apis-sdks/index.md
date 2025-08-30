---
title: APIs & SDKs Overview
description: Complete guide to Core Layer APIs, SDKs, and developer tools
---

# APIs & SDKs Overview

Core Layer provides comprehensive APIs and SDKs for seamless blockchain integration. This section covers all the endpoints, libraries, and tools you need for development.

## 🔧 Available APIs

### JSON-RPC API
- **Endpoint**: `https://testnet-rpc.clayer.io`
- **Compatibility**: Full Ethereum JSON-RPC compatibility
- **Use Cases**: Transaction submission, contract deployment, balance queries, block data

### WebSocket API
- **Endpoint**: `wss://testnet-rpc.clayer.io`
- **Purpose**: Real-time blockchain events and subscriptions
- **Features**: Block subscriptions, transaction notifications, contract events
- **Use Cases**: Live updates, event monitoring, real-time dApp features

### GraphQL API
- **Endpoint**: `https://testnet.clayer.io/graphiql`
- **Purpose**: Flexible, efficient data queries with filtering capabilities
- **Status**: Available for testing with enhanced querying and indexing

## 📚 Supported Web3 Libraries

Core Layer works seamlessly with all popular Ethereum libraries:

### Web3.js
```javascript
const Web3 = require('web3');
const web3 = new Web3('https://testnet-rpc.clayer.io');

// Standard Ethereum methods work identically
const balance = await web3.eth.getBalance(address);
const gasPrice = await web3.eth.getGasPrice();
```

### Ethers.js
```javascript
const { ethers } = require('ethers');
const provider = new ethers.providers.JsonRpcProvider('https://testnet-rpc.clayer.io');

// Same patterns as Ethereum development
const wallet = new ethers.Wallet(privateKey, provider);
const contract = new ethers.Contract(address, abi, wallet);
```

### Viem
```javascript
import { createPublicClient, http } from 'viem';

const client = createPublicClient({
  transport: http('https://testnet-rpc.clayer.io')
});

// Modern TypeScript-first Web3 library support
```

## 🛠️ Development Environment Integration

### Smart Contract Development
- **Hardhat**: Full development environment with Core Layer network configuration
- **Truffle**: Complete framework support with CLAYER gas configuration  
- **Remix**: Browser-based IDE with injected provider support
- **Foundry**: Rust-based toolkit for advanced smart contract development

### Frontend Frameworks
- **React**: Complete integration examples with Web3 hooks
- **Vue.js**: Component libraries and reactive Web3 integration
- **Angular**: Service-based Web3 integration patterns
- **Next.js**: Server-side rendering with Web3 provider handling

## 📖 API Reference Categories

1. **[RPC Endpoints](./rpc-endpoints)** - Complete JSON-RPC API documentation
2. **[Web3 Libraries](./web3-libraries)** - Integration examples and configurations
3. **[Smart Contract Development](../development/writing-smart-contracts)** - Contract deployment guides
4. **[Web3 Integration](../development/web3-integration)** - Frontend integration patterns

## 📊 API Status & Availability

| Service | Status | Documentation | Rate Limits |
|---------|--------|---------------|-------------|
| JSON-RPC API | 🟢 Live | Complete | Standard Ethereum limits |
| WebSocket API | 🟢 Live | Complete | 100 connections/IP |
| Block Explorer API | 🟢 Live | Available | 1000 requests/hour |
| GraphQL API | 🟢 Live | Available | 1000 requests/hour |

## 🔒 API Security & Best Practices

### Rate Limiting
- **JSON-RPC**: Standard Ethereum rate limits apply
- **WebSocket**: Maximum 100 concurrent connections per IP
- **Public Endpoints**: Fair usage policy enforced

### Error Handling
```javascript
// Proper error handling example
try {
  const result = await web3.eth.sendTransaction(txParams);
  console.log('Transaction sent:', result.transactionHash);
} catch (error) {
  if (error.code === -32603) {
    console.error('Internal error:', error.message);
  } else if (error.code === -32000) {
    console.error('Transaction failed:', error.message);
  }
}
```

### Network Resilience
```javascript
// Multiple endpoint configuration for redundancy
const providers = [
  'https://testnet-rpc.clayer.io',
  // Additional endpoints can be added for failover
];

const provider = new ethers.providers.FallbackProvider(
  providers.map(url => new ethers.providers.JsonRpcProvider(url))
);
```

## 🚀 Getting Started Quick Guide

### 1. Basic Setup
```bash
# Install required dependencies
npm install web3 ethers
# or
npm install @wagmi/core viem
```

### 2. Network Configuration
```javascript
// Basic provider setup
const provider = new ethers.providers.JsonRpcProvider('https://testnet-rpc.clayer.io');

// Or with Web3.js
const web3 = new Web3('https://testnet-rpc.clayer.io');
```

### 3. Contract Interaction
```javascript
// Deploy or interact with contracts
const contract = new ethers.Contract(contractAddress, abi, provider);
const result = await contract.someMethod();
```

## 🆘 Developer Support

### Documentation Resources
- 📖 Complete API reference documentation
- 💬 Community support via [Telegram](https://t.me/circlelayer)
- 🐛 Issue tracking on [GitHub](https://github.com/circlelayer/docs)
- 📧 Direct developer support available

### Integration Examples
- **React dApp**: [Complete React integration example](../development/web3-integration)
- **Smart Contracts**: [Contract development guide](../development/writing-smart-contracts)
- **Wallet Connection**: [MetaMask and WalletConnect setup](../development/wallet-connect-integration)

## Next Steps

Ready to start building? Check out our development guides:

- [RPC API Documentation](./rpc-endpoints) - Complete endpoint reference
- [Web3 Integration Examples](./web3-libraries) - Library-specific guides  
- [Smart Contract Development](../development/writing-smart-contracts) - Contract deployment
- [Frontend Integration](../development/web3-integration) - dApp development patterns 