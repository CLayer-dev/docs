---
sidebar_position: 1
---

# RPC Endpoints

## Overview

Circle Layer provides multiple RPC endpoints for interacting with the network:

## Public Endpoints

### Testnet
```bash
# HTTP RPC
https://testnet-rpc.circlelayer.com

# WebSocket
wss://testnet-rpc.circlelayer.com

# Block Explorer
https://explorer-testnet.circlelayer.com

# Faucet
https://faucet.circlelayer.com

# Faucet API
https://faucet-api.circlelayer.com
```

## Network Configuration

- **Chain ID**: 28525
- **Network Name**: Circle Layer Testnet
- **Currency Symbol**: CLAYER
- **Currency Decimals**: 18
- **Block Time**: 3 seconds
- **Transaction Finality**: 1-3 seconds

## Authentication

API endpoints use standard authentication methods. For detailed authentication methods, refer to the API documentation.

## Rate Limits

Rate limiting information is not currently specified. Please check the API documentation for current limits.

## Smart Contract Examples

### Deployed Example Contract
- **Contract Address**: 0xfCb4Ce5953dE22cbF04d015df88a3a9895E86bEB
- **Source Code**: [View on Explorer](https://explorer-testnet.circlelayer.com/address/0xfCb4Ce5953dE22cbF04d015df88a3a9895E86bEB?tab=contract)
- **ABI**: [Contract ABI](https://explorer-testnet.circlelayer.com/address/0xfCb4Ce5953dE22cbF04d015df88a3a9895E86bEB?tab=contract_abi)
- **Deployment**: Manual Deploy

## Methods

### Standard Ethereum Methods
- eth_getBalance
- eth_sendTransaction
- eth_getTransactionReceipt
- eth_blockNumber

### Circle Layer Specific Methods

#### Validator & Staking Methods
- `clayer_getValidatorInfo(validatorAddress)` - Get validator details and performance metrics
- `clayer_getStakingRewards(delegatorAddress)` - Get staking rewards for a delegator
- `clayer_getNetworkStats()` - Get current network statistics and performance
- `clayer_getValidatorList(status)` - Get list of validators by status (active/jailed/unbonding)
- `clayer_getDelegationInfo(delegatorAddress, validatorAddress)` - Get delegation details
- `clayer_getSlashingInfo(validatorAddress)` - Get validator slashing history and status

#### Network Governance Methods
- `clayer_getGovernanceProposals(status)` - Get governance proposals by status
- `clayer_getVotingPower(address)` - Get voting power for governance
- `clayer_getParameterInfo(parameter)` - Get current network parameter values
- `clayer_getUpgradeInfo()` - Get planned network upgrade information

#### DeFi & Bridge Methods
- `clayer_getBridgeStatus(chainId)` - Get cross-chain bridge status
- `clayer_getTokenInfo(tokenAddress)` - Get token details for bridged assets
- `clayer_getLiquidityPools()` - Get available liquidity pools on native DEX
- `clayer_getPriceFeeds(pair)` - Get price feed data from oracles

#### Security & Compliance Methods
- `clayer_reportSuspiciousActivity(evidence)` - Report suspicious network activity
- `clayer_getIntegrityReport(blockRange)` - Get network integrity report for block range
- `clayer_getComplianceStatus(address)` - Check compliance status of an address
- `clayer_getAuditLog(address, timeRange)` - Get audit log for address activity

#### Performance & Analytics Methods
- `clayer_getNetworkMetrics(timeRange)` - Get detailed network performance metrics
- `clayer_getTxPoolStats()` - Get transaction pool statistics
- `clayer_getValidatorPerformance(address, timeRange)` - Get validator performance history
- `clayer_getGasEstimation(txData)` - Get gas estimation for transaction

## Examples

### Basic Ethereum Methods

#### Get Balance
```javascript
const response = await fetch('https://testnet-rpc.circlelayer.com', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    jsonrpc: '2.0',
    method: 'eth_getBalance',
    params: ['0x742d35Cc6634C0532925a3b8D1b9C07dDE00e6E8', 'latest'],
    id: 1,
  }),
});

const result = await response.json();
console.log('Balance in wei:', result.result);
```

#### Get Transaction Receipt
```javascript
const response = await fetch('https://testnet-rpc.circlelayer.com', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    jsonrpc: '2.0',
    method: 'eth_getTransactionReceipt',
    params: ['0xb903239f8543d04b5dc1ba6579132b143087c68db1b2168786408fcbce568238'],
    id: 1,
  }),
});

const receipt = await response.json();
console.log('Transaction status:', receipt.result.status);
```

### Circle Layer Specific Methods

#### Get Validator Information
```javascript
async function getValidatorInfo(validatorAddress) {
  const response = await fetch('https://testnet-rpc.circlelayer.com', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      method: 'clayer_getValidatorInfo',
      params: [validatorAddress],
      id: 1,
    }),
  });
  
  const result = await response.json();
  return result.result;
}

// Example usage
const validatorInfo = await getValidatorInfo('0x742d35Cc6634C0532925a3b8D1b9C07dDE00e6E8');
console.log('Validator status:', validatorInfo.status);
console.log('Total stake:', validatorInfo.totalStake);
console.log('Commission rate:', validatorInfo.commissionRate);
console.log('Uptime:', validatorInfo.uptime);
```

#### Get Staking Rewards
```javascript
async function getStakingRewards(delegatorAddress) {
  const response = await fetch('https://testnet-rpc.circlelayer.com', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      method: 'clayer_getStakingRewards',
      params: [delegatorAddress],
      id: 1,
    }),
  });
  
  const result = await response.json();
  return result.result;
}

// Example usage
const rewards = await getStakingRewards('0x123...');
console.log('Pending rewards:', rewards.pendingRewards);
console.log('Total earned:', rewards.totalEarned);
console.log('Validators:', rewards.validatorRewards);
```

#### Get Network Statistics
```javascript
async function getNetworkStats() {
  const response = await fetch('https://testnet-rpc.circlelayer.com', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      method: 'clayer_getNetworkStats',
      params: [],
      id: 1,
    }),
  });
  
  const result = await response.json();
  return result.result;
}

// Example usage
const stats = await getNetworkStats();
console.log('Current TPS:', stats.currentTPS);
console.log('Active validators:', stats.activeValidators);
console.log('Total staked:', stats.totalStaked);
console.log('Network uptime:', stats.uptime);
```

### Integrity & Compliance Methods

#### Report Suspicious Activity
```javascript
async function reportSuspiciousActivity(evidence) {
  const response = await fetch('https://testnet-rpc.circlelayer.com', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_API_KEY', // Required for security methods
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      method: 'clayer_reportSuspiciousActivity',
      params: [evidence],
      id: 1,
    }),
  });
  
  const result = await response.json();
  return result.result;
}

// Example usage
const evidence = {
  type: 'double_signing',
  validatorAddress: '0x742d35Cc6634C0532925a3b8D1b9C07dDE00e6E8',
  blockHeight: 1234567,
  evidence: 'encoded_proof_data',
  reporterAddress: '0x123...'
};

const reportId = await reportSuspiciousActivity(evidence);
console.log('Report submitted with ID:', reportId);
```

#### Get Integrity Report
```javascript
async function getIntegrityReport(startBlock, endBlock) {
  const response = await fetch('https://testnet-rpc.circlelayer.com', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      method: 'clayer_getIntegrityReport',
      params: [{ start: startBlock, end: endBlock }],
      id: 1,
    }),
  });
  
  const result = await response.json();
  return result.result;
}

// Example usage
const report = await getIntegrityReport(1234500, 1234600);
console.log('Blocks analyzed:', report.blocksAnalyzed);
console.log('Issues found:', report.issuesFound);
console.log('Security score:', report.securityScore);
console.log('Anomalies:', report.anomalies);
```

#### Check Compliance Status
```javascript
async function getComplianceStatus(address) {
  const response = await fetch('https://testnet-rpc.circlelayer.com', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      method: 'clayer_getComplianceStatus',
      params: [address],
      id: 1,
    }),
  });
  
  const result = await response.json();
  return result.result;
}

// Example usage
const status = await getComplianceStatus('0x742d35Cc6634C0532925a3b8D1b9C07dDE00e6E8');
console.log('Compliance level:', status.level);
console.log('Risk score:', status.riskScore);
console.log('Flags:', status.flags);
console.log('Last updated:', status.lastUpdated);
```

## SDK Examples

### Circle Layer JavaScript SDK

#### Installation
```bash
npm install @circlelayer/sdk
```

#### Basic Setup
```javascript
import { CircleLayerSDK } from '@circlelayer/sdk';

// Initialize SDK
const clayer = new CircleLayerSDK({
  network: 'testnet', // or 'mainnet'
  rpcUrl: 'https://testnet-rpc.circlelayer.com',
  apiKey: 'your-api-key' // Optional for enhanced features
});

// Connect to network
await clayer.connect();
```

#### Validator Operations
```javascript
// Get all validators
const validators = await clayer.validators.getAll();

// Get specific validator
const validator = await clayer.validators.getById('0x742d35Cc6634C0532925a3b8D1b9C07dDE00e6E8');

// Check validator performance
const performance = await clayer.validators.getPerformance(
  '0x742d35Cc6634C0532925a3b8D1b9C07dDE00e6E8',
  { days: 30 }
);

// Delegate to validator
const tx = await clayer.staking.delegate(
  '0x742d35Cc6634C0532925a3b8D1b9C07dDE00e6E8', // validator address
  '1000000000000000000000' // 1000 CLAYER in wei
);
```

#### Staking Operations
```javascript
// Get staking portfolio
const portfolio = await clayer.staking.getPortfolio('0x123...');

// Calculate potential rewards
const rewards = await clayer.staking.calculateRewards(
  '0x742d35Cc6634C0532925a3b8D1b9C07dDE00e6E8', // validator
  '1000000000000000000000', // amount in wei
  { days: 365 } // time period
);

// Claim rewards
const claimTx = await clayer.staking.claimRewards('0x742d35Cc6634C0532925a3b8D1b9C07dDE00e6E8');

// Undelegate
const undelegateTx = await clayer.staking.undelegate(
  '0x742d35Cc6634C0532925a3b8D1b9C07dDE00e6E8',
  '500000000000000000000' // 500 CLAYER in wei
);
```

#### Bridge Operations
```javascript
// Check bridge status
const bridgeStatus = await clayer.bridge.getStatus('ethereum');

// Get bridge fees
const fees = await clayer.bridge.getFees('ethereum', 'USDC');

// Initiate bridge transfer
const bridgeTx = await clayer.bridge.transfer({
  fromChain: 'ethereum',
  toChain: 'circlelayer',
  token: 'USDC',
  amount: '1000000000', // 1000 USDC
  recipient: '0x123...'
});

// Track bridge transfer
const status = await clayer.bridge.getTransferStatus(bridgeTx.hash);
```

#### Governance Operations
```javascript
// Get active proposals
const proposals = await clayer.governance.getProposals('active');

// Get voting power
const votingPower = await clayer.governance.getVotingPower('0x123...');

// Vote on proposal
const voteTx = await clayer.governance.vote(
  'proposal-123',
  'yes', // vote option
  '1000000000000000000000' // voting power to use
);

// Create proposal (requires minimum voting power)
const proposalTx = await clayer.governance.createProposal({
  title: 'Increase Block Gas Limit',
  description: 'Proposal to increase block gas limit to improve throughput',
  changes: [
    {
      parameter: 'blockGasLimit',
      newValue: '15000000000000'
    }
  ]
});
```

### Python SDK

#### Installation
```bash
pip install circlelayer-sdk
```

#### Basic Usage
```python
from circlelayer import CircleLayerSDK

# Initialize SDK
clayer = CircleLayerSDK(
    network='testnet',
    rpc_url='https://testnet-rpc.circlelayer.com',
    api_key='your-api-key'
)

# Get network stats
stats = clayer.network.get_stats()
print(f"Current TPS: {stats['currentTPS']}")
print(f"Active validators: {stats['activeValidators']}")

# Get validator info
validator = clayer.validators.get_info('0x742d35Cc6634C0532925a3b8D1b9C07dDE00e6E8')
print(f"Validator status: {validator['status']}")
print(f"Total stake: {validator['totalStake']}")

# Check staking rewards
rewards = clayer.staking.get_rewards('0x123...')
print(f"Pending rewards: {rewards['pendingRewards']}")
```

### WebSocket Subscriptions

#### Subscribe to New Blocks
```javascript
const ws = new WebSocket('wss://testnet-rpc.circlelayer.com');

ws.onopen = () => {
  // Subscribe to new block headers
  ws.send(JSON.stringify({
    jsonrpc: '2.0',
    method: 'eth_subscribe',
    params: ['newHeads'],
    id: 1
  }));
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  if (data.params) {
    console.log('New block:', data.params.result.number);
    console.log('Block hash:', data.params.result.hash);
  }
};
```

#### Subscribe to Validator Events
```javascript
const ws = new WebSocket('wss://testnet-rpc.circlelayer.com');

ws.onopen = () => {
  // Subscribe to validator status changes
  ws.send(JSON.stringify({
    jsonrpc: '2.0',
    method: 'clayer_subscribe',
    params: ['validatorEvents', {
      events: ['jailed', 'unjailed', 'slashed', 'commission_changed']
    }],
    id: 1
  }));
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  if (data.params && data.params.subscription === 'validatorEvents') {
    const event = data.params.result;
    console.log('Validator event:', event.type);
    console.log('Validator:', event.validatorAddress);
    console.log('Details:', event.data);
  }
};
```

#### Subscribe to Staking Events
```javascript
const ws = new WebSocket('wss://testnet-rpc.circlelayer.com');

ws.onopen = () => {
  // Subscribe to staking events for specific address
  ws.send(JSON.stringify({
    jsonrpc: '2.0',
    method: 'clayer_subscribe',
    params: ['stakingEvents', {
      address: '0x123...',
      events: ['delegation', 'undelegation', 'rewards_claimed']
    }],
    id: 1
  }));
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  if (data.params && data.params.subscription === 'stakingEvents') {
    const stakingEvent = data.params.result;
    console.log('Staking event:', stakingEvent.type);
    console.log('Amount:', stakingEvent.amount);
    console.log('Validator:', stakingEvent.validator);
  }
};
```

## Advanced Features

### Batch Requests
```javascript
// Execute multiple RPC calls in a single request
const batchRequest = [
  {
    jsonrpc: '2.0',
    method: 'eth_getBalance',
    params: ['0x742d35Cc6634C0532925a3b8D1b9C07dDE00e6E8', 'latest'],
    id: 1
  },
  {
    jsonrpc: '2.0',
    method: 'clayer_getValidatorInfo',
    params: ['0x742d35Cc6634C0532925a3b8D1b9C07dDE00e6E8'],
    id: 2
  },
  {
    jsonrpc: '2.0',
    method: 'clayer_getNetworkStats',
    params: [],
    id: 3
  }
];

const response = await fetch('https://testnet-rpc.circlelayer.com', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(batchRequest),
});

const results = await response.json();
// results is an array with responses for each request
```

### Error Handling
```javascript
async function makeRPCCall(method, params) {
  try {
    const response = await fetch('https://testnet-rpc.circlelayer.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: method,
        params: params,
        id: Date.now()
      }),
    });

    const result = await response.json();
    
    if (result.error) {
      throw new Error(`RPC Error ${result.error.code}: ${result.error.message}`);
    }
    
    return result.result;
  } catch (error) {
    console.error('RPC call failed:', error);
    throw error;
  }
}

// Example usage with error handling
try {
  const balance = await makeRPCCall('eth_getBalance', ['0x123...', 'latest']);
  console.log('Balance:', balance);
} catch (error) {
  console.error('Failed to get balance:', error.message);
}
```

### Rate Limiting & Best Practices
```javascript
class CircleLayerRPCClient {
  constructor(rpcUrl, options = {}) {
    this.rpcUrl = rpcUrl;
    this.maxRetries = options.maxRetries || 3;
    this.retryDelay = options.retryDelay || 1000;
    this.timeout = options.timeout || 30000;
  }

  async call(method, params, retryCount = 0) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);

      const response = await fetch(this.rpcUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          method: method,
          params: params,
          id: Date.now() + Math.random()
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      
      if (result.error) {
        // Handle rate limiting
        if (result.error.code === -32005) { // Rate limit exceeded
          if (retryCount < this.maxRetries) {
            await new Promise(resolve => setTimeout(resolve, this.retryDelay * (retryCount + 1)));
            return this.call(method, params, retryCount + 1);
          }
        }
        throw new Error(`RPC Error ${result.error.code}: ${result.error.message}`);
      }
      
      return result.result;
    } catch (error) {
      if (error.name === 'AbortError') {
        throw new Error('Request timeout');
      }
      
      if (retryCount < this.maxRetries && this.isRetriableError(error)) {
        await new Promise(resolve => setTimeout(resolve, this.retryDelay * (retryCount + 1)));
        return this.call(method, params, retryCount + 1);
      }
      
      throw error;
    }
  }

  isRetriableError(error) {
    // Retry on network errors, timeouts, and server errors
    return error.message.includes('fetch') || 
           error.message.includes('timeout') || 
           error.message.includes('5');
  }
}

// Usage
const client = new CircleLayerRPCClient('https://testnet-rpc.circlelayer.com', {
  maxRetries: 5,
  retryDelay: 2000,
  timeout: 30000
});

const balance = await client.call('eth_getBalance', ['0x123...', 'latest']);
```

## Security & Authentication

### API Key Authentication
```javascript
// For enhanced features that require authentication
const response = await fetch('https://testnet-rpc.circlelayer.com', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY',
    'X-Client-Version': '1.0.0'
  },
  body: JSON.stringify({
    jsonrpc: '2.0',
    method: 'clayer_getComplianceStatus',
    params: ['0x742d35Cc6634C0532925a3b8D1b9C07dDE00e6E8'],
    id: 1,
  }),
});
```

### Signed Requests (for sensitive operations)
```javascript
import { ethers } from 'ethers';

async function makeSignedRequest(method, params, privateKey) {
  const timestamp = Date.now();
  const nonce = Math.random().toString(36).substring(7);
  
  // Create message to sign
  const message = JSON.stringify({
    method,
    params,
    timestamp,
    nonce
  });
  
  // Sign the message
  const wallet = new ethers.Wallet(privateKey);
  const signature = await wallet.signMessage(message);
  
  const response = await fetch('https://testnet-rpc.circlelayer.com', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Signature': signature,
      'X-Timestamp': timestamp.toString(),
      'X-Nonce': nonce,
      'X-Address': wallet.address
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      method: method,
      params: params,
      id: 1,
    }),
  });
  
  return response.json();
}

// Example: Report suspicious activity with signed request
const evidence = {
  type: 'double_signing',
  validatorAddress: '0x742d35Cc6634C0532925a3b8D1b9C07dDE00e6E8',
  blockHeight: 1234567,
  evidence: 'encoded_proof_data'
};

const result = await makeSignedRequest(
  'clayer_reportSuspiciousActivity',
  [evidence],
  'your-private-key'
);
```

## Resources

### Official Documentation
- **API Reference**: https://docs.circlelayer.com/api
- **SDK Documentation**: https://docs.circlelayer.com/sdk
- **WebSocket API**: https://docs.circlelayer.com/websocket

### Development Tools
- **RPC Playground**: https://playground.circlelayer.com
- **API Testing**: Use Postman collection or curl examples
- **Network Status**: https://status.circlelayer.com

### Community & Support
- **Discord**: https://discord.gg/circlelayer
- **Telegram**: https://t.me/circlelayer
- **GitHub Issues**: https://github.com/circle-layer-org/rpc-issues

### Rate Limits & Performance
- **Rate Limit**: 100 requests/minute for free tier
- **Enhanced Tier**: 1000 requests/minute with API key
- **WebSocket Connections**: 10 concurrent connections per IP
- **Batch Requests**: Maximum 10 requests per batch

```javascript
const ws = new WebSocket('wss://testnet-rpc.circlelayer.com');
ws.send(JSON.stringify({
  jsonrpc: '2.0',
  method: 'eth_subscribe',
  params: ['newHeads'],
  id: 1,
}));
```

### Interact with Example Contract
```javascript
// Using the deployed example contract
const contractAddress = '0xfCb4Ce5953dE22cbF04d015df88a3a9895E86bEB';

// Get contract interaction examples
const response = await fetch('https://testnet-rpc.circlelayer.com', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    jsonrpc: '2.0',
    method: 'eth_call',
    params: [{
      to: contractAddress,
      data: '0x...' // Method call data
    }, 'latest'],
    id: 1,
  }),
});
```