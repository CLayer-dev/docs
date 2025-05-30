---
sidebar_position: 2
---

# Web3 Libraries

## Overview

Circle Layer supports various Web3 libraries for interacting with the network:

## Supported Libraries

### 1. ethers.js
```javascript
import { ethers } from 'ethers';

const provider = new ethers.providers.JsonRpcProvider('https://rpc.circlelayer.com');
const wallet = new ethers.Wallet(privateKey, provider);
```

### 2. web3.js
```javascript
import Web3 from 'web3';

const web3 = new Web3('https://rpc.circlelayer.com');
const account = web3.eth.accounts.privateKeyToAccount(privateKey);
```

### 3. Web3.py
```python
from web3 import Web3

w3 = Web3(Web3.HTTPProvider('https://rpc.circlelayer.com'))
account = w3.eth.account.from_key(private_key)
```

## Features

### Common Functionality
- Account management
- Transaction signing
- Contract interaction
- Event listening

### Circle Layer Specific
- Staking operations
- Validator management
- Network statistics
- Custom RPC methods

## Best Practices

1. Use environment variables for private keys
2. Implement proper error handling
3. Use appropriate gas estimation
4. Monitor transaction status

## Examples

### Deploy Contract
```javascript
const contract = new ethers.ContractFactory(abi, bytecode, wallet);
const deployed = await contract.deploy();
await deployed.deployed();
```

### Interact with Contract
```javascript
const contract = new ethers.Contract(address, abi, wallet);
const result = await contract.someFunction();
```

### Listen to Events
```javascript
contract.on('SomeEvent', (arg1, arg2) => {
  console.log(arg1, arg2);
});
``` 