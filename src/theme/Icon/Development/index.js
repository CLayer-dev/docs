import React from 'react';
import { HiCodeBracket } from 'react-icons/hi2';

export default function DevelopmentIcon({ className, ...restProps }) {
    return (
        <HiCodeBracket
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