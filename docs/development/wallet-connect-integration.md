---
id: wallet-connect-integration
title: WalletConnect Integration
sidebar_label: WalletConnect
sidebar_position: 11
description: Guide to integrating WalletConnect protocol with CLayer blockchain for mobile wallet connections.
---

# WalletConnect Integration

## Overview

Wallet connect enable App wallet connect to DApp via QRCode or Deeplink.

When using this protocol the most critical modification in the Wallet and DApp is supporting CLayer Blockchain networks.

## Implementation Examples

### Wallet App Implementation

For wallet applications, you need to add CLayer blockchain network support. Reference implementation:

https://github.com/HuobiGroup/walletconnect-test-wallet/commit/787c481032a9c8e4dec324f0a7529fc2775220b8

### DApp Implementation

For decentralized applications, you need to include CLayer network configuration. Reference implementation:

https://github.com/HuobiGroup/walletconnect-example-dapp/commit/b427419bfb893c060b7693d2e56e6d3f703d2984

## Network Configuration

When implementing WalletConnect for CLayer, ensure your application includes the correct network parameters:

### Testnet Configuration
```javascript
{
  chainId: 28525,
  name: 'CLayer Blockchain Testnet',
  currency: 'CLAYER',
  explorerUrl: 'https://explorer-testnet.clayer.io',
  rpcUrl: 'https://testnet-rpc.clayer.io'
}
```

### Integration Steps

1. **Add Network Support**: Include CLayer network configuration in your wallet or DApp
2. **Update Chain Registry**: Register the CLayer blockchain in your application's supported networks
3. **Test Connection**: Verify QR code and deep link functionality works with CLayer
4. **Handle Transactions**: Ensure transaction signing and broadcasting works correctly

## Resources

- [WalletConnect Documentation](https://docs.walletconnect.com/)
- [CLayer Network Details](/getting-started/connect-testnet)
- [MetaMask Integration Guide](/getting-started/set-up-wallet) 