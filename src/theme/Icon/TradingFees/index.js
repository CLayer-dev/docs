import React from 'react';
import { HiArrowTrendingDown } from 'react-icons/hi2';

export default function TradingFeesIcon({ className, ...restProps }) {
    return (
        <HiArrowTrendingDown
            className={className}
            {...restProps}
            style={{
                width: '1.2rem',
                height: '1.2rem',
                marginRight: '0.5rem',
                verticalAlign: 'middle',
                ...restProps.style
            }}
        />
    );
} 