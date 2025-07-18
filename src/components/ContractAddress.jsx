import React, { useState } from 'react';
import styles from '../css/custom.css';

const ContractAddress = ({ showLabel = true, compact = false }) => {
    const [copied, setCopied] = useState(false);
    const contractAddress = "0x7b5d6a651b5ea2049489123c5959b3d3cdfeee57";

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(contractAddress);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = contractAddress;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const truncateAddress = (address) => {
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };

    if (compact) {
        return (
            <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '4px 8px',
                backgroundColor: 'var(--ifm-color-emphasis-100)',
                borderRadius: '6px',
                fontSize: '0.9rem',
                fontFamily: 'monospace'
            }}>
                <span>{truncateAddress(contractAddress)}</span>
                <button
                    onClick={copyToClipboard}
                    style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '2px',
                        fontSize: '0.8rem'
                    }}
                    title="Copy full address"
                >
                    {copied ? '✅' : '📋'}
                </button>
            </div>
        );
    }

    return (
        <div style={{
            padding: '16px',
            backgroundColor: 'var(--ifm-color-emphasis-100)',
            borderRadius: '8px',
            marginBottom: '16px',
            border: '1px solid var(--ifm-color-emphasis-200)'
        }}>
            {showLabel && (
                <div style={{
                    fontWeight: 'bold',
                    marginBottom: '8px',
                    color: 'var(--ifm-color-primary)'
                }}>
                    📄 Contract Address (CA)
                </div>
            )}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                flexWrap: 'wrap'
            }}>
                <code style={{
                    fontSize: '0.9rem',
                    padding: '8px 12px',
                    backgroundColor: 'var(--ifm-background-color)',
                    borderRadius: '4px',
                    flex: '1',
                    minWidth: '300px',
                    wordBreak: 'break-all'
                }}>
                    {contractAddress}
                </code>
                <button
                    onClick={copyToClipboard}
                    style={{
                        padding: '8px 16px',
                        backgroundColor: copied ? '#10b981' : 'var(--ifm-color-primary)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: '500',
                        transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => {
                        if (!copied) {
                            e.target.style.backgroundColor = 'var(--ifm-color-primary-dark)';
                        }
                    }}
                    onMouseOut={(e) => {
                        if (!copied) {
                            e.target.style.backgroundColor = 'var(--ifm-color-primary)';
                        }
                    }}
                >
                    {copied ? '✅ Copied!' : '📋 Copy'}
                </button>
            </div>
            <div style={{
                fontSize: '0.8rem',
                color: 'var(--ifm-color-emphasis-600)',
                marginTop: '8px'
            }}>
                <a
                    href={`https://etherscan.io/token/${contractAddress}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none' }}
                >
                    🔗 View on Etherscan
                </a>
            </div>
        </div>
    );
};

export default ContractAddress; 