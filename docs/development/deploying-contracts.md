---
sidebar_position: 3
---

# Deploying Contracts

## Overview

Learn how to deploy smart contracts to Circle Layer testnet.

## Network Configuration

### Circle Layer Testnet
- **RPC URL**: https://testnet-rpc.circlelayer.com
- **Chain ID**: 28525
- **Currency Symbol**: CLAYER
- **Gas Price**: Minimum 0.000021 CLAYER (adjusts based on network consumption)
- **Block Gas Limit**: 10,000,000,000,000 per block
- **Block Explorer**: https://explorer-testnet.circlelayer.com/

## Deployment Methods

### 1. Using Hardhat
```javascript
// hardhat.config.js
require('@nomiclabs/hardhat-ethers');

module.exports = {
  solidity: "0.8.19",
  networks: {
    circleLayerTestnet: {
      url: "https://testnet-rpc.circlelayer.com",
      chainId: 28525,
      accounts: [process.env.PRIVATE_KEY],
      gasPrice: 21000000000, // 0.000021 CLAYER in wei
      gas: 10000000000000 // Block gas limit
    }
  }
};

// deploy.js
async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Contract = await ethers.getContractFactory("MyContract");
  const contract = await Contract.deploy({
    gasPrice: ethers.utils.parseUnits('21', 'gwei'), // 0.000021 CLAYER
  });
  
  await contract.deployed();
  console.log("Contract deployed to:", contract.address);
  console.log("Transaction hash:", contract.deployTransaction.hash);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
```

### 2. Using Truffle
```javascript
// truffle-config.js
const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
  networks: {
    circleLayerTestnet: {
      provider: () => new HDWalletProvider(
        process.env.PRIVATE_KEY,
        'https://testnet-rpc.circlelayer.com'
      ),
      network_id: 28525,
      gas: 10000000000000,
      gasPrice: 21000000000, // 0.000021 CLAYER in wei
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    }
  },
  compilers: {
    solc: {
      version: "0.8.19"
    }
  }
};

// migrations/1_deploy_contracts.js
const MyContract = artifacts.require("MyContract");
module.exports = function(deployer) {
  deployer.deploy(MyContract);
};
```

### 3. Using Remix IDE
1. Open [Remix IDE](https://remix.ethereum.org/)
2. Connect to Circle Layer testnet:
   - Environment: "Injected Provider - MetaMask"
   - Ensure MetaMask is connected to Circle Layer Testnet
3. Compile your contract
4. Deploy with appropriate gas settings

## Example Deployed Contract

For reference, here's an example contract deployed on Circle Layer testnet:
- **Contract Address**: [0xfCb4Ce5953dE22cbF04d015df88a3a9895E86bEB](https://explorer-testnet.circlelayer.com/address/0xfCb4Ce5953dE22cbF04d015df88a3a9895E86bEB)
- **Explorer**: [View Contract](https://explorer-testnet.circlelayer.com/address/0xfCb4Ce5953dE22cbF04d015df88a3a9895E86bEB?tab=contract)
- **ABI**: [Contract ABI](https://explorer-testnet.circlelayer.com/address/0xfCb4Ce5953dE22cbF04d015df88a3a9895E86bEB?tab=contract_abi)

## Deployment Checklist

### 1. Pre-deployment
- Test thoroughly on Circle Layer testnet
- Get CLAYER from [faucet](https://faucet.circlelayer.com)
- Check gas estimates with current network conditions
- Verify constructor arguments

### 2. During Deployment
- Monitor transaction on [explorer](https://explorer-testnet.circlelayer.com/)
- Use appropriate gas price (minimum 0.000021 CLAYER)
- Verify deployment address
- Save deployment info

### 3. Post-deployment
- Verify contract on block explorer
- Test functionality with CLAYER
- Update documentation
- Monitor events

## Gas Calculation

Circle Layer follows Ethereum's standard gas calculation:
```
Total Fee = Gas Price × Gas Used
```

With current parameters:
- **Minimum Gas Price**: 0.000021 CLAYER
- **Block Gas Limit**: 10,000,000,000,000
- **Average Block Time**: 3 seconds

## Best Practices

### 1. Security
- Use secure private keys
- Test on Circle Layer testnet first
- Verify contract code on explorer
- Monitor deployment transactions

### 2. Cost Optimization
- Optimize contract size for lower deployment costs
- Use appropriate gas price based on network conditions
- Consider gas efficiency in contract design
- Monitor CLAYER token costs

### 3. Integration
- Same as EVM blockchain integration
- Compatible with existing Ethereum development tools
- Use standard Web3 libraries (Web3.js, Ethers.js)

### 4. Maintenance
- Keep deployment records
- Monitor contract activity on explorer
- Update documentation
- Plan for upgrades