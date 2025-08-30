---
id: transaction-troubleshooting
title: Transaction Troubleshooting
sidebar_label: Transaction Troubleshooting
sidebar_position: 8
description: Complete guide to troubleshooting pending transactions, gas issues, and meta transaction problems on CLayer.
---

# Transaction Troubleshooting

This guide helps developers and users resolve common transaction issues on CLayer blockchain, including pending transactions, gas problems, and meta transaction errors.

## Common Transaction Issues

### 1. Inappropriate Nonce

**Problem**: Transaction fails due to incorrect nonce value.

**Symptoms**:
- "Nonce too low" error
- "Nonce too high" error  
- Transactions stuck in pending state

**Solutions**:

#### Reset Account Nonce
```bash
# MetaMask Solution
1. MetaMask → Settings → Advanced → Reset Account
2. This clears pending transaction history and resets nonce
```

#### Customize Transaction Nonce
```bash
# MetaMask Advanced Settings
1. MetaMask → Settings → Advanced → Customize transaction nonce
2. Enable this setting
3. Manually set appropriate nonce when sending transactions
```

#### Check Current Nonce
```javascript
// Web3.js
const nonce = await web3.eth.getTransactionCount(address, 'pending');

// Ethers.js  
const nonce = await provider.getTransactionCount(address, 'pending');
```

#### Handle Multiple Pending Transactions
- **Wait for earlier transactions** to confirm before sending new ones
- **Cancel pending transactions** by sending 0 ETH to yourself with higher gas price
- **Use sequential nonces** when sending multiple transactions

### 2. Low Gas Price

**Problem**: Transaction remains pending due to insufficient gas price.

**Symptoms**:
- Transaction stays in mempool for extended periods
- "Gas price too low" warnings
- Transaction never gets mined

**Solutions**:

#### Increase Gas Price
```javascript
// Set higher gas price
const transaction = {
    to: recipient,
    value: amount,
    gasLimit: 21000,
    gasPrice: ethers.utils.parseUnits('20', 'gwei') // Increase from default
};
```

#### Use Dynamic Gas Pricing
```javascript
// Get current gas price recommendations
async function getOptimalGasPrice() {
    const gasPrice = await provider.getGasPrice();
    // Add 20% buffer
    return gasPrice.mul(120).div(100);
}
```

#### Speed Up Transactions
```bash
# MetaMask Speed Up
1. Go to Activity tab
2. Click on pending transaction
3. Click "Speed Up"
4. Confirm with higher gas price
```

### 3. Meta Transaction Issues

Meta transactions have specific error patterns and solutions:

#### Invalid Fee Percentage

**Error**:
```
invalid meta transaction FeePercent need 0-10000. Found:100001
```

**Cause**: Fee percentage exceeds valid range (0-100%).

**Solution**:
```javascript
// Ensure fee percentage is within valid range
const feePercent = 2500; // 25% (valid range: 0-10000)

if (feePercent < 0 || feePercent > 10000) {
    throw new Error('Fee percentage must be between 0-10000');
}
```

#### Expired Meta Transaction

**Error**:
```
err: expired meta transaction. current:2083222, need execute before 2075609
```

**Cause**: Meta transaction expired (valid for 28,800 blocks ≈ 1 day).

**Solutions**:

1. **Create New Meta Transaction**:
```javascript
// Check if meta transaction is still valid
function isMetaTransactionValid(expiryBlock, currentBlock) {
    return currentBlock < expiryBlock;
}

// Create new meta transaction if expired
if (!isMetaTransactionValid(expiryBlock, currentBlock)) {
    const newMetaTx = await createMetaTransaction(txParams);
}
```

2. **Resend with Regular Transaction**:
```bash
# MetaMask - Send regular transaction instead
1. MetaMask → Settings → Advanced → Customize transaction nonce
2. Send transaction with same nonce but higher gas price
3. This replaces the expired meta transaction
```

## Advanced Troubleshooting

### Gas Estimation Failures

**Problem**: "Gas estimation failed" error when sending transactions.

**Debugging Steps**:

1. **Check Contract State**:
```javascript
// Verify contract exists and function is callable
const code = await provider.getCode(contractAddress);
if (code === '0x') {
    console.error('Contract not found at address');
}
```

2. **Simulate Transaction**:
```javascript
// Use callStatic to simulate without sending
try {
    const result = await contract.callStatic.functionName(params);
    console.log('Simulation successful:', result);
} catch (error) {
    console.error('Simulation failed:', error.message);
}
```

3. **Manual Gas Limit**:
```javascript
// Set manual gas limit if estimation fails
const transaction = await contract.functionName(params, {
    gasLimit: 200000 // Set manually
});
```

### Network Congestion Issues

**Symptoms**:
- High gas prices required
- Long confirmation times
- Frequent timeout errors

**Solutions**:

1. **Monitor Network Status**:
```javascript
// Check current network conditions
async function getNetworkStatus() {
    const block = await provider.getBlock('latest');
    const gasPrice = await provider.getGasPrice();
    
    return {
        blockNumber: block.number,
        gasUsed: block.gasUsed,
        gasLimit: block.gasLimit,
        utilization: (block.gasUsed / block.gasLimit) * 100,
        gasPrice: ethers.utils.formatUnits(gasPrice, 'gwei')
    };
}
```

