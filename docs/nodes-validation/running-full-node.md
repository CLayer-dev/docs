---
sidebar_position: 2
---

# Running a Full Node

## Overview

Learn how to run a full node on Circle Layer to participate in the network.

## Prerequisites

### 1. System Requirements
- CPU: 4+ cores
- RAM: 16GB+
- Storage: 500GB+ SSD
- Network: 50Mbps+

### 2. Software Requirements
- Linux OS (Ubuntu 20.04+)
- Docker
- Circle Layer Node Software
- Basic monitoring tools

### 3. Network Requirements
- Static IP
- Open ports:
  - 26656 (P2P)
  - 26657 (RPC)
  - 26658 (API)

## Installation

### 1. System Setup
```bash
# Update system
sudo apt update
sudo apt upgrade -y

# Install dependencies
sudo apt install -y docker.io
sudo systemctl enable docker
```
```
```
```

### 2. Node Installation
```
```
```
```bash
# Create directory
mkdir -p ~/.circlelayer

# Download node software
curl -sSL https://get.circlelayer.com | bash

# Initialize node
circlelayer init --chain-id circlelayer-1
```
```
```
```

### 3. Configuration
```
```
```
```yaml
# config.toml
moniker = "your-node-name"
seeds = "seed1.circlelayer.com,seed2.circlelayer.com"
```
```
```
```

## Operation

### 1. Starting the Node
```
```
```
```bash
# Start node
circlelayer start

# Check status
circlelayer status
```
```
```
```

### 2. Syncing
- Initial sync
- State sync
- Fast sync
- Archive node

### 3. Maintenance
- Regular updates
- Backup data
- Monitor resources
- Check logs

## Monitoring

### 1. Basic Monitoring
```
```
```
```bash
# Check sync status
circlelayer status

# View logs
tail -f ~/.circlelayer/logs/node.log
```
```
```
```

### 2. Advanced Monitoring
- Prometheus metrics
- Grafana dashboards
- Alert manager
- Log aggregation

### 3. Health Checks
- Node status
- Sync status
- Resource usage
- Network connectivity

## Troubleshooting

### 1. Common Issues
- Sync problems
- Resource constraints
- Network issues
- Configuration errors

### 2. Solutions
- Check logs
- Verify config
- Update software
- Contact support

### 3. Recovery
- Backup restore
- State reset
- Re-sync
- Emergency procedures
```