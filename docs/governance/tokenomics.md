---
sidebar_position: 2
---

# Tokenomics

## Overview

Circle Layer's tokenomics model is designed to ensure long-term sustainability and growth. The current testnet provides insight into the economic mechanisms that will support the network.

## Economic Model

### Endogenous Token System
Circle Layer uses **CLAYER** as its native endogenous token that powers all network operations:

- **Transaction Fees**: All transactions consume CLAYER as gas fees
- **Network Security**: Validators must pledge CLAYER to participate in consensus
- **Reward Distribution**: Gas fees are distributed according to stake proportion
- **Economic Incentives**: Stake-weighted participation in network governance

### Validator Economics Model
The Circle Layer network operates on a stake-based validator system:

1. **Validator Participation**: Miners pledge CLAYER to become validator nodes
2. **Reward Distribution**: Node rewards come from gas fees, distributed according to mortgage (stake) proportion
3. **Proportional Rewards**: Higher stake = higher share of network fees
4. **Economic Security**: Validator incentives align with network security

### Meta-Transaction Functionality
Circle Layer implements advanced gas fee optimization:

- **Gas Fee Reduction**: Meta-transaction function reduces overall network costs
- **Step-wise Reduction**: Users holding CLAYER receive graduated gas fee discounts
- **Developer Benefits**: Reduced costs for developers deploying and operating dApps
- **User Experience**: Lower barriers to entry for end users

## Current Testnet Token Information

### Token Details
- **Token Symbol**: CLAYER
- **Token Type**: Endogenous network token
- **Decimals**: 18
- **Testnet Total Supply**: 10 Billion CLAYER
- **Mainnet Total Supply**: 1 Billion CLAYER
- **Chain ID**: 28525
- **Network**: Circle Layer Testnet

### Current Economic Parameters
- **Minimum Gas Price**: 0.000021 CLAYER (1 Gwei)
- **Block Gas Limit**: 10,000,000,000,000 per block
- **Testnet Validator Minimum Stake**: 32 CLAYER
- **Mainnet Validator Minimum Stake**: 100,000 CLAYER
- **Delegator Minimum Stake**: 32 CLAYER
- **Maximum Validators**: 21 (testnet), 10,000 (mainnet)
- **Faucet Distribution**: 1 CLAYER per day per address

## Validator Economics

### Staking Requirements
- **Testnet Validator Minimum Stake**: 32 CLAYER
- **Mainnet Validator Minimum Stake**: 100,000 CLAYER
- **Delegator Minimum Stake**: 32 CLAYER
- **Maximum Validators**: 21 (testnet), 10,000 (mainnet)
- **Staking Method**: Currently manual process
- **Rewards**: CLAYER tokens from gas fees

### Stake-Based Reward Distribution
The network distributes rewards based on proportional stake holdings:

- **Gas Fee Collection**: All transaction fees paid in CLAYER
- **Proportional Distribution**: Rewards distributed according to validator stake percentage
- **Delegation Support**: Delegators share in validator rewards proportionally
- **Economic Alignment**: Higher stake = higher reward share + higher security responsibility

### Network Security
- **Consensus**: Delegated Proof of Stake (DPoS)
- **Security Model**: Stake-weighted consensus with economic penalties
- **Minimum Validators**: 5 active validators for network security
- **Maximum Validators**: 21 (testnet), 10,000 (mainnet)
- **Economic Security**: Validators risk staked CLAYER for misbehavior

## Fee Structure

### Gas Economics
- **Gas Price Calculation**: Standard Ethereum method (gas price × gas amount)
- **Base Gas Price**: 0.000000001 CLAYER (1 Gwei)
- **Minimum Gas Price**: 0.000021 CLAYER
- **Fee Payment**: CLAYER tokens only
- **Meta-Transaction Benefits**: Reduced effective costs for CLAYER holders

### Fee Distribution Model
Circle Layer implements a stake-weighted fee distribution system:

- **Delegator Rewards**: 45% from gas fees (distributed by stake proportion)
- **Validator Rewards**: 30% from gas fees (distributed by stake proportion)
- **Burn Mechanism**: 25% from gas fees (deflationary pressure)
- **Maximum Burn Limit**: 1,000,000 CLAYER (burning stops after this threshold)
- **Proportional Allocation**: All distributions based on stake percentage

### Meta-Transaction Gas Optimization
Advanced gas fee reduction mechanisms:

- **CLAYER Holder Benefits**: Step-wise gas fee reduction for token holders
- **Developer Cost Reduction**: Lower operational costs for dApp deployment
- **User Experience Enhancement**: Reduced transaction costs improve adoption
- **Network Efficiency**: Optimized resource utilization across the network

