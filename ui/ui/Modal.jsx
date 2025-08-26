
import React from 'react';

export default function Modal({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 max-w-lg w-full">
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-bold text-lg">{title}</h2>
          <button onClick={onClose}>&times;</button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
