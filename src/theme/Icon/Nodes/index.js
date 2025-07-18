import React from 'react';
import { HiServerStack } from 'react-icons/hi2';

export default function NodesIcon({ className, ...restProps }) {
    return (
        <HiServerStack
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