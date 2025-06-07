import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import type { Configuration } from 'webpack';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Circle Layer Documentation',
  tagline: 'Official documentation for Circle Layer, an EVM-compatible POS Layer 1 blockchain',
  favicon: 'img/favicon.svg',

  // Client modules for default theme setting
  clientModules: [
    require.resolve('./src/clientModules/setDefaultTheme.js'),
  ],

  // Enable Mermaid diagrams
  markdown: {
    mermaid: true,
  },

  // SEO metadata
  headTags: [
    // Viewport meta tag for responsive design
    {
      tagName: 'meta',
      attributes: {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes',
      },
    },
    // PWA and mobile app meta tags
    {
      tagName: 'meta',
      attributes: {
        name: 'theme-color',
        content: '#1a73e8',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        name: 'mobile-web-app-capable',
        content: 'yes',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        name: 'apple-mobile-web-app-capable',
        content: 'yes',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        name: 'apple-mobile-web-app-status-bar-style',
        content: 'default',
      },
    },
    // SEO meta tags
    {
      tagName: 'meta',
      attributes: {
        name: 'description',
        content: 'Circle Layer is a high-performance, EVM-compatible, Proof of Stake Layer 1 blockchain with AI security features and exceptional scalability.',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        name: 'keywords',
        content: 'blockchain, layer 1, evm, pos, defi, smart contracts, circle layer',
      },
    },
    // Add security headers
    {
      tagName: 'meta',
      attributes: {
        'http-equiv': 'Content-Security-Policy',
        content: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://api.fontshare.com; img-src 'self' data: https:; font-src 'self' https://api.fontshare.com https://*.fontshare.com; connect-src 'self';"
      },
    },
    {
      tagName: 'meta',
      attributes: {
        'http-equiv': 'X-Content-Type-Options',
        content: 'nosniff'
      },
    },
  ],

  // Set the production url of your site here
  url: process.env.SITE_URL || 'https://docs.circlelayer.org',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: process.env.BASE_URL || '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'circle-layer', // Usually your GitHub org/user name.
  projectName: 'docs', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/circle-layer/docs/tree/main/',
          showLastUpdateTime: false,
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themes: ['@docusaurus/theme-mermaid'],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/circle-layer-social-card.jpg',

    // Color mode configuration
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },

    navbar: {
      logo: {
        alt: 'Circle Layer Logo',
        src: 'img/light-theme-logo.png',
        srcDark: 'img/dark-theme-logo.png',
      },
      items: [
        {
          to: '/docs/',
          label: 'Overview',
          position: 'left',
        },
        {
          type: 'dropdown',
          label: 'Getting Started',
          position: 'left',
          items: [
            {
              label: 'What is Circle Layer?',
              to: '/docs/introduction/what-is-circle-layer',
            },
            {
              label: 'Set Up Wallet',
              to: '/docs/getting-started/set-up-wallet',
            },
            {
              label: 'Connect to Testnet',
              to: '/docs/getting-started/connect-testnet',
            },
            {
              label: 'Use Faucet',
              to: '/docs/getting-started/use-faucet',
            },
          ],
        },
        {
          type: 'dropdown',
          label: 'Developers',
          position: 'left',
          items: [
            {
              label: 'Smart Contracts',
              to: '/docs/development/writing-smart-contracts',
            },
            {
              label: 'Deploy Contracts',
              to: '/docs/development/deploying-contracts',
            },
            {
              label: 'Interact with Contracts',
              to: '/docs/development/interacting-with-contracts',
            },
            {
              label: 'Web3 Integration',
              to: '/docs/development/web3-integration',
            },
            {
              label: 'APIs & SDKs',
              to: '/docs/apis-sdks/',
            },
            {
              label: 'RPC Endpoints',
              to: '/docs/apis-sdks/rpc-endpoints',
            },
            {
              label: 'Web3 Libraries',
              to: '/docs/apis-sdks/web3-libraries',
            },
          ],
        },
        {
          type: 'dropdown',
          label: 'Network',
          position: 'left',
          items: [
            {
              label: 'Architecture Overview',
              to: '/docs/architecture/pos-consensus',
            },
            {
              label: 'EVM Compatibility',
              to: '/docs/architecture/evm-compatibility',
            },
            {
              label: 'High TPS',
              to: '/docs/architecture/high-tps',
            },
            {
              label: 'AI Security',
              to: '/docs/ai-security/how-it-works',
            },
            {
              label: 'Security Benefits',
              to: '/docs/ai-security/benefits',
            },
          ],
        },
        {
          type: 'dropdown',
          label: 'Validators',
          position: 'left',
          items: [
            {
              label: 'Become a Validator',
              to: '/docs/nodes-validation/becoming-validator',
            },
            {
              label: 'Run Full Node',
              to: '/docs/nodes-validation/running-full-node',
            },
            {
              label: 'Node Security',
              to: '/docs/nodes-validation/node-security',
            },
            {
              label: 'Node Monitoring',
              to: '/docs/nodes-validation/node-monitoring',
            },
          ],
        },
        {
          type: 'dropdown',
          label: 'Governance',
          position: 'left',
          items: [
            {
              label: 'Governance Model',
              to: '/docs/governance/governance-model',
            },
            {
              label: 'Tokenomics',
              to: '/docs/governance/tokenomics',
            },
          ],
        },
        {
          type: 'dropdown',
          label: 'Resources',
          position: 'left',
          items: [
            {
              label: 'Roadmap',
              to: '/docs/roadmap/phase-1-testnet',
            },
            {
              label: 'Feature Comparison',
              to: '/docs/comparison/feature-comparison',
            },
            {
              label: 'Key Advantages',
              to: '/docs/comparison/key-advantages',
            },
            {
              label: 'Use Cases',
              to: '/docs/introduction/use-cases',
            },
            {
              label: 'FAQ',
              to: '/docs/faqs/common-questions',
            },
          ],
        },
        {
          type: 'dropdown',
          label: 'Community',
          position: 'left',
          items: [
            {
              label: 'Forums & Social Media',
              to: '/docs/community/forums-social-media',
            },
            {
              label: 'Contribution Guidelines',
              to: '/docs/community/contribution-guidelines',
            },
            {
              label: 'Telegram',
              href: 'https://t.me/circlelayer',
            },
            {
              label: 'X (Twitter)',
              href: 'https://x.com/circlelayer',
            },
          ],
        },
        {
          href: 'https://github.com/Circle-layer-org/docs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Getting Started',
          items: [
            {
              label: 'What is Circle Layer?',
              to: '/docs/introduction/what-is-circle-layer',
            },
            {
              label: 'Key Features',
              to: '/docs/introduction/key-features',
            },
            {
              label: 'Set Up Wallet',
              to: '/docs/getting-started/set-up-wallet',
            },
            {
              label: 'Connect to Testnet',
              to: '/docs/getting-started/connect-testnet',
            },
            {
              label: 'Use Faucet',
              to: '/docs/getting-started/use-faucet',
            },
          ],
        },
        {
          title: 'Development',
          items: [
            {
              label: 'Smart Contracts',
              to: '/docs/development/writing-smart-contracts',
            },
            {
              label: 'Deploy Contracts',
              to: '/docs/development/deploying-contracts',
            },
            {
              label: 'Interact with Contracts',
              to: '/docs/development/interacting-with-contracts',
            },
            {
              label: 'Web3 Integration',
              to: '/docs/development/web3-integration',
            },
            {
              label: 'APIs & SDKs',
              to: '/docs/apis-sdks/',
            },
          ],
        },
        {
          title: 'Network & Security',
          items: [
            {
              label: 'PoS Consensus',
              to: '/docs/architecture/pos-consensus',
            },
            {
              label: 'EVM Compatibility',
              to: '/docs/architecture/evm-compatibility',
            },
            {
              label: 'High TPS',
              to: '/docs/architecture/high-tps',
            },
            {
              label: 'AI Security',
              to: '/docs/ai-security/how-it-works',
            },
            {
              label: 'Security Benefits',
              to: '/docs/ai-security/benefits',
            },
          ],
        },
        {
          title: 'Validators & Governance',
          items: [
            {
              label: 'Become a Validator',
              to: '/docs/nodes-validation/becoming-validator',
            },
            {
              label: 'Run Full Node',
              to: '/docs/nodes-validation/running-full-node',
            },
            {
              label: 'Node Security',
              to: '/docs/nodes-validation/node-security',
            },
            {
              label: 'Governance Model',
              to: '/docs/governance/governance-model',
            },
            {
              label: 'Tokenomics',
              to: '/docs/governance/tokenomics',
            },
          ],
        },
        {
          title: 'Community & Resources',
          items: [
            {
              label: 'Community Guidelines',
              to: '/docs/community/contribution-guidelines',
            },
            {
              label: 'FAQ',
              to: '/docs/faqs/common-questions',
            },
            {
              label: 'Roadmap',
              to: '/docs/roadmap/phase-1-testnet',
            },
            {
              label: 'Feature Comparison',
              to: '/docs/comparison/feature-comparison',
            },
            {
              label: 'Use Cases',
              to: '/docs/introduction/use-cases',
            },
          ],
        },
        {
          title: 'Social & Links',
          items: [
            {
              label: 'Forums & Social Media',
              to: '/docs/community/forums-social-media',
            },
            {
              label: 'Telegram',
              href: 'https://t.me/circlelayer',
            },
            {
              label: 'X (Twitter)',
              href: 'https://x.com/circlelayer',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/Circle-layer-org/docs',
            },
            {
              label: 'Testnet Explorer',
              href: 'https://explorer-testnet.circlelayer.com/',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Circle Layer. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,

  // Custom CSS variables for Circle Layer branding
  stylesheets: [
    {
      href: 'https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap',
      type: 'text/css',
    },
  ],

  // Add webpack configuration
  webpack: {
    jsLoader: (isServer) => ({
      loader: require.resolve('swc-loader'),
      options: {
        jsc: {
          parser: {
            syntax: 'typescript',
            tsx: true,
          },
          target: 'es2020',
        },
        module: {
          type: isServer ? 'commonjs' : 'es6',
        },
      },
    }),
  },
};

export default config;
