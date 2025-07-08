---
id: wallet-connect-integration
title: WalletConnect Integration
sidebar_label: WalletConnect
sidebar_position: 11
description: Guide to integrating WalletConnect protocol with Circle Layer blockchain for mobile wallet connections.
---

# WalletConnect Integration

## Overview

Wallet connect enable App wallet connect to DApp via QRCode or Deeplink.

When using this protocol the most critical modification in the Wallet and DApp is supporting Circle Layer Blockchain networks.

## Implementation Examples

### Wallet App Implementation

For wallet applications, you need to add Circle Layer blockchain network support. Reference implementation:

https://github.com/HuobiGroup/walletconnect-test-wallet/commit/787c481032a9c8e4dec324f0a7529fc2775220b8

### DApp Implementation

For decentralized applications, you need to include Circle Layer network configuration. Reference implementation:

https://github.com/HuobiGroup/walletconnect-example-dapp/commit/b427419bfb893c060b7693d2e56e6d3f703d2984

## Network Configuration

When implementing WalletConnect for Circle Layer, ensure your application includes the correct network parameters:

### Testnet Configuration
```javascript
{
  chainId: 28525,
  name: 'Circle Layer Blockchain Testnet',
  currency: 'CLAYER',
  explorerUrl: 'https://explorer-testnet.circlelayer.com',
  rpcUrl: 'https://testnet-rpc.circlelayer.com'
}
```

### Integration Steps

1. **Add Network Support**: Include Circle Layer network configuration in your wallet or DApp
2. **Update Chain Registry**: Register the Circle Layer blockchain in your application's supported networks
3. **Test Connection**: Verify QR code and deep link functionality works with Circle Layer
4. **Handle Transactions**: Ensure transaction signing and broadcasting works correctly

## Resources

- [WalletConnect Documentation](https://docs.walletconnect.com/)
- [Circle Layer Network Details](/getting-started/connect-testnet)
- [MetaMask Integration Guide](/getting-started/set-up-wallet) 