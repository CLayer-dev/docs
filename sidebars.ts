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
    {
      type: 'category',
      label: 'Introduction',
      items: [
        'introduction/what-is-circle-layer',
        'introduction/key-features',
        'introduction/use-cases',
      ],
    },
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'getting-started/set-up-wallet',
        'getting-started/connect-testnet',
        'getting-started/use-faucet',
      ],
    },
    {
      type: 'category',
      label: 'Architecture',
      items: [
        'architecture/pos-consensus',
        'architecture/evm-compatibility',
        'architecture/high-tps',
      ],
    },
    {
      type: 'category',
      label: 'AI Security',
      items: [
        'ai-security/how-it-works',
        'ai-security/benefits',
      ],
    },
    {
      type: 'category',
      label: 'Development',
      items: [
        'development/writing-smart-contracts',
        'development/deploying-contracts',
        'development/interacting-with-contracts',
      ],
    },
    {
      type: 'category',
      label: 'APIs & SDKs',
      items: [
        'apis-sdks/rpc-endpoints',
        'apis-sdks/web3-libraries',
      ],
    },
    {
      type: 'category',
      label: 'Nodes & Validation',
      items: [
        'nodes-validation/running-full-node',
        'nodes-validation/becoming-validator',
        'nodes-validation/node-security',
        'nodes-validation/node-monitoring',
      ],
    },
    {
      type: 'category',
      label: 'Governance',
      items: [
        'governance/governance-model',
        'governance/tokenomics',
      ],
    },
    {
      type: 'category',
      label: 'Roadmap',
      items: [
        'roadmap/phase-1-testnet',
      ],
    },
    {
      type: 'category',
      label: 'Comparison',
      items: [
        'comparison/feature-comparison',
        'comparison/key-advantages',
      ],
    },
    {
      type: 'category',
      label: 'Community',
      items: [
        'community/forums-social-media',
        'community/contribution-guidelines',
      ],
    },
    {
      type: 'category',
      label: 'FAQs',
      items: [
        'faqs/common-questions',
      ],
    },
  ],
};

export default sidebars;
