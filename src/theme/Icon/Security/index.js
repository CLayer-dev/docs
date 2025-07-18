import React from 'react';
import { HiShieldCheck } from 'react-icons/hi2';

export default function SecurityIcon({ className, ...restProps }) {
    return (
        <HiShieldCheck
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