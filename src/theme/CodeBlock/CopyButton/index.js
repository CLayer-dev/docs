import React from 'react';
export default function CopyButton({ className, code }) {
  return (
    <button className={className} onClick={() => navigator.clipboard.writeText(code)}>
      Copy
    </button>
  );
} 