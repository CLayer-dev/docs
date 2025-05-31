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
          type: 'docSidebar',
          sidebarId: 'docs',
          position: 'left',
          label: 'Docs',
          className: 'navbar-docs-btn',
        },
        {
          to: '/docs/introduction/what-is-circle-layer',
          label: 'Introduction',
          position: 'left',
        },
        {
          to: '/docs/architecture/pos-consensus',
          label: 'Architecture',
          position: 'left',
        },
        {
          to: '/docs/development/writing-smart-contracts',
          label: 'Ecosystem',
          position: 'left',
        },
        {
          href: 'https://github.com/Circle-layer-org/docs',
          label: 'GitHub',
          position: 'right',
        },
        {
          href: 'https://t.me/circlelayer',
          label: 'Telegram',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/getting-started/set-up-wallet',
            },
            {
              label: 'Architecture',
              to: '/docs/architecture/pos-consensus',
            },
            {
              label: 'Development',
              to: '/docs/development/writing-smart-contracts',
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
              label: 'X',
              href: 'https://x.com/circlelayer',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/Circle-layer-org/docs',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Roadmap',
              to: '/docs/roadmap/phase-1-testnet',
            },
            {
              label: 'FAQ',
              to: '/docs/faqs/common-questions',
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
