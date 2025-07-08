---
sidebar_position: 1
---

# Writing Smart Contracts

Circle Layer is fully EVM compatible, allowing you to use all existing Ethereum development tools and patterns with enhanced performance and lower costs.

## Development Environment Setup

### Prerequisites
- **Solidity Knowledge**: Familiarity with Solidity programming language
- **Development Tools**: Node.js, npm/yarn for package management
- **Circle Layer Access**: Testnet connection configured
- **Test Tokens**: CLAYER tokens from [faucet](https://faucet.circlelayer.com)

### Required Tools Installation
```bash
# Install Hardhat development environment
npm install --save-dev hardhat

# Install essential plugins
npm install --save-dev @nomiclabs/hardhat-ethers ethers @nomiclabs/hardhat-waffle ethereum-waffle chai

# Install OpenZeppelin contracts
npm install @openzeppelin/contracts
```

## Smart Contract Development

### Basic Contract Structure
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CircleLayerExample is ReentrancyGuard, Ownable {
    // State variables
    mapping(address => uint256) public balances;
    uint256 public totalSupply;
    
    // Events
    event Transfer(address indexed from, address indexed to, uint256 amount);
    event Deposit(address indexed user, uint256 amount);
    
    // Constructor
    constructor() {
        // Initialize contract state
    }
    
    // Functions with Circle Layer optimizations
    function deposit() external payable nonReentrant {
        require(msg.value > 0, "Deposit amount must be greater than 0");
        balances[msg.sender] += msg.value;
        totalSupply += msg.value;
        emit Deposit(msg.sender, msg.value);
    }
    
    function withdraw(uint256 amount) external nonReentrant {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        totalSupply -= amount;
        
        (bool success, ) = payable(msg.sender).call{value: amount}("");
        require(success, "Transfer failed");
        
        emit Transfer(address(this), msg.sender, amount);
    }
}
```

## Circle Layer Optimization Best Practices

### 1. Gas Efficiency for CLAYER
```solidity
// Optimize storage operations
contract OptimizedContract {
    // Pack structs to save gas
    struct UserData {
        uint128 balance;    // Instead of uint256 when possible
        uint64 timestamp;   // Pack into single storage slot
        bool isActive;
    }
    
    // Use mappings efficiently
    mapping(address => UserData) public userData;
    
    // Batch operations to reduce gas costs
    function batchTransfer(address[] calldata recipients, uint256[] calldata amounts) 
        external {
        require(recipients.length == amounts.length, "Length mismatch");
        
        for (uint i = 0; i < recipients.length; i++) {
            // Process transfers in batch
            _transfer(msg.sender, recipients[i], amounts[i]);
        }
    }
}
```

### 2. Security Patterns
```solidity
// Follow Circle Layer security best practices
contract SecureContract {
    using SafeMath for uint256; // For older Solidity versions
    
    // Implement proper access control
    modifier onlyAuthorized() {
        require(authorized[msg.sender], "Not authorized");
        _;
    }
    
    // Input validation
    function setUserLimit(address user, uint256 limit) 
        external 
        onlyAuthorized {
        require(user != address(0), "Invalid address");
        require(limit > 0 && limit <= MAX_LIMIT, "Invalid limit");
        
        userLimits[user] = limit;
    }
    
    // Emergency controls
    bool public emergencyStop = false;
    
    modifier notStopped() {
        require(!emergencyStop, "Contract is stopped");
        _;
    }
}
```

### 3. Event Optimization
```solidity
// Optimize events for Circle Layer's fast finality
contract EventOptimizedContract {
    // Indexed parameters for efficient filtering
    event TokenTransfer(
        address indexed from,
        address indexed to,
        uint256 indexed tokenId,
        uint256 amount,
        bytes32 transactionHash
    );
    
    // Efficient event emission
    function transfer(address to, uint256 tokenId, uint256 amount) external {
        // Transfer logic...
        
        emit TokenTransfer(
            msg.sender,
            to,
            tokenId,
            amount,
            keccak256(abi.encodePacked(block.timestamp, msg.sender, to))
        );
    }
}
```

## Testing Framework

### Hardhat Configuration for Circle Layer
```javascript
// hardhat.config.js
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    circleLayerTestnet: {
      url: "https://testnet-rpc.circlelayer.com",
      chainId: 28525,
      accounts: [process.env.PRIVATE_KEY],
      gasPrice: "21000000000", // 0.000021 CLAYER
      gas: 8000000
    }
  },
  mocha: {
    timeout: 40000 // Extended timeout for Circle Layer's 3s blocks
  }
};
```

### Comprehensive Test Suite
```javascript
// test/contract.test.js
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CircleLayerExample", function () {
  let contract;
  let owner;
  let user1;
  let user2;
  
  beforeEach(async function () {
    [owner, user1, user2] = await ethers.getSigners();
    
    const ContractFactory = await ethers.getContractFactory("CircleLayerExample");
    contract = await ContractFactory.deploy();
    await contract.deployed();
  });
  
  it("Should handle deposits correctly", async function () {
    const depositAmount = ethers.utils.parseEther("1.0");
    
    await expect(contract.connect(user1).deposit({ value: depositAmount }))
      .to.emit(contract, "Deposit")
      .withArgs(user1.address, depositAmount);
    
    expect(await contract.balances(user1.address)).to.equal(depositAmount);
  });
  
  it("Should validate gas usage on Circle Layer", async function () {
    const tx = await contract.connect(user1).deposit({ 
      value: ethers.utils.parseEther("1.0") 
    });
    const receipt = await tx.wait();
    
    console.log("Gas used:", receipt.gasUsed.toString());
    expect(receipt.gasUsed).to.be.below(100000); // Efficient gas usage
  });
});
```

## Deployment Strategy

### Deployment Script
```javascript
// scripts/deploy.js
const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying to Circle Layer Testnet...");
  
  // Get deployer account
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with account:", deployer.address);
  
  // Check CLAYER balance
  const balance = await deployer.getBalance();
  console.log("Account balance:", ethers.utils.formatEther(balance), "CLAYER");
  
  // Deploy contract
  const ContractFactory = await ethers.getContractFactory("CircleLayerExample");
  const contract = await ContractFactory.deploy({
    gasPrice: ethers.utils.parseUnits("21", "gwei"), // 0.000021 CLAYER
    gasLimit: 2000000
  });
  
  await contract.deployed();
  console.log("Contract deployed to:", contract.address);
  
  // Verify deployment
  const code = await ethers.provider.getCode(contract.address);
  if (code === "0x") {
    throw new Error("Contract deployment failed");
  }
  
  console.log("✅ Contract successfully deployed and verified");
  console.log("🔗 View on explorer:", `https://explorer-testnet.circlelayer.com/address/${contract.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

### Post-Deployment Verification
```javascript
// scripts/verify.js
const { ethers } = require("hardhat");

async function verifyContract(contractAddress) {
  console.log("Verifying contract functionality...");
  
  const contract = await ethers.getContractAt("CircleLayerExample", contractAddress);
  
  // Test basic functionality
  try {
    const tx = await contract.deposit({ value: ethers.utils.parseEther("0.1") });
    await tx.wait();
    console.log("✅ Contract is functional");
  } catch (error) {
    console.error("❌ Contract verification failed:", error.message);
  }
}
```

## Integration Examples

### Frontend Integration
```javascript
// React component example
import { ethers } from 'ethers';

const ContractInteraction = () => {
  const contractAddress = "YOUR_CONTRACT_ADDRESS";
  const contractABI = [/* Your contract ABI */];
  
  const interactWithContract = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      
      try {
        const tx = await contract.deposit({ 
          value: ethers.utils.parseEther("1.0") 
        });
        await tx.wait(); // Wait for Circle Layer's fast confirmation
        console.log("Transaction confirmed in ~3 seconds");
      } catch (error) {
        console.error("Transaction failed:", error);
      }
    }
  };
};
```

## Performance Considerations

### Circle Layer Specific Optimizations
- **Fast Finality**: Leverage 1-3 second finality for better UX
- **Predictable Gas**: Stable CLAYER pricing allows for accurate gas estimation
- **Event Handling**: Optimize for Circle Layer's efficient event processing
- **State Management**: Design for optimal performance with DPoS consensus

## Reference Implementation

**Live Example**: `0xfCb4Ce5953dE22cbF04d015df88a3a9895E86bEB`
- [View Contract](https://explorer-testnet.circlelayer.com/address/0xfCb4Ce5953dE22cbF04d015df88a3a9895E86bEB?tab=contract)
- [Source Code](https://explorer-testnet.circlelayer.com/address/0xfCb4Ce5953dE22cbF04d015df88a3a9895E86bEB?tab=contract)
- [Contract ABI](https://explorer-testnet.circlelayer.com/address/0xfCb4Ce5953dE22cbF04d015df88a3a9895E86bEB?tab=contract_abi)

## Next Steps

Continue your Circle Layer development journey:
- [Contract Deployment Guide](./deploying-contracts) - Advanced deployment strategies
- [Web3 Integration](./web3-integration) - Frontend development patterns
- [Contract Interaction](./interacting-with-contracts) - Runtime interaction guides
- [Best Practices](./support-plans) - Advanced development guidelines