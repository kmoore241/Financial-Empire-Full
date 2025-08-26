
import React from 'react';
import clsx from 'clsx';

export default function Badge({ children, color='gray', className }) {
  const colors = {
    gray: 'bg-gray-200 text-gray-800',
    blue: 'bg-blue-200 text-blue-800',
    green: 'bg-green-200 text-green-800',
    red: 'bg-red-200 text-red-800'
  };
  return <span className={clsx('px-2 py-1 rounded text-xs font-semibold', colors[color], className)}>{children}</span>;
}
