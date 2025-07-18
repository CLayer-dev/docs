import React from 'react';
import { HiUserGroup } from 'react-icons/hi2';

export default function CommunityIcon({ className, ...restProps }) {
    return (
        <HiUserGroup
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