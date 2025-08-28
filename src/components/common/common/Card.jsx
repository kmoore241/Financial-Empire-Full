
import React from 'react';
export default function Card({ children, className='' }){
  return (
    <div className={`p-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm ${className}`}>
      {children}
    </div>
  );
}
