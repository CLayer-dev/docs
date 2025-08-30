---
id: connect-testnet
title: Connect to Testnet
sidebar_label: Connect to Testnet
---

# Connect to Testnet

Step-by-step guide to configure your development environment for Core Layer testnet.

## Network Configuration

### Required Network Details
Use these settings to connect to Core Layer testnet:

- **Network Name**: Core Layer Testnet
- **RPC URL**: https://testnet-rpc.clayer.io
- **WebSocket Endpoint**: wss://testnet-rpc.clayer.io
- **Chain ID**: 28525
- **Currency Symbol**: CLAYER
- **Currency Decimals**: 18
- **Block Explorer**: https://explorer-testnet.clayer.io

## Connection Methods

### Method 1: MetaMask (Recommended)
1. **Open MetaMask** and click on the network dropdown
2. **Select "Add Network"** or "Custom RPC"
3. **Enter Network Details**:
   ```
   Network Name: Core Layer Testnet
   RPC URL: https://testnet-rpc.clayer.io
   Chain ID: 28525
   Currency Symbol: CLAYER
   Block Explorer: https://explorer-testnet.clayer.io
   ```
4. **Save and Switch** to the new network

### Method 2: Programmatic Setup
Add Core Layer testnet programmatically to MetaMask:

```javascript
async function addCircleLayerNetwork() {
  try {
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
    console.log('Core Layer testnet added successfully');
  } catch (error) {
    console.error('Error adding network:', error);
  }
}
```

### Method 3: Development Environment
Configure your development tools for Core Layer:

**Hardhat Configuration:**
```javascript
// hardhat.config.js
module.exports = {
  networks: {
    circleLayerTestnet: {
      url: "https://testnet-rpc.clayer.io",
      chainId: 28525,
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};
```

**Truffle Configuration:**
```javascript
// truffle-config.js
module.exports = {
  networks: {
    circleLayerTestnet: {
      provider: () => new HDWalletProvider(mnemonic, "https://testnet-rpc.clayer.io"),
      network_id: 28525,
      gas: 8000000,
      gasPrice: 21000000000 // 0.000021 CLAYER
    }
  }
};
```

## Verification Steps

### 1. Test Connection
Verify your connection is working:

```javascript
// Using Web3.js
const Web3 = require('web3');
const web3 = new Web3('https://testnet-rpc.clayer.io');

async function testConnection() {
  try {
    const blockNumber = await web3.eth.getBlockNumber();
    console.log('Latest block:', blockNumber);
    console.log('✅ Connection successful');
  } catch (error) {
    console.error('❌ Connection failed:', error);
  }
}
```

### 2. Check Network Status
Monitor network performance:
- **Block Time**: ~3 seconds
- **Transaction Finality**: 1-3 seconds  
- **Network Uptime**: 99.95% target

### 3. Get Test Tokens
Visit the [Core Layer Faucet](https://faucet.clayer.io):
- **Daily Limit**: 1 CLAYER per address
- **Purpose**: Testing and development only
- **Alternative**: Faucet API at https://faucet-api.clayer.io

## Troubleshooting

### Common Connection Issues

**RPC Endpoint Not Responding:**
- Verify URL: `https://testnet-rpc.clayer.io`
- Check network connectivity
- Try switching networks and back

**Chain ID Mismatch:**
- Ensure Chain ID is set to `28525`
- Clear browser cache if needed
- Verify MetaMask network configuration

**Gas Price Issues:**
- Minimum gas price: 0.000021 CLAYER
- Use gas estimation for dynamic pricing
- Check account CLAYER balance

### WebSocket Connection
For real-time data, use WebSocket endpoint:

```javascript
const WebSocket = require('ws');
const ws = new WebSocket('wss://testnet-rpc.clayer.io');

ws.on('open', function open() {
  console.log('WebSocket connected');
  
  // Subscribe to new blocks
  ws.send(JSON.stringify({
    id: 1,
    method: 'eth_subscribe',
    params: ['newHeads']
  }));
});

ws.on('message', function incoming(data) {
  const response = JSON.parse(data);
  console.log('New block:', response);
});
```

## Next Steps

After successful connection:

1. **[Set Up Wallet](./set-up-wallet)** - Configure your wallet for development
2. **[Use Faucet](./use-faucet)** - Get test tokens for development
3. **[Deploy Contracts](../development/writing-smart-contracts)** - Start building on Core Layer
4. **[Explore APIs](../apis-sdks/)** - Learn about available endpoints

## Network Monitoring

### Real-time Status
- **Block Explorer**: https://explorer-testnet.clayer.io
- **RPC Health**: Test with `eth_blockNumber` call
- **WebSocket Status**: Monitor connection stability

### Performance Expectations
- **Block Interval**: Consistent 3-second timing
- **Transaction Processing**: 1-3 second finality
- **Gas Efficiency**: Predictable CLAYER-based pricing
- **Uptime**: 99.95% availability target