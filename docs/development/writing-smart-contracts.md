---
sidebar_position: 1
---

# Writing Smart Contracts

## Overview

Learn how to write and deploy smart contracts on Circle Layer.

## Getting Started

### Prerequisites
- Solidity knowledge
- Development environment setup
- Circle Layer testnet access
- CLAYER tokens from faucet (https://faucet.circlelayer.com)

### Network Configuration
- **Network**: Circle Layer Testnet
- **Chain ID**: 28525
- **RPC URL**: https://rpc-testnet.circlelayer.com
- **Currency**: CLAYER
- **Block Explorer**: https://explorer-testnet.circlelayer.com/

### Basic Contract Structure
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MyContract {
    // State variables
    address public owner;
    uint256 public value;

    // Constructor
    constructor() {
        owner = msg.sender;
    }

    // Functions
    function setValue(uint256 _value) public {
        require(msg.sender == owner, "Not authorized");
        value = _value;
    }
}
```

## Best Practices

### 1. Security
- Use latest Solidity version
- Implement access control
- Add input validation
- Handle errors properly

### 2. Gas Optimization
- Optimize storage usage
- Use appropriate data types
- Batch operations
- Minimize state changes
- Consider Circle Layer's gas pricing (minimum 0.000021 CLAYER)

### 3. Testing
- Write unit tests
- Use test coverage tools
- Test edge cases
- Simulate attacks

## Development Tools

### 1. IDE Support
- VSCode with Solidity extension
- Remix IDE
- Hardhat
- Truffle

### 2. Testing Frameworks
- Hardhat
- Truffle
- Waffle
- Foundry

### 3. Deployment Tools
- Hardhat (with Circle Layer testnet configuration)
- Truffle (with CLAYER gas settings)
- Remix (using Injected Provider - MetaMask)
- Web3.js/ethers.js (standard EVM integration)

## Example Resources

### Reference Implementation
- **Example Contract**: 0xfCb4Ce5953dE22cbF04d015df88a3a9895E86bEB
- **View on Explorer**: [Contract Details](https://testnet.circlelayer.com/address/0xfCb4Ce5953dE22cbF04d015df88a3a9895E86bEB?tab=contract)
- **Contract ABI**: [View ABI](https://testnet.circlelayer.com/address/0xfCb4Ce5953dE22cbF04d015df88a3a9895E86bEB?tab=contract_abi)

### Integration Guides
- [Deploying Contracts](/docs/development/deploying-contracts)
- [Web3 Integration](/docs/development/web3-integration)
- [Contract Interaction](/docs/development/interacting-with-contracts)