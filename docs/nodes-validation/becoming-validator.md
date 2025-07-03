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
- **Testnet Minimum Stake**: 32 CLAYER
- **Mainnet Minimum Stake**: 100,000 CLAYER
- Additional for operations
- Emergency fund

### 4. Network Requirements

#### Port Configuration
Circle Layer validators require specific ports to be open and properly configured:

```bash
# Required Validator Ports
# 32668 - Validator P2P communication
# 32669 - Validator consensus protocol
# 8545  - JSON-RPC endpoint (EVM compatibility)
# 6060  - pprof profiling endpoint
# 80    - HTTP endpoint (web interface)
# 22    - SSH access (remote management)

# Configure firewall for validator
sudo ufw allow 32668/tcp comment 'Validator P2P'
sudo ufw allow 32669/tcp comment 'Validator Consensus'
sudo ufw allow 8545/tcp comment 'JSON-RPC'
sudo ufw allow 6060/tcp comment 'pprof Profiling'
sudo ufw allow 80/tcp comment 'HTTP Interface'
sudo ufw allow 22/tcp comment 'SSH Access'
sudo ufw enable
```

#### Network Specifications
- **Firewall**: Custom configuration required (not disabled)
- **Minimum Active Validators**: 5 validators required for security and active blockchain
- **Maximum Active Validators**: 21 (testnet), 10,000 (mainnet)
- **Multiple RPC**: Required for redundancy and high availability
- **Network Latency**: <100ms to other validators
- **Bandwidth**: Minimum 1Gbps for validators
- **Connection Limits**: Support 10,000+ concurrent connections

## Economic Parameters

### Gas & Fees
- **Base Gas Price**: 0.000000001 CLAYER (1 Gwei)
- **Gas Limit**: 10,000,000,000,000 per block
- **Fee Calculation**: gas price × gas amount (Ethereum standard method)

### Validator Rewards
- **Reward Token**: CLAYER
- **Fee Share**: 30% of gas fees
- **Burn Mechanism**: 25% from gas fees (maximum limit 1,000,000 CLAYER)
- **Delegator Share**: 45% of gas fees

## Security Features

### Current Implementation
- **Security Model**: Standard EVM security applied
- **Consensus**: DPoS (Delegated Proof of Stake)
- **Minimum Validators**: 5 validators active required for security
- **Maximum Validators**: 21 (testnet), 10,000 (mainnet)

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
stake_amount: 32
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