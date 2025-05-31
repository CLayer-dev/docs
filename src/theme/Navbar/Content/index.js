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

// Clean navbar content layout - following Bittensor approach
function NavbarContentLayout({ left, right }) {
	return (
		<div className="navbar__inner">
			<div className="navbar__items">{left}</div>
			<div className="navbar__items navbar__items--right">{right}</div>
		</div>
	);
}

export default function NavbarContent() {
	const mobileSidebar = useNavbarMobileSidebar();
	const items = useNavbarItems();
	const [leftItems, rightItems] = splitNavbarItems(items);
	const [isModalOpen, setIsModalOpen] = useState(false);

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
			<NavbarContentLayout
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

			<SearchModal isOpen={isModalOpen} onClose={handleCloseModal} />
		</>
	);
}
