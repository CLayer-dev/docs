---
sidebar_position: 4
---

# Node Monitoring

## Overview

Learn how to monitor your Circle Layer node effectively using the correct Geth-based monitoring tools and approaches.

## Monitoring Setup

### 1. Basic Node Monitoring

```bash
# Check if node process is running
ps aux | grep geth

# Check service status (if using systemd)
sudo systemctl status circlelayer.service

# View real-time logs
tail -f /data/circlelayer/logs/systemd_chain_console.out

# Check sync status via RPC
curl -H "Content-Type: application/json" \
  -X POST --data '{"jsonrpc":"2.0","method":"eth_syncing","params":[],"id":1}' \
  http://localhost:8545

# Check current block number
curl -H "Content-Type: application/json" \
  -X POST --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}' \
  http://localhost:8545

# Check peer count
curl -H "Content-Type: application/json" \
  -X POST --data '{"jsonrpc":"2.0","method":"net_peerCount","params":[],"id":1}' \
  http://localhost:8545
```

### 2. System Resource Monitoring

```bash
# Check memory usage
free -h

# Check disk space (important for SSD requirements)
df -h /data/circlelayer

# Monitor CPU usage
top -p $(pgrep geth)

# Check network connectivity
netstat -tlnp | grep 32668

# Monitor disk I/O (critical for SSD performance)
sudo iotop -a
```

### 3. Prometheus Integration

```yaml
# prometheus.yml - Updated for Geth metrics
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'circlelayer-geth'
    static_configs:
      - targets: ['localhost:6060']  # Geth metrics endpoint
    metrics_path: '/debug/metrics/prometheus'
    
  - job_name: 'node-exporter'
    static_configs:
      - targets: ['localhost:9100']  # System metrics
```

### 4. Grafana Dashboard Configuration

```json
{
  "dashboard": {
    "title": "Circle Layer Node Dashboard",
    "panels": [
      {
        "title": "Block Height",
        "type": "stat",
        "targets": [
          {
            "expr": "geth_chain_head_block",
            "legendFormat": "Current Block"
          }
        ]
      },
      {
        "title": "Peer Count",
        "type": "stat",
        "targets": [
          {
            "expr": "geth_p2p_peers",
            "legendFormat": "Connected Peers"
          }
        ]
      },
      {
        "title": "Transaction Pool",
        "type": "graph",
        "targets": [
          {
            "expr": "geth_txpool_pending",
            "legendFormat": "Pending Transactions"
          },
          {
            "expr": "geth_txpool_queued", 
            "legendFormat": "Queued Transactions"
          }
        ]
      },
      {
        "title": "CPU Usage",
        "type": "graph",
        "targets": [
          {
            "expr": "100 - (avg by (instance) (rate(node_cpu_seconds_total{mode=\"idle\"}[5m])) * 100)",
            "legendFormat": "CPU Usage %"
          }
        ]
      },
      {
        "title": "Memory Usage",
        "type": "graph", 
        "targets": [
          {
            "expr": "geth_system_memory_allocs",
            "legendFormat": "Memory Allocations"
          }
        ]
      },
      {
        "title": "Disk I/O",
        "type": "graph",
        "targets": [
          {
            "expr": "rate(node_disk_io_time_seconds_total[5m])",
            "legendFormat": "Disk I/O Time"
          }
        ]
      }
    ]
  }
}
```

## Key Metrics

### 1. Node Health Indicators

#### Sync Status
```bash
# Check if node is syncing
curl -X POST -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"eth_syncing","params":[],"id":1}' \
  http://localhost:8545
```

#### Block Progress
```bash
# Monitor block progression
watch -n 3 'curl -s -X POST -H "Content-Type: application/json" \
  --data "{\"jsonrpc\":\"2.0\",\"method\":\"eth_blockNumber\",\"params\":[],\"id\":1}" \
  http://localhost:8545 | jq -r ".result" | xargs printf "%d\n"'
```

#### Peer Connectivity  
```bash
# Monitor peer connections
curl -X POST -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"net_peerCount","params":[],"id":1}' \
  http://localhost:8545
```

### 2. Performance Metrics

#### Transaction Throughput
- Pending transactions in mempool
- Transaction processing rate
- Gas usage patterns
- Block utilization

#### Resource Usage
- **CPU**: Should stay below 80% average
- **Memory**: Monitor Geth memory allocation
- **Disk**: Critical SSD performance (IOPS > 5,000)
- **Network**: Monitor P2P bandwidth on port 32668

#### Network Performance
- Block propagation time
- Peer discovery efficiency
- Network latency to validators
- Connection stability

### 3. Security Metrics

#### Port Security
```bash
# Verify only required ports are open
sudo nmap -sT -p 32668,8545,8546 localhost

# Check firewall status
sudo ufw status verbose
```

