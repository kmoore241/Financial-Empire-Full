
import React from 'react';

export default function MaintenanceSwitch(){
  const [active, setActive] = React.useState(()=> JSON.parse(localStorage.getItem('fe:maintenance:active')||'false'));
  const [note, setNote] = React.useState(localStorage.getItem('fe:maintenance:note')||'');

  React.useEffect(()=> localStorage.setItem('fe:maintenance:active', JSON.stringify(active)), [active]);
  React.useEffect(()=> localStorage.setItem('fe:maintenance:note', note), [note]);

  return (
    <div className="p-3 rounded-xl border border-gray-200 dark:border-gray-800 space-y-2">
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={active} onChange={e=>setActive(e.target.checked)} />
        Enable maintenance mode
      </label>
      <textarea value={note} onChange={e=>setNote(e.target.value)} className="w-full rounded border p-2" placeholder="Maintenance note..." />
      <div className="text-xs text-gray-500">State persists in localStorage.</div>
    </div>
  );
}
