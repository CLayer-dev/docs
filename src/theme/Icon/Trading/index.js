import React from 'react';
import { HiArrowsUpDown } from 'react-icons/hi2';

export default function TradingIcon({ className, ...restProps }) {
    return (
        <HiArrowsUpDown
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