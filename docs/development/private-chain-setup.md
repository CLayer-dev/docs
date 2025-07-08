---
id: private-chain-setup
title: Private Chain Setup
sidebar_label: Private Chain Setup
sidebar_position: 9
description: Guide for setting up private Circle Layer blockchain networks for enterprise and development use.
---

# Private Chain Setup

Setting up a private Circle Layer blockchain network enables enterprises and development teams to create isolated environments for testing, development, and internal applications while maintaining full control over the network.

## Overview

A private Circle Layer chain provides:
- **Complete Control**: Full control over validator nodes and network parameters
- **Privacy**: Isolated network not connected to public testnet/mainnet
- **Customization**: Ability to modify consensus parameters, gas limits, and block times
- **Development Environment**: Perfect for testing and development workflows
- **Enterprise Solutions**: Internal blockchain applications and processes

## Prerequisites

### System Requirements

**Minimum Requirements**:
- **CPU**: 4+ cores
- **RAM**: 8GB+ 
- **Storage**: 100GB+ SSD
- **Network**: Stable internet connection
- **OS**: Ubuntu 20.04+, CentOS 8+, or macOS 12+

**Recommended for Production**:
- **CPU**: 8+ cores
- **RAM**: 16GB+
- **Storage**: 500GB+ SSD
- **Network**: High-speed connection with low latency
- **Backup**: Redundant storage solutions

### Software Dependencies

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install -y curl wget git build-essential golang-go

# CentOS/RHEL
sudo yum update
sudo yum install -y curl wget git gcc gcc-c++ make golang

# macOS
brew install curl wget git go
```

## Installation

### 1. Download and Compile Circle Layer

```bash
# Clone the Circle Layer blockchain source code
git clone https://github.com/circlelayer/testnet-core-blockchain.git

# Navigate to the project directory
cd Core-Blockchain

# Compile the geth binary
make geth
```

After compilation is completed, the generated binary will be in the `build/bin` folder.

### 2. Verify Installation

```bash
# Check if compilation was successful
./build/bin/geth --help
```

## Quick Start

### 1. Prepare Validator Account(s)

According to the number of miner nodes, prepare corresponding validator account(s).

```bash
# Create directory for private chain
mkdir -p ~/private-circlelayer
cd ~/private-circlelayer

# Create a new account
./path/to/Core-Blockchain/build/bin/geth account new --datadir data

# Store password in a text file for convenience
echo "your-password" > password.txt
```

After creating an account, note the address of the new account. You can also find it in the `UTC-**` file under the `data/keystore` path.

### 2. Configure Genesis

Create a custom `genesis.json` configuration:

```json
{
  "config": {
    "chainId": 12345,
    "homesteadBlock": 0,
    "eip150Block": 0,
    "eip150Hash": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "eip155Block": 0,
    "eip158Block": 0,
    "byzantiumBlock": 0,
    "constantinopleBlock": 0,
    "petersburgBlock": 0,
    "istanbulBlock": 0,
    "muirGlacierBlock": 0,
    "berlinBlock": 0,
    "londonBlock": 0,
    "congress": {
      "period": 3,
      "epoch": 100
    }
  },
  "nonce": "0x0",
  "timestamp": "0x683698D4",
  "extraData": "0x00000000000000000000000000000000000000000000000000000000000000007b3a3e7c7a6b4d8e2f1a9c5d7b9e2f4a6c8e1d3f0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
  "gasLimit": "0xffffffffffffffff",
  "difficulty": "0x1",
  "mixHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
  "coinbase": "0x7b3a3e7c7a6b4d8e2f1a9c5d7b9e2f4a6c8e1d3f",
  "number": "0x0",
  "gasUsed": "0x0",
  "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
  "alloc": {
    "0x7b3a3e7c7a6b4d8e2f1a9c5d7b9e2f4a6c8e1d3f": {
      "balance": "1000000000000000000000000000"
    }
  }
}
```

**Note**: Replace `0x7b3a3e7c7a6b4d8e2f1a9c5d7b9e2f4a6c8e1d3f` with your actual validator address in both `extraData` and `alloc` sections.

### 3. Create Genesis Block

After generating the `genesis.json` file, execute the following command to generate the genesis block:

```bash
./path/to/Core-Blockchain/build/bin/geth init genesis.json --datadir data
```

### 4. Start Private Node

```bash
# Start the private chain
./path/to/Core-Blockchain/build/bin/geth \
    --datadir ./data \
    --networkid 12345 \
    --http \
    --http.addr "0.0.0.0" \
    --http.port 8545 \
    --http.api "eth,net,web3,personal,miner" \
    --ws \
    --ws.addr "0.0.0.0" \
    --ws.port 8546 \
    --ws.api "eth,net,web3" \
    --mine \
    --miner.threads 1 \
    --unlock "0x7b3a3e7c7a6b4d8e2f1a9c5d7b9e2f4a6c8e1d3f" \
    --password password.txt
```

## Advanced Configuration

### Multi-Node Setup

Use the same `genesis.json` file for initializing each node. Then use the geth console to manage peer connections.

#### Node 1 (Bootnode)
```bash
# Start first node
./path/to/Core-Blockchain/build/bin/geth \
    --datadir ./node1 \
    --networkid 12345 \
    --port 30303 \
    --http \
    --http.port 8545 \
    --mine
```

#### Node 2 (Peer)
```bash
# Start second node
./path/to/Core-Blockchain/build/bin/geth \
    --datadir ./node2 \
    --networkid 12345 \
    --port 30304 \
    --http \
    --http.port 8546
```

#### Connect Nodes
```bash
# Connect to first node console
./path/to/Core-Blockchain/build/bin/geth attach http://localhost:8545

# Get node info
admin.nodeInfo.enode

# On second node, add the first node as peer
admin.addPeer("enode://[bootnode-enode-url]@127.0.0.1:30303")
```

### Configuration File Setup

For production deployments, create a `config.toml` file:

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

Then start with the configuration file:

```bash
./path/to/Core-Blockchain/build/bin/geth --config config.toml
```

## Network Connection

By default, the node will attempt to connect to the mainnet. To connect to different networks:

- **Testnet**: Add `--testnet` flag
- **Private Network**: Use `--networkid` with your custom chain ID

## Security Considerations

1. **Private Keys**: Store validator private keys securely
2. **Network Access**: Restrict RPC access to trusted IPs
3. **Firewall**: Configure appropriate firewall rules
4. **Backup**: Regular backup of blockchain data and keys
5. **Monitoring**: Implement monitoring for node health and performance

## Troubleshooting

### Common Issues

1. **Compilation Errors**: Ensure Go is properly installed and version is compatible
2. **Network Connectivity**: Check firewall and network configurations
3. **Genesis Mismatch**: Ensure all nodes use the same genesis.json file
4. **Account Unlock**: Verify password file and account permissions

### Debug Mode

To run with debug logging:

```bash
./path/to/Core-Blockchain/build/bin/geth --verbosity 4 [other-flags]
```

## Additional Resources

- [Circle Layer Development Guide](./deploying-contracts.md)
- [Smart Contract Deployment](./writing-smart-contracts.md)
- [Web3 Integration](./web3-integration.md) 