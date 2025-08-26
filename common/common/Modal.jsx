
import React from 'react';
export default function Modal({ open, onClose, children }){
  if(!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-900 rounded-lg p-6 max-w-lg w-full relative">
        <button onClick={onClose} className="absolute top-2 right-2 px-2 py-1">✕</button>
        {children}
      </div>
    </div>
  );
}
