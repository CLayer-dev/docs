---
sidebar_position: 1
---

# Becoming a Validator

## Overview

Learn how to become a validator on Circle Layer and help secure the network.

## Requirements

### 1. Hardware Requirements
- CPU: 8+ cores
- RAM: 32GB+
- Storage: 1TB+ SSD
- Network: 100Mbps+

### 2. Software Requirements
- Linux OS (Ubuntu 20.04+)
- Docker
- Circle Layer Node Software
- Monitoring Tools

### 3. Token Requirements
- Minimum stake: 100,000 CL
- Additional for operations
- Emergency fund

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
```
```
```

### 2. Node Configuration
```
```
```
```yaml
# config.yaml
network: mainnet
port: 26656
rpc_port: 26657
validator_key: "your-key"
stake_amount: 100000
```
```
```
```

### 3. Start Node
```
```
```
```bash
docker run -d \
  --name circlelayer-node \
  -v ~/.circlelayer:/root/.circlelayer \
  circlelayer/node:latest
```
```
```
```

## Monitoring

### 1. Node Status
```
```
```
```bash
# Check node status
circlelayer status

# View logs
docker logs circlelayer-node
```
```
```
```

### 2. Performance Metrics
- CPU usage
- Memory usage
- Network traffic
- Block production

### 3. Alerts
- Node offline
- High resource usage
- Network issues
- Slashing risks

## Best Practices

### 1. Security
- Use firewall
- Regular updates
- Backup keys
- Monitor logs

### 2. Performance
- Optimize resources
- Regular maintenance
- Monitor metrics
- Update software

### 3. Operations
- 24/7 monitoring
- Regular backups
- Emergency procedures
- Community support
```