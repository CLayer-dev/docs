---
sidebar_position: 4
---

# Web3 Integration

## Overview

Learn how to integrate Web3 libraries with Core Layer testnet. Core Layer follows standard EVM blockchain integration patterns, making it compatible with existing Ethereum development tools.

## Network Configuration

### Core Layer Testnet
*Configuration for testnet deployment:*

- **RPC URL**: https://testnet-rpc.clayer.io
- **WebSocket**: wss://testnet-rpc.clayer.io
- **Chain ID**: 28525
- **Currency Symbol**: CLAYER

- **Block Explorer**: https://explorer-testnet.clayer.io

## Web3.js Integration

### Installation
```bash
npm install web3
```

### Basic Setup
```javascript
const Web3 = require('web3');

// HTTP Provider
const web3 = new Web3('https://testnet-rpc.clayer.io');

// WebSocket Provider
const web3WS = new Web3('wss://testnet-rpc.clayer.io');

// Network Configuration
const networkConfig = {
  chainId: 28525,
  name: 'Core Layer Testnet',
  currency: 'CLAYER'
};
```

### CLAYER Transactions
```javascript
// Send CLAYER transaction
async function sendCLAYER() {
  const account = web3.eth.accounts.privateKeyToAccount(privateKey);
  
  const tx = {
    from: account.address,
    to: '0x...', // recipient address
    value: web3.utils.toWei('1', 'ether'), // 1 CLAYER
    gas: 21000,
    gasPrice: web3.utils.toWei('21', 'gwei'), // 0.000021 CLAYER
    chainId: 28525
  };
  
  const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
  const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  
  console.log('Transaction hash:', receipt.transactionHash);
  return receipt;
}
```

### Contract Interaction
```javascript
// Interact with deployed example contract
const contractAddress = '0xfCb4Ce5953dE22cbF04d015df88a3a9895E86bEB'; // https://explorer-testnet.clayer.io/address/0xfCb4Ce5953dE22cbF04d015df88a3a9895E86bEB
const contractABI = []; // ABI from explorer

const contract = new web3.eth.Contract(contractABI, contractAddress);

// Call contract method
async function callContract() {
  const result = await contract.methods.someMethod().call();
  return result;
}

// Send transaction to contract
async function sendToContract() {
  const account = web3.eth.accounts.privateKeyToAccount(privateKey);
  
  const tx = contract.methods.someMethod(params);
  const gas = await tx.estimateGas({ from: account.address });
  
  const signedTx = await account.signTransaction({
    to: contractAddress,
    data: tx.encodeABI(),
    gas: gas,
    gasPrice: web3.utils.toWei('21', 'gwei'), // Use CLAYER for gas
    chainId: 28525
  });
  
  const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  return receipt;
}
```

## Ethers.js Integration

### Installation
```bash
npm install ethers
```

### Basic Setup
```javascript
const { ethers } = require('ethers');

// Provider setup
const provider = new ethers.providers.JsonRpcProvider('https://testnet-rpc.clayer.io');

// WebSocket Provider
const wsProvider = new ethers.providers.WebSocketProvider('wss://testnet-rpc.clayer.io');

// Network configuration
const network = {
  name: 'Core Layer Testnet',
  chainId: 28525,
  ensAddress: null
};
```

### Wallet Integration
```javascript
// Create wallet
const wallet = new ethers.Wallet(privateKey, provider);

// Get balance in CLAYER
async function getBalance() {
  const balance = await wallet.getBalance();
  console.log('Balance:', ethers.utils.formatEther(balance), 'CLAYER');
  return balance;
}

// Send CLAYER
async function sendCLAYER(toAddress, amount) {
  const tx = {
    to: toAddress,
    value: ethers.utils.parseEther(amount), // Amount in CLAYER
    gasPrice: ethers.utils.parseUnits('21', 'gwei'), // 0.000021 CLAYER
    gasLimit: 21000
  };
  
  const transaction = await wallet.sendTransaction(tx);
  const receipt = await transaction.wait();
  
  console.log('Transaction confirmed:', receipt.transactionHash);
  return receipt;
}
```

