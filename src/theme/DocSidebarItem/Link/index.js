import React, { useState } from 'react';
import clsx from 'clsx';
import { ThemeClassNames } from '@docusaurus/theme-common';
import { isActiveSidebarItem } from '@docusaurus/theme-common/internal';
import Link from '@docusaurus/Link';
import isInternalUrl from '@docusaurus/isInternalUrl';
import IconExternalLink from '@theme/Icon/ExternalLink';
import TokenomicsIcon from '../../Icon/Tokenomics';
import TradingFeesIcon from '../../Icon/TradingFees';
import IntroductionIcon from '../../Icon/Introduction';
import GettingStartedIcon from '../../Icon/GettingStarted';
import ArchitectureIcon from '../../Icon/Architecture';
import SecurityIcon from '../../Icon/Security';
import DevelopmentIcon from '../../Icon/Development';
import APIsIcon from '../../Icon/APIs';
import NodesIcon from '../../Icon/Nodes';
import GovernanceIcon from '../../Icon/Governance';
import RoadmapIcon from '../../Icon/Roadmap';
import ComparisonIcon from '../../Icon/Comparison';
import CommunityIcon from '../../Icon/Community';
import FAQsIcon from '../../Icon/FAQs';
import TradingIcon from '../../Icon/Trading';
import BuyingGuideIcon from '../../Icon/BuyingGuide';
import SearchModal from '../../../components/SearchModal';
import styles from './styles.module.css';

function isJson(str) {
	try {
		return JSON.parse(str);
	} catch (e) {
		return false;
	}
	// return true;
}

// Custom icon renderer for specific pages and categories
function renderLabelWithIcon(label, href) {
	// Handle specific document pages
	if (href && href.includes('/governance/tokenomics')) {
		return (
			<>
				<TokenomicsIcon />
				Tokenomics
			</>
		);
	}
	if (href && href.includes('/governance/trading-fees')) {
		return (
			<>
				<TradingFeesIcon />
				Trading Fees
			</>
		);
	}
	if (href && href.includes('/getting-started/clayer-trading-guide')) {
		return (
			<>
				<BuyingGuideIcon />
				CLAYER Trading Guide
			</>
		);
	}

	// Handle category labels (remove emojis and add icons)
	const iconMap = {
		'📚 Introduction': { icon: <IntroductionIcon />, text: 'Introduction' },
		'🚀 Getting Started': { icon: <GettingStartedIcon />, text: 'Getting Started' },
		'🏗️ Architecture': { icon: <ArchitectureIcon />, text: 'Architecture' },
		'🔒 AI Security': { icon: <SecurityIcon />, text: 'AI Security' },
		'💻 Development': { icon: <DevelopmentIcon />, text: 'Development' },
		'🔧 APIs & SDKs': { icon: <APIsIcon />, text: 'APIs & SDKs' },
		'🎯 Nodes & Validation': { icon: <NodesIcon />, text: 'Nodes & Validation' },
		'🏛️ Governance': { icon: <GovernanceIcon />, text: 'Governance' },
		'💰 Trading': { icon: <TradingIcon />, text: 'Trading' },
		'🗺️ Roadmap': { icon: <RoadmapIcon />, text: 'Roadmap' },
		'📊 Comparison': { icon: <ComparisonIcon />, text: 'Comparison' },
		'👥 Community': { icon: <CommunityIcon />, text: 'Community' },
		'🛡️ Security': { icon: <SecurityIcon />, text: 'Security' },
		'❓ FAQs': { icon: <FAQsIcon />, text: 'FAQs' },
	};

	// Check if this label matches any of our mapped categories
	if (iconMap[label]) {
		return (
			<>
				{iconMap[label].icon}
				{iconMap[label].text}
			</>
		);
	}

	// Return original label for other items
	return label;
}

export default function DocSidebarItemLink({
	item,
	onItemClick,
	activePath,
	level,
	index,
	...props
}) {
	const { href, label, className, autoAddBaseUrl } = item;
	const isActive = isActiveSidebarItem(item, activePath);
	const isInternalLink = isInternalUrl(href);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const isSearchComponent = className?.includes('sidebarSearch') || false;
	// console.log(isSearchComponent, className);
	/**
	 * [ ] Check it's a search component or not ()
	 * 	- if it's search Component pass the Search Component
	 *  - other wise show as it as same
	 */

	const handleOpenModal = () => {
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	return (
		<>
			<li
				className={clsx(
					ThemeClassNames.docs.docSidebarItemLink,
					ThemeClassNames.docs.docSidebarItemLinkLevel(level),
					'menu__list-item',
					className
				)}
				key={label}
			>
				{isSearchComponent ? (
					<div className={styles.sidebarSearch}>
						<button
							onClick={handleOpenModal}
							className="menu__link"
							style={{
								background: 'none',
								border: 'none',
								cursor: 'pointer',
								width: '100%',
								textAlign: 'left',
								padding: 'var(--ifm-menu-link-padding-vertical) var(--ifm-menu-link-padding-horizontal)',
								color: 'var(--ifm-menu-color)',
								fontSize: 'inherit',
								fontFamily: 'inherit'
							}}
						>
							🔍 Search Documentation
						</button>
					</div>
				) : (
					<Link
						className={clsx('menu__link', !isInternalLink && styles.menuExternalLink, {
							'menu__link--active': isActive,
						})}
						autoAddBaseUrl={autoAddBaseUrl}
						aria-current={isActive ? 'page' : undefined}
						to={href}
						{...(isInternalLink && {
							onClick: onItemClick ? () => onItemClick(item) : undefined,
						})}
						{...props}
					>
						{renderLabelWithIcon(label, href)}
						{!isInternalLink && <IconExternalLink />}
					</Link>
				)}
			</li>

			{isModalOpen && (
				<SearchModal isOpen={isModalOpen} onClose={handleCloseModal} />
			)}
		</>
	);
}
