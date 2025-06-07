---
id: evm-compatibility
title: EVM Compatibility
sidebar_label: EVM Compatibility
---

# EVM Compatibility

Circle Layer maintains full compatibility with the Ethereum Virtual Machine (EVM), allowing developers to seamlessly migrate existing applications or build new ones using familiar tools and patterns.

## Current EVM Implementation

### Full Compatibility Features
- **Bytecode Compatibility**: 100% compatible with Ethereum bytecode
- **Same Opcodes**: Identical instruction set as Ethereum
- **Gas Model**: Standard Ethereum gas calculation (gas price × gas amount)
- **Integration Patterns**: Same as other EVM blockchains

### Circle Layer Testnet Specifics
- **Network**: Circle Layer Testnet (Chain ID: 28525)
- **Currency**: CLAYER tokens for gas fees
- **Gas Pricing**: Minimum 0.000021 CLAYER
- **Block Gas Limit**: 10,000,000,000,000 per block

## Development Benefits

### Familiar Environment
- **Reuse Existing Contracts**: Deploy without modifications
- **Same Development Tools**: Hardhat, Truffle, Remix work identically
- **Standard Libraries**: Web3.js, Ethers.js work without changes
- **Wallet Integration**: MetaMask and other EVM wallets compatible

### Proven Security Model
- **Standard EVM Security**: Established security patterns
- **DPoS Consensus**: Enhanced with Delegated Proof of Stake
- **Testing Environment**: Full testnet for comprehensive testing

## Migration Guide

### From Ethereum
1. **Change Network Configuration**
   ```javascript
   // Update RPC endpoint
   const provider = new ethers.providers.JsonRpcProvider('https://rpc-testnet.circlelayer.com');
   
   // Update network configuration
   {
     chainId: 28525,
     name: 'Circle Layer Testnet',
     currency: 'CLAYER',
     rpcUrl: 'https://rpc-testnet.circlelayer.com'
   }
   ```

2. **Get Test Tokens**
   - Visit faucet: https://faucet.circlelayer.com
   - Request 1 CLAYER per day for testing

3. **Deploy Contracts**
   - Use same deployment scripts
   - Configure gas price for CLAYER
   - Verify on Circle Layer explorer

4. **Test Integration**
   - Test with CLAYER for gas fees
   - Verify wallet connectivity
   - Check transaction finality (1-3 seconds)

### From Other EVM Chains
Migration from Polygon, BSC, or other EVM chains follows the same pattern:
- Update RPC endpoint
- Configure for CLAYER gas token
- Test on Circle Layer testnet

## Practical Examples

### Hardhat Configuration
```javascript
module.exports = {
  networks: {
    circleLayerTestnet: {
      url: "https://rpc-testnet.circlelayer.com",
      chainId: 28525,
      accounts: [process.env.PRIVATE_KEY],
      gasPrice: 21000000000, // 0.000021 CLAYER
    }
  }
};
```

### Web3.js Integration
```javascript
const Web3 = require('web3');
const web3 = new Web3('https://rpc-testnet.circlelayer.com');

// Same API as Ethereum
const balance = await web3.eth.getBalance(address);
const gasPrice = await web3.eth.getGasPrice();
```

### MetaMask Setup
```javascript
// Add Circle Layer Testnet to MetaMask
await window.ethereum.request({
  method: 'wallet_addEthereumChain',
  params: [{
    chainId: '0x6F75', // 28525 in hex
    chainName: 'Circle Layer Testnet',
    nativeCurrency: {
      name: 'CLAYER',
      symbol: 'CLAYER',
      decimals: 18
    },
    rpcUrls: ['https://rpc-testnet.circlelayer.com'],
    blockExplorerUrls: ['https://explorer-testnet.circlelayer.com/']
  }]
});
```

## Performance Benefits

### Circle Layer Advantages
- **Faster Finality**: 1-3 seconds vs Ethereum's 6-10 minutes
- **Lower Gas Costs**: Affordable testing with CLAYER
- **Consistent Block Time**: 3-second intervals
- **High Uptime**: 99.95% network availability

### Development Experience
- **Same Tools**: No learning curve for Ethereum developers
- **Quick Testing**: Fast block times for rapid iteration
- **Cost Effective**: Free testnet tokens via faucet
- **Standard Patterns**: Familiar development workflows

## Resources

### Example Implementation
- **Reference Contract**: 0xfCb4Ce5953dE22cbF04d015df88a3a9895E86bEB
- **Source Code**: [View on Explorer](https://testnet.circlelayer.com/address/0xfCb4Ce5953dE22cbF04d015df88a3a9895E86bEB?tab=contract)
- **ABI**: [Contract ABI](https://testnet.circlelayer.com/address/0xfCb4Ce5953dE22cbF04d015df88a3a9895E86bEB?tab=contract_abi)

### Integration Guides
- [Smart Contract Development](/development/writing-smart-contracts)
- [Contract Deployment](/development/deploying-contracts)
- [Web3 Integration](/development/web3-integration)
- [Wallet Setup](/getting-started/set-up-wallet)