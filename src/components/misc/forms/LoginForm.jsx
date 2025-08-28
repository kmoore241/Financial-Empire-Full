
import React from 'react';

export default function LoginForm({ onSubmit }){
  const [email, setEmail] = React.useState('');
  const [role, setRole] = React.useState('viewer');
  return (
    <form onSubmit={(e)=>{ e.preventDefault(); onSubmit?.({ email, role }); }} className="space-y-2">
      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-2"/>
      <select value={role} onChange={e=>setRole(e.target.value)} className="w-full rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-2">
        <option>viewer</option><option>tester</option><option>editor</option><option>admin</option>
      </select>
      <button className="px-3 py-2 rounded-lg bg-gray-900 text-white dark:bg-white dark:text-black w-full">Continue</button>
    </form>
  );
}
