import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  docs: [
    'intro',
    {
      type: 'category',
      label: '📚 Introduction',
      items: [
        'introduction/key-features',
        'introduction/use-cases',
      ],
    },
    {
      type: 'doc',
      id: 'governance/tokenomics',
      label: 'Tokenomics',
    },
    {
      type: 'category',
      label: '💰 Trading',
      items: [
        'governance/trading-fees',
        'getting-started/clayer-trading-guide',
      ],
    },
    {
      type: 'category',
      label: '🚀 Getting Started',
      items: [
        'getting-started/set-up-wallet',
        'getting-started/connect-testnet',
        'getting-started/use-faucet',
      ],
    },
    {
      type: 'category',
      label: '🏗️ Architecture',
      items: [
        'architecture/genesis',
        'architecture/pos-consensus',
        'architecture/evm-compatibility',
        'architecture/high-tps',
      ],
    },
    {
      type: 'category',
      label: '🔒 AI Security',
      items: [
        'ai-security/how-it-works',
        'ai-security/benefits',
      ],
    },
    {
      type: 'category',
      label: '💻 Development',
      items: [
        'development/writing-smart-contracts',
        'development/deploying-contracts',
        'development/interacting-with-contracts',
        'development/web3-integration',
        'development/cross-chain-bridge',
        'development/meta-transactions',
        'development/erc20-tokens',
        'development/transaction-troubleshooting',
        'development/private-chain-setup',
        'development/graphql-integration',
        'development/wallet-connect-integration',
        'development/support-plans',
      ],
    },
    {
      type: 'category',
      label: '🔧 APIs & SDKs',
      items: [
        'apis-sdks/index',
        'apis-sdks/rpc-endpoints',
        'apis-sdks/web3-libraries',
      ],
    },
    {
      type: 'category',
      label: '🎯 Nodes & Validation',
      items: [
        'nodes-validation/becoming-validator',
        'nodes-validation/running-full-node',
        'nodes-validation/node-deployment',
        'nodes-validation/node-security',
        'nodes-validation/node-monitoring',
      ],
    },
    {
      type: 'category',
      label: '🏛️ Governance',
      items: [
        'governance/governance-model',
      ],
    },
    {
      type: 'category',
      label: '🗺️ Roadmap',
      items: [
        'roadmap/phase-1-testnet',
        'roadmap/phase-2-ecosystem',
        'roadmap/phase-3-mainnet',
        'roadmap/phase-4-expansion',
      ],
    },
    {
      type: 'category',
      label: '📊 Comparison',
      items: [
        'comparison/feature-comparison',
        'comparison/key-advantages',
      ],
    },
    {
      type: 'category',
      label: '👥 Community',
      items: [
        'community/social-media',
        'community/contribution-guidelines',
      ],
    },
    {
      type: 'category',
      label: '🛡️ Security',
      items: [
        'security/risk-warnings',
        'security/disclaimer',
        'security/integrity-compliance',
      ],
    },
    {
      type: 'category',
      label: '❓ FAQs',
      items: [
        'faqs/common-questions',
      ],
    },
  ],
};

export default sidebars;
