import React from 'react';
export default function WordWrapButton({ className, onClick, isEnabled }) {
  return (
    <button className={className} onClick={onClick}>
      {isEnabled ? 'Disable Wrap' : 'Enable Wrap'}
    </button>
  );
} 