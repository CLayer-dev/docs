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

#### Detailed Port Configuration
Circle Layer requires specific ports to be open and properly configured:

```bash
# Required Ports for Circle Layer Node
# 26656 - P2P communication between nodes
# 26657 - RPC endpoint for client connections  
# 26658 - API endpoint for REST queries
# 26659 - gRPC endpoint (optional)
# 26660 - Prometheus metrics (optional)

# Open required ports
sudo ufw allow 26656/tcp comment 'Circle Layer P2P'
sudo ufw allow 26657/tcp comment 'Circle Layer RPC'
sudo ufw allow 26658/tcp comment 'Circle Layer API'
sudo ufw allow 26659/tcp comment 'Circle Layer gRPC'
sudo ufw allow 26660/tcp comment 'Circle Layer Metrics'
```

#### config.toml Configuration
```toml
# Circle Layer Node Configuration

# Node Identity
moniker = "your-node-name"
proxy_app = "tcp://127.0.0.1:26658"
priv_validator_key_file = "config/priv_validator_key.json"
priv_validator_state_file = "data/priv_validator_state.json"
node_key_file = "config/node_key.json"
abci = "socket"
filter_peers = false

# Network Configuration
[p2p]
laddr = "tcp://0.0.0.0:26656"
external_address = ""
seeds = "seed1.circlelayer.com:26656,seed2.circlelayer.com:26656"
persistent_peers = ""
upnp = false
addr_book_file = "config/addrbook.json"
addr_book_strict = true
max_num_inbound_peers = 40
max_num_outbound_peers = 10
seed_mode = false
pex = true
allow_duplicate_ip = false

# RPC Configuration
[rpc]
laddr = "tcp://0.0.0.0:26657"
cors_allowed_origins = ["*"]
cors_allowed_methods = ["HEAD", "GET", "POST"]
cors_allowed_headers = ["Origin", "Accept", "Content-Type", "X-Requested-With"]
grpc_laddr = ""
grpc_max_open_connections = 900
unsafe = false
max_open_connections = 900
max_subscription_clients = 100
max_subscriptions_per_client = 5

# Consensus Configuration
[consensus]
wal_file = "data/cs.wal/wal"
timeout_propose = "3s"
timeout_propose_delta = "500ms"
timeout_prevote = "1s"
timeout_prevote_delta = "500ms"
timeout_precommit = "1s"
timeout_precommit_delta = "500ms"
timeout_commit = "3s"
double_sign_check_height = 0
skip_timeout_commit = false
create_empty_blocks = true
create_empty_blocks_interval = "3s"

# Storage Configuration
[storage]
discard_abci_responses = false

# Transaction Indexer
[tx_index]
indexer = "kv"

# Instrumentation
[instrumentation]
prometheus = true
prometheus_listen_addr = ":26660"
max_open_connections = 3
namespace = "circlelayer"
```

#### app.toml Configuration
```toml
# Circle Layer Application Configuration

# Base Configuration
minimum-gas-prices = "0.000021aclayer"
pruning = "default"
pruning-keep-recent = "100"
pruning-keep-every = "0"
pruning-interval = "10"
halt-height = 0
halt-time = 0
min-retain-blocks = 0
inter-block-cache = true

# API Configuration
[api]
enable = true
swagger = true
address = "tcp://0.0.0.0:1317"
max-open-connections = 1000
rpc-read-timeout = 10
rpc-write-timeout = 0
rpc-max-body-bytes = 1000000
enabled-unsafe-cors = false

# gRPC Configuration
[grpc]
enable = true
address = "0.0.0.0:9090"
max-recv-msg-size = "10485760"
max-send-msg-size = "2147483647"

# State Sync Configuration
[state-sync]
snapshot-interval = 1000
snapshot-keep-recent = 2
```

#### System Management Configuration
```bash
# Create systemd service file for automated management
sudo tee /etc/systemd/system/circlelayer.service > /dev/null <<EOF
[Unit]
Description=Circle Layer Node
After=network-online.target

[Service]
User=$USER
ExecStart=/usr/local/bin/circlelayer start
Restart=always
RestartSec=3
LimitNOFILE=65535
Environment="DAEMON_HOME=$HOME/.circlelayer"
Environment="DAEMON_NAME=circlelayer"
Environment="DAEMON_ALLOW_DOWNLOAD_BINARIES=false"

[Install]
WantedBy=multi-user.target
EOF

# Enable and start service
sudo systemctl daemon-reload
sudo systemctl enable circlelayer.service
sudo systemctl start circlelayer.service
```

#### Network Specifications
```bash
# Network Performance Targets
# Block Time: 3 seconds
# Transaction Finality: 1-3 seconds
# Minimum Gas Price: 0.000021 CLAYER
# Block Gas Limit: 10,000,000,000,000
# Chain ID: 28525 (testnet)

# Network Connectivity Requirements
# Bandwidth: Minimum 100 Mbps symmetric
# Latency: <100ms to other validators
# Uptime: Target 99.95%
# Connection Limit: Support 1000+ concurrent connections
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