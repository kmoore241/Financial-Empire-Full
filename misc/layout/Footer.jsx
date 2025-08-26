
import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer(){
  return (
    <footer className="mt-16 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-gray-600 dark:text-gray-300 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        <div>© {new Date().getFullYear()} Financial Empire</div>
        <div className="flex gap-4">
          <Link to="/privacy" className="hover:underline">Privacy</Link>
          <Link to="/terms" className="hover:underline">Terms</Link>
          <a href="mailto:support@financial-empire.app" className="hover:underline">Support</a>
        </div>
      </div>
    </footer>
  );
}
