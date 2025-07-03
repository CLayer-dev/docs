---
sidebar_position: 1
title: Becoming a Validator
description: Learn how to become a validator on Circle Layer and help secure the network
---

# Becoming a Validator

Learn how to become a validator on Circle Layer and help secure the network while earning rewards.

## Overview

Circle Layer validators play a crucial role in securing the network through Delegated Proof of Stake (DPoS) consensus. Validators are responsible for producing blocks, validating transactions, and maintaining network security.

## Requirements

### Hardware Requirements

#### Minimum Requirements
- **CPU:** 8 cores
- **RAM:** 16GB
- **Storage:** SSD with IOPS > 5,000
- **Network:** 100 Mbps symmetric
- **OS:** Linux (Ubuntu 20.04+)

#### Recommended Requirements
- **CPU:** 16 cores
- **RAM:** 32GB
- **Storage:** NVMe SSD with IOPS > 5,000
- **Network:** 1 Gbps symmetric

#### Critical Requirements
- **SSD is required** - Traditional HDDs will not work
- **External IP Address** - Static public IP recommended
- **Port TCP/UDP: 32668** - Must be open and accessible

### Software Requirements
- **Golang** 1.19+ (for compilation)
- **Git** for source code
- **systemd** for service management

### Token Requirements
- **Testnet Minimum Stake**: 32 CLAYER
- **Mainnet Minimum Stake**: 100,000 CLAYER
- **Additional for operations** and emergency fund

## Network Configuration

### Required Ports

```bash
# Open required port for Circle Layer
sudo ufw allow 32668/tcp
sudo ufw allow 32668/udp

# Optional: Allow RPC access (only if needed externally)
sudo ufw allow 8545/tcp
sudo ufw allow 8546/tcp

# Allow SSH for management
sudo ufw allow 22/tcp

# Enable firewall
sudo ufw enable
```

### Network Specifications
- **Primary Port**: 32668 (TCP/UDP)
- **RPC Port**: 8545 (HTTP)
- **WebSocket Port**: 8546 (WS)
- **Minimum Active Validators**: 5 validators required for security
- **Maximum Active Validators**: 21 (testnet), 10,000 (mainnet)

## Economic Parameters

### Gas & Fees
- **Minimum Gas Price**: 0.000021 CLAYER
- **Block Gas Limit**: 10,000,000,000,000 per block
- **Fee Calculation**: gas price × gas amount (Ethereum standard)

### Validator Rewards
- **Reward Token**: CLAYER
- **Fee Share**: 30% of gas fees
- **Burn Mechanism**: 25% from gas fees (maximum 1,000,000 CLAYER)
- **Delegator Share**: 45% of gas fees

## Setup Process

### 1. Download and Compile

```bash
# Clone the repository
git clone https://github.com/Circle-layer-org/testnet-core-blockchain
cd /path/to/core-blockchain

# Compile the node
make geth

# Binary will be available at build/bin/geth
```

### 2. Directory Setup

```bash
# Create directory structure
sudo mkdir -p /data/circlelayer/{data,logs}
sudo chown -R $USER:$USER /data/circlelayer

# Copy compiled binary
sudo cp build/bin/geth /data/circlelayer/geth-linux-amd64
sudo chmod +x /data/circlelayer/geth-linux-amd64
```

### 3. Configuration

Create the validator configuration file at `/data/circlelayer/config.toml`:

```toml
[Eth]
SyncMode = "fast"
DiscoveryURLs = []
TrieCleanCacheRejournal = 300000000000

[Eth.Miner]
GasFloor = 8000000
GasCeil = 8000000
GasPrice = 0
Recommit = 3000000000
Noverify = false

[Eth.Ethash]
CacheDir = "ethash"
CachesInMem = 2
CachesOnDisk = 3
CachesLockMmap = false
DatasetDir = "/data/circlelayer/data/.ethash"
DatasetsInMem = 1
DatasetsOnDisk = 2
DatasetsLockMmap = false
PowMode = 0

[Eth.TxPool]
Locals = []
NoLocals = false
Journal = "transactions.rlp"
Rejournal = 3600000000000
PriceLimit = 1
PriceBump = 10
AccountSlots = 16
GlobalSlots = 4096
AccountQueue = 64
GlobalQueue = 1024
Lifetime = 10800000000000

[Node]
DataDir = "/data/circlelayer/data"
InsecureUnlockAllowed = true
NoUSB = true
IPCPath = "geth.ipc"
HTTPHost = "0.0.0.0"
HTTPPort = 8545
HTTPCors = ["*"]
HTTPVirtualHosts = ["*"]
HTTPModules = ['eth', 'net', 'web3']

WSHost = "0.0.0.0"
WSPort = 8546
WSModules = ['eth', 'net', 'web3']

GraphQLVirtualHosts = ["localhost"]

[Node.P2P]
MaxPeers = 50
NoDiscovery = false
ListenAddr = "32668"
EnableMsgEvents = false

[Node.HTTPTimeouts]
ReadTimeout = 30000000000
WriteTimeout = 30000000000
IdleTimeout = 120000000000
```

### 4. Startup Script

Create `/data/circlelayer/run.sh`:

```bash
#!/usr/bin/env bash
/data/circlelayer/geth-linux-amd64 \
--config /data/circlelayer/config.toml  \
--logpath /data/circlelayer/logs \
--verbosity 3  >> /data/circlelayer/logs/systemd_chain_console.out 2>&1
```

Make it executable:
```bash
chmod +x /data/circlelayer/run.sh
```

### 5. Network Selection