#### Process Security
```bash
# Verify geth process ownership
ps aux | grep geth | grep -v grep

# Check file permissions
ls -la /data/circlelayer/config.toml
```

## Alerting Configuration

### 1. Critical Alerts

```yaml
# alert-rules.yml - Updated for Circle Layer
groups:
  - name: circlelayer_critical
    rules:
      - alert: NodeDown
        expr: up{job="circlelayer-geth"} == 0
        for: 2m
        labels:
          severity: critical
        annotations:
          summary: "Circle Layer node is down"
          description: "Node has been down for more than 2 minutes"
      
      - alert: SyncFalling
        expr: increase(geth_chain_head_block[5m]) < 50
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "Node falling behind in sync"
          description: "Block progression is too slow"
          
      - alert: LowPeerCount
        expr: geth_p2p_peers < 3
        for: 3m
        labels:
          severity: warning
        annotations:
          summary: "Low peer count"
          description: "Node has fewer than 3 peers"

      - alert: HighCPUUsage
        expr: 100 - (avg by (instance) (rate(node_cpu_seconds_total{mode="idle"}[5m])) * 100) > 85
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High CPU usage"
          description: "CPU usage above 85% for 5 minutes"

      - alert: DiskSpaceLow
        expr: (node_filesystem_avail_bytes{mountpoint="/data/circlelayer"} / node_filesystem_size_bytes) * 100 < 20
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: "Low disk space"
          description: "Less than 20% disk space remaining"

      - alert: HighDiskIO
        expr: rate(node_disk_io_time_seconds_total[5m]) > 0.8
        for: 3m
        labels:
          severity: warning
        annotations:
          summary: "High disk I/O"
          description: "Disk I/O time high - SSD performance may be degraded"
```

### 2. Notification Channels

#### Telegram Bot Setup
```bash
# Create notification script
cat > /usr/local/bin/alert-notify.sh << 'EOF'
#!/bin/bash
BOT_TOKEN="YOUR_BOT_TOKEN"
CHAT_ID="YOUR_CHAT_ID"
MESSAGE="$1"

curl -s -X POST "https://api.telegram.org/bot${BOT_TOKEN}/sendMessage" \
  -d chat_id="${CHAT_ID}" \
  -d text="${MESSAGE}"
EOF

chmod +x /usr/local/bin/alert-notify.sh
```

#### Email Alerts
```yaml
# alertmanager.yml
route:
  group_by: ['alertname']
  group_wait: 10s
  group_interval: 10s
  repeat_interval: 1h
  receiver: 'web.hook'

receivers:
  - name: 'web.hook'
    email_configs:
      - to: 'admin@circlelayer.com'
from: 'admin@circlelayer.com'
        subject: 'Circle Layer Node Alert'
        body: |
          {{ range .Alerts }}
          Alert: {{ .Annotations.summary }}
          Description: {{ .Annotations.description }}
          {{ end }}
```

## Advanced Monitoring

### 1. Custom Monitoring Scripts

#### Node Health Check Script
```bash
#!/bin/bash
# /usr/local/bin/node-health-check.sh

LOG_FILE="/data/circlelayer/logs/health-check.log"
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

# Function to log with timestamp
log() {
    echo "[$TIMESTAMP] $1" >> $LOG_FILE
}

# Check if geth process is running
if ! pgrep -f geth > /dev/null; then
    log "ERROR: Geth process not running"
    exit 1
fi

# Check RPC connectivity
if ! curl -f -s http://localhost:8545 > /dev/null; then
    log "ERROR: RPC endpoint not responding"
    exit 1
fi

# Check sync status
SYNC_STATUS=$(curl -s -X POST -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"eth_syncing","params":[],"id":1}' \
  http://localhost:8545 | jq -r '.result')

if [ "$SYNC_STATUS" != "false" ]; then
    log "WARNING: Node is still syncing"
fi

# Check peer count
PEER_COUNT=$(curl -s -X POST -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"net_peerCount","params":[],"id":1}' \
  http://localhost:8545 | jq -r '.result')

PEER_COUNT_DEC=$((PEER_COUNT))
if [ $PEER_COUNT_DEC -lt 3 ]; then
    log "WARNING: Low peer count: $PEER_COUNT_DEC"
fi

log "Health check completed successfully - Peers: $PEER_COUNT_DEC"
```

