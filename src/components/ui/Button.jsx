
import React from 'react';
import clsx from 'clsx';

export default function Button({ variant='primary', className, ...props }) {
  const base = 'px-4 py-2 rounded font-medium focus:outline-none';
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    outline: 'border border-gray-300 text-gray-800 hover:bg-gray-100'
  };
  return <button className={clsx(base, variants[variant], className)} {...props} />;
}