2. **Implement Retry Logic**:
```javascript
async function sendTransactionWithRetry(txParams, maxRetries = 3) {
    for (let i = 0; i < maxRetries; i++) {
        try {
            const tx = await signer.sendTransaction(txParams);
            return await tx.wait();
        } catch (error) {
            if (i === maxRetries - 1) throw error;
            
            // Increase gas price for retry
            txParams.gasPrice = txParams.gasPrice.mul(110).div(100);
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
    }
}
```

### RPC Connection Issues

**Common Problems**:
- Connection timeouts
- Rate limiting
- Provider errors

**Solutions**:

1. **Use Multiple RPC Endpoints**:
```javascript
const providers = [
    'https://testnet-rpc.clayer.io'
];

class FallbackProvider {
    constructor(urls) {
        this.providers = urls.map(url => new ethers.providers.JsonRpcProvider(url));
        this.currentIndex = 0;
    }
    
    async sendRequest(method, params) {
        for (let i = 0; i < this.providers.length; i++) {
            try {
                return await this.providers[this.currentIndex].send(method, params);
            } catch (error) {
                this.currentIndex = (this.currentIndex + 1) % this.providers.length;
                if (i === this.providers.length - 1) throw error;
            }
        }
    }
}
```

2. **Implement Request Batching**:
```javascript
// Batch multiple requests to reduce RPC calls
async function batchRequests(requests) {
    const batch = requests.map((req, index) => ({
        jsonrpc: '2.0',
        id: index,
        method: req.method,
        params: req.params
    }));
    
    const response = await fetch(rpcUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(batch)
    });
    
    return response.json();
}
```

## MetaMask-Specific Issues

### Reset Account
When experiencing persistent nonce issues:
```bash
1. MetaMask → Settings → Advanced → Reset Account
2. This clears transaction history and resets nonce counter
3. Does NOT affect your funds or private keys
```

### Custom RPC Configuration
```javascript
// MetaMask Custom Network Settings
Network Name: CLayer Testnet
RPC URL: https://testnet-rpc.clayer.io
Chain ID: 28525
Currency Symbol: CLAYER
Block Explorer: https://explorer-testnet.clayer.io
```

### Enable Advanced Features
```bash
# Enable advanced MetaMask features
1. Settings → Advanced → Show hex data (ON)
2. Settings → Advanced → Customize transaction nonce (ON)  
3. Settings → Advanced → Advanced gas controls (ON)
```

## Monitoring Tools

### Transaction Status Checking
```javascript
// Monitor transaction status
async function monitorTransaction(txHash) {
    console.log('Monitoring transaction:', txHash);
    
    const checkStatus = async () => {
        const tx = await provider.getTransaction(txHash);
        if (!tx) {
            console.log('Transaction not found in mempool');
            return;
        }
        
        const receipt = await provider.getTransactionReceipt(txHash);
        if (receipt) {
            console.log('Transaction confirmed in block:', receipt.blockNumber);
            console.log('Gas used:', receipt.gasUsed.toString());
            console.log('Status:', receipt.status === 1 ? 'Success' : 'Failed');
        } else {
            console.log('Transaction pending...');
            setTimeout(checkStatus, 10000); // Check again in 10 seconds
        }
    };
    
    checkStatus();
}
```

### Gas Price Monitoring
```javascript
// Track gas price trends
async function monitorGasPrices() {
    const history = [];
    
    setInterval(async () => {
        const gasPrice = await provider.getGasPrice();
        const gwei = ethers.utils.formatUnits(gasPrice, 'gwei');
        
        history.push({
            timestamp: Date.now(),
            gasPrice: parseFloat(gwei)
        });
        
        // Keep last 24 hours of data
        const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
        history.splice(0, history.findIndex(h => h.timestamp > oneDayAgo));
        
        console.log('Current gas price:', gwei, 'gwei');
    }, 60000); // Check every minute
}
```

## Emergency Recovery

### Stuck Transaction Recovery
```javascript
// Cancel stuck transaction by replacing with higher gas
async function cancelTransaction(originalTx) {
    const cancelTx = {
        to: originalTx.from, // Send to yourself
        value: 0,
        gasPrice: originalTx.gasPrice.mul(110).div(100), // 10% higher
        gasLimit: 21000,
        nonce: originalTx.nonce // Same nonce to replace
    };
    
    return await signer.sendTransaction(cancelTx);
}
```

### Account Recovery
```javascript
// Drain account if private key compromised
async function emergencyDrain(toAddress) {
    const balance = await provider.getBalance(compromisedAddress);
    const gasPrice = await provider.getGasPrice();
    const gasLimit = 21000;
    const gasCost = gasPrice.mul(gasLimit);
    
    if (balance.gt(gasCost)) {
        const amount = balance.sub(gasCost);
        return await signer.sendTransaction({
            to: toAddress,
            value: amount,
            gasPrice,
            gasLimit
        });
    }
}
```

## Best Practices

### Prevention
1. **Always check gas prices** before sending transactions
2. **Use appropriate gas limits** for complex contracts
3. **Monitor network congestion** during high-traffic periods
4. **Keep backup RPC endpoints** configured
5. **Test on testnet first** before mainnet deployment

### Transaction Management
1. **Track nonces carefully** when sending multiple transactions
2. **Implement proper error handling** in your applications
3. **Use event monitoring** for important transactions
4. **Set reasonable timeouts** for transaction confirmation
5. **Have fallback strategies** for failed transactions

This troubleshooting guide should help resolve most common transaction issues on CLayer. For complex problems, consider reaching out to the CLayer development community or support channels. 