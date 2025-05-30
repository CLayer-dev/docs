import React from "react";
import clsx from "clsx";
import { ThemeClassNames } from "@docusaurus/theme-common";
import { useDoc } from "@docusaurus/theme-common/internal";
import Heading from "@theme/Heading";
import MDXContent from "@theme/MDXContent";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./styles.module.css";

/**
 Title can be declared inside md content or declared through
 front matter and added manually. To make both cases consistent,
 the added title is added under the same div.markdown block
 See https://github.com/facebook/docusaurus/pull/4882#issuecomment-853021120

 We render a "synthetic title" if:
 - user doesn't ask to hide it with front matter
 - the markdown content does not already contain a top-level h1 heading
*/
function useSyntheticTitle() {
  const { metadata, frontMatter, contentTitle } = useDoc();
  const shouldRender =
    !frontMatter.hide_title && typeof contentTitle === "undefined";
  if (!shouldRender) {
    return null;
  }
  return metadata.title;
}
export default function DocItemContent({ children }) {
  const { metadata } = useDoc();

  const topLevel = isTopLevel(metadata?.slug);

  const syntheticTitle = useSyntheticTitle();

  return (
    <div className={clsx(ThemeClassNames.docs.docMarkdown, "markdown")}>
      {syntheticTitle && (
        <header>
          <div>
            <Heading as="h1">{syntheticTitle}</Heading>
          </div>
        </header>
      )}

      <div className={topLevel ? styles.topLevelDoc : ""}>
        <MetaActions style={{ ...(!topLevel && { top: 61, right: 0 }) }} />
        <MDXContent>{children}</MDXContent>
      </div>
    </div>
  );
}

function isTopLevel(str) {
  return str.split("/").length - 1 < 2;
}

// Sub component
function MetaActions({ style }) {
  const { metadata } = useDoc();

  // Edit this page
  const editUrl = metadata?.editUrl;

  // Submit issue
  const { siteConfig } = useDocusaurusContext();
  const { customFields } = siteConfig;
  const { enableEditUrlLinks, enableIssueLinks, issueBaseUrl } = customFields;

  // Last updated at - with proper date validation
  const getFormattedDate = () => {
    const lastUpdatedAt = metadata?.lastUpdatedAt;

    // If no lastUpdatedAt or it's invalid, return null to hide the section
    if (!lastUpdatedAt) return null;

    const date = new Date(lastUpdatedAt);

    // Check if date is valid
    if (isNaN(date.getTime())) return null;

    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit'
    });
  };

  const formattedLastUpdatedAt = getFormattedDate();

  return (
    <div
      className={styles.hideOnMobile}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        textAlign: "right",
        position: "absolute",
        right: -240,
        height: 58,
        ...style,
      }}>
      {/* Edit URL link */}
      {editUrl && enableEditUrlLinks && (
        <a
          className={styles.link}
          href={editUrl}
          target="_blank"
          rel="noopener noreferrer">
          SUBMIT A PR
        </a>
      )}

      {/* Submit an issue link */}
      {enableIssueLinks && issueBaseUrl && (
        <a
          className={styles.link}
          href={issueBaseUrl}
          target="_blank"
          rel="noopener noreferrer">
          SUBMIT AN ISSUE
        </a>
      )}

      {/* Last updated - only show if valid date exists */}
      {formattedLastUpdatedAt && (
        <span className={styles.lastEdit}>
          last edit: {formattedLastUpdatedAt}
        </span>
      )}
    </div>
  );
}
