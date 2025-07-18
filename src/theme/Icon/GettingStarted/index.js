import React from 'react';
import { HiRocketLaunch } from 'react-icons/hi2';

export default function GettingStartedIcon({ className, ...restProps }) {
    return (
        <HiRocketLaunch
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