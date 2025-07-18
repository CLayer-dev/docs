import React, { useEffect, useMemo } from 'react';
import clsx from 'clsx';
import {
  ThemeClassNames,
  useThemeConfig,
  usePrevious,
  Collapsible,
  useCollapsible,
} from '@docusaurus/theme-common';
import {
  isActiveSidebarItem,
  findFirstSidebarItemLink,
  useDocSidebarItemsExpandedState,
  isSamePath,
} from '@docusaurus/theme-common/internal';
import Link from '@docusaurus/Link';
import { translate } from '@docusaurus/Translate';
import useIsBrowser from '@docusaurus/useIsBrowser';
import DocSidebarItems from '@theme/DocSidebarItems';
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

// Custom icon renderer for categories
function renderCategoryLabelWithIcon(label) {
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

// If we navigate to a category and it becomes active, it should automatically
// expand itself
function useAutoExpandActiveCategory({ isActive, collapsed, updateCollapsed }) {
  const wasActive = usePrevious(isActive);
  useEffect(() => {
    const justBecameActive = isActive && !wasActive;
    if (justBecameActive && collapsed) {
      updateCollapsed(false);
    }
  }, [isActive, wasActive, collapsed, updateCollapsed]);
}
function useCategoryHrefWithSSRFallback(item) {
  const isBrowser = useIsBrowser();
  return useMemo(() => {
    if (item.href && !item.linkUnlisted) {
      return item.href;
    }
    // In csr, we can precompute the first link and use it if item.href is null
    // We can't do so in ssr, because we need the plugins to run first
    // item.href could translate to correct link
    if (isBrowser) {
      return findFirstSidebarItemLink(item);
    }
    return undefined;
  }, [item, isBrowser]);
}
function CollapseButton({ collapsed, categoryLabel, onClick }) {
  return (
    <button
      aria-label={
        collapsed
          ? translate(
            {
              id: 'theme.DocSidebarItem.expandCategoryAriaLabel',
              message: "Expand sidebar category '{label}'",
              description: 'The ARIA label to expand the sidebar category',
            },
            { label: categoryLabel },
          )
          : translate(
            {
              id: 'theme.DocSidebarItem.collapseCategoryAriaLabel',
              message: "Collapse sidebar category '{label}'",
              description: 'The ARIA label to collapse the sidebar category',
            },
            { label: categoryLabel },
          )
      }
      type="button"
      className="clean-btn menu__caret"
      onClick={onClick}
    />
  );
}
export default function DocSidebarItemCategory({
  item,
  onItemClick,
  activePath,
  level,
  index,
  ...props
}) {
  const { items, label, collapsible, className, href } = item;
  const {
    docs: {
      sidebar: { autoCollapseCategories },
    },
  } = useThemeConfig();
  const hrefWithSSRFallback = useCategoryHrefWithSSRFallback(item);
  const isActive = isActiveSidebarItem(item, activePath);
  const isCurrentPage = isSamePath(href, activePath);
  const { collapsed, setCollapsed } = useCollapsible({
    // Active categories are always initialized as expanded. The default
    // (`item.collapsed`) is only used for non-active categories.
    initialState: () => {
      if (!collapsible) {
        return false;
      }
      return isActive ? false : item.collapsed;
    },
  });
  const { expandedItem, setExpandedItem } = useDocSidebarItemsExpandedState();
  // Use this instead of `setCollapsed`, because it is also reactive
  const updateCollapsed = (toCollapsed = !collapsed) => {
    setExpandedItem(toCollapsed ? null : index);
    setCollapsed(toCollapsed);
  };
  useAutoExpandActiveCategory({ isActive, collapsed, updateCollapsed });
  useEffect(() => {
    if (
      collapsible &&
      expandedItem != null &&
      expandedItem !== index &&
      autoCollapseCategories
    ) {
      setCollapsed(true);
    }
  }, [collapsible, expandedItem, index, setCollapsed, autoCollapseCategories]);
  return (
    <li
      className={clsx(
        ThemeClassNames.docs.docSidebarItemCategory,
        ThemeClassNames.docs.docSidebarItemCategoryLevel(level),
        'menu__list-item',
        {
          'menu__list-item--collapsed': collapsed,
        },
        className,
      )}>
      <div
        className={clsx('menu__list-item-collapsible', {
          'menu__list-item-collapsible--active': isCurrentPage,
        })}>
        <Link
          className={clsx('menu__link', {
            'menu__link--sublist': collapsible,
            'menu__link--sublist-caret': !href && collapsible,
            'menu__link--active': isActive,
          })}
          onClick={
            collapsible
              ? (e) => {
                onItemClick?.(item);
                if (href) {
                  updateCollapsed(false);
                } else {
                  e.preventDefault();
                  updateCollapsed();
                }
              }
              : () => {
                onItemClick?.(item);
              }
          }
          aria-current={isCurrentPage ? 'page' : undefined}
          aria-expanded={collapsible ? !collapsed : undefined}
          href={collapsible ? hrefWithSSRFallback ?? '#' : hrefWithSSRFallback}
          {...props}>
          {renderCategoryLabelWithIcon(label)}
        </Link>
        {href && collapsible && (
          <CollapseButton
            collapsed={collapsed}
            categoryLabel={label}
            onClick={(e) => {
              e.preventDefault();
              updateCollapsed();
            }}
          />
        )}
      </div>

      <Collapsible lazy as="ul" className="menu__list" collapsed={collapsed}>
        <DocSidebarItems
          items={items}
          tabIndex={collapsed ? -1 : 0}
          onItemClick={onItemClick}
          activePath={activePath}
          level={level + 1}
        />
      </Collapsible>
    </li>
  );
}
