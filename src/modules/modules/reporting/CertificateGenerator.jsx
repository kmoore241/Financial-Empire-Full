
import React from 'react';

/**
 * Simple certificate preview. Replace with real PDF generation later.
 */
export default function CertificateGenerator({ name='Student Name', course='Course Title', date=new Date() }){
  return (
    <div className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <div className="text-center">
        <div className="text-xs uppercase tracking-wider text-gray-500">Financial Empire</div>
        <div className="text-2xl font-bold mt-1">Certificate of Completion</div>
        <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">Awarded to</div>
        <div className="text-xl mt-1">{name}</div>
        <div className="mt-2 text-sm text-gray-500">For successfully completing <b>{course}</b> on {new Date(date).toLocaleDateString()}.</div>
      </div>
    </div>
  );
}