#### Testnet (Default for Testing)
```bash
#!/usr/bin/env bash
/data/circlelayer/geth-linux-amd64 \
--config /data/circlelayer/config.toml  \
--testnet \
--logpath /data/circlelayer/logs \
--verbosity 3  >> /data/circlelayer/logs/systemd_chain_console.out 2>&1
```

#### Mainnet (Production)
```bash
#!/usr/bin/env bash
/data/circlelayer/geth-linux-amd64 \
--config /data/circlelayer/config.toml  \
--logpath /data/circlelayer/logs \
--verbosity 3  >> /data/circlelayer/logs/systemd_chain_console.out 2>&1
```

### 6. Service Management

Create systemd service at `/etc/systemd/system/circlelayer.service`:

```ini
[Unit]
Description=circlelayer Blockchain service

[Service]
Type=simple
ExecStart=/bin/sh /data/circlelayer/run.sh

Restart=on-failure
RestartSec=5s

LimitNOFILE=65536

[Install]
WantedBy=multi-user.target
```

Enable and start the service:

```bash
# Reload systemd configuration
sudo systemctl daemon-reload

# Enable service to start on boot
sudo systemctl enable circlelayer.service

# Start the service
sudo systemctl start circlelayer.service

# Check service status
sudo systemctl status circlelayer.service
```

## Monitoring

### 1. Node Status

```bash
# Check if process is running
ps aux | grep geth

# Check service status
sudo systemctl status circlelayer.service

# View service logs
sudo journalctl -u circlelayer.service -f

# Real-time log monitoring
tail -f /data/circlelayer/logs/systemd_chain_console.out
```

### 2. RPC Commands

```bash
# Get current block number
curl -H "Content-Type: application/json" \
  -X POST --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}' \
  http://localhost:8545

# Check peer count
curl -H "Content-Type: application/json" \
  -X POST --data '{"jsonrpc":"2.0","method":"net_peerCount","params":[],"id":1}' \
  http://localhost:8545

# Check sync status
curl -H "Content-Type: application/json" \
  -X POST --data '{"jsonrpc":"2.0","method":"eth_syncing","params":[],"id":1}' \
  http://localhost:8545
```

### 3. Performance Metrics

Monitor these key metrics:
- **CPU usage**: Should be below 80%
- **Memory usage**: Monitor RAM consumption
- **Network traffic**: Track P2P connections
- **Block production**: Every 3 seconds
- **Disk I/O**: Monitor SSD performance

### 4. Health Checks

```bash
# Check disk space
df -h /data/circlelayer

# Check memory usage  
free -h

# Monitor network connectivity
netstat -tlnp | grep 32668

# Check system resources
top -p $(pgrep geth)
```

## Security Considerations

### File Permissions

```bash
# Create dedicated user
sudo useradd -r -s /bin/false circlelayer

# Set ownership
sudo chown -R circlelayer:circlelayer /data/circlelayer

# Set secure permissions
sudo chmod 755 /data/circlelayer
sudo chmod 600 /data/circlelayer/config.toml
sudo chmod 755 /data/circlelayer/run.sh
```

### Network Security

- Use firewall to restrict access
- Only expose necessary ports (32668)
- Consider VPN for remote management
- Monitor for unusual activity
- Keep system updated

### Backup Strategy

```bash
# Backup critical files
tar -czf validator-backup-$(date +%Y%m%d).tar.gz \
    /data/circlelayer/config.toml \
    /data/circlelayer/data/keystore/ \
    /etc/systemd/system/circlelayer.service
```

## Troubleshooting

### Common Issues

#### Sync Problems
```bash
# Check peer connections
curl -H "Content-Type: application/json" \
  -X POST --data '{"jsonrpc":"2.0","method":"net_peerCount","params":[],"id":1}' \
  http://localhost:8545

# Restart service if stuck
sudo systemctl restart circlelayer.service
```

#### Port Issues
```bash
# Test port connectivity
telnet <your-ip> 32668

# Check if port is open
sudo netstat -tlnp | grep 32668

# Verify firewall
sudo ufw status
```

#### Performance Issues
```bash
# Check system resources
top -p $(pgrep geth)

# Monitor disk I/O
sudo iotop -a

# Check memory
free -h
```

## Validator Operations

### Starting Your Validator

1. **Initial Setup**: Complete node installation and configuration
2. **Sync Network**: Let node fully sync with the network
3. **Stake Tokens**: Stake minimum required CLAYER tokens
4. **Monitor Performance**: Ensure consistent uptime and performance
5. **Community Engagement**: Join validator community channels

### Best Practices

#### Security
- Configure required ports only (32668)
- Regular security updates
- Backup validator keys
- Monitor logs continuously
- Use dedicated hardware

#### Performance
- Use recommended hardware specifications
- Regular maintenance schedules
- Monitor system metrics
- Keep software updated
- Optimize disk performance

#### Operations
- 24/7 monitoring setup
- Automated backup procedures
- Emergency response procedures
- Community support channels
- Performance optimization

## Getting Help

For validator support:
- Check the [official documentation](/)
- Join [community forums](/community/social-media)
- Review [GitHub issues](https://github.com/Circle-layer-org/testnet-core-blockchain/issues)
- Monitor network status and announcements

### Command Reference

```bash
# Get all available options
./build/bin/geth --help

# Or short form
./build/bin/geth -h
```

For detailed command-line options, refer to [Geth Command-line Options](https://geth.ethereum.org/docs/interface/command-line-options).

---

## Next Steps

After setting up your validator:
- Learn about [node monitoring](/nodes-validation/node-monitoring)
- Review [security best practices](/nodes-validation/node-security)
- Understand [deployment strategies](/nodes-validation/node-deployment)