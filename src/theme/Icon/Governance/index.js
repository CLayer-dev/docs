import React from 'react';
import { HiBuildingLibrary } from 'react-icons/hi2';

export default function GovernanceIcon({ className, ...restProps }) {
    return (
        <HiBuildingLibrary
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