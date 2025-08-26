
import React from 'react';
export default function SearchInput({ value, onChange, placeholder }){
  return (
    <div className="relative">
      <input value={value} onChange={e=>onChange(e.target.value)}
             placeholder={placeholder} className="pl-8 pr-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800"/>
      <span className="absolute left-2 top-2 text-gray-400">🔍</span>
    </div>
  );
}
