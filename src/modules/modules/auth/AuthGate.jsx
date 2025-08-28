
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link } from 'react-router-dom';

/**
 * Blocks children unless user is logged in.
 */
export default function AuthGate({ children }){
  const { user } = useAuth();
  if(!user){
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center px-4">
        <div className="text-3xl font-semibold">You're not logged in</div>
        <div className="text-sm text-gray-500 mt-2">Please log in to continue.</div>
        <Link to="/login" className="mt-4 px-3 py-2 rounded-lg bg-gray-900 text-white dark:bg-white dark:text-black">Go to Login</Link>
      </div>
    );
  }
  return <>{children}</>;
}
