import React from 'react';
import { HiShoppingCart } from 'react-icons/hi2';

export default function BuyingGuideIcon({ className, ...restProps }) {
    return (
        <HiShoppingCart
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