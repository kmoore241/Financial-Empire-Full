
import React from 'react';
import { getLS, setLS } from './storage';

export default function GrowthTracker() {
  const [milestones, setMilestones] = React.useState(getLS('fe:admin:growth', [
    { id: 'm1', title: '100 users', due: '2025-09-01', owner: 'Core', cost: '$0', note: 'Free tier' },
    { id: 'm2', title: 'API quotas hit', due: '2025-10-15', owner: 'Infra', cost: '$50', note: 'Upgrade plan' },
  ]));
  const [draft, setDraft] = React.useState({ title: '', due: '', owner: '', cost: '', note: '' });

  const add = () => {
    if (!draft.title) return;
    const next = [{ id: 'm' + Date.now(), ...draft }, ...milestones];
    setMilestones(next); setLS('fe:admin:growth', next);
    setDraft({ title: '', due: '', owner: '', cost: '', note: '' });
  };

  return (
    <div className="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
      <h3 className="font-semibold mb-3">Growth Tracker & Cost Timeline</h3>
      <div className="grid md:grid-cols-5 gap-2 mb-3">
        <input className="rounded bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 p-2" placeholder="Milestone"
               value={draft.title} onChange={e=>setDraft({...draft, title:e.target.value})}/>
        <input type="date" className="rounded bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 p-2"
               value={draft.due} onChange={e=>setDraft({...draft, due:e.target.value})}/>
        <input className="rounded bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 p-2" placeholder="Owner"
               value={draft.owner} onChange={e=>setDraft({...draft, owner:e.target.value})}/>
        <input className="rounded bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 p-2" placeholder="Cost"
               value={draft.cost} onChange={e=>setDraft({...draft, cost:e.target.value})}/>
        <input className="rounded bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 p-2" placeholder="Note"
               value={draft.note} onChange={e=>setDraft({...draft, note:e.target.value})}/>
      </div>
      <button onClick={add} className="px-3 py-2 rounded-lg bg-gray-900 text-white dark:bg-white dark:text-black">Add Milestone</button>
      <div className="mt-4 grid gap-2">
        {milestones.map(m => (
          <div key={m.id} className="p-3 rounded-lg border border-gray-200 dark:border-gray-800">
            <div className="flex justify-between text-sm">
              <div className="font-medium">{m.title}</div>
              <div className="text-gray-500">{m.due}</div>
            </div>
            <div className="text-xs text-gray-500 mt-1">Owner: {m.owner} • Cost: {m.cost}</div>
            {m.note && <div className="text-sm mt-1">{m.note}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
