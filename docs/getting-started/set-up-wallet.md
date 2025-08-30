---
id: set-up-wallet
title: Set Up a Wallet
sidebar_label: Set Up a Wallet
---

# Set Up a Wallet

Learn how to set up your wallet for CLayer testnet access.

## Supported Wallets

- **MetaMask** (Recommended - Desktop and Mobile)
- **WalletConnect** (Register on WalletConnect and follow their guidelines)
- **Custom Wallets** (EVM-compatible software wallets)
- **Mobile Wallets** (Trust Wallet, Rainbow, Coinbase Wallet, etc.)

:::warning Hardware Wallet Limitation
**Ledger hardware wallets are NOT supported** on CLayer at this time. Please use software wallets like MetaMask for CLayer testnet access.
:::

### Wallet Compatibility Details

#### ✅ Fully Supported
- **MetaMask**: Browser extension and mobile app
- **Trust Wallet**: Mobile and desktop versions  
- **Rainbow Wallet**: Mobile and browser support
- **Coinbase Wallet**: Full EVM compatibility
- **WalletConnect**: All WalletConnect-compatible wallets
- **Brave Wallet**: Built-in Ethereum wallet
- **Frame**: Desktop wallet with hardware isolation

#### ❌ Not Supported
- **Ledger Hardware Wallets**: Due to technical limitations
- **Trezor Hardware Wallets**: Due to technical limitations
- **Other Hardware Wallets**: Currently not compatible

## Preparation Steps

1. Choose your preferred wallet
2. Install the wallet extension or application
3. Create a new wallet or import existing
4. Configure network settings
5. Add CLayer testnet

## MetaMask Configuration

### Testnet Network Settings
```json
{
  "networkName": "CLayer Testnet",
  "rpcUrl": "https://testnet-rpc.clayer.io",
  "chainId": 28525,
  "currencySymbol": "CLAYER",
  "currencyDecimals": 18,
  "blockExplorerUrl": "https://explorer-testnet.clayer.io"
}
```

### Manual Network Addition

#### Method 1: Manual Configuration
1. **Open MetaMask** and click the network dropdown
2. **Select "Add Network"** → "Add a network manually"
3. **Fill in the network details**:
   - Network Name: `CLayer Testnet`
   - New RPC URL: `https://testnet-rpc.clayer.io`
   - Chain ID: `28525`
   - Currency Symbol: `CLAYER`
   - Block Explorer URL: `https://explorer-testnet.clayer.io`
4. **Click "Save"** to add the network
5. **Switch to CLayer** from the network dropdown

#### Method 2: Programmatic Addition
```javascript
// Add CLayer Testnet programmatically
async function addCircleLayerNetwork() {
  try {
    await window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [{
        chainId: '0x6F75', // 28525 in hexadecimal
        chainName: 'CLayer Testnet',
        nativeCurrency: {
          name: 'CLAYER',
          symbol: 'CLAYER',
          decimals: 18
        },
        rpcUrls: ['https://testnet-rpc.clayer.io'],
        blockExplorerUrls: ['https://explorer-testnet.clayer.io']
      }]
    });
    console.log('CLayer Testnet added successfully');
  } catch (error) {
    console.error('Error adding network:', error);
  }
}
```

### Network Verification
After adding the network, verify the configuration:

1. **Check Network Display**: Should show "CLayer Testnet"
2. **Verify Chain ID**: Should display 28525
3. **Currency Symbol**: Should show CLAYER
4. **Test Connection**: Try viewing account balance

### Advanced MetaMask Settings

#### Gas Configuration
```javascript
// Recommended gas settings for CLayer
const gasSettings = {
  gasPrice: '21000000000', // 0.000021 CLAYER in wei
  gasLimit: '21000', // Standard transfer
  maxFeePerGas: '25000000000', // 0.000025 CLAYER
  maxPriorityFeePerGas: '2000000000' // 0.000002 CLAYER
};
```

#### Custom RPC Configuration
- **Primary RPC**: `https://testnet-rpc.clayer.io`
- **WebSocket**: `wss://testnet-rpc.clayer.io`
- **Backup RPC**: Contact support for additional endpoints
- **Connection Timeout**: 30 seconds (default)

## WalletConnect Setup
For WalletConnect integration, you need to register on WalletConnect and follow their guidelines for EVM-compatible chains.

### WalletConnect Configuration
```javascript
// WalletConnect v2 setup for CLayer
import { Web3Modal } from '@web3modal/wagmi/react';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';

const circleLayerTestnet = {
  id: 28525,
  name: 'CLayer Testnet',
  network: 'clayer-testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'CLAYER',
    symbol: 'CLAYER',
  },
  rpcUrls: {
    default: { http: ['https://testnet-rpc.clayer.io'] },
    public: { http: ['https://testnet-rpc.clayer.io'] },
  },
  blockExplorers: {
    default: { 
      name: 'CLayer Explorer', 
      url: 'https://explorer-testnet.clayer.io' 
    },
  },
};

const { chains, publicClient } = configureChains(
  [circleLayerTestnet],
  [
    jsonRpcProvider({
      rpc: (chain) => ({
        http: 'https://testnet-rpc.clayer.io',
      }),
    }),
  ]
);
```

## Mobile Wallet Configuration

### Trust Wallet Setup
1. **Open Trust Wallet** → Settings → Wallets
2. **Add Network** → Select "Custom"
3. **Enter Network Details**:
   - Network Name: `CLayer Testnet`
   - RPC URL: `https://testnet-rpc.clayer.io`
   - Chain ID: `28525`
   - Symbol: `CLAYER`
   - Explorer: `https://explorer-testnet.clayer.io`

### Rainbow Wallet Setup
1. **Open Rainbow Wallet** → Settings → Networks
2. **Add Network** → Custom Network
3. **Configure CLayer**:
   - Name: `CLayer Testnet`
   - RPC: `https://testnet-rpc.clayer.io`
   - Chain ID: `28525`
   - Currency: `CLAYER`

### Coinbase Wallet Setup
1. **Open Coinbase Wallet** → Settings → Active Networks
2. **Add Network** → Custom RPC
3. **Fill Network Information**:
   - Network Name: `CLayer Testnet`
   - RPC URL: `https://testnet-rpc.clayer.io`
   - Chain ID: `28525`
   - Currency Symbol: `CLAYER`

## Troubleshooting

### Common Issues

#### Connection Problems
- **Verify RPC URL**: Ensure `https://testnet-rpc.clayer.io` is correct
- **Check Chain ID**: Must be exactly `28525`
- **Network Status**: Check CLayer testnet status
- **Clear Cache**: Clear wallet cache and retry

#### Transaction Issues
- **Insufficient Gas**: Ensure you have CLAYER for gas fees
- **Gas Price**: Use minimum 0.000021 CLAYER gas price
- **Network Congestion**: Wait for network to clear
- **Wallet Update**: Ensure wallet is updated to latest version

#### Balance Display
- **Token Not Visible**: May need to manually add CLAYER token
- **Incorrect Network**: Ensure you're on CLayer Testnet
- **Sync Issues**: Try refreshing wallet or switching networks

### Support Contacts
- **Technical Support**: support@clayer.io
- **Wallet Issues**: support@clayer.io
- **Documentation**: support@clayer.io

## Development Integration
CLayer follows standard EVM integration patterns, making it compatible with existing Ethereum development tools and wallets.