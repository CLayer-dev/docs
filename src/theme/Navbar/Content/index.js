import React, { useState, useEffect } from 'react';
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
import CustomSearchButton from '../../SearchBar/CustomSearchButton';
import styles from './styles.module.css';

function useNavbarItems() {
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

// Desktop navbar layout
function DesktopNavbarLayout({ left, right }) {
	return (
		<div className="navbar__inner">
			<div className="navbar__items">{left}</div>
			<div className="navbar__items navbar__items--right">{right}</div>
		</div>
	);
}

// Mobile navbar layout - Perfect UX: Menu -> Logo -> Docs -> Theme -> Search
function MobileNavbarLayout({ menu, logo, docs, theme, search }) {
	return (
		<div className="navbar__inner navbar__inner--mobile">
			<div className="navbar__mobile-item navbar__mobile-item--menu">{menu}</div>
			<div className="navbar__mobile-item navbar__mobile-item--logo">{logo}</div>
			<div className="navbar__mobile-item navbar__mobile-item--docs">{docs}</div>
			<div className="navbar__mobile-item navbar__mobile-item--theme">{theme}</div>
			<div className="navbar__mobile-item navbar__mobile-item--search">{search}</div>
		</div>
	);
}

export default function NavbarContent() {
	const mobileSidebar = useNavbarMobileSidebar();
	const items = useNavbarItems();
	const [leftItems, rightItems] = splitNavbarItems(items);
	const [isModalOpen, setIsModalOpen] = useState(false);

	// Find the docs button
	const docsItem = leftItems.find((item) => item.className?.includes('navbar-docs-btn'));
	const otherLeftItems = leftItems.filter((item) => !item.className?.includes('navbar-docs-btn'));

	const handleOpenModal = () => {
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	// Add keyboard shortcut (Ctrl+K / Cmd+K) for search
	useEffect(() => {
		const handleKeyDown = (event) => {
			if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
				event.preventDefault();
				handleOpenModal();
			}
		};

		document.addEventListener('keydown', handleKeyDown);
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, []);

	return (
		<>
			{/* Desktop Layout */}
			<div className="navbar__layout navbar__layout--desktop">
				<DesktopNavbarLayout
					left={
						<>
							{!mobileSidebar.disabled && <NavbarMobileSidebarToggle />}
							<NavbarLogo />
							<NavbarItems items={leftItems} />
						</>
					}
					right={
						<>
							<NavbarItems items={rightItems} />
							<NavbarColorModeToggle className={styles.colorModeToggle} />
							<NavbarSearch>
								<CustomSearchButton onClick={handleOpenModal} />
							</NavbarSearch>
						</>
					}
				/>
			</div>

			{/* Mobile Layout - Perfect UX */}
			<div className="navbar__layout navbar__layout--mobile">
				<MobileNavbarLayout
					menu={!mobileSidebar.disabled && <NavbarMobileSidebarToggle />}
					logo={<NavbarLogo />}
					docs={docsItem && <NavbarItems items={[docsItem]} />}
					theme={<NavbarColorModeToggle className={styles.colorModeToggleMobile} />}
					search={
						<CustomSearchButton onClick={handleOpenModal} />
					}
				/>
			</div>

			<SearchModal isOpen={isModalOpen} onClose={handleCloseModal} />
		</>
	);
}
