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
								<button
									onClick={handleOpenModal}
									className="navbar__search-button"
									aria-label="Search documentation"
									title="Search (Ctrl+K)"
								>
									<svg className="navbar__search-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
										<path
											d="M19.4855 20.1542L13.224 13.8926C12.724 14.3183 12.149 14.6477 11.499 14.8811C10.849 15.1144 10.1958 15.2311 9.53937 15.2311C7.9377 15.2311 6.58216 14.6767 5.47274 13.5679C4.36331 12.459 3.80859 11.1042 3.80859 9.50343C3.80859 7.90263 4.363 6.54678 5.47182 5.43588C6.58064 4.32498 7.93544 3.76953 9.53624 3.76953C11.1371 3.76953 12.4929 4.32424 13.6038 5.43366C14.7147 6.54307 15.2701 7.89862 15.2701 9.50031C15.2701 10.1952 15.1471 10.8676 14.9009 11.5176C14.6548 12.1676 14.3317 12.7234 13.9317 13.1849L20.1932 19.4465L19.4855 20.1542ZM9.53937 14.2311C10.8663 14.2311 11.9865 13.7743 12.8999 12.8609C13.8134 11.9474 14.2701 10.8272 14.2701 9.50031C14.2701 8.17339 13.8134 7.0532 12.8999 6.13973C11.9865 5.22627 10.8663 4.76953 9.53937 4.76953C8.21245 4.76953 7.09226 5.22627 6.17879 6.13973C5.26534 7.0532 4.80862 8.17339 4.80862 9.50031C4.80862 10.8272 5.26534 11.9474 6.17879 12.8609C7.09226 13.7743 8.21245 14.2311 9.53937 14.2311Z"
											fill="currentColor"
										/>
									</svg>
									Search
									<kbd className="navbar__search-kbd">⌘K</kbd>
								</button>
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
						<button
							onClick={handleOpenModal}
							className="navbar__search-button navbar__search-button--mobile"
							aria-label="Search"
							title="Search (⌘K)"
						>
							<svg className="navbar__search-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
								<path
									d="M19.4855 20.1542L13.224 13.8926C12.724 14.3183 12.149 14.6477 11.499 14.8811C10.849 15.1144 10.1958 15.2311 9.53937 15.2311C7.9377 15.2311 6.58216 14.6767 5.47274 13.5679C4.36331 12.459 3.80859 11.1042 3.80859 9.50343C3.80859 7.90263 4.363 6.54678 5.47182 5.43588C6.58064 4.32498 7.93544 3.76953 9.53624 3.76953C11.1371 3.76953 12.4929 4.32424 13.6038 5.43366C14.7147 6.54307 15.2701 7.89862 15.2701 9.50031C15.2701 10.1952 15.1471 10.8676 14.9009 11.5176C14.6548 12.1676 14.3317 12.7234 13.9317 13.1849L20.1932 19.4465L19.4855 20.1542ZM9.53937 14.2311C10.8663 14.2311 11.9865 13.7743 12.8999 12.8609C13.8134 11.9474 14.2701 10.8272 14.2701 9.50031C14.2701 8.17339 13.8134 7.0532 12.8999 6.13973C11.9865 5.22627 10.8663 4.76953 9.53937 4.76953C8.21245 4.76953 7.09226 5.22627 6.17879 6.13973C5.26534 7.0532 4.80862 8.17339 4.80862 9.50031C4.80862 10.8272 5.26534 11.9474 6.17879 12.8609C7.09226 13.7743 8.21245 14.2311 9.53937 14.2311Z"
									fill="currentColor"
								/>
							</svg>
						</button>
					}
				/>
			</div>

			<SearchModal isOpen={isModalOpen} onClose={handleCloseModal} />
		</>
	);
}
