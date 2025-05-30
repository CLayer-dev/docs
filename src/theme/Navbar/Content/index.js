import React, { useState } from 'react';
import { useThemeConfig, ErrorCauseBoundary } from '@docusaurus/theme-common';
import {
	splitNavbarItems,
	useNavbarMobileSidebar,
} from '@docusaurus/theme-common/internal';
import NavbarItem from '@theme/NavbarItem';
import NavbarColorModeToggle from '@theme/Navbar/ColorModeToggle';
import NavbarMobileSidebarToggle from '@theme/Navbar/MobileSidebar/Toggle';
import NavbarLogo from '@theme/Navbar/Logo';
import NavbarSearch from '@theme/Navbar/Search';
import SearchModal from '../../../components/SearchModal';
import styles from './styles.module.css';

function useNavbarItems() {
	// TODO temporary casting until ThemeConfig type is improved
	return useThemeConfig().navbar.items;
}

function NavbarItems({ items, ...props }) {
	return (
		<>
			{items.map((item, i) => (
				<ErrorCauseBoundary
					key={i}
					onError={(error) =>
						new Error(
							`A theme navbar item failed to render.
Please double-check the following navbar item (themeConfig.navbar.items) of your Docusaurus config:
${JSON.stringify(item, null, 2)}`,
							{ cause: error }
						)
					}
				>
					<NavbarItem {...item} {...props} />
				</ErrorCauseBoundary>
			))}
		</>
	);
}

function NavbarContentLayout({ left, center, right }) {
	return (
		<div className="navbar__inner">
			<div className="navbar__items">{left}</div>
			<div className="navbar__items navbar__items--center">{center}</div>
			<div className="navbar__items navbar__items--right">{right}</div>
		</div>
	);
}

export default function NavbarContent() {
	const mobileSidebar = useNavbarMobileSidebar();
	const items = useNavbarItems();
	const [leftItems, rightItems] = splitNavbarItems(items);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const searchBarItem = items.find((item) => item.type === 'search');

	const handleOpenModal = () => {
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	return (
		<>
			<NavbarContentLayout
				left={
					// TODO stop hardcoding items?
					<>
						{!mobileSidebar.disabled && <NavbarMobileSidebarToggle />}
						<NavbarLogo />
						<NavbarItems items={leftItems} />
					</>
				}
				center
				right={
					// TODO stop hardcoding items?
					// Ask the user to add the respective navbar items => more flexible
					<>
						<NavbarItems items={rightItems} />
						<NavbarColorModeToggle className={styles.colorModeToggle} />
						{!searchBarItem && (
							<NavbarSearch>
								<button
									onClick={handleOpenModal}
									className="navbar__link"
									style={{
										background: 'none',
										border: 'none',
										cursor: 'pointer',
										padding: 'var(--ifm-navbar-item-padding-vertical) var(--ifm-navbar-item-padding-horizontal)',
										color: 'var(--ifm-navbar-link-color)',
										fontSize: 'var(--ifm-navbar-link-font-size)',
										fontWeight: 'var(--ifm-navbar-link-font-weight)',
										textDecoration: 'none'
									}}
								>
									Search
								</button>
							</NavbarSearch>
						)}
					</>
				}
			/>

			<SearchModal isOpen={isModalOpen} onClose={handleCloseModal} />
		</>
	);
}
