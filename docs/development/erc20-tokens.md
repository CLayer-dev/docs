---
id: erc20-tokens
title: ERC20 Token Development
sidebar_label: ERC20 Tokens
sidebar_position: 7
description: Complete guide to developing and deploying ERC20 tokens on Core Layer blockchain.
---

# ERC20 Token Development

Core Layer Blockchain is fully compatible with the [ERC20](https://eips.ethereum.org/EIPS/eip-20) standard, allowing developers to create and deploy standard-compliant tokens seamlessly.

## ERC20 Standard Interface

Core Layer supports the complete ERC20 interface with all standard functions and events:

```solidity
// ----------------------------------------------------------------------------
// ERC Token Standard #20 Interface
// https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20-token-standard.md
// ----------------------------------------------------------------------------
contract ERC20Interface {
    function totalSupply() public constant returns (uint);
    function balanceOf(address tokenOwner) public constant returns (uint balance);
    function allowance(address tokenOwner, address spender) public constant returns (uint remaining);
    function transfer(address to, uint tokens) public returns (bool success);
    function approve(address spender, uint tokens) public returns (bool success);
    function transferFrom(address from, address to, uint tokens) public returns (bool success);

    event Transfer(address indexed from, address indexed to, uint tokens);
    event Approval(address indexed tokenOwner, address indexed spender, uint tokens);
}
```

## Implementation Example

### Basic ERC20 Token Contract

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MyToken {
    string public name;
    string public symbol;
    uint8 public decimals;
    uint256 public totalSupply;
    
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;
    
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    
    constructor(
        string memory _name,
        string memory _symbol,
        uint8 _decimals,
        uint256 _totalSupply
    ) {
        name = _name;
        symbol = _symbol;
        decimals = _decimals;
        totalSupply = _totalSupply * 10**_decimals;
        balanceOf[msg.sender] = totalSupply;
        emit Transfer(address(0), msg.sender, totalSupply);
    }
    
    function transfer(address to, uint256 value) public returns (bool) {
        require(balanceOf[msg.sender] >= value, "Insufficient balance");
        balanceOf[msg.sender] -= value;
        balanceOf[to] += value;
        emit Transfer(msg.sender, to, value);
        return true;
    }
    
    function approve(address spender, uint256 value) public returns (bool) {
        allowance[msg.sender][spender] = value;
        emit Approval(msg.sender, spender, value);
        return true;
    }
    
    function transferFrom(address from, address to, uint256 value) public returns (bool) {
        require(balanceOf[from] >= value, "Insufficient balance");
        require(allowance[from][msg.sender] >= value, "Allowance exceeded");
        
        balanceOf[from] -= value;
        balanceOf[to] += value;
        allowance[from][msg.sender] -= value;
        
        emit Transfer(from, to, value);
        return true;
    }
}
```

## Deployment Guide

### Using Remix IDE

1. **Open Remix**: Navigate to [remix.ethereum.org](https://remix.ethereum.org)
2. **Create Contract**: Create a new file with your ERC20 contract
3. **Compile**: Select Solidity compiler version 0.8.0 or higher
4. **Deploy**: 
   - Select "Injected Web3" environment
   - Ensure MetaMask is connected to Core Layer testnet
   - Set constructor parameters
   - Click "Deploy"

### Using Hardhat

#### Project Setup

```bash
npm install --save-dev hardhat @nomiclabs/hardhat-ethers ethers
npx hardhat init
```

#### Hardhat Configuration

```javascript
// hardhat.config.js
require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: "0.8.19",
  networks: {
    circlelayer: {
      url: "https://testnet-rpc.clayer.io",
      chainId: 28525,
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};
```

#### Deployment Script

```javascript
// scripts/deploy.js
async function main() {
  const [deployer] = await ethers.getSigners();
  
  console.log("Deploying with account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());
  
  const Token = await ethers.getContractFactory("MyToken");
  const token = await Token.deploy(
    "My Token",      // name
    "MTK",           // symbol
    18,              // decimals
    1000000          // total supply (1M tokens)
  );
  
  await token.deployed();
  console.log("Token deployed to:", token.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

#### Deploy Command

```bash
npx hardhat run scripts/deploy.js --network circlelayer
```

## Advanced Features

### Mintable Tokens

```solidity
contract MintableToken is ERC20Interface {
    address public owner;
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }
    
    function mint(address to, uint256 amount) public onlyOwner {
        totalSupply += amount;
        balanceOf[to] += amount;
        emit Transfer(address(0), to, amount);
    }
}
```

### Burnable Tokens

```solidity
function burn(uint256 amount) public {
    require(balanceOf[msg.sender] >= amount, "Insufficient balance");
    balanceOf[msg.sender] -= amount;
    totalSupply -= amount;
    emit Transfer(msg.sender, address(0), amount);
}
```

### Pausable Tokens

```solidity
contract PausableToken is ERC20Interface {
    bool public paused = false;
    address public owner;
    
    modifier whenNotPaused() {
        require(!paused, "Token is paused");
        _;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }
    
    function pause() public onlyOwner {
        paused = true;
    }
    
    function unpause() public onlyOwner {
        paused = false;
    }
    
    function transfer(address to, uint256 value) public whenNotPaused returns (bool) {
        // transfer logic
    }
}
```

## Token Verification

### Contract Verification on Explorer

1. Navigate to [explorer-testnet.clayer.io](https://explorer-testnet.clayer.io)
2. Search for your contract address
3. Click "Verify Contract"
4. Submit source code and constructor parameters

### Metadata Standards

```solidity
contract MyToken {
    // Standard metadata
    string public name = "My Token";
    string public symbol = "MTK";
    uint8 public decimals = 18;
    
    // Optional metadata
    string public website = "https://mytoken.com";
    string public github = "https://github.com/mytoken/token";
    
    // Token logo (IPFS hash)
    string public logoURI = "ipfs://QmTokenLogo...";
}
```

## Testing Your Token

### Unit Tests with Hardhat

```javascript
// test/MyToken.test.js
const { expect } = require("chai");

describe("MyToken", function () {
  let token;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("MyToken");
    token = await Token.deploy("Test Token", "TEST", 18, 1000000);
    await token.deployed();
  });

  it("Should have correct initial supply", async function () {
    expect(await token.totalSupply()).to.equal(ethers.utils.parseEther("1000000"));
    expect(await token.balanceOf(owner.address)).to.equal(ethers.utils.parseEther("1000000"));
  });

  it("Should transfer tokens between accounts", async function () {
    await token.transfer(addr1.address, ethers.utils.parseEther("100"));
    expect(await token.balanceOf(addr1.address)).to.equal(ethers.utils.parseEther("100"));
  });

  it("Should handle approvals correctly", async function () {
    await token.approve(addr1.address, ethers.utils.parseEther("100"));
    expect(await token.allowance(owner.address, addr1.address)).to.equal(ethers.utils.parseEther("100"));
  });
});
```

### Run Tests

```bash
npx hardhat test
```

## Integration with DeFi

### Adding Liquidity to DEX

```javascript
// Example: Adding token to Core Layer DEX
const tokenContract = new ethers.Contract(tokenAddress, tokenABI, signer);
const dexRouter = new ethers.Contract(routerAddress, routerABI, signer);

// Approve tokens for DEX
await tokenContract.approve(routerAddress, ethers.utils.parseEther("1000"));

// Add liquidity
await dexRouter.addLiquidityETH(
  tokenAddress,
  ethers.utils.parseEther("1000"),  // token amount
  0,                                // min token amount
  0,                                // min ETH amount
  owner.address,                    // to
  Math.floor(Date.now() / 1000) + 3600  // deadline
);
```

## Best Practices

### Security Considerations

1. **Use OpenZeppelin**: Consider using [OpenZeppelin contracts](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20)
2. **Audit Smart Contracts**: Have contracts audited before mainnet deployment
3. **Test Thoroughly**: Comprehensive testing on testnet
4. **Handle Edge Cases**: Check for integer overflow/underflow
5. **Access Control**: Implement proper owner/admin controls

### Gas Optimization

1. **Efficient Storage**: Use appropriate data types
2. **Batch Operations**: Combine multiple operations when possible
3. **Event Optimization**: Use indexed parameters judiciously
4. **Code Optimization**: Remove unnecessary computations

### Token Economics

1. **Supply Management**: Plan token distribution carefully
2. **Inflation/Deflation**: Consider burn mechanisms
3. **Utility**: Ensure tokens have clear use cases
4. **Governance**: Plan for future governance needs

## Common Issues & Solutions

### Deployment Failures

**Issue**: "Gas estimation failed"
**Solution**: Increase gas limit or check for contract errors

**Issue**: "Nonce too low"
**Solution**: Reset MetaMask account or check pending transactions

### Transfer Issues

**Issue**: "Insufficient balance"
**Solution**: Verify account balance and token amount

**Issue**: "Allowance exceeded"
**Solution**: Check and increase allowance if needed

## References

- **EIP-20 Standard**: [https://eips.ethereum.org/EIPS/eip-20](https://eips.ethereum.org/EIPS/eip-20)
- **OpenZeppelin Contracts**: [https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20)
- **Core Layer Testnet Explorer**: [https://explorer-testnet.clayer.io](https://explorer-testnet.clayer.io)
- **Core Layer Faucet**: [https://faucet.clayer.io](https://faucet.clayer.io)

ERC20 token development on Core Layer provides developers with a fast, low-cost environment for creating and deploying standard-compliant tokens with full Ethereum ecosystem compatibility. 