import React from 'react';
import { HiChartBar } from 'react-icons/hi2';

export default function ComparisonIcon({ className, ...restProps }) {
    return (
        <HiChartBar
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