import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import type { Configuration } from 'webpack';

// Load environment variables from .env file
require('dotenv').config();

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Circle Layer Documentation',
  tagline: 'Official documentation for Circle Layer, an EVM-compatible POS Layer 1 blockchain',
  favicon: 'img/favicon.svg',

  // Client modules for default theme setting
  clientModules: [
    require.resolve('./src/clientModules/setDefaultTheme.js'),
    require.resolve('./src/clientModules/env.ts'),
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
        content: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://api.fontshare.com; img-src 'self' data: https:; font-src 'self' https://api.fontshare.com https://*.fontshare.com; connect-src 'self' https://api.x.ai;"
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

  plugins: [
    // Custom plugin to inject environment variables
    function injectEnvironmentVariables() {
      return {
        name: 'inject-environment-variables',
        configureWebpack(config: Configuration) {
          console.log('🔍 DEBUG: Loading environment variables...');
          console.log('🔍 DEBUG: GROK_API_KEY exists:', !!process.env.GROK_API_KEY);
          console.log('🔍 DEBUG: GROK_API_KEY length:', process.env.GROK_API_KEY ? process.env.GROK_API_KEY.length : 'undefined');

          return {
            plugins: [
              new (require('webpack')).DefinePlugin({
                'process.env.GROK_API_KEY': JSON.stringify(process.env.GROK_API_KEY || ''),
                'window.__GROK_API_KEY__': JSON.stringify(process.env.GROK_API_KEY || ''),
                '__GROK_API_KEY__': JSON.stringify(process.env.GROK_API_KEY || ''),
              }),
            ],
          };
        },
      };
    },
  ],

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
          routeBasePath: '/', // Make docs the homepage
        },
        blog: false, // Disable blog since docs are now at root
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themes: ['@docusaurus/theme-mermaid'],

  // plugins: [], // Will implement AI chat as navbar component instead

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
          type: 'custom-askAI',
          position: 'right',
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
          title: 'Docs',
          items: [
            {
              label: 'Introduction',
              to: '/',
            },
            {
              label: 'Circle Layer for Developers',
              to: '/development/writing-smart-contracts',
            },
            {
              label: 'Circle Layer for Users',
              to: '/introduction/what-is-circle-layer',
            },
          ],
        },
        {
          title: 'Community',
          items: [
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
          title: 'More',
          items: [
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
      copyright: `Copyright © ${new Date().getFullYear()} Circle Layer Foundation. Built with Docusaurus.`,
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

  // Add webpack configuration for TypeScript and dynamic loading
  webpack: {
    jsLoader: (isServer) => ({
      loader: require.resolve('swc-loader'),
      options: {
        jsc: {
          parser: {
            syntax: 'typescript',
            tsx: true,
          },
          target: 'es2017',
        },
        module: {
          type: isServer ? 'commonjs' : 'es6',
        },
      },
    }),
  },

};

export default config;
