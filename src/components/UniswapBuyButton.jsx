import React from 'react';

const UniswapBuyButton = ({ compact = false, showDescription = true }) => {
    const uniswapUrl = "https://app.uniswap.org/swap?inputCurrency=ETH&outputCurrency=0x7b5d6a651b5ea2049489123c5959b3d3cdfeee57&exactField=output&chain=mainnet";

    // Uniswap Icon Component
    const UniswapIcon = ({ size = 20 }) => (
        <img
            src="/img/Uniswap_icon_pink.png"
            alt="Uniswap"
            style={{
                height: size,
                width: size,
                filter: 'brightness(0) invert(1)', // Makes the logo white for dark backgrounds
            }}
        />
    );

    if (compact) {
        return (
            <a
                href={uniswapUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 16px',
                    background: 'linear-gradient(135deg, #FF007A 0%, #FF5EAA 100%)',
                    color: 'white',
                    borderRadius: '12px',
                    textDecoration: 'none !important',
                    textDecorationLine: 'none !important',
                    textUnderlineOffset: 'none !important',
                    WebkitTextDecorationLine: 'none !important',
                    fontWeight: '600',
                    fontSize: '0.9rem',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 15px rgba(255, 0, 122, 0.3)',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
                onMouseOver={(e) => {
                    e.target.style.transform = 'translateY(-2px) scale(1.02)';
                    e.target.style.boxShadow = '0 8px 25px rgba(255, 0, 122, 0.4)';
                    e.target.style.textDecoration = 'none';
                    e.target.style.textDecorationLine = 'none';
                }}
                onMouseOut={(e) => {
                    e.target.style.transform = 'translateY(0) scale(1)';
                    e.target.style.boxShadow = '0 4px 15px rgba(255, 0, 122, 0.3)';
                    e.target.style.textDecoration = 'none';
                    e.target.style.textDecorationLine = 'none';
                }}
            >
                <UniswapIcon size={18} />
                Trade on TGE (July 22)
            </a>
        );
    }

    return (
        <div style={{
            padding: '24px',
            background: 'linear-gradient(135deg, var(--ifm-color-emphasis-100) 0%, var(--ifm-color-emphasis-50) 100%)',
            borderRadius: '16px',
            marginBottom: '24px',
            border: '1px solid var(--ifm-color-emphasis-200)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background Pattern */}
            <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '100px',
                height: '100px',
                background: 'radial-gradient(circle, rgba(255, 0, 122, 0.1) 0%, transparent 70%)',
                borderRadius: '50%',
                transform: 'translate(30px, -30px)'
            }} />

            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                marginBottom: showDescription ? '16px' : '20px',
                position: 'relative',
                zIndex: 1
            }}>
                <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #FF007A 0%, #FF5EAA 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 15px rgba(255, 0, 122, 0.3)'
                }}>
                    <UniswapIcon size={24} />
                </div>
                <div>
                    <div style={{
                        fontWeight: 'bold',
                        fontSize: '1.3rem',
                        color: 'var(--ifm-color-primary)',
                        marginBottom: '4px',
                        background: 'linear-gradient(135deg, var(--ifm-color-primary) 0%, #FF007A 100%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        $CLAYER TGE on Uniswap V2
                    </div>
                    <div style={{
                        fontSize: '0.9rem',
                        color: 'var(--ifm-color-emphasis-700)',
                        fontWeight: '500',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}>
                        <span style={{
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            backgroundColor: '#10B981',
                            display: 'inline-block'
                        }} />
                        TGE: July 22, 2025  <span style={{
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            backgroundColor: '#10B981',
                            display: 'inline-block'
                        }} /> 4-6 PM UTC  <span style={{
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            backgroundColor: '#10B981',
                            display: 'inline-block'
                        }} /> Ethereum Mainnet
                    </div>
                </div>
            </div>

            {showDescription && (
                <div style={{
                    fontSize: '0.95rem',
                    color: 'var(--ifm-color-emphasis-600)',
                    marginBottom: '20px',
                    lineHeight: '1.6',
                    position: 'relative',
                    zIndex: 1
                }}>
                    $CLAYER will be available for trading on Uniswap during our TGE on July 22, 2025 at 4-6 PM UTC.
                    The link below will open Uniswap with the correct ETH/CLAYER trading pair when trading goes live.
                </div>
            )}

            <div style={{
                display: 'flex',
                gap: '16px',
                flexWrap: 'wrap',
                alignItems: 'center',
                position: 'relative',
                zIndex: 1
            }}>
                <a
                    href={uniswapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '14px 28px',
                        background: 'linear-gradient(135deg, #FF007A 0%, #FF5EAA 100%)',
                        color: 'white',
                        borderRadius: '12px',
                        textDecoration: 'none !important',
                        textDecorationLine: 'none !important',
                        textUnderlineOffset: 'none !important',
                        WebkitTextDecorationLine: 'none !important',
                        fontWeight: '600',
                        fontSize: '1.05rem',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        boxShadow: '0 4px 20px rgba(255, 0, 122, 0.35)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        position: 'relative',
                        overflow: 'hidden'
                    }}
                    onMouseOver={(e) => {
                        e.target.style.transform = 'translateY(-3px) scale(1.02)';
                        e.target.style.boxShadow = '0 8px 30px rgba(255, 0, 122, 0.45)';
                        e.target.style.textDecoration = 'none';
                        e.target.style.textDecorationLine = 'none';
                    }}
                    onMouseOut={(e) => {
                        e.target.style.transform = 'translateY(0) scale(1)';
                        e.target.style.boxShadow = '0 4px 20px rgba(255, 0, 122, 0.35)';
                        e.target.style.textDecoration = 'none';
                        e.target.style.textDecorationLine = 'none';
                    }}
                >
                    <UniswapIcon size={22} />
                    Trade $CLAYER
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M7 17L17 7M17 7H7M17 7V17"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </a>

                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    backgroundColor: 'var(--ifm-color-success-contrast-background)',
                    borderRadius: '10px',
                    border: '1px solid var(--ifm-color-success)',
                    fontSize: '0.9rem',
                    fontWeight: '500'
                }}>
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M7 12L12 17L17 7"
                            stroke="#10B981"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    <span style={{ color: 'var(--ifm-color-success)' }}>TGE: July 22, 2025 4-6 PM UTC</span>
                </div>
            </div>

            <div style={{
                marginTop: '16px',
                padding: '12px 16px',
                backgroundColor: 'var(--ifm-color-warning-contrast-background)',
                borderRadius: '10px',
                fontSize: '0.85rem',
                color: 'var(--ifm-color-warning-contrast-foreground)',
                border: '1px solid var(--ifm-color-warning)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
                position: 'relative',
                zIndex: 1
            }}>
                <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ marginTop: '1px', flexShrink: 0 }}
                >
                    <path
                        d="M12 9V13M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                        stroke="var(--ifm-color-warning)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
                <div>
                    <strong>Important:</strong> $CLAYER trading will begin during TGE on July 22, 2025 (4-6 PM UTC).
                    Always verify the contract address (0x7b5d6a651b5ea2049489123c5959b3d3cdfeee57) before trading.
                </div>
            </div>
        </div>
    );
};

export default UniswapBuyButton; 