### Contract Interaction
```javascript
// Contract setup
const contractAddress = '0xfCb4Ce5953dE22cbF04d015df88a3a9895E86bEB';
const contractABI = []; // ABI from explorer

const contract = new ethers.Contract(contractAddress, contractABI, wallet);

// Read contract data
async function readContract() {
  const result = await contract.someReadMethod();
  return result;
}

// Write to contract
async function writeContract() {
  const tx = await contract.someWriteMethod(params, {
    gasPrice: ethers.utils.parseUnits('21', 'gwei'), // CLAYER gas price
    gasLimit: 100000
  });
  
  const receipt = await tx.wait();
  console.log('Contract interaction confirmed:', receipt.transactionHash);
  return receipt;
}
```

## React Integration

### React Hook Example
```jsx
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const useCircleLayer = () => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [account, setAccount] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        // Request account access
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        
        // Add Core Layer network
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: '0x6F75', // 28525 in hex
            chainName: 'Core Layer Testnet',
            nativeCurrency: {
              name: 'CLAYER',
              symbol: 'CLAYER',
              decimals: 18
            },
            rpcUrls: ['https://testnet-rpc.clayer.io'],
            blockExplorerUrls: ['https://explorer-testnet.clayer.io/']
          }]
        });
        
        const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = web3Provider.getSigner();
        const address = await signer.getAddress();
        
        setProvider(web3Provider);
        setSigner(signer);
        setAccount(address);
        
      } catch (error) {
        console.error('Error connecting wallet:', error);
      }
    }
  };

  return { provider, signer, account, connectWallet };
};

export default useCircleLayer;
```

## Vue.js Integration

### Vue Component Example
```vue
<template>
  <div>
    <button @click="connectWallet" v-if="!account">Connect Wallet</button>
    <div v-if="account">
      <p>Connected: {{ account }}</p>
      <p>Balance: {{ balance }} CLAYER</p>
      <button @click="sendTransaction">Send CLAYER</button>
    </div>
  </div>
</template>

<script>
import { ethers } from 'ethers';

export default {
  data() {
    return {
      provider: null,
      signer: null,
      account: null,
      balance: '0'
    };
  },
  methods: {
    async connectWallet() {
      if (window.ethereum) {
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          
          this.provider = new ethers.providers.Web3Provider(window.ethereum);
          this.signer = this.provider.getSigner();
          this.account = await this.signer.getAddress();
          
          await this.getBalance();
        } catch (error) {
          console.error('Error connecting wallet:', error);
        }
      }
    },
    
    async getBalance() {
      if (this.signer) {
        const balance = await this.signer.getBalance();
        this.balance = ethers.utils.formatEther(balance);
      }
    }
  }
};
</script>
```

## Mobile Integration

Core Layer testnet can be integrated into mobile applications using the same EVM integration patterns:

### React Native Example
```javascript
import { ethers } from 'ethers';

// Provider setup for mobile
const provider = new ethers.providers.JsonRpcProvider('https://testnet-rpc.clayer.io');

// Mobile wallet integration follows standard EVM patterns
const connectMobileWallet = async () => {
  // Use WalletConnect or similar for mobile wallet integration
  // Follow EVM blockchain integration standards
};
```

## Best Practices

### 1. Gas Management
- Always use minimum gas price: 0.000021 CLAYER
- Monitor network conditions for optimal gas pricing
- Use gas estimation for contract interactions

### 2. Error Handling
```javascript
try {
  const tx = await wallet.sendTransaction(transaction);
  const receipt = await tx.wait();
} catch (error) {
  if (error.code === 'INSUFFICIENT_FUNDS') {
    console.error('Insufficient CLAYER balance');
  } else if (error.code === 'NETWORK_ERROR') {
    console.error('Network connection issue');
  }
}
```

### 3. Network Verification
```javascript
// Verify connected to correct network
const network = await provider.getNetwork();
if (network.chainId !== 28525) {
  throw new Error('Please connect to Core Layer Testnet');
}
```

### 4. Performance Optimization
- Use WebSocket for real-time updates
- Implement proper connection pooling
- Cache frequently accessed data
- Monitor block confirmations (3-second block time)

## Resources

- **API Documentation**: https://explorer-testnet.clayer.io/api-docs
- **GraphQL Endpoint**: https://explorer-testnet.clayer.io/graphiql
- **Block Explorer**: https://explorer-testnet.clayer.io/
- **Example Contract**: 0xfCb4Ce5953dE22cbF04d015df88a3a9895E86bEB 