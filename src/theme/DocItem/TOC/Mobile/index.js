import React from 'react';
import clsx from 'clsx';
import { ThemeClassNames } from '@docusaurus/theme-common';
import { useDoc } from '@docusaurus/theme-common/internal';
import TOCItems from '@theme/TOCItems';
import { Collapsible, useCollapsible } from '@docusaurus/theme-common';

import styles from './styles.module.css';

// Using a custom className
// This prevents TOCInline/TOCCollapsible getting highlighted by mistake
const LINK_CLASS_NAME = 'table-of-contents__link toc-highlight';
const LINK_ACTIVE_CLASS_NAME = 'table-of-contents__link--active';

export default function DocItemTOCMobile() {
    const { toc, frontMatter } = useDoc();

    const { collapsed, toggleCollapsed } = useCollapsible({
        initialState: true,
    });

    if (!toc.length || frontMatter.hide_table_of_contents) {
        return null;
    }

    return (
        <div className={clsx(ThemeClassNames.docs.docTocMobile, styles.tocMobile)}>
            <button
                type="button"
                className={styles.tocMobileButton}
                onClick={toggleCollapsed}
                aria-expanded={!collapsed}
            >
                On this page
                <span
                    className={clsx(styles.tocMobileButtonIcon, {
                        [styles.tocMobileButtonIconCollapsed]: collapsed,
                    })}
                >
                    ▼
                </span>
            </button>
            <Collapsible
                lazy
                className={styles.tocMobileCollapsible}
                collapsed={collapsed}
            >
                <TOCItems
                    toc={toc}
                    className={styles.tocMobileItems}
                    linkClassName={LINK_CLASS_NAME}
                    linkActiveClassName={LINK_ACTIVE_CLASS_NAME}
                />
            </Collapsible>
        </div>
    );
} 