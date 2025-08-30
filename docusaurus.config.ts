import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import type { Configuration } from 'webpack';

// Load environment variables from .env file
require('dotenv').config();

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'CLayer Documentation',
  tagline: 'Official documentation for CLayer, an EVM-compatible POS Layer 1 blockchain',
  favicon: 'img/CL_favicon.png',

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
        content: 'CLayer is a high-performance, EVM-compatible, Proof of Stake Layer 1 blockchain with AI security features and exceptional scalability.',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        name: 'keywords',
        content: 'blockchain, layer 1, evm, pos, defi, smart contracts, clayer',
      },
    },
    // Open Graph meta tags for social media sharing
    {
      tagName: 'meta',
      attributes: {
        property: 'og:type',
        content: 'website',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        property: 'og:title',
        content: 'CLayer Documentation',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        property: 'og:description',
        content: 'Official documentation for CLayer, an EVM-compatible DPOS Layer 1 blockchain with AI security features and exceptional scalability.',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        property: 'og:url',
        content: 'https://docs.clayer.io',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        property: 'og:site_name',
        content: 'CLayer',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        property: 'og:image',
        content: 'https://docs.clayer.io/img/circle-layer-social-card.jpg',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        property: 'og:image:width',
        content: '1200',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        property: 'og:image:height',
        content: '630',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        property: 'og:image:alt',
        content: 'CLayer - High-Performance EVM-Compatible Blockchain',
      },
    },
    // Twitter Card meta tags
    {
      tagName: 'meta',
      attributes: {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        name: 'twitter:title',
        content: 'CLayer Documentation',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        name: 'twitter:description',
        content: 'Official documentation for CLayer, an EVM-compatible POS Layer 1 blockchain with AI security features and exceptional scalability.',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        name: 'twitter:image',
        content: 'https://docs.clayer.io/img/circle-layer-social-card.jpg',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        name: 'twitter:image:alt',
        content: 'CLayer - High-Performance EVM-Compatible Blockchain',
      },
    },
    // Telegram specific meta tags
    {
      tagName: 'meta',
      attributes: {
        property: 'telegram:channel',
        content: '@clayer',
      },
    },
    // Security headers removed for development - will be handled at server level in production
    {
      tagName: 'meta',
      attributes: {
        'http-equiv': 'X-Content-Type-Options',
        content: 'nosniff'
      },
    },
  ],

  // Set the production url of your site here
  url: process.env.SITE_URL || 'https://docs.clayer.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: process.env.BASE_URL || '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'clayer', // Usually your GitHub org/user name.
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
    // Custom plugin to inject environment variables and optimize webpack cache
    function injectEnvironmentVariables() {
      return {
        name: 'inject-environment-variables',
        configureWebpack(config: Configuration) {
          console.log('🔍 DEBUG: Loading environment variables...');
          console.log('🔍 DEBUG: GROK_API_KEY exists:', !!process.env.GROK_API_KEY);
          console.log('🔍 DEBUG: GROK_API_KEY length:', process.env.GROK_API_KEY ? process.env.GROK_API_KEY.length : 'undefined');

          return {
            cache: false,
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
          editUrl: 'https://github.com/clayer/docs/tree/main/',
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
        alt: 'CLayer Logo',
        src: 'img/light-theme-logo.png',
        srcDark: 'img/dark-theme-logo.png',
      },
      items: [
        {
          type: 'custom-askAI',
          position: 'right',
        },
        {
          href: 'https://github.com/clayer',
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
              label: 'CLayer for Developers',
              to: '/development/writing-smart-contracts',
            },
            {
              label: 'CLayer for Users',
              to: '/introduction/key-features',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Telegram',
              href: 'https://t.me/clayer_io',
            },
            {
              label: 'X (Twitter)',
              href: 'https://x.com/clayer_io',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Website',
              href: 'https://clayer.io',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/clayer',
            },
            {
              label: 'Testnet Explorer',
              href: 'https://explorer-testnet.clayer.io/',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} CLayer Foundation. Built with Docusaurus.`,
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
