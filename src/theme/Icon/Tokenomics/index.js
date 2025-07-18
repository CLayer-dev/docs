import React from 'react';
import { HiCurrencyDollar } from 'react-icons/hi2';

export default function TokenomicsIcon({ className, ...restProps }) {
    return (
        <HiCurrencyDollar
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