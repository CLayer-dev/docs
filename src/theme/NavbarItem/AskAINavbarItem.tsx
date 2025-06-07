import React, { useState, useCallback } from 'react';
import clsx from 'clsx';
import GrokAI from '../../services/grok-ai';
import { AIResponse } from '../../types/docs';
import styles from './AskAINavbarItem.module.css';

interface Message {
    id: string;
    text: string;
    isUser: boolean;
    timestamp: number;
    sources?: string[];
}

// Enhanced text parsing function
const parseMessageText = (text: string, isUser: boolean = false) => {
    const lines = text.split('\n');
    const elements: React.ReactNode[] = [];
    let currentIndex = 0;

    const processLine = (line: string, index: number) => {
        // Handle code blocks (```...```)
        if (line.trim().startsWith('```')) {
            const codeContent: string[] = [];
            let i = index + 1;
            while (i < lines.length && !lines[i].trim().startsWith('```')) {
                codeContent.push(lines[i]);
                i++;
            }
            currentIndex = i; // Skip processed lines
            return (
                <div key={`code-${index}`} className={styles.codeBlock}>
                    {codeContent.join('\n')}
                </div>
            );
        }

        // Handle code-like content (detect by patterns)
        const codePatterns = [
            /^(pragma|contract|function|require|import|module\.exports)/,
            /^(async function|const|let|var).*=/,
            /^\/\/ SPDX-License-Identifier/,
            /^\s*(networks|solidity|chainId|gasPrice):\s/,
            /^\s*[\w]+\s*\([^)]*\)\s*\{/,
        ];

        if (codePatterns.some(pattern => pattern.test(line.trim()))) {
            // Look ahead to see if this might be a multi-line code block
            const codeContent: string[] = [line];
            let i = index + 1;
            let consecutiveCodeLines = 0;

            while (i < lines.length && consecutiveCodeLines < 10) {
                const nextLine = lines[i];
                if (nextLine.trim() === '' ||
                    codePatterns.some(pattern => pattern.test(nextLine.trim())) ||
                    /^\s*[\w\-_]+:/.test(nextLine) || // Object properties
                    /^\s*[};]/.test(nextLine) || // Closing braces
                    /^\s*\/\//.test(nextLine)) { // Comments
                    codeContent.push(nextLine);
                    consecutiveCodeLines++;
                    i++;
                } else {
                    break;
                }
            }

            if (codeContent.length > 1) {
                currentIndex = i - 1; // Skip processed lines
                return (
                    <div key={`auto-code-${index}`} className={styles.codeBlock}>
                        {codeContent.join('\n')}
                    </div>
                );
            }
        }

        // Handle bullet points
        if (line.trim().startsWith('•') || line.trim().startsWith('- ')) {
            const bulletText = line.trim().substring(1).trim();
            return (
                <div key={`bullet-${index}`} className={styles.bulletPoint}>
                    {processInlineFormatting(bulletText)}
                </div>
            );
        }

        // Handle numbered lists (1. 2. etc.)
        const numberedMatch = line.trim().match(/^(\d+)\.\s+(.+)/);
        if (numberedMatch) {
            return (
                <div key={`numbered-${index}`} className={styles.numberedListItem}>
                    {processInlineFormatting(numberedMatch[2])}
                </div>
            );
        }

        // Handle markdown headers (# ## ### #### ##### ######)
        const headerMatch = line.trim().match(/^(#{1,6})\s+(.+)$/);
        if (headerMatch) {
            const level = headerMatch[1].length;
            const headerText = headerMatch[2];
            const headerClass = level <= 2 ? styles.sectionHeader : styles.subHeader;
            return (
                <div key={`header-${index}`} className={headerClass} data-level={level}>
                    {headerText}
                </div>
            );
        }

        // Handle section headers (**text**)
        if (line.trim().startsWith('**') && line.trim().endsWith('**')) {
            const headerText = line.trim().slice(2, -2);
            return (
                <div key={`header-${index}`} className={styles.sectionHeader}>
                    {headerText}
                </div>
            );
        }

        // Handle horizontal rules (--- or ***)
        if (line.trim() === '---' || line.trim() === '***') {
            return <hr key={`hr-${index}`} className={styles.horizontalRule} />;
        }

        // Handle blockquotes (> text)
        if (line.trim().startsWith('> ')) {
            const quoteText = line.trim().substring(2);
            return (
                <div key={`quote-${index}`} className={styles.blockquote}>
                    {processInlineFormatting(quoteText)}
                </div>
            );
        }

        // Handle regular lines
        if (line.trim()) {
            return (
                <p key={`line-${index}`} className={styles.longContent}>
                    {processInlineFormatting(line)}
                </p>
            );
        }

        // Empty line
        return <br key={`br-${index}`} />;
    };

    // Process inline formatting (links, inline code, etc.)
    const processInlineFormatting = (text: string): React.ReactNode => {
        const parts: React.ReactNode[] = [];
        let currentText = text;
        let partIndex = 0;

        // Handle inline code (`code`)
        const codeRegex = /`([^`]+)`/g;
        currentText = currentText.replace(codeRegex, (match, code) => {
            const placeholder = `__INLINE_CODE_${partIndex}__`;
            parts.push(
                <span key={`inline-code-${partIndex}`} className={styles.inlineCode}>
                    {code}
                </span>
            );
            partIndex++;
            return placeholder;
        });

        // Handle URLs (http/https)
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        currentText = currentText.replace(urlRegex, (match) => {
            const placeholder = `__LINK_${partIndex}__`;
            parts.push(
                <a
                    key={`link-${partIndex}`}
                    href={match}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.messageLink}
                >
                    {match}
                </a>
            );
            partIndex++;
            return placeholder;
        });

        // Handle bold text (**text**)
        const boldRegex = /\*\*([^*]+)\*\*/g;
        currentText = currentText.replace(boldRegex, (match, boldText) => {
            const placeholder = `__BOLD_${partIndex}__`;
            parts.push(<strong key={`bold-${partIndex}`}>{boldText}</strong>);
            partIndex++;
            return placeholder;
        });

        // Handle italic text (*text*)
        const italicRegex = /\*([^*]+)\*/g;
        currentText = currentText.replace(italicRegex, (match, italicText) => {
            const placeholder = `__ITALIC_${partIndex}__`;
            parts.push(<em key={`italic-${partIndex}`}>{italicText}</em>);
            partIndex++;
            return placeholder;
        });

        // Reconstruct the text with React elements
        const finalParts: React.ReactNode[] = [];
        const textParts = currentText.split(/__(?:INLINE_CODE|LINK|BOLD|ITALIC)_\d+__/);
        let elementIndex = 0;

        textParts.forEach((textPart, index) => {
            if (textPart) {
                finalParts.push(textPart);
            }
            if (index < textParts.length - 1 && elementIndex < parts.length) {
                finalParts.push(parts[elementIndex]);
                elementIndex++;
            }
        });

        return finalParts.length > 0 ? finalParts : text;
    };

    // Process all lines
    while (currentIndex < lines.length) {
        const line = lines[currentIndex];
        const element = processLine(line, currentIndex);
        elements.push(element);
        currentIndex++;
    }

    return elements;
};

const AskAINavbarItem: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [aiService] = useState(() => new GrokAI());

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            text: inputValue.trim(),
            isUser: true,
            timestamp: Date.now()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);

        try {
            const response: AIResponse = await aiService.chat(inputValue.trim());

            const aiMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: response.message,
                isUser: false,
                timestamp: response.timestamp,
                sources: response.sources
            };

            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            console.error('AI Service Error:', error);

            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: "I'm having trouble right now. Please check our documentation directly or try again later.",
                isUser: false,
                timestamp: Date.now()
            };

            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    }, [inputValue, isLoading, aiService]);

    const handleRefreshDocs = useCallback(async () => {
        try {
            await aiService.refreshDocs();
            const refreshMessage: Message = {
                id: Date.now().toString(),
                text: "Documentation refreshed! I now have the latest information.",
                isUser: false,
                timestamp: Date.now()
            };
            setMessages(prev => [...prev, refreshMessage]);
        } catch (error) {
            console.error('Refresh Error:', error);
        }
    }, [aiService]);

    const quickActions = [
        { label: "Getting Started", query: "How do I get started with Circle Layer?" },
        { label: "Network Info", query: "What are Circle Layer network specifications?" },
        { label: "Development", query: "How do I develop on Circle Layer?" },
        { label: "Staking", query: "How does staking work?" }
    ];

    const handleQuickAction = useCallback((query: string) => {
        setInputValue(query);
    }, []);

    const clearChat = useCallback(() => {
        setMessages([]);
    }, []);

    return (
        <>
            <button
                className={styles.askButton}
                onClick={() => setIsModalOpen(true)}
                aria-label="Ask AI about Circle Layer"
            >
                🤖 Ask AI
            </button>

            {isModalOpen && (
                <div className={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h3>Ask AI Assistant</h3>
                            <div className={styles.headerActions}>
                                <button
                                    onClick={handleRefreshDocs}
                                    className={styles.refreshButton}
                                    title="Refresh Documentation"
                                >
                                    🔄
                                </button>
                                <button
                                    onClick={clearChat}
                                    className={styles.clearButton}
                                    title="Clear Chat"
                                >
                                    🗑️
                                </button>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className={styles.closeButton}
                                >
                                    ✕
                                </button>
                            </div>
                        </div>

                        <div className={styles.quickActions}>
                            {quickActions.map((action, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleQuickAction(action.query)}
                                    className={styles.quickActionButton}
                                >
                                    {action.label}
                                </button>
                            ))}
                        </div>

                        <div className={styles.messagesContainer}>
                            {messages.length === 0 ? (
                                <div className={styles.emptyState}>
                                    <p>👋 Hi! I'm your Circle Layer AI assistant.</p>
                                    <p>Ask me anything about our blockchain, development, staking, or getting started!</p>
                                </div>
                            ) : (
                                messages.map((message) => (
                                    <div
                                        key={message.id}
                                        className={clsx(styles.message, {
                                            [styles.userMessage]: message.isUser,
                                            [styles.aiMessage]: !message.isUser
                                        })}
                                    >
                                        <div className={clsx(styles.messageContent, {
                                            [styles.compact]: message.text.length < 300 && !message.text.includes('\n\n') && !message.text.includes('##')
                                        })}>
                                            <div className={styles.messageText}>
                                                {parseMessageText(message.text, message.isUser)}
                                            </div>
                                            {message.sources && message.sources.length > 0 && (
                                                <div className={styles.sources}>
                                                    <small>Sources: {message.sources.join(', ')}</small>
                                                </div>
                                            )}
                                        </div>
                                        <div className={styles.timestamp}>
                                            {new Date(message.timestamp).toLocaleTimeString()}
                                        </div>
                                    </div>
                                ))
                            )}
                            {isLoading && (
                                <div className={styles.loadingMessage}>
                                    <div className={styles.typingIndicator}>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </div>
                            )}
                        </div>

                        <form onSubmit={handleSubmit} className={styles.inputForm}>
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Ask about Circle Layer..."
                                className={styles.input}
                                disabled={isLoading}
                            />
                            <button
                                type="submit"
                                className={styles.sendButton}
                                disabled={!inputValue.trim() || isLoading}
                            >
                                {isLoading ? '⏳' : '📤'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default AskAINavbarItem; 