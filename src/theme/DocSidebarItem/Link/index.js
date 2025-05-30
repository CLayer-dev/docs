import React, { useState } from 'react';
import clsx from 'clsx';
import { ThemeClassNames } from '@docusaurus/theme-common';
import { isActiveSidebarItem } from '@docusaurus/theme-common/internal';
import Link from '@docusaurus/Link';
import isInternalUrl from '@docusaurus/isInternalUrl';
import IconExternalLink from '@theme/Icon/ExternalLink';
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
						{label}
						{!isInternalLink && <IconExternalLink />}
					</Link>
				)}
			</li>

			{isSearchComponent && (
				<SearchModal isOpen={isModalOpen} onClose={handleCloseModal} />
			)}
		</>
	);
}
