# Circle Layer Documentation Deployment Guide

This guide provides instructions for testing the documentation site locally and deploying it to Vercel.

## Local Development

### Prerequisites
- Node.js 18.0.0 or later
- npm or yarn package manager
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-org/circle-layer-docs.git
cd circle-layer-docs
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

### Running the Development Server

Start the local development server:
```bash
npm run start
# or
yarn start
```

The site will be available at `http://localhost:3000`. The development server includes:
- Hot reloading for instant updates
- Error reporting in the browser
- Development-specific optimizations

### Building for Production

To create a production build:
```bash
npm run build
# or
yarn build
```

The build output will be in the `build` directory. To test the production build locally:
```bash
npm run serve
# or
yarn serve
```

## Deploying to Vercel

### Initial Setup

1. Create a Vercel account at [vercel.com](https://vercel.com) if you haven't already
2. Install the Vercel CLI:
```bash
npm install -g vercel
```

### Deployment Steps

1. Link your GitHub repository:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Select "Import Git Repository"
   - Choose your circle-layer-docs repository
   - Configure the project:
     - Framework Preset: Docusaurus
     - Build Command: `npm run build` or `yarn build`
     - Output Directory: `build`
     - Install Command: `npm install` or `yarn install`

2. Configure environment variables (if needed):
   - Go to Project Settings > Environment Variables
   - Add any required environment variables

3. Deploy:
   - Vercel will automatically deploy when you push to the main branch
   - For manual deployment:
```bash
vercel
```

### Continuous Deployment

- Vercel automatically deploys when you push to the main branch
- Preview deployments are created for pull requests
- Each deployment gets a unique URL for testing

## Documentation Verification Checklist

### Main Pages
- [ ] Home (`/`)
- [ ] Getting Started (`/getting-started`)
- [ ] Architecture Overview (`/architecture`)
- [ ] Smart Contracts (`/smart-contracts`)
- [ ] API Reference (`/api-reference`)
- [ ] SDK (`/sdk`)
- [ ] Security (`/security`)
- [ ] Integration Guide (`/integration-guide`)
- [ ] Best Practices (`/best-practices`)
- [ ] Troubleshooting (`/troubleshooting`)
- [ ] FAQ (`/faq`)
- [ ] Changelog (`/changelog`)
- [ ] Contributing (`/contributing`)
- [ ] Support (`/support`)
- [ ] Terms of Service (`/terms`)

### Subpages
- [ ] Getting Started
  - [ ] Installation (`/getting-started/installation`)
  - [ ] Quick Start (`/getting-started/quick-start`)
  - [ ] Configuration (`/getting-started/configuration`)
  - [ ] First Project (`/getting-started/first-project`)

- [ ] Architecture
  - [ ] System Overview (`/architecture/system-overview`)
  - [ ] Components (`/architecture/components`)
  - [ ] Data Flow (`/architecture/data-flow`)
  - [ ] Security Model (`/architecture/security-model`)

- [ ] Smart Contracts
  - [ ] Core Contracts (`/smart-contracts/core-contracts`)
  - [ ] Token Contracts (`/smart-contracts/token-contracts`)
  - [ ] Governance (`/smart-contracts/governance`)
  - [ ] Security Features (`/smart-contracts/security-features`)

- [ ] API Reference
  - [ ] REST API (`/api-reference/rest-api`)
  - [ ] WebSocket API (`/api-reference/websocket-api`)
  - [ ] GraphQL API (`/api-reference/graphql-api`)
  - [ ] Authentication (`/api-reference/authentication`)

- [ ] SDK
  - [ ] JavaScript SDK (`/sdk/javascript-sdk`)
  - [ ] Python SDK (`/sdk/python-sdk`)
  - [ ] Go SDK (`/sdk/go-sdk`)
  - [ ] SDK Examples (`/sdk/examples`)

- [ ] Security
  - [ ] Security Best Practices (`/security/best-practices`)
  - [ ] Audit Reports (`/security/audit-reports`)
  - [ ] Bug Bounty (`/security/bug-bounty`)
  - [ ] Security Updates (`/security/updates`)

- [ ] Integration Guide
  - [ ] Web Integration (`/integration-guide/web`)
  - [ ] Mobile Integration (`/integration-guide/mobile`)
  - [ ] Backend Integration (`/integration-guide/backend`)
  - [ ] Testing (`/integration-guide/testing`)

- [ ] Best Practices
  - [ ] Development (`/best-practices/development`)
  - [ ] Deployment (`/best-practices/deployment`)
  - [ ] Monitoring (`/best-practices/monitoring`)
  - [ ] Performance (`/best-practices/performance`)

### Verification Steps for Each Page

1. Check page loading:
   - [ ] Page loads without errors
   - [ ] All images and assets load correctly
   - [ ] No console errors

2. Verify navigation:
   - [ ] Sidebar links work correctly
   - [ ] Breadcrumb navigation is accurate
   - [ ] Previous/Next page navigation works

3. Check content:
   - [ ] All markdown content renders properly
   - [ ] Code blocks are syntax highlighted
   - [ ] Tables are formatted correctly
   - [ ] Links are working

4. Test responsive design:
   - [ ] Mobile view works correctly
   - [ ] Sidebar collapses properly
   - [ ] Content is readable on all screen sizes

5. Verify search:
   - [ ] Search functionality works
   - [ ] Search results are relevant
   - [ ] Search highlights work

## Troubleshooting

### Common Issues

1. Build Failures
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Check for syntax errors in markdown files

2. Deployment Issues
   - Verify Vercel project settings
   - Check build logs for errors
   - Ensure environment variables are set correctly

3. Content Issues
   - Verify markdown syntax
   - Check for broken links
   - Ensure images are in the correct directory

### Getting Help

- Check the [Docusaurus documentation](https://docusaurus.io/docs)
- Visit the [Vercel documentation](https://vercel.com/docs)
- Open an issue in the repository for specific problems 