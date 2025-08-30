import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './styles.module.css';

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
    if (idx === -1) return body.slice(0, 150) + (body.length > 150 ? '...' : '');
    const start = Math.max(0, idx - contextLen);
    const end = Math.min(body.length, idx + query.length + contextLen);
    let snippet = body.slice(start, end);
    if (start > 0) snippet = '...' + snippet;
    if (end < body.length) snippet = snippet + '...';
    return snippet;
}

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<DocIndexEntry[]>([]);
    const [allDocs, setAllDocs] = useState<DocIndexEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const resultsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            fetch('/docs-index.json')
                .then((res) => res.json())
                .then((data) => {
                    setAllDocs(data);
                    setLoading(false);
                })
                .catch(() => {
                    setLoading(false);
                });
        }
    }, [isOpen]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            // Focus input when modal opens
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    useEffect(() => {
        if (!query) {
            setResults([]);
            setSelectedIndex(0);
            return;
        }
        const q = query.toLowerCase();
        const filteredResults = allDocs.filter(
            (doc) =>
                doc.title.toLowerCase().includes(q) ||
                doc.body.toLowerCase().includes(q)
        ).slice(0, 10);

        setResults(filteredResults);
        setSelectedIndex(0);
    }, [query, allDocs]);

    // Keyboard navigation
    useEffect(() => {
        if (!isOpen) return;

        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelectedIndex(prev => Math.max(prev - 1, 0));
            } else if (e.key === 'Enter') {
                e.preventDefault();
                if (results[selectedIndex]) {
                    window.location.href = results[selectedIndex].url;
                    onClose();
                }
            }
        };

        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [isOpen, onClose, results, selectedIndex]);

    // Scroll selected item into view
    useEffect(() => {
        if (resultsRef.current) {
            const selectedElement = resultsRef.current.children[selectedIndex] as HTMLElement;
            if (selectedElement) {
                selectedElement.scrollIntoView({ block: 'nearest' });
            }
        }
    }, [selectedIndex]);

    const handleResultClick = (url: string) => {
        window.location.href = url;
        onClose();
    };

    const handleClose = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return createPortal(
        <div className={styles.overlay} onClick={handleClose}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <div className={styles.searchContainer}>
                        <svg className={styles.searchIcon} width="20" height="20" viewBox="0 0 20 20">
                            <g clipPath="url(#clip0_87_1095)">
                                <path
                                    d="M19.4855 20.1542L13.224 13.8926C12.724 14.3183 12.149 14.6477 11.499 14.8811C10.849 15.1144 10.1958 15.2311 9.53937 15.2311C7.9377 15.2311 6.58216 14.6767 5.47274 13.5679C4.36331 12.459 3.80859 11.1042 3.80859 9.50343C3.80859 7.90263 4.363 6.54678 5.47182 5.43588C6.58064 4.32498 7.93544 3.76953 9.53624 3.76953C11.1371 3.76953 12.4929 4.32424 13.6038 5.43366C14.7147 6.54307 15.2701 7.89862 15.2701 9.50031C15.2701 10.1952 15.1471 10.8676 14.9009 11.5176C14.6548 12.1676 14.3317 12.7234 13.9317 13.1849L20.1932 19.4465L19.4855 20.1542ZM9.53937 14.2311C10.8663 14.2311 11.9865 13.7743 12.8999 12.8609C13.8134 11.9474 14.2701 10.8272 14.2701 9.50031C14.2701 8.17339 13.8134 7.0532 12.8999 6.13973C11.9865 5.22627 10.8663 4.76953 9.53937 4.76953C8.21245 4.76953 7.09226 5.22627 6.17879 6.13973C5.26534 7.0532 4.80862 8.17339 4.80862 9.50031C4.80862 10.8272 5.26534 11.9474 6.17879 12.8609C7.09226 13.7743 8.21245 14.2311 9.53937 14.2311Z"
                                    fill="currentColor"
                                />
                            </g>
                        </svg>
                        <input
                            ref={inputRef}
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search documentation..."
                            className={styles.searchInput}
                        />
                        <button className={styles.closeButton} onClick={onClose}>
                            <svg width="20" height="20" viewBox="0 0 20 20">
                                <path
                                    d="M15 5L5 15M5 5l10 10"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className={styles.content}>
                    {loading && (
                        <div className={styles.loading}>
                            <div className={styles.spinner}></div>
                            <span>Loading search index...</span>
                        </div>
                    )}

                    {!loading && query && results.length === 0 && (
                        <div className={styles.noResults}>
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                                <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
                                <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" />
                            </svg>
                            <p>No results found for "{query}"</p>
                            <span>Try different keywords or check spelling</span>
                        </div>
                    )}

                    {!loading && !query && (
                        <div className={styles.emptyState}>
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                                <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
                                <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" />
                            </svg>
                            <p>Start typing to search documentation</p>
                            <div className={styles.shortcuts}>
                                <span>Press <kbd>↑</kbd> <kbd>↓</kbd> to navigate</span>
                                <span>Press <kbd>↵</kbd> to select</span>
                                <span>Press <kbd>esc</kbd> to close</span>
                            </div>
                        </div>
                    )}

                    {!loading && results.length > 0 && (
                        <div className={styles.results} ref={resultsRef}>
                            {results.map((doc, index) => {
                                const snippet = getSnippet(doc.body, query);
                                return (
                                    <div
                                        key={doc.url}
                                        className={`${styles.result} ${index === selectedIndex ? styles.selected : ''}`}
                                        onClick={() => handleResultClick(doc.url)}
                                    >
                                        <div className={styles.resultTitle}>
                                            {highlight(doc.title, query)}
                                        </div>
                                        <div className={styles.resultSnippet}>
                                            {highlight(snippet, query)}
                                        </div>
                                        <div className={styles.resultUrl}>
                                            {doc.url}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                <div className={styles.footer}>
                    <div className={styles.footerContent}>
                        <span>Search by Core Layer</span>
                        <div className={styles.shortcuts}>
                            <span><kbd>↑</kbd><kbd>↓</kbd> to navigate</span>
                            <span><kbd>↵</kbd> to select</span>
                            <span><kbd>esc</kbd> to close</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default SearchModal; 