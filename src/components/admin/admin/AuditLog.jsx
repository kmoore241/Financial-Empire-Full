
import React from 'react';
import { getLS, setLS } from './storage';

export default function AuditLog(){
  const [items, setItems] = React.useState(getLS('fe:admin:audit', [
    { id:'a1', at: Date.now()-7200000, who:'admin@fe.app', action:'Updated security settings' },
    { id:'a2', at: Date.now()-3600000, who:'admin@fe.app', action:'Published broadcast' },
  ]));
  const [draft, setDraft] = React.useState('');

  const add = () => {
    if(!draft.trim()) return;
    const next = [{ id:'a'+Date.now(), at: Date.now(), who:'admin@fe.app', action:draft }, ...items];
    setItems(next); setLS('fe:admin:audit', next); setDraft('');
  };

  return (
    <div className="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
      <h3 className="font-semibold mb-3">Audit Log</h3>
      <div className="flex gap-2 mb-3">
        <input className="flex-1 rounded-lg bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 p-2"
               placeholder="Add custom log entry..." value={draft} onChange={e=>setDraft(e.target.value)} />
        <button onClick={add} className="px-3 py-2 rounded-lg bg-gray-900 text-white dark:bg-white dark:text-black">Add</button>
      </div>
      <div className="space-y-2">
        {items.map(i => (
          <div key={i.id} className="p-3 rounded-lg border border-gray-200 dark:border-gray-800 text-sm flex items-center justify-between">
            <div>{i.action}</div>
            <div className="text-gray-500">{new Date(i.at).toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
