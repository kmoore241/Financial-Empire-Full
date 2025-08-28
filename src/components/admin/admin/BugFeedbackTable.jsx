
import React from 'react';
import { getLS, setLS } from './storage';

export default function BugFeedbackTable() {
  const [rows, setRows] = React.useState(getLS('fe:admin:bugs', [
    { id: 'b1', title: 'Chart freezes on iOS', severity: 'high', status: 'open' },
    { id: 'b2', title: 'Quiz score not saved', severity: 'med', status: 'investigating' },
  ]));
  const [title, setTitle] = React.useState('');

  const add = () => {
    if (!title.trim()) return;
    const next = [{ id: 'b' + Date.now(), title, severity: 'low', status: 'open' }, ...rows];
    setRows(next); setLS('fe:admin:bugs', next); setTitle('');
  };

  const update = (id, patch) => {
    const next = rows.map(r => r.id === id ? { ...r, ...patch } : r);
    setRows(next); setLS('fe:admin:bugs', next);
  };

  return (
    <div className="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
      <h3 className="font-semibold mb-3">Bug & Feedback</h3>
      <div className="flex gap-2 mb-3">
        <input className="flex-1 rounded-lg bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 p-2"
               placeholder="Add a bug/feedback title..." value={title} onChange={e=>setTitle(e.target.value)} />
        <button onClick={add} className="px-3 py-2 rounded-lg bg-gray-900 text-white dark:bg-white dark:text-black">Add</button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500">
              <th className="py-2">Title</th>
              <th className="py-2">Severity</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.id} className="border-t border-gray-200 dark:border-gray-800">
                <td className="py-2 pr-4">{r.title}</td>
                <td className="py-2 pr-4">
                  <select value={r.severity} onChange={e=>update(r.id,{severity:e.target.value})}
                          className="rounded bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 p-1">
                    <option>low</option><option>med</option><option>high</option>
                  </select>
                </td>
                <td className="py-2">
                  <select value={r.status} onChange={e=>update(r.id,{status:e.target.value})}
                          className="rounded bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 p-1">
                    <option>open</option><option>investigating</option><option>resolved</option><option>closed</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
