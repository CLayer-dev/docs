import React from 'react';
import { HiWrenchScrewdriver } from 'react-icons/hi2';

export default function APIsIcon({ className, ...restProps }) {
    return (
        <HiWrenchScrewdriver
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