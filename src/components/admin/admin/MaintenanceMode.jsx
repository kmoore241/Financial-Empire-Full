
import React from 'react';
import { getLS, setLS } from './storage';

export default function MaintenanceMode(){
  const [enabled, setEnabled] = React.useState(getLS('fe:admin:maintenance', false));
  const [starts, setStarts] = React.useState(getLS('fe:admin:maintenance:starts', ''));
  const [ends, setEnds] = React.useState(getLS('fe:admin:maintenance:ends', ''));

  const save = () => {
    setLS('fe:admin:maintenance', enabled);
    setLS('fe:admin:maintenance:starts', starts);
    setLS('fe:admin:maintenance:ends', ends);
    alert('Maintenance settings saved');
  };

  return (
    <div className="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
      <h3 className="font-semibold mb-3">Maintenance Mode</h3>
      <div className="flex items-center gap-2 mb-3">
        <input id="mm" type="checkbox" checked={enabled} onChange={e=>setEnabled(e.target.checked)} />
        <label htmlFor="mm" className="text-sm">Enable maintenance mode</label>
      </div>
      <div className="grid md:grid-cols-2 gap-2">
        <div>
          <label className="block text-sm mb-1">Start</label>
          <input type="datetime-local" className="w-full rounded bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 p-2"
                 value={starts} onChange={e=>setStarts(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm mb-1">End</label>
          <input type="datetime-local" className="w-full rounded bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 p-2"
                 value={ends} onChange={e=>setEnds(e.target.value)} />
        </div>
      </div>
      <button onClick={save} className="mt-3 px-3 py-2 rounded-lg bg-gray-900 text-white dark:bg-white dark:text-black">Save</button>
      {enabled && (
        <div className="mt-4 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-sm">
          Preview: Site will be unavailable {starts ? `from ${new Date(starts).toLocaleString()}` : 'soon'} {ends ? `to ${new Date(ends).toLocaleString()}` : ''}.
        </div>
      )}
    </div>
  );
}
