---
id: evm-compatibility
title: EVM Compatibility
sidebar_label: EVM Compatibility
---

# EVM Compatibility

Technical details on CLayer's Ethereum Virtual Machine compatibility, migration strategies, and implementation considerations for developers.

## Technical Implementation

### Bytecode & Execution Compatibility
- **100% Bytecode Compatibility**: Identical instruction set and execution environment as Ethereum
- **Gas Model**: Standard Ethereum gas calculation (gas price × gas amount)  
- **State Management**: Compatible state tree and account structure
- **Smart Contract ABI**: Full Application Binary Interface compatibility

### Network Integration
CLayer testnet provides full EVM compatibility with:
- **Chain ID**: 28525 for testnet distinction
- **JSON-RPC API**: Complete Ethereum RPC method support
- **WebSocket Events**: Real-time blockchain event streaming
- **Block Structure**: Ethereum-compatible block and transaction format

## Migration Strategies

### From Ethereum Mainnet
**Zero-Code Migration Process:**
1. **Deploy Existing Contracts**: Use same bytecode and deployment scripts
2. **Update Network Configuration**: Change RPC endpoint and chain ID
3. **Configure Gas Token**: Use CLAYER instead of ETH for gas fees
4. **Test Integration**: Verify functionality on CLayer testnet

**Network Configuration Update:**
```javascript
// Hardhat configuration example
module.exports = {
  networks: {
    circleLayerTestnet: {
      url: "https://testnet-rpc.clayer.io",
      chainId: 28525,
      accounts: [process.env.PRIVATE_KEY],
      gasPrice: 21000000000, // 0.000021 CLAYER
    }
  }
};
```

### From Other EVM Chains (Polygon, BSC, Avalanche)
Migration from other EVM-compatible chains follows identical patterns:
- **Contract Deployment**: Same deployment tools and processes
- **Library Integration**: Existing Web3 libraries work without modification
- **Wallet Connection**: Standard MetaMask/WalletConnect integration
- **Gas Management**: Only difference is CLAYER token for gas fees

## Development Environment Setup

### Library Integration Examples

**Web3.js Implementation:**
```javascript
const Web3 = require('web3');
const web3 = new Web3('https://testnet-rpc.clayer.io');

// Standard Ethereum API usage
const balance = await web3.eth.getBalance(address);
const gasPrice = await web3.eth.getGasPrice();
const blockNumber = await web3.eth.getBlockNumber();
```

**Ethers.js Integration:**
```javascript
const { ethers } = require('ethers');
const provider = new ethers.providers.JsonRpcProvider('https://testnet-rpc.clayer.io');

// Same patterns as Ethereum development
const signer = new ethers.Wallet(privateKey, provider);
const contract = new ethers.Contract(address, abi, signer);
```

**Viem Integration:**
```javascript
import { createPublicClient, http } from 'viem';
import { defineChain } from 'viem';

const circleLayer = defineChain({
  id: 28525,
  name: 'CLayer Testnet',
  network: 'clayer-testnet',
  nativeCurrency: { name: 'CLAYER', symbol: 'CLAYER', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://testnet-rpc.clayer.io'] }
  }
});

const client = createPublicClient({
  chain: circleLayer,
  transport: http()
});
```

## Wallet Integration

### MetaMask Configuration
```javascript
// Programmatic network addition
await window.ethereum.request({
  method: 'wallet_addEthereumChain',
  params: [{
    chainId: '0x6F75', // 28525 in hex
    chainName: 'CLayer Testnet',
    nativeCurrency: {
      name: 'CLAYER',
      symbol: 'CLAYER',
      decimals: 18
    },
    rpcUrls: ['https://testnet-rpc.clayer.io'],
    blockExplorerUrls: ['https://explorer-testnet.clayer.io/']
  }]
});
```

### WalletConnect Integration
```javascript
// Standard WalletConnect setup works with CLayer
import { WalletConnect } from '@walletconnect/client';

const connector = new WalletConnect({
  bridge: "https://bridge.walletconnect.org",
  qrcodeModal: QRCodeModal,
});

// Network switching handled through standard EIP-3326
await connector.request({
  method: 'wallet_switchEthereumChain',
  params: [{ chainId: '0x6F75' }]
});
```

## Performance Advantages

### CLayer Benefits over Ethereum
- **3s Block Time**: vs Ethereum's 12s average
- **1-3s Finality**: vs Ethereum's 6-10 minute finality  
- **Predictable Gas**: Stable CLAYER pricing vs volatile ETH gas
- **99.95% Uptime**: Consistent network availability
- **Energy Efficiency**: 99.9% less energy consumption

### Development Experience Improvements
- **Faster Testing**: 3-second blocks for rapid iteration
- **Cost-Effective**: Free testnet tokens via faucet
- **Reliable Performance**: Consistent block times and gas prices
- **Standard Tooling**: No learning curve for Ethereum developers

## Testing & Verification

### Contract Verification Process
1. **Deploy to Testnet**: Use standard deployment tools
2. **Verify Source Code**: Submit to CLayer block explorer
3. **Test Interactions**: Validate all contract functions
4. **Performance Testing**: Measure gas usage and execution time

### Integration Testing Checklist
- ✅ Contract deployment successful
- ✅ Web3 library connectivity verified  
- ✅ Wallet interactions functioning
- ✅ Event listening operational
- ✅ Gas estimation accurate
- ✅ Transaction confirmations reliable

## Reference Implementation

**Example Contract Address**: `0xfCb4Ce5953dE22cbF04d015df88a3a9895E86bEB`
- [View on Explorer](https://explorer-testnet.clayer.io/address/0xfCb4Ce5953dE22cbF04d015df88a3a9895E86bEB?tab=contract)
- [Contract ABI](https://explorer-testnet.clayer.io/address/0xfCb4Ce5953dE22cbF04d015df88a3a9895E86bEB?tab=contract_abi)
- [Source Code](https://explorer-testnet.clayer.io/address/0xfCb4Ce5953dE22cbF04d015df88a3a9895E86bEB?tab=contract)

## Best Practices

### Gas Optimization for CLAYER
- **Estimate Gas Carefully**: Use `eth_estimateGas` for accurate calculations
- **Batch Operations**: Combine multiple calls to reduce gas overhead
- **Storage Optimization**: Minimize state changes for cost efficiency
- **Test Gas Usage**: Verify gas consumption on testnet before mainnet

### Security Considerations
- **Same Security Model**: Standard EVM security practices apply
- **Testnet Testing**: Thorough testing recommended before mainnet deployment
- **Audit Compatibility**: Existing Ethereum audit reports remain valid
- **Network Effects**: Consider CLayer's DPoS consensus in security design

## Next Steps

For detailed implementation guidance:
- [Smart Contract Development](/development/writing-smart-contracts) - Contract deployment guide
- [Web3 Integration](/development/web3-integration) - Frontend integration patterns
- [Wallet Setup](/getting-started/set-up-wallet) - User wallet configuration
- [Network Configuration](/getting-started/connect-testnet) - Complete setup guide