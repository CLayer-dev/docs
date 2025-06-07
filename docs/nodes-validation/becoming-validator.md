---
sidebar_position: 1
---

# Becoming a Validator

## Overview

Learn how to become a validator on Circle Layer and help secure the network.

## Requirements

### 1. Hardware Requirements
- **Operating System**: Ubuntu >= 20.04 LTS
- **RAM**: 8GB minimum, 32GB recommended
- **Persistent Storage**: 25GB minimum, 100GB high-speed SSD recommended
- **Network**: 100Mbps+

### 2. Software Requirements
- Linux OS (Ubuntu 20.04+)
- Docker
- Circle Layer Node Software
- Monitoring Tools

### 3. Token Requirements
- **Minimum stake**: 100,000 CLAYER
- Additional for operations
- Emergency fund

### 4. Network Requirements
- **Ports**: 32668, 32669, 8545, 6060, 80, 22
- **Firewall**: Not required
- **Minimum Active Validators**: 5 validators required for security and active blockchain
- **Multiple RPC**: Required for redundancy

## Economic Parameters

### Gas & Fees
- **Base Gas Price**: 0.000000001 CLAYER (1 Gwei)
- **Gas Limit**: 10,000,000,000,000 per block
- **Fee Calculation**: gas price × gas amount (Ethereum standard method)

### Validator Rewards
- **Reward Token**: CLAYER
- **Burn Mechanism**: 25% from gas fees (maximum limit 1,000,000 CLAYER)

## Security Features

### Current Implementation
- **Security Model**: Standard EVM security applied
- **Consensus**: DPoS (Delegated Proof of Stake)
- **Limitations**: Minimum 5 validators active required for security

## Setup Process

### 1. Initial Setup
```bash
# Install dependencies
sudo apt update
sudo apt install -y docker.io

# Pull node image
docker pull circlelayer/node:latest

# Create config
mkdir -p ~/.circlelayer
```

### 2. Node Configuration
```yaml
# config.yaml
network: testnet
port: 32668
rpc_port: 8545
validator_key: "your-key"
stake_amount: 100000
chain_id: 28525
```

### 3. Start Node
```bash
docker run -d \
  --name circlelayer-node \
  -p 32668:32668 \
  -p 8545:8545 \
  -v ~/.circlelayer:/root/.circlelayer \
  circlelayer/node:latest
```

## Monitoring

### 1. Node Status
```bash
# Check node status
circlelayer status

# View logs
docker logs circlelayer-node
```

### 2. Performance Metrics
- CPU usage
- Memory usage
- Network traffic
- Block production (every 3 seconds)

### 3. Maintenance
- **Maintenance Schedules**: Depends on server provider requirements
- **Network Uptime**: 99.95% (Last 30 days)

## 🚧 Advanced Features in Development

The following validator-related features are currently in development:

### Smart Contract Infrastructure
- **Automated Staking Contract**: Smart contract-based staking system (currently manual process)
- **Governance System**: On-chain validator governance and voting mechanisms
- **Advanced Monitoring**: Real-time validator performance dashboards

### Network Infrastructure
- **Status Page**: Public network status and validator performance tracking
- **Alert System**: Automated validator monitoring and alert notifications
- **Analytics Dashboard**: Comprehensive validator metrics and insights

## Best Practices

### 1. Security
- Configure required ports (32668, 32669, 8545, 6060, 80, 22)
- Regular updates
- Backup keys
- Monitor logs

### 2. Performance
- Use recommended hardware specifications
- Regular maintenance
- Monitor metrics
- Update software

### 3. Operations
- 24/7 monitoring
- Regular backups
- Emergency procedures
- Community support
```