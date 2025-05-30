---
sidebar_position: 3
---

# Deploying Contracts

## Overview

Learn how to deploy smart contracts to Circle Layer.

## Deployment Methods

### 1. Using Hardhat
```javascript
// hardhat.config.js
module.exports = {
  networks: {
    circleLayer: {
      url: "https://rpc.circlelayer.com",
      accounts: [privateKey]
    }
  }
};

// deploy.js
async function main() {
  const Contract = await ethers.getContractFactory("MyContract");
  const contract = await Contract.deploy();
  await contract.deployed();
  console.log("Contract deployed to:", contract.address);
}
```
```
```
```

### 2. Using Truffle
```
```
```
```javascript
// truffle-config.js
module.exports = {
  networks: {
    circleLayer: {
      provider: () => new HDWalletProvider(privateKey, "https://rpc.circlelayer.com"),
      network_id: "*"
    }
  }
};

// migrations/1_deploy_contracts.js
const MyContract = artifacts.require("MyContract");
module.exports = function(deployer) {
  deployer.deploy(MyContract);
};
```
```
```
```

### 3. Using Circle Layer CLI
```
```
```
```bash
# Deploy contract
circle-layer contract deploy <bytecode> <abi>

# Verify contract
circle-layer contract verify <address> <constructor-args>
```
```
```
```

## Deployment Checklist

### 1. Pre-deployment
- Test thoroughly
- Audit code
- Check gas estimates
- Verify constructor arguments

### 2. During Deployment
- Monitor transaction
- Check gas price
- Verify deployment address
- Save deployment info

### 3. Post-deployment
- Verify contract
- Test functionality
- Update documentation
- Monitor events

## Best Practices

### 1. Security
- Use secure private keys
- Verify contract code
- Test on testnet first
- Monitor deployment

### 2. Cost Optimization
- Optimize contract size
- Use appropriate gas price
- Batch deployments
- Reuse contracts when possible

### 3. Maintenance
- Keep deployment records
- Monitor contract activity
- Update documentation
- Plan for upgrades
```