#### Performance Monitoring Script
```bash
#!/bin/bash
# /usr/local/bin/performance-monitor.sh

METRICS_FILE="/data/circlelayer/logs/performance-metrics.log"
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

# Collect system metrics
CPU_USAGE=$(top -bn1 | grep "Cpu(s)" | awk '{print $2}' | cut -d'%' -f1)
MEMORY_USAGE=$(free | grep Mem | awk '{printf "%.2f", ($3/$2) * 100.0}')
DISK_USAGE=$(df /data/circlelayer | tail -1 | awk '{print $5}' | sed 's/%//')

# Collect geth metrics via RPC
BLOCK_NUMBER=$(curl -s -X POST -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}' \
  http://localhost:8545 | jq -r '.result')
  
PEER_COUNT=$(curl -s -X POST -H "Content-Type: application/json" \
  --data '{"jsonrpc":"2.0","method":"net_peerCount","params":[],"id":1}' \
  http://localhost:8545 | jq -r '.result')

# Log metrics
echo "[$TIMESTAMP] CPU:${CPU_USAGE}% MEM:${MEMORY_USAGE}% DISK:${DISK_USAGE}% BLOCK:$BLOCK_NUMBER PEERS:$PEER_COUNT" >> $METRICS_FILE
```

### 2. Log Analysis

#### Log Parsing and Analysis
```bash
# Monitor error patterns
grep -i "error\|panic\|fatal" /data/circlelayer/logs/systemd_chain_console.out | tail -20

# Monitor connection issues
grep -i "dial\|connection\|timeout" /data/circlelayer/logs/systemd_chain_console.out | tail -10

# Monitor block production
grep -i "imported\|mined" /data/circlelayer/logs/systemd_chain_console.out | tail -10

# Performance patterns
grep -i "slow\|timeout\|delay" /data/circlelayer/logs/systemd_chain_console.out | tail -10
```

#### Log Rotation Configuration
```bash
# Configure logrotate for Circle Layer logs
sudo cat > /etc/logrotate.d/circlelayer << 'EOF'
/data/circlelayer/logs/*.log {
    daily
    rotate 30
    compress
    delaycompress
    missingok
    notifempty
    create 644 circlelayer circlelayer
    postrotate
        systemctl reload circlelayer.service
    endscript
}
EOF
```

## Maintenance Procedures

### 1. Regular Health Checks

#### Daily Checks
```bash
# Create daily monitoring script
#!/bin/bash
# daily-check.sh

echo "=== Circle Layer Node Daily Check ===" 
echo "Date: $(date)"
echo "Node Status: $(systemctl is-active circlelayer.service)"
echo "Disk Usage: $(df -h /data/circlelayer | tail -1 | awk '{print $5}')"
echo "Memory Usage: $(free -h | grep Mem | awk '{print $3 "/" $2}')"
echo "Log Size: $(du -sh /data/circlelayer/logs)"
echo "Last Block: $(curl -s -X POST -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}' http://localhost:8545 | jq -r '.result')"
echo "Peer Count: $(curl -s -X POST -H "Content-Type: application/json" --data '{"jsonrpc":"2.0","method":"net_peerCount","params":[],"id":1}' http://localhost:8545 | jq -r '.result')"
echo "====================================="
```

#### Weekly Maintenance
- Review log files for unusual patterns
- Check system resource trends
- Verify backup procedures
- Update monitoring configurations
- Test alert systems

### 2. Performance Optimization

#### Resource Tuning
```bash
# Optimize system for Circle Layer
echo 'vm.swappiness=10' >> /etc/sysctl.conf
echo 'fs.file-max=2097152' >> /etc/sysctl.conf
echo 'net.core.rmem_max=134217728' >> /etc/sysctl.conf
echo 'net.core.wmem_max=134217728' >> /etc/sysctl.conf

# Apply settings
sysctl -p
```

#### Geth Performance Tuning
- Monitor and adjust cache settings
- Optimize database configuration
- Tune network buffer sizes
- Monitor and manage log levels

### 3. Backup and Recovery

#### Configuration Backup
```bash
# Backup critical files
tar -czf circlelayer-backup-$(date +%Y%m%d).tar.gz \
    /data/circlelayer/config.toml \
    /data/circlelayer/run.sh \
    /etc/systemd/system/circlelayer.service \
    /etc/logrotate.d/circlelayer
```

#### Data Recovery Procedures
- Document chaindata restoration process
- Test backup and recovery procedures
- Maintain emergency contact information
- Document rollback procedures

## Troubleshooting

### Common Issues and Solutions

#### Node Won't Start
```bash
# Check service logs
sudo journalctl -u circlelayer.service -f

# Check configuration
geth --datadir /data/circlelayer/data --config /data/circlelayer/config.toml --check-config

# Check permissions
ls -la /data/circlelayer/
```

#### Sync Issues
```bash
# Force resync (use with caution)
sudo systemctl stop circlelayer.service
rm -rf /data/circlelayer/data/geth/chaindata
sudo systemctl start circlelayer.service
```

#### Performance Issues
```bash
# Check disk performance
sudo hdparm -Tt /dev/sda

# Monitor I/O
sudo iotop -aqqqd 1

# Check network issues
ping -c 4 8.8.8.8
```

For additional support, refer to:
- [Node Security](/nodes-validation/node-security)
- [Node Deployment](/nodes-validation/node-deployment)
- [Running Full Node](/nodes-validation/running-full-node)
```