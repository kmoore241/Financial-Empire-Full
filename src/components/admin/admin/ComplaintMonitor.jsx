
import React from 'react';
import { getLS, setLS } from './storage';

export default function ComplaintMonitor() {
  const [items, setItems] = React.useState(getLS('fe:admin:complaints', [
    { id: 'c1', user: 'demo@user.com', topic: 'Login issue', text: 'I cannot log in on mobile.', status: 'open', createdAt: Date.now() - 86400000 },
  ]));
  const [text, setText] = React.useState('');

  const add = () => {
    if (!text.trim()) return;
    const next = [{ id: 'c' + (Date.now()), user: 'anonymous', topic: 'General', text, status: 'open', createdAt: Date.now() }, ...items];
    setItems(next);
    setLS('fe:admin:complaints', next);
    setText('');
  };

  const setStatus = (id, status) => {
    const next = items.map(i => i.id === id ? { ...i, status } : i);
    setItems(next); setLS('fe:admin:complaints', next);
  };

  return (
    <div className="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
      <h3 className="font-semibold mb-3">User Complaint Monitor</h3>
      <div className="flex gap-2 mb-3">
        <input className="flex-1 rounded-lg bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 p-2"
               placeholder="Add a quick test complaint (for demo)..."
               value={text} onChange={e => setText(e.target.value)} />
        <button onClick={add} className="px-3 py-2 rounded-lg bg-gray-900 text-white dark:bg-white dark:text-black">Add</button>
      </div>
      <div className="space-y-2">
        {items.map(i => (
          <div key={i.id} className="p-3 rounded-lg border border-gray-200 dark:border-gray-800">
            <div className="flex justify-between text-sm">
              <div className="font-medium">{i.topic}</div>
              <div className="text-gray-500">{new Date(i.createdAt).toLocaleString()}</div>
            </div>
            <div className="text-sm mt-1">{i.text}</div>
            <div className="mt-2 flex items-center gap-2 text-xs">
              <span className="text-gray-500">Status:</span>
              {['open','investigating','resolved','closed'].map(s => (
                <button key={s}
                  onClick={() => setStatus(i.id, s)}
                  className={`px-2 py-1 rounded border ${i.status===s ? 'bg-gray-900 text-white dark:bg-white dark:text-black' : 'hover:bg-gray-100 dark:hover:bg-gray-900'}`}
                >{s}</button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
