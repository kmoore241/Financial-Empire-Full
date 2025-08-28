
import React from 'react';
export default function Button({ children, variant='primary', ...rest }){
  const cls = variant==='primary'
    ? 'bg-gray-900 text-white dark:bg-white dark:text-black'
    : variant==='outline'
      ? 'border border-gray-300 dark:border-gray-700'
      : '';
  return (
    <button className={`px-3 py-2 rounded-lg ${cls}`} {...rest}>
      {children}
    </button>
  );
}
