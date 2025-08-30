---
sidebar_position: 2
---

# Interacting with Contracts

## Overview

Learn how to interact with smart contracts on Core Layer.

## Methods of Interaction

### 1. Web3 Libraries
```javascript
// Using ethers.js
const contract = new ethers.Contract(address, abi, signer);
const result = await contract.someFunction();
```
```
```
```

### 2. Command Line
```
```
```
```bash
# Using Core Layer CLI
core-layer contract call <address> <function> [args]
```
```
```
```

### 3. Web Interface
- Core Layer Explorer
- Custom DApp interfaces
- Wallet integrations

## Common Interactions

### Reading Data
```
```
```
```javascript
// Get contract state
const value = await contract.getValue();
const owner = await contract.owner();
```
```
```
```

### Writing Data
```
```
```
```javascript
// Send transaction
const tx = await contract.setValue(42);
await tx.wait();
```
```
```
```

### Events
```
```
```
```javascript
// Listen to events
contract.on("ValueChanged", (newValue, oldValue) => {
    console.log(`Value changed from ${oldValue} to ${newValue}`);
});
```
```
```
```

## Best Practices

### 1. Error Handling
- Check transaction status
- Handle revert cases
- Implement retry logic
- Monitor gas usage

### 2. Security
- Verify contract addresses
- Check function permissions
- Validate input data
- Use secure connections

### 3. Performance
- Batch transactions
- Optimize gas usage
- Cache contract instances
- Use appropriate providers
```