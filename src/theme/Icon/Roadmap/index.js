import React from 'react';
import { HiMap } from 'react-icons/hi2';

export default function RoadmapIcon({ className, ...restProps }) {
    return (
        <HiMap
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