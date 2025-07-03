---
sidebar_position: 4
---

# Node Monitoring

## Overview

Learn how to monitor your Circle Layer node effectively.

## Monitoring Setup

### 1. Basic Monitoring
```bash
# Check node status
circlelayer status

# View logs
tail -f ~/.circlelayer/logs/node.log

# Check resource usage
htop
```
```
```
```

### 2. Prometheus Setup
```
```
```
```yaml
# prometheus.yml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'circlelayer'
    static_configs:
      - targets: ['localhost:26660']
```
```
```
```

### 3. Grafana Dashboard
```
```
```
```json
{
  "dashboard": {
    "panels": [
      {
        "title": "Node Status",
        "type": "stat",
        "targets": [
          {
            "expr": "circlelayer_node_status"
          }
        ]
      },
      {
        "title": "Resource Usage",
        "type": "graph",
        "targets": [
          {
            "expr": "node_cpu_seconds_total"
          }
        ]
      }
    ]
  }
}
```
```
```
```

## Key Metrics

### 1. Node Health
- Sync status
- Block height
- Validator status
- Peer count

### 2. Performance
- CPU usage
- Memory usage
- Disk I/O
- Network traffic

### 3. Network
- Peer connections
- Block propagation
- Transaction throughput
- Gas usage

## Alerting

### 1. Alert Rules
```
```
```
```yaml
# alert-rules.yml
groups:
  - name: node_alerts
    rules:
      - alert: NodeDown
        expr: circlelayer_node_status == 0
        for: 5m
        labels:
          severity: critical
      
      - alert: HighCPU
        expr: node_cpu_seconds_total > 80
        for: 5m
        labels:
          severity: warning
```
```
```
```

### 2. Notification Channels
- Email
- Slack
- Telegram
- PagerDuty

### 3. Alert Management
- Severity levels
- Response procedures
- Escalation paths
- Documentation

## Logging

### 1. Log Configuration
```
```
```
```yaml
# log-config.yml
logging:
  level: info
  format: json
  output: file
  path: /var/log/circlelayer/node.log
```
```
```
```

### 2. Log Analysis
- Error tracking
- Performance analysis
- Security monitoring
- Usage patterns

### 3. Log Management
- Rotation
- Retention
- Backup
- Archival

## Maintenance

### 1. Regular Checks
- Metric review
- Alert testing
- Log analysis
- System health

### 2. Optimization
- Resource tuning
- Performance optimization
- Alert refinement
- Log management

### 3. Documentation
- Monitoring setup
- Alert procedures
- Response plans
- Maintenance logs
```