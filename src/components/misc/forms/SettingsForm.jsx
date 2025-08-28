
import React from 'react';

export default function SettingsForm({ initial={}, onSave }){
  const [state, setState] = React.useState({ theme:'system', emailAlerts:true, ...initial });
  return (
    <div className="space-y-3">
      <label className="block">
        <div className="text-sm">Theme</div>
        <select value={state.theme} onChange={e=>setState({...state, theme:e.target.value})} className="w-full rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-2">
          <option value="system">System</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </label>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={state.emailAlerts} onChange={e=>setState({...state, emailAlerts:e.target.checked})}/>
        Email alerts
      </label>
      <button onClick={()=>onSave?.(state)} className="px-3 py-2 rounded-lg bg-gray-900 text-white dark:bg-white dark:text-black">Save</button>
    </div>
  );
}
