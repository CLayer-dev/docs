---
sidebar_position: 2
---

# Web3 Libraries

## Overview

Circle Layer supports various Web3 libraries for interacting with the testnet. All standard Ethereum Web3 libraries work with Circle Layer using the same patterns.

## Network Configuration

### Circle Layer Testnet
- **RPC URL**: https://testnet-rpc.circlelayer.com
- **WebSocket**: wss://testnet-rpc.circlelayer.com
- **Chain ID**: 28525
- **Currency**: CLAYER

## Supported Libraries

### 1. ethers.js
```javascript
import { ethers } from 'ethers';

// HTTP Provider
const provider = new ethers.providers.JsonRpcProvider('https://testnet-rpc.circlelayer.com');

// WebSocket Provider
const wsProvider = new ethers.providers.WebSocketProvider('wss://testnet-rpc.circlelayer.com');

// Wallet setup
const wallet = new ethers.Wallet(privateKey, provider);

// Check CLAYER balance
const balance = await wallet.getBalance();
console.log('Balance:', ethers.utils.formatEther(balance), 'CLAYER');
```

### 2. web3.js
```javascript
import Web3 from 'web3';

// HTTP Provider
const web3 = new Web3('https://testnet-rpc.circlelayer.com');

// WebSocket Provider
const webSocketWeb3 = new Web3('wss://testnet-rpc.circlelayer.com');

// Account setup
const account = web3.eth.accounts.privateKeyToAccount(privateKey);
web3.eth.accounts.wallet.add(account);

// Check CLAYER balance
const balance = await web3.eth.getBalance(account.address);
console.log('Balance:', web3.utils.fromWei(balance, 'ether'), 'CLAYER');
```

### 3. Web3.py
```python
from web3 import Web3

# HTTP Provider
w3 = Web3(Web3.HTTPProvider('https://testnet-rpc.circlelayer.com'))

# Account setup
account = w3.eth.account.from_key(private_key)

# Check CLAYER balance
balance = w3.eth.get_balance(account.address)
print(f'Balance: {w3.from_wei(balance, "ether")} CLAYER')
```

## Circle Layer Specific Features

### Network Information
```javascript
// Get network information
const network = await provider.getNetwork();
console.log('Chain ID:', network.chainId); // 28525
console.log('Name:', network.name);

// Current gas price (in CLAYER)
const gasPrice = await provider.getGasPrice();
console.log('Gas Price:', ethers.utils.formatUnits(gasPrice, 'gwei'), 'Gwei');
```

### Transaction with CLAYER
```javascript
// Send CLAYER transaction
const transaction = {
  to: '0x...',
  value: ethers.utils.parseEther('1'), // 1 CLAYER
  gasPrice: ethers.utils.parseUnits('21', 'gwei'), // 0.000021 CLAYER
  gasLimit: 21000
};

const tx = await wallet.sendTransaction(transaction);
const receipt = await tx.wait();
console.log('Transaction confirmed:', receipt.transactionHash);
```

### Smart Contract Interaction
```javascript
// Example contract interaction
const contractAddress = '0xfCb4Ce5953dE22cbF04d015df88a3a9895E86bEB';
const contract = new ethers.Contract(contractAddress, abi, wallet);

// Call contract method
const result = await contract.someMethod();

// Send transaction to contract (using CLAYER for gas)
const tx = await contract.someWriteMethod(params, {
  gasPrice: ethers.utils.parseUnits('21', 'gwei'), // CLAYER gas price
  gasLimit: 100000
});
```

## Best Practices

### 1. Network Configuration
```javascript
// Always verify network
const network = await provider.getNetwork();
if (network.chainId !== 28525) {
  throw new Error('Please connect to Circle Layer Testnet');
}
```

### 2. Gas Management
```javascript
// Use appropriate gas settings for Circle Layer
const gasPrice = ethers.utils.parseUnits('21', 'gwei'); // 0.000021 CLAYER
const gasLimit = await contract.estimateGas.methodName(params);
```

### 3. Error Handling
```javascript
try {
  const tx = await contract.someMethod(params);
  const receipt = await tx.wait();
} catch (error) {
  if (error.code === 'INSUFFICIENT_FUNDS') {
    console.error('Insufficient CLAYER balance');
  } else {
    console.error('Transaction failed:', error.message);
  }
}
```

### 4. Environment Setup
```javascript
// Use environment variables
const provider = new ethers.providers.JsonRpcProvider(
  process.env.CIRCLE_LAYER_RPC || 'https://testnet-rpc.circlelayer.com'
);
```

## Integration Examples

### React Integration
```jsx
import { ethers } from 'ethers';
import { useState, useEffect } from 'react';

function useCircleLayer() {
  const [provider, setProvider] = useState(null);
  const [balance, setBalance] = useState('0');

  useEffect(() => {
    const initProvider = async () => {
      if (window.ethereum) {
        const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(web3Provider);
        
        // Add Circle Layer Testnet to MetaMask if needed
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
            rpcUrls: ['https://testnet-rpc.circlelayer.com'],
            blockExplorerUrls: ['https://explorer-testnet.circlelayer.com/']
          }]
        });
      }
    };
    
    initProvider();
  }, []);

  return { provider, balance };
}
```

### Node.js Backend
```javascript
const { ethers } = require('ethers');

class CircleLayerService {
  constructor() {
    this.provider = new ethers.providers.JsonRpcProvider('https://testnet-rpc.circlelayer.com');
    this.wallet = new ethers.Wallet(process.env.PRIVATE_KEY, this.provider);
  }

  async sendCLAYER(to, amount) {
    const tx = await this.wallet.sendTransaction({
      to,
      value: ethers.utils.parseEther(amount),
      gasPrice: ethers.utils.parseUnits('21', 'gwei')
    });
    
    return await tx.wait();
  }
}
```

## Resources

### Example Contract
- **Address**: 0xfCb4Ce5953dE22cbF04d015df88a3a9895E86bEB
- **Explorer**: [View Contract](https://explorer-testnet.circlelayer.com/address/0xfCb4Ce5953dE22cbF04d015df88a3a9895E86bEB?tab=contract)
- **ABI**: [Contract ABI](https://explorer-testnet.circlelayer.com/address/0xfCb4Ce5953dE22cbF04d015df88a3a9895E86bEB?tab=contract_abi)

### Additional Guides
- [Web3 Integration Guide](/development/web3-integration)
- [Contract Deployment](/development/deploying-contracts)
- [Network Setup](/getting-started/connect-testnet)