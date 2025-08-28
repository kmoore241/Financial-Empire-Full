
import React from 'react';
import { getLS, setLS } from './storage';

export default function SecuritySettings(){
  const [twofa, setTwofa] = React.useState(getLS('fe:admin:2fa', false));
  const [biometric, setBiometric] = React.useState(getLS('fe:admin:bio', false));
  const [remember, setRemember] = React.useState(getLS('fe:admin:remember', true));

  const save = () => {
    setLS('fe:admin:2fa', twofa);
    setLS('fe:admin:bio', biometric);
    setLS('fe:admin:remember', remember);
    alert('Security settings saved');
  };

  return (
    <div className="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
      <h3 className="font-semibold mb-3">Security Settings</h3>
      <div className="space-y-3 text-sm">
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={twofa} onChange={e=>setTwofa(e.target.checked)} />
          Require 2-Step Verification (2FA)
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={biometric} onChange={e=>setBiometric(e.target.checked)} />
          Allow biometric login (Face/Touch ID)
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={remember} onChange={e=>setRemember(e.target.checked)} />
          Enable "Remember me" on this device
        </label>
      </div>
      <button onClick={save} className="mt-3 px-3 py-2 rounded-lg bg-gray-900 text-white dark:bg-white dark:text-black">Save</button>
    </div>
  );
}
