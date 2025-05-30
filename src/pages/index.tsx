import React from 'react';
import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import styles from './index.module.css';

// Mobile Performance Comparison Component
function MobilePerformanceComparison() {
  return (
    <div className="mobile-performance-comparison">
      {/* Circle Layer Hero */}
      <div className="mobile-hero-card">
        <div className="hero-badge">🎯 Our Target</div>
        <h4>Circle Layer</h4>
        <div className="hero-metrics">
          <div className="metric">⚡ <strong>50,000+</strong> TPS</div>
          <div className="metric">⏱️ <strong>Under 1s</strong> Finality</div>
          <div className="metric">🌱 <strong>99.9% Less</strong> Energy</div>
        </div>
      </div>

      {/* Competition Section */}
      <div className="competition-section">
        <h5>📊 vs EVM L1 Competition:</h5>
        <div className="competitor-list">
          <div className="competitor">
            <span className="name">Polygon</span>
            <span className="tps">7,000 TPS</span>
          </div>
          <div className="competitor">
            <span className="name">BSC</span>
            <span className="tps">300 TPS</span>
          </div>
          <div className="competitor">
            <span className="name">Avalanche</span>
            <span className="tps">4,500 TPS</span>
          </div>
          <div className="competitor">
            <span className="name">Ethereum</span>
            <span className="tps">15 TPS</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroSection() {
  return (
    <div className="hero-gradient">
      <div className="hero-logo-glow">
        <picture>
          <source srcSet="/img/dark-theme-logo.png" media="(prefers-color-scheme: dark)" />
          <img src="/img/light-theme-logo.png" alt="Circle Layer Logo" className="main-logo" />
        </picture>
      </div>
    </div>
  );
}

function MetricsDashboard() {
  return (
    <section>
      <Heading as="h2">📈 Testnet Performance & Roadmap</Heading>
      <div className="metrics-dashboard">
        <div className="metric-card">
          <div className="metric-value">2,000</div>
          <div className="metric-label">TPS Target</div>
          <div className="metric-trend">🚧 In Development</div>
        </div>

        <div className="metric-card">
          <div className="metric-value">50,000</div>
          <div className="metric-label">TPS Mainnet Goal</div>
          <div className="metric-trend">🎯 2024 Roadmap</div>
        </div>

        <div className="metric-card">
          <div className="metric-value">&lt;10s</div>
          <div className="metric-label">Target Finality</div>
          <div className="metric-trend">⚡ Planned</div>
        </div>

        <div className="metric-card">
          <div className="metric-value">99.9%</div>
          <div className="metric-label">Target Uptime</div>
          <div className="metric-trend">🔒 Architecture Goal</div>
        </div>
      </div>
    </section>
  );
}

function KeyFeatures() {
  return (
    <section>
      <Heading as="h2">✨ Key Features</Heading>
      <div className="features-grid">
        <div className="feature-card highlight">
          <div className="feature-icon">🚀</div>
          <h3>High Performance</h3>
          <p><strong>2,000 TPS</strong> at launch, scaling to <strong>50,000 TPS</strong></p>
          <div className="feature-progress">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '40%' }}></div>
            </div>
            <span>40% of target achieved</span>
          </div>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🔒</div>
          <h3>AI Security</h3>
          <p>Real-time smart contract auditing and threat detection</p>
          <div className="security-badges">
            <span className="badge">Real-time Auditing</span>
            <span className="badge">Threat Detection</span>
            <span className="badge">Auto-Protection</span>
          </div>
        </div>

        <div className="feature-card">
          <div className="feature-icon">⚡</div>
          <h3>EVM Compatible</h3>
          <p>Seamless migration from Ethereum</p>
          <div className="compatibility-chart">
            <div className="compat-item">
              <span>Solidity</span>
              <div className="compat-bar"><div style={{ width: '100%' }}></div></div>
            </div>
            <div className="compat-item">
              <span>Web3.js</span>
              <div className="compat-bar"><div style={{ width: '100%' }}></div></div>
            </div>
            <div className="compat-item">
              <span>Metamask</span>
              <div className="compat-bar"><div style={{ width: '100%' }}></div></div>
            </div>
          </div>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🌱</div>
          <h3>Energy Efficient</h3>
          <p>Proof of Stake consensus mechanism</p>
          <div className="energy-comparison">
            <div className="energy-bar ethereum">
              <span>Ethereum PoW</span>
              <div className="bar" style={{ width: '100%' }}></div>
              <span>100%</span>
            </div>
            <div className="energy-bar circle">
              <span>Circle Layer</span>
              <div className="bar" style={{ width: '0.1%' }}></div>
              <span>0.1%</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyChooseSection() {
  return (
    <section>
      <Heading as="h2">🔥 Why Choose Circle Layer?</Heading>
      <Tabs>
        <TabItem value="performance" label="🚀 Performance">
          <h3>Target Performance Metrics</h3>
          <p><strong>🚧 Development Roadmap - Phase 1 Target: 50,000 TPS (In Development)</strong></p>

          {/* Desktop Table */}
          <div className="desktop-performance-table">
            <table>
              <thead>
                <tr>
                  <th>Blockchain</th>
                  <th>TPS</th>
                  <th>Finality</th>
                  <th>Energy Usage</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Circle Layer (Target)</strong></td>
                  <td><strong>50,000+ 🎯</strong></td>
                  <td><strong>under 1s</strong></td>
                  <td><strong>99.9% less</strong></td>
                </tr>
                <tr>
                  <td>Polygon</td>
                  <td>7,000</td>
                  <td>2-3s</td>
                  <td>Medium</td>
                </tr>
                <tr>
                  <td>BSC</td>
                  <td>300</td>
                  <td>3s</td>
                  <td>Medium</td>
                </tr>
                <tr>
                  <td>Avalanche</td>
                  <td>4,500</td>
                  <td>1-2s</td>
                  <td>Low</td>
                </tr>
                <tr>
                  <td>Ethereum</td>
                  <td>15</td>
                  <td>6-10min</td>
                  <td>High</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Mobile Component */}
          <div className="mobile-performance-only">
            <MobilePerformanceComparison />
          </div>

          <div className="development-plan-box">
            <p><strong>🔬 How We'll Achieve 50,000 TPS:</strong></p>
            <ul>
              <li>⚡ <strong>Parallel Transaction Processing</strong> - Multi-threaded execution</li>
              <li>🔄 <strong>Optimized Consensus</strong> - Enhanced PoS with instant finality</li>
              <li>🚀 <strong>State Sharding</strong> - Horizontal scaling architecture</li>
              <li>🎯 <strong>EVM Optimization</strong> - Custom bytecode improvements</li>
            </ul>
            <p className="development-status">
              <strong>Status:</strong> Currently in development - Testnet achieving 2,000+ TPS
            </p>
          </div>
        </TabItem>

        <TabItem value="security" label="🔒 Security">
          <h3>AI-Powered Security Suite</h3>
          <p><strong>Security Features:</strong></p>
          <ul>
            <li>🤖 <strong>Real-time AI auditing</strong></li>
            <li>🛡️ <strong>Automated threat detection</strong></li>
            <li>⚠️ <strong>Smart contract vulnerability scanning</strong></li>
            <li>🔔 <strong>Instant security alerts</strong></li>
          </ul>
        </TabItem>

        <TabItem value="ecosystem" label="🌍 Ecosystem">
          <h3>Development Ecosystem</h3>
          <div className="ecosystem-stats">
            <div className="stat-item">
              <div className="stat-number">5+</div>
              <div className="stat-label">Test Validators</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">3+</div>
              <div className="stat-label">Demo DApps</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">100+</div>
              <div className="stat-label">Early Testers</div>
            </div>
          </div>
          <p><strong>Supported Tools & Frameworks:</strong></p>
          <ul>
            <li>🔧 Hardhat, Truffle, Remix</li>
            <li>🌐 Web3.js, Ethers.js</li>
            <li>💼 MetaMask, WalletConnect</li>
            <li>📊 The Graph, OpenZeppelin</li>
          </ul>
        </TabItem>
      </Tabs>
    </section>
  );
}

function QuickStartSection() {
  return (
    <section>
      <Heading as="h2">🚀 Quick Start</Heading>
      <div className="quick-start-grid">
        <div className="quick-start-card developer">
          <div className="card-header">
            <h3>🏗️ Developers</h3>
            <span className="difficulty easy">Easy</span>
          </div>
          <p>Start building on Circle Layer</p>
          <div className="steps-preview">
            <div>Setup wallet</div>
            <div>Get testnet tokens</div>
            <div>Deploy contract</div>
          </div>
          <Link href="/docs/development/writing-smart-contracts" className="button button--primary">
            Build Now →
          </Link>
        </div>

        <div className="quick-start-card validator">
          <div className="card-header">
            <h3>🎯 Validators</h3>
            <span className="difficulty medium">Medium</span>
          </div>
          <p>Secure the network and earn rewards</p>
          <div className="reward-preview">
            <div>Up to 8% APY</div>
            <div>Network rewards</div>
          </div>
          <Link href="/docs/nodes-validation/becoming-validator" className="button button--secondary">
            Become a Validator →
          </Link>
        </div>

        <div className="quick-start-card tools">
          <div className="card-header">
            <h3>🛠️ Developer Tools</h3>
            <span className="difficulty easy">Ready</span>
          </div>
          <p>Complete toolkit for building dApps</p>
          <div className="tools-preview">
            <div>RPC Endpoints</div>
            <div>SDK & Libraries</div>
            <div>Testing Framework</div>
          </div>
          <Link href="/docs/apis-sdks" className="button button--secondary">
            Explore Tools →
          </Link>
        </div>
      </div>
    </section>
  );
}

function NextStepsSection() {
  return (
    <section>
      <Heading as="h2">📚 What's Next?</Heading>
      <div className="next-steps">
        <div className="step-card">
          <div className="step-number">Step 1</div>
          <h4>Set Up Your Wallet</h4>
          <p>Configure MetaMask for Circle Layer testnet</p>
          <Link href="/docs/getting-started/set-up-wallet">Start Here →</Link>
        </div>

        <div className="step-card">
          <div className="step-number">Step 2</div>
          <h4>Explore Architecture</h4>
          <p>Deep dive into our consensus mechanism</p>
          <Link href="/docs/architecture/pos-consensus">Learn More →</Link>
        </div>

        <div className="step-card">
          <div className="step-number">Step 3</div>
          <h4>Join Community</h4>
          <p>Connect with developers and validators</p>
          <Link href="/docs/community/forums-social-media">Connect →</Link>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Welcome to ${siteConfig.title}`}
      description="Circle Layer is a high-performance, EVM-compatible, Proof of Stake Layer 1 blockchain with AI security features.">
      <HeroSection />
      <main>
        <div className="container">
          <Heading as="h1">Welcome to Circle Layer Documentation</Heading>
          <p>Circle Layer is a high-performance, EVM-compatible, Proof of Stake Layer 1 blockchain designed to power the next generation of decentralized applications.</p>

          <MetricsDashboard />
          <KeyFeatures />
          <WhyChooseSection />
          <QuickStartSection />
          <NextStepsSection />

          <hr />
          <p>🌟 <strong>Ready to build the future?</strong> Circle Layer provides the perfect foundation for your next-generation dApp.</p>
        </div>
      </main>
    </Layout>
  );
}
