// src/components/ui/LoadingSpinner.jsx
import React from 'react';

const LoadingSpinner = () => (
  <div className="loading-spinner">
    <svg width="40" height="40" viewBox="0 0 50 50">
      <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" strokeWidth="5" />
    </svg>
  </div>
);

export default LoadingSpinner;
