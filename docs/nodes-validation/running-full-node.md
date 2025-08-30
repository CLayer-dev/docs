---
sidebar_position: 2
title: Running a Full Node
description: Complete guide for operating Core Layer blockchain full nodes
---

# Running a Full Node

Learn how to run and operate a full node on Core Layer blockchain network.

## Overview

Core Layer is an Ethereum-compatible blockchain that uses Geth (Go Ethereum) as its base. Running a full node allows you to participate in the network, validate transactions, and support decentralization.

## Prerequisites

### System Requirements

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

## Node Setup

### 1. Download and Compile

```bash
# Clone the repository
git clone https://github.com/circlelayer/testnet-core-blockchain
cd /path/to/core-blockchain

# Compile the node
make geth

# Binary will be available at build/bin/geth
```

### 2. Directory Structure

Create the recommended directory structure:

```bash
sudo mkdir -p /data/circlelayer/{data,logs}
sudo chown -R $USER:$USER /data/circlelayer
```

Expected structure:
```
/data/circlelayer/
├── geth-linux-amd64          # Compiled binary
├── config.toml               # Node configuration
├── run.sh                    # Startup script
├── data/                     # Blockchain data
│   ├── geth/                 # Node data
│   └── .ethash/              # Ethash cache
└── logs/                     # Log files
    └── systemd_chain_console.out
```

### 3. Configuration

#### config.toml

Create the main configuration file at `/data/circlelayer/config.toml`:

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

#### Sync Mode Options

**Fast Sync (Recommended)**
```toml
SyncMode = "fast"
```
Downloads block headers and recent state data for faster initial sync.

**Full Sync (Complete History)**
```toml
SyncMode = "full"
```
Downloads and validates all blocks from genesis.

## Running the Node

### 1. Startup Script

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

### 2. Network Selection

**Mainnet (Default)**
```bash
# No additional flags needed - connects to mainnet by default
/data/circlelayer/run.sh
```

**Testnet**
```bash
# Add --testnet flag to connect to testnet
#!/usr/bin/env bash
/data/circlelayer/geth-linux-amd64 \
--config /data/circlelayer/config.toml  \
--testnet \
--logpath /data/circlelayer/logs \
--verbosity 3  >> /data/circlelayer/logs/systemd_chain_console.out 2>&1
```

### 3. Archive Node

For complete historical data:

```bash
#!/usr/bin/env bash
/data/circlelayer/geth-linux-amd64 \
--config /data/circlelayer/config.toml  \
--logpath /data/circlelayer/logs \
--syncmode full \
--gcmode archive \
--verbosity 3  >> /data/circlelayer/logs/systemd_chain_console.out 2>&1
```

## Service Management

### systemd Configuration

Create `/etc/systemd/system/circlelayer.service`:

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

### Service Commands

```bash
# Reload systemd configuration
sudo systemctl daemon-reload

# Enable service to start on boot
sudo systemctl enable circlelayer.service

# Start the service
sudo systemctl start circlelayer.service

# Check service status
sudo systemctl status circlelayer.service

# View service logs
sudo journalctl -u circlelayer.service -f

# Stop the service
sudo systemctl stop circlelayer.service

# Restart the service
sudo systemctl restart circlelayer.service
```

## Network Configuration

### Firewall Setup

```bash
# Open required port
sudo ufw allow 32668/tcp
sudo ufw allow 32668/udp

# Or with iptables
sudo iptables -A INPUT -p tcp --dport 32668 -j ACCEPT
sudo iptables -A INPUT -p udp --dport 32668 -j ACCEPT
```

### API Access (Optional)

If you need external API access:

```bash
# Allow RPC port (use with caution)
sudo ufw allow 8545/tcp

# Allow WebSocket port
sudo ufw allow 8546/tcp
```

**Warning:** Only open API ports if absolutely necessary and implement proper security measures.

## Monitoring and Maintenance

### Health Checks

```bash
# Check if node process is running
ps aux | grep geth

# Check network connectivity
netstat -tlnp | grep 32668

# Check disk space
df -h /data/circlelayer

# Check memory usage
free -h
```

### Log Monitoring

```bash
# Real-time log monitoring
tail -f /data/circlelayer/logs/systemd_chain_console.out

# Search for errors
grep -i error /data/circlelayer/logs/systemd_chain_console.out

# Check sync status
grep -i "block" /data/circlelayer/logs/systemd_chain_console.out | tail -20
```

### RPC Commands

Check node status using RPC:

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

### Performance Monitoring

```bash
# Monitor system resources
top -p $(pgrep geth)

# Check I/O performance
iostat -x 1

# Monitor network connections
ss -tulpn | grep 32668
```

## Troubleshooting

### Common Issues

#### Sync Problems
```bash
# Check peer connections
curl -H "Content-Type: application/json" \
  -X POST --data '{"jsonrpc":"2.0","method":"net_peerCount","params":[],"id":1}' \
  http://localhost:8545

# Restart sync if stuck
sudo systemctl restart circlelayer.service
```

#### Performance Issues
```bash
# Check system resources
top -p $(pgrep geth)
iostat -x 1

# Check disk IOPS
sudo iotop -a
```

#### Connection Issues
```bash
# Test port connectivity
telnet <your-ip> 32668

# Check firewall
sudo ufw status
sudo iptables -L
```

#### Storage Issues
```bash
# Check disk space
df -h /data/circlelayer

# Check inode usage
df -i /data/circlelayer

# Monitor disk performance
sudo iotop
```

### Getting Help

For additional support:
- Check the [official documentation](/)
- Join the [community forums](/community/social-media)
- Review [GitHub issues](https://github.com/circlelayer/testnet-core-blockchain/issues)

### Command Reference

```bash
# Get all available options
./build/bin/geth --help

# Or short form
./build/bin/geth -h
```

For detailed command-line options, refer to [Geth Command-line Options](https://geth.ethereum.org/docs/interface/command-line-options).

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
- Only expose necessary ports
- Consider VPN for remote management
- Monitor for unusual activity
- Keep system updated

## Backup and Recovery

### Important Files to Backup

```bash
# Backup configuration and keystore
tar -czf circlelayer-backup-$(date +%Y%m%d).tar.gz \
    /data/circlelayer/config.toml \
    /data/circlelayer/data/keystore/ \
    /etc/systemd/system/circlelayer.service
```

### Recovery Procedures

```bash
# Stop service
sudo systemctl stop circlelayer.service

# Restore from backup
tar -xzf circlelayer-backup-YYYYMMDD.tar.gz -C /

# Restart service
sudo systemctl start circlelayer.service
```

---

## Next Steps

After your node is running successfully:
- Set up [monitoring](/nodes-validation/node-monitoring)
- Implement [security best practices](/nodes-validation/node-security)
- Consider [becoming a validator](/nodes-validation/becoming-validator)