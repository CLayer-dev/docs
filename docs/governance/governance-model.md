---
sidebar_position: 1
---

# Governance Model

## Overview

Circle Layer uses a decentralized governance model that allows token holders to participate in decision-making.

## Governance Structure

### 1. Token Holders
- Voting power based on token holdings
- Minimum stake for voting: 1,000 CL
- Delegation options available

### 2. Validators
- Network security providers
- Additional voting weight
- Technical expertise

### 3. Development Team
- Technical implementation
- Proposal evaluation
- Community support

## Governance Process

### 1. Proposal Creation
- Minimum stake: 10,000 CL
- Technical specification
- Implementation plan
- Resource requirements

### 2. Discussion Phase
- Community feedback
- Technical review
- Economic impact analysis
- Security assessment

### 3. Voting Phase
- Duration: 7 days
- Quorum: 20% of total supply
- Majority: 60% approval
- Implementation threshold

## Proposal Types

### 1. Protocol Upgrades
- Network parameters
- Consensus changes
- Security updates

### 2. Treasury Management
- Fund allocation
- Grant programs
- Development funding

### 3. Ecosystem Development
- Partnership proposals
- Integration requests
- Community initiatives

## Voting Mechanism

### 1. On-chain Voting
```solidity
function vote(uint256 proposalId, bool support) external {
    require(hasVotingPower(msg.sender), "No voting power");
    require(!hasVoted[msg.sender][proposalId], "Already voted");
    // Voting logic
}
```

### 2. Delegation
```solidity
function delegate(address to) external {
    require(to != address(0), "Invalid delegate");
    require(!hasDelegated[msg.sender], "Already delegated");
    // Delegation logic
}
```

### 3. Vote Counting
- Weighted voting power
- Time-locked tokens
- Delegation consideration
```