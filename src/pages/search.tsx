import React, { useEffect, useRef, useState } from 'react';
import styles from './search.module.css';

interface DocIndexEntry {
  title: string;
  body: string;
  url: string;
}

function highlight(text: string, query: string) {
  if (!query) return text;
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.split(regex).map((part, i) =>
    regex.test(part) ? <mark key={i} className={styles.highlight}>{part}</mark> : part
  );
}

function getSnippet(body: string, query: string, contextLen = 50) {
  const idx = body.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return body.slice(0, 200) + (body.length > 200 ? '...' : '');
  const start = Math.max(0, idx - contextLen);
  const end = Math.min(body.length, idx + query.length + contextLen);
  let snippet = body.slice(start, end);
  if (start > 0) snippet = '...' + snippet;
  if (end < body.length) snippet = snippet + '...';
  return snippet;
}

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<DocIndexEntry[]>([]);
  const [allDocs, setAllDocs] = useState<DocIndexEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch('/docs-index.json')
      .then((res) => res.json())
      .then((data) => {
        setAllDocs(data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }
    const q = query.toLowerCase();
    setResults(
      allDocs.filter(
        (doc) =>
          doc.title.toLowerCase().includes(q) ||
          doc.body.toLowerCase().includes(q)
      ).slice(0, 10)
    );
  }, [query, allDocs]);

  // Keyboard shortcut: '/' or 'Ctrl+K' to focus
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (
        (e.key === '/' && document.activeElement !== inputRef.current) ||
        (e.ctrlKey && e.key.toLowerCase() === 'k')
      ) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <div className={styles.searchContainer}>
      <h1>Search Documentation</h1>
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Type to search... (Press '/' or Ctrl+K to focus)"
        className={styles.searchInput}
        autoFocus
      />
      {loading && <p>Loading index...</p>}
      {!loading && query && results.length === 0 && <p>No results found.</p>}
      <ul className={styles.resultsList}>
        {results.map((doc) => {
          const inTitle = doc.title.toLowerCase().includes(query.toLowerCase());
          const snippet = getSnippet(doc.body, query);
          return (
            <li key={doc.url} className={styles.resultItem}>
              <a href={doc.url} className={styles.resultLink}>
                {highlight(doc.title, query)}
              </a>
              <p className={styles.resultSnippet}>{highlight(snippet, query)}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SearchPage; 