import React from 'react';
import { HiQuestionMarkCircle } from 'react-icons/hi2';

export default function FAQsIcon({ className, ...restProps }) {
    return (
        <HiQuestionMarkCircle
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