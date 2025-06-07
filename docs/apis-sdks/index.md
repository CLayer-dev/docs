---
title: APIs & SDKs Overview
description: Complete guide to Circle Layer APIs, SDKs, and developer tools
---

# APIs & SDKs Overview

Circle Layer provides comprehensive APIs and SDKs to help developers build and integrate with our blockchain network. This section covers all the tools and endpoints you need for development.

## 🔧 Available APIs

### JSON-RPC API
- **Endpoint**: `https://rpc-testnet.circlelayer.com`
- **Purpose**: Core blockchain interactions
- **Compatibility**: Ethereum JSON-RPC compatible
- **Use Cases**: Transaction submission, contract deployment, balance queries

### WebSocket API
- **Endpoint**: `wss://138.197.184.207:8545`
- **Purpose**: Real-time blockchain events
- **Features**: Block subscriptions, transaction notifications
- **Use Cases**: Live updates, event monitoring

### GraphQL API (In Development)
- **Endpoint**: `https://testnet.circlelayer.com/graphiql`
- **Purpose**: Flexible data queries
- **Status**: Coming soon with enhanced filtering

## 📚 Web3 Libraries

Circle Layer is fully compatible with popular Web3 libraries:

### Web3.js
```javascript
const Web3 = require('web3');
const web3 = new Web3('https://rpc-testnet.circlelayer.com');
```

### Ethers.js
```javascript
const { ethers } = require('ethers');
const provider = new ethers.providers.JsonRpcProvider('https://rpc-testnet.circlelayer.com');
```

### Viem
```javascript
import { createPublicClient, http } from 'viem';

const client = createPublicClient({
  transport: http('https://rpc-testnet.circlelayer.com')
});
```

## 🛠️ Development Tools

### Smart Contract Development
- **Hardhat**: Full development environment
- **Truffle**: Development framework
- **Remix**: Browser-based IDE
- **Foundry**: Rust-based toolkit

### Testing & Deployment
- **Local Development**: Use Hardhat or Truffle
- **Testnet Deployment**: Direct to Circle Layer testnet
- **Contract Verification**: Via block explorer

## 📖 Quick Start Guides

1. **[RPC Endpoints](./rpc-endpoints)** - Complete API reference
2. **[Web3 Libraries](./web3-libraries)** - Integration examples
3. **[Smart Contract Development](../development/writing-smart-contracts)** - Build contracts
4. **[Web3 Integration](../development/web3-integration)** - Frontend integration

## 🌐 Network Information

- **Chain ID**: 28525
- **Currency**: CLAYER
- **Block Time**: 3 seconds
- **Gas Price**: Minimum 0.000021 CLAYER

## 📊 Development Status

| Service | Status | Readiness |
|---------|--------|-----------|
| RPC API | 🟡 Ready for Testing | Infrastructure Complete |
| WebSocket | 🟡 Ready for Testing | Infrastructure Complete |
| Block Explorer | 🟡 Ready for Testing | Infrastructure Complete |
| GraphQL | 🔄 In Development | Coming Soon |

## 🆘 Support

Need help with API integration?

- 📖 Check our [comprehensive guides](../development/web3-integration)
- 💬 Join our [Telegram community](https://t.me/circlelayer)
- 🐛 Report issues on [GitHub](https://github.com/Circle-layer-org/docs)

## Next Steps

Ready to start building? Check out our development guides:

- [Writing Smart Contracts](../development/writing-smart-contracts)
- [Web3 Integration Examples](../development/web3-integration)
- [RPC API Reference](./rpc-endpoints) 