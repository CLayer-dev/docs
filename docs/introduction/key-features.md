---
id: key-features
title: Key Features
sidebar_label: Key Features
---

import '@site/src/css/comparison.css';

# Key Features

Core Layer offers a comprehensive suite of features designed to meet the needs of modern blockchain applications. This section details the practical implementation and current capabilities of our platform.

## Current Network Configuration

**Network Details:**
- **Chain ID**: 28525 | **Currency**: CLAYER tokens
- **RPC Endpoint**: https://testnet-rpc.clayer.io
- **WebSocket**: wss://testnet-rpc.clayer.io
- **Block Explorer**: https://explorer-testnet.clayer.io
- **Faucet**: https://faucet.clayer.io

**Performance Specifications:**
- **Block Time**: 3 seconds | **Finality**: 1-3 seconds  
- **Gas Price**: Minimum 0.000021 CLAYER | **Block Gas Limit**: 10,000,000,000,000
- **Network Uptime**: 99.95% (Last 30 days) | **Energy Efficiency**: 99.9% less than PoW

## Technical Implementation

### Security & Consensus
- **DPoS Consensus**: Delegated Proof of Stake security model with minimum 5 active validators
- **Staking Requirements**: 100,000 CLAYER minimum stake
- **Validator Network**: Maximum 21 validators supported

### Development Integration
- **EVM Compatibility**: Full compatibility with existing Ethereum tooling
- **Library Support**: Web3.js, Ethers.js, Viem integration
- **Development Tools**: Hardhat, Truffle, Remix, Foundry compatible
- **Wallet Integration**: MetaMask, WalletConnect, and custom wallet support

### Economic Features
- **Deflationary Economics**: 25% from gas fees burned (maximum 1,000,000 CLAYER) *[Mainnet only]*
- **Stake-based Rewards**: Higher stake = higher rewards proportionally
- **Developer Revenue**: Gas fee sharing with smart contract deployers

*Note: Advanced economic mechanisms apply to Core Layer mainnet. Current testnet uses simplified economics.*

## Development Status Overview

| Service | Status | Readiness |
|---------|--------|-----------|
| RPC API | 🟡 Ready for Testing | Infrastructure Complete |
| WebSocket | 🟡 Ready for Testing | Infrastructure Complete |
| Block Explorer | 🟡 Ready for Testing | Infrastructure Complete |
| GraphQL | 🔄 In Development | Coming Soon |

## Current vs Future Comparison

| Feature | Current Testnet | In Development |
|---------|-----------------|----------------|
| Block Time | 3s | Optimized |
| Finality | 1-3s | Enhanced |
| Consensus | DPoS | Advanced DPoS |
| Staking | Manual | Smart Contracts |
| Governance | Manual | On-chain |
| Bridges | N/A | Cross-chain |
| Oracles | N/A | Decentralized |

<div className="mobile-table-cards">
  <div className="section-header-card">
    <h4>Current vs Future Comparison</h4>
  </div>
  
  <div className="performance-grid">
    <div className="metric-comparison-card">
      <div className="metric-header">
        <h4 className="metric-title">Block Time</h4>
      </div>
      <div className="networks-comparison">
        <div className="network-item circle-layer">
          <div className="network-name">Current Testnet</div>
          <div className="network-value">3s</div>
        </div>
        <div className="network-item">
          <div className="network-name">In Development</div>
          <div className="network-value">Optimized</div>
        </div>
      </div>
    </div>
    
    <div className="metric-comparison-card">
      <div className="metric-header">
        <h4 className="metric-title">Finality</h4>
      </div>
      <div className="networks-comparison">
        <div className="network-item circle-layer">
          <div className="network-name">Current Testnet</div>
          <div className="network-value">1-3s</div>
        </div>
        <div className="network-item">
          <div className="network-name">In Development</div>
          <div className="network-value">Enhanced</div>
        </div>
      </div>
    </div>
    
    <div className="metric-comparison-card">
      <div className="metric-header">
        <h4 className="metric-title">Consensus</h4>
      </div>
      <div className="networks-comparison">
        <div className="network-item circle-layer">
          <div className="network-name">Current Testnet</div>
          <div className="network-value">DPoS</div>
        </div>
        <div className="network-item">
          <div className="network-name">In Development</div>
          <div className="network-value">Advanced DPoS</div>
        </div>
      </div>
    </div>
    
    <div className="metric-comparison-card">
      <div className="metric-header">
        <h4 className="metric-title">Staking</h4>
      </div>
      <div className="networks-comparison">
        <div className="network-item circle-layer">
          <div className="network-name">Current Testnet</div>
          <div className="network-value">Manual</div>
        </div>
        <div className="network-item">
          <div className="network-name">In Development</div>
          <div className="network-value">Smart Contracts</div>
        </div>
      </div>
    </div>
    
    <div className="metric-comparison-card">
      <div className="metric-header">
        <h4 className="metric-title">Governance</h4>
      </div>
      <div className="networks-comparison">
        <div className="network-item circle-layer">
          <div className="network-name">Current Testnet</div>
          <div className="network-value">Manual</div>
        </div>
        <div className="network-item">
          <div className="network-name">In Development</div>
          <div className="network-value">On-chain</div>
        </div>
      </div>
    </div>
    
    <div className="metric-comparison-card">
      <div className="metric-header">
        <h4 className="metric-title">Bridges</h4>
      </div>
      <div className="networks-comparison">
        <div className="network-item circle-layer">
          <div className="network-name">Current Testnet</div>
          <div className="network-value">N/A</div>
        </div>
        <div className="network-item">
          <div className="network-name">In Development</div>
          <div className="network-value">Cross-chain</div>
        </div>
      </div>
    </div>
    
    <div className="metric-comparison-card">
      <div className="metric-header">
        <h4 className="metric-title">Oracles</h4>
      </div>
      <div className="networks-comparison">
        <div className="network-item circle-layer">
          <div className="network-name">Current Testnet</div>
          <div className="network-value">N/A</div>
        </div>
        <div className="network-item">
          <div className="network-name">In Development</div>
          <div className="network-value">Decentralized</div>
        </div>
      </div>
    </div>
  </div>
</div>

## Practical Implementation Notes

### For Developers
- **Network Access**: Development & testing phase with 99.95% uptime target
- **Gas Efficiency**: Predictable costs with CLAYER token pricing
- **Example Contracts**: Reference implementation at 0xfCb4Ce5953dE22cbF04d015df88a3a9895E86bEB
- **Integration Patterns**: Standard EVM development workflows apply

### For Validators
- **Minimum Requirements**: 5 active validators for network security
- **Economic Incentives**: Gas fee distribution based on staking proportion
- **Network Participation**: Manual setup currently, smart contracts in development

### For Users
- **Wallet Support**: MetaMask recommended with testnet configuration
- **Network Testing**: Free testnet tokens via faucet (1 CLAYER per day)
- **Transaction Experience**: 1-3 second confirmation times
- **Block Explorer**: Real-time transaction tracking available

## Next Steps

For implementation guidance:
- [Network Setup Guide](/getting-started/connect-testnet)  
- [Development Tools](/development/writing-smart-contracts)
- [API References](/apis-sdks/rpc-endpoints)
- [Validator Setup](/nodes-validation/becoming-validator)