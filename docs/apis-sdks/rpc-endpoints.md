---
sidebar_position: 1
---

# RPC Endpoints

## Overview

Circle Layer provides multiple RPC endpoints for interacting with the network:

## Public Endpoints

### Testnet
```bash
# HTTP RPC
https://rpc-testnet.circlelayer.com

# WebSocket
wss://138.197.184.207:8545

# Block Explorer
https://explorer-testnet.circlelayer.com/

# API Documentation
https://testnet.circlelayer.com/api-docs

# GraphQL Endpoint  
https://testnet.circlelayer.com/graphiql
```

## Network Configuration

- **Chain ID**: 28525
- **Network Name**: Circle Layer Testnet
- **Currency Symbol**: CLAYER
- **Currency Decimals**: 18
- **Block Time**: 3 seconds
- **Transaction Finality**: 1-3 seconds

## Authentication

API endpoints use GET method authentication. For detailed authentication methods, refer to the [API documentation](https://testnet.circlelayer.com/api-docs).

## Rate Limits

Rate limiting information is not currently specified. Please check the [API documentation](https://testnet.circlelayer.com/api-docs) for current limits.

## Smart Contract Examples

### Deployed Example Contract
- **Contract Address**: 0xfCb4Ce5953dE22cbF04d015df88a3a9895E86bEB
- **Source Code**: [View on Explorer](https://testnet.circlelayer.com/address/0xfCb4Ce5953dE22cbF04d015df88a3a9895E86bEB?tab=contract)
- **ABI**: [Contract ABI](https://testnet.circlelayer.com/address/0xfCb4Ce5953dE22cbF04d015df88a3a9895E86bEB?tab=contract_abi)
- **Deployment**: Manual Deploy

## Methods

### Standard Ethereum Methods
- eth_getBalance
- eth_sendTransaction
- eth_getTransactionReceipt
- eth_blockNumber

### Circle Layer Specific Methods
- clayer_getValidatorInfo
- clayer_getStakingRewards
- clayer_getNetworkStats

## Examples

### Get Balance
```javascript
const response = await fetch('https://rpc-testnet.circlelayer.com', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    jsonrpc: '2.0',
    method: 'eth_getBalance',
    params: ['0x...', 'latest'],
    id: 1,
  }),
});
```

### Subscribe to Events
```javascript
const ws = new WebSocket('wss://138.197.184.207:8545');
ws.send(JSON.stringify({
  jsonrpc: '2.0',
  method: 'eth_subscribe',
  params: ['newHeads'],
  id: 1,
}));
```

### Interact with Example Contract
```javascript
// Using the deployed example contract
const contractAddress = '0xfCb4Ce5953dE22cbF04d015df88a3a9895E86bEB';

// Get contract interaction examples
const response = await fetch('https://rpc-testnet.circlelayer.com', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    jsonrpc: '2.0',
    method: 'eth_call',
    params: [{
      to: contractAddress,
      data: '0x...' // Method call data
    }, 'latest'],
    id: 1,
  }),
});
```

// ... existing code ...
```