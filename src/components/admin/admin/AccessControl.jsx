
import React from 'react';
import { getLS, setLS } from './storage';

export default function AccessControl(){
  const [roles, setRoles] = React.useState(getLS('fe:admin:roles', [
    { id:'r1', email:'admin@fe.app', role:'admin', tier:'pro', whitelist:true },
    { id:'r2', email:'beta@fe.app', role:'tester', tier:'basic', whitelist:true },
  ]));

  const [draft, setDraft] = React.useState({ email:'', role:'viewer', tier:'basic', whitelist:false });

  const add = () => {
    if(!draft.email) return;
    const next = [{ id:'r'+Date.now(), ...draft }, ...roles];
    setRoles(next); setLS('fe:admin:roles', next);
    setDraft({ email:'', role:'viewer', tier:'basic', whitelist:false });
  };

  const update = (id, patch) => {
    const next = roles.map(r => r.id===id ? { ...r, ...patch } : r);
    setRoles(next); setLS('fe:admin:roles', next);
  };

  const remove = (id) => {
    const next = roles.filter(r => r.id!==id);
    setRoles(next); setLS('fe:admin:roles', next);
  };

  return (
    <div className="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
      <h3 className="font-semibold mb-3">Access Control & Tiers</h3>
      <div className="grid md:grid-cols-4 gap-2 mb-3">
        <input className="rounded bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 p-2" placeholder="Email"
               value={draft.email} onChange={e=>setDraft({...draft, email:e.target.value})}/>
        <select className="rounded bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 p-2"
                value={draft.role} onChange={e=>setDraft({...draft, role:e.target.value})}>
          <option>admin</option><option>editor</option><option>tester</option><option>viewer</option>
        </select>
        <select className="rounded bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 p-2"
                value={draft.tier} onChange={e=>setDraft({...draft, tier:e.target.value})}>
          <option>basic</option><option>plus</option><option>pro</option>
        </select>
        <label className="inline-flex items-center gap-2 text-sm">
          <input type="checkbox" checked={draft.whitelist} onChange={e=>setDraft({...draft, whitelist:e.target.checked})}/>
          Whitelist
        </label>
      </div>
      <button onClick={add} className="px-3 py-2 rounded-lg bg-gray-900 text-white dark:bg-white dark:text-black">Add User</button>

      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500">
              <th className="py-2">Email</th><th className="py-2">Role</th><th className="py-2">Tier</th><th className="py-2">Whitelist</th><th className="py-2"></th>
            </tr>
          </thead>
          <tbody>
          {roles.map(r => (
            <tr key={r.id} className="border-t border-gray-200 dark:border-gray-800">
              <td className="py-2 pr-4">{r.email}</td>
              <td className="py-2 pr-4">
                <select value={r.role} onChange={e=>update(r.id,{role:e.target.value})}
                        className="rounded bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 p-1">
                  <option>admin</option><option>editor</option><option>tester</option><option>viewer</option>
                </select>
              </td>
              <td className="py-2 pr-4">
                <select value={r.tier} onChange={e=>update(r.id,{tier:e.target.value})}
                        className="rounded bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 p-1">
                  <option>basic</option><option>plus</option><option>pro</option>
                </select>
              </td>
              <td className="py-2 pr-4">
                <input type="checkbox" checked={r.whitelist} onChange={e=>update(r.id,{whitelist:e.target.checked})}/>
              </td>
              <td className="py-2">
                <button onClick={()=>remove(r.id)} className="px-2 py-1 rounded border">Remove</button>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
