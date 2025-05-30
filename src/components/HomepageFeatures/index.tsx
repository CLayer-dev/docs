import React from 'react';
import type { ReactNode } from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Fast & Scalable',
    Svg: () => (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="32" fill="currentColor" className="feature-svg-bg" />
        <path d="M32 16L44 32H20L32 16Z" fill="currentColor" className="feature-svg-accent" />
        <circle cx="32" cy="40" r="8" fill="currentColor" className="feature-svg-detail" />
      </svg>
    ),
    description: (
      <>
        Circle Layer is designed for high throughput and low latency, making it ideal for next-gen dApps and DeFi.
      </>
    ),
  },
  {
    title: 'AI-Powered Security',
    Svg: () => (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="32" fill="currentColor" className="feature-svg-bg" />
        <rect x="20" y="24" width="24" height="16" rx="4" fill="currentColor" className="feature-svg-accent" />
        <circle cx="32" cy="32" r="4" fill="currentColor" className="feature-svg-detail" />
      </svg>
    ),
    description: (
      <>
        Advanced AI modules protect the network and users, ensuring a secure and robust blockchain environment.
      </>
    ),
  },
  {
    title: 'EVM Compatible',
    Svg: () => (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="32" fill="currentColor" className="feature-svg-bg" />
        <rect x="24" y="24" width="16" height="16" rx="4" fill="currentColor" className="feature-svg-accent" />
        <rect x="28" y="28" width="8" height="8" rx="2" fill="currentColor" className="feature-svg-detail" />
      </svg>
    ),
    description: (
      <>
        Seamlessly deploy Ethereum smart contracts and tools on Circle Layer with full EVM compatibility.
      </>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