## 🚧 Features in Development

### Automated Staking System
The following tokenomics features are currently in development:

**Smart Contract Staking**
- Automated staking contracts (replacing manual process)
- Smart contract-based delegation system
- Automated reward distribution
- Slashing conditions implementation

**Enhanced Economics**
- Dynamic fee structures
- Advanced burn mechanisms
- Governance token mechanics
- Cross-chain token economics

### Governance Integration
- **On-chain Governance**: Voting and proposal systems in development
- **Token-based Voting**: CLAYER-based governance rights
- **Delegation Mechanisms**: Stake delegation for governance
- **Treasury Management**: Community-controlled treasury

## Network Operations

### Current Testnet Metrics
- **Network Uptime**: 99.95% (Last 30 days)
- **Block Time**: 3 seconds
- **Transaction Finality**: 1-3 seconds
- **Energy Efficiency**: 99.9% less than Proof of Work
- **Current TPS**: 2,000 (done)
- **Target TPS**: 50,000 (in development)

### Token Distribution (Testnet)
- **Faucet**: Daily distribution of 1 CLAYER per address
- **Treasury Wallet**: Distribution source for testnet tokens
- **Validator Staking**: Manual 32 CLAYER requirement
- **Delegator Staking**: Manual 32 CLAYER minimum
- **Testing Supply**: 10 Billion CLAYER available for testing

## Economic Incentives

### Validator Incentives & Revenue Potential
- **CLAYER Rewards**: Earned through block validation
- **Network Security**: Stake-based security model
- **Performance Requirements**: 24/7 uptime expectations
- **Hardware Requirements**: Modest requirements (8GB RAM minimum)

#### Expected Validator Revenue Streams
1. **Block Rewards**: 2 CLAYER per block (base reward)
   - Daily earnings: 8,640-12,000 CLAYER
   - Uptime bonus: +20% for 99%+ availability
   - Performance bonus: +15% for top quartile validators

2. **Transaction Fee Revenue**: 30% share of network fees
   - Conservative estimate: $50K-150K daily network fees
   - Moderate estimate: $200K-600K daily network fees  
   - Optimistic estimate: $1M+ daily network fees at peak adoption

3. **Delegation Commission**: 5-15% from delegated stake
   - Revenue scales with total delegated amount
   - Competitive commission rates drive delegation
   - Expected delegation: $500K-5M per validator at scale

### Delegator Incentives
- **Minimum Stake**: 32 CLAYER tokens
- **Reward Share**: 45% of gas fees distributed to delegators
- **No Hardware Required**: Pure stake-based participation
- **Flexible Delegation**: Can delegate to any validator
- **Governance Rights**: Participate in network decisions

#### Annual Revenue Projections (Per Validator)
- **Conservative Scenario**: 25,000-58,000 CLAYER ($25K-58K USD)
- **Moderate Scenario**: 83,000-223,000 CLAYER ($83K-223K USD)
- **Optimistic Scenario**: 328,000-1,342,000 CLAYER ($328K-1.34M USD)

*Note: USD values assume $1/CLAYER price. Actual returns depend on network adoption, CLAYER price, and individual validator performance.*

### Developer Incentives
- **Free Testnet Tokens**: Daily faucet distribution
- **Low Gas Costs**: Affordable testing environment
- **Example Contracts**: Reference implementation at 0xfCb4Ce5953dE22cbF04d015df88a3a9895E86bEB
- **Development Tools**: Full EVM compatibility

## Future Economic Model

### Planned Features
The following economic features are planned for future releases:

**Enhanced Tokenomics**
- Advanced staking mechanisms
- Governance-based fee adjustments
- Cross-chain economic models
- Oracle-based pricing mechanisms

**Ecosystem Growth**
- DeFi protocol incentives
- Developer grant programs
- Community governance participation
- Network effect economics

### Migration Path
- Current testnet economics provide testing ground
- Lessons learned will inform mainnet economics
- Community feedback integration
- Security audit requirements

## Integration Economics

### For Developers
- **Gas Costs**: Predictable CLAYER-based fees
- **Testing**: Free testnet environment
- **Tools**: Standard EVM development costs
- **Migration**: Minimal costs from other EVM chains

### For Users
- **Transaction Costs**: Low CLAYER fees
- **Wallet Setup**: Standard EVM wallet compatibility
- **Token Acquisition**: Faucet for testing, future exchanges for mainnet
- **Network Access**: Standard EVM interaction patterns