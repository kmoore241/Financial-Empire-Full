
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';

export default function Login(){
  const { login } = useAuth();
  const [email, setEmail] = React.useState('');
  const router = useRouter();

  const submit = () => { login(email || 'demo@fe.app', 'admin'); router.push('/dashboard'); };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm p-6 rounded-2xl border border-gray-200 dark:border-gray-800">
        <div className="text-lg font-semibold">Login</div>
        <input className="w-full mt-3 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-2"
               placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <button onClick={submit} className="w-full mt-3 px-3 py-2 rounded-lg bg-gray-900 text-white dark:bg-white dark:text-black">Continue</button>
      </div>
    </div>
  );
}
