
import React from 'react';
import { getLS, setLS } from './storage';
import { Megaphone } from 'lucide-react';

export default function BroadcastNotice() {
  const [message, setMessage] = React.useState(getLS('fe:admin:broadcast', ''));
  const [isActive, setIsActive] = React.useState(getLS('fe:admin:broadcast:active', false));

  const save = () => {
    setLS('fe:admin:broadcast', message);
    setLS('fe:admin:broadcast:active', isActive);
    alert('Broadcast saved');
  };

  return (
    <div className="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
      <div className="flex items-center gap-2 mb-3">
        <Megaphone size={18} />
        <h3 className="font-semibold">Broadcast Notice</h3>
      </div>
      <label className="block text-sm mb-1">Message</label>
      <textarea className="w-full rounded-lg bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 p-3"
                rows={3}
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Site-wide notice to all users..." />
      <div className="mt-3 flex items-center gap-2">
        <input id="active" type="checkbox" checked={isActive} onChange={e => setIsActive(e.target.checked)} />
        <label htmlFor="active" className="text-sm">Active</label>
      </div>
      <button onClick={save} className="mt-4 px-3 py-2 rounded-lg bg-gray-900 text-white dark:bg-white dark:text-black">Save</button>
      {isActive && message && (
        <div className="mt-4 p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
          Preview: {message}
        </div>
      )}
    </div>
  );
}
