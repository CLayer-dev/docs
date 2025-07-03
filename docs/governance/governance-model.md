---
sidebar_position: 1
---

# Governance Model

## Overview

Circle Layer uses a decentralized governance model that allows token holders to participate in decision-making. The governance structure clearly separates the Circle Layer company's supportive role from network control, ensuring true decentralization.

## Company Structure & Network Governance

### Circle Layer Company Role
The Circle Layer company serves as an ecosystem supporter and facilitator, **not as a network controller**:

- **Ecosystem Support**: Provides development resources, documentation, and community support
- **Infrastructure Development**: Builds tools, SDKs, and developer resources
- **Community Building**: Facilitates community growth and ecosystem partnerships
- **No Network Control**: Does not control network operations, consensus, or governance decisions

### Network Control Model
The Circle Layer network is controlled by its validators and community:

- **Validator Governance**: Network controlled by distributed validator nodes
- **Decentralized Consensus**: No single entity controls the blockchain
- **Community Decision Making**: Token holders and validators make governance decisions
- **Autonomous Operation**: Network operates independently of company control

### Shared Vision Framework
- **Global Contributors**: Open ecosystem welcoming global development contributors
- **Shared Vision**: Alignment around advancing blockchain technology and adoption
- **Value Creation Focus**: Core values centered on creating value for the blockchain industry
- **Community-Driven**: Development priorities shaped by community needs and input

### Governance Separation
- **Technical Governance**: Handled by validators and community consensus
- **Ecosystem Governance**: Community-driven through token-based voting
- **Company Operations**: Separate from network governance decisions
- **Transparency**: Clear separation ensures transparency and decentralization

## Governance Structure

### 1. Token Holders
- Voting power based on token holdings
- Minimum stake for voting: 1,000 CLAYER
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
- Minimum stake: 10,000 CLAYER
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