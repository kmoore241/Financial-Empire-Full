import React, { useEffect, useState } from 'react';

export default function RiskSettings(): JSX.Element {
  const [riskPct, setRiskPct] = useState<number>(1);   // % per trade
  const [maxDD,   setMaxDD]   = useState<number>(10);  // % max drawdown

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = JSON.parse(localStorage.getItem('fe:risk') || '{}');
        if (typeof saved.riskPct === 'number') setRiskPct(saved.riskPct);
        if (typeof saved.maxDD   === 'number') setMaxDD(saved.maxDD);
      } catch { /* ignore bad JSON */ }
    }
  }, []);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('fe:risk', JSON.stringify({ riskPct, maxDD }));
    // toast/snackbar could go here
  };

  return (
    <div className="max-w-xl mx-auto p-4 space-y-4">
      <h1 className="text-xl font-semibold">Risk Settings</h1>

      <form onSubmit={onSubmit} className="space-y-4">
        <label className="block">
          <span className="text-sm text-gray-600">Risk per trade (%)</span>
          <input
            type="number"
            min={0}
            max={100}
            step={0.1}
            value={riskPct}
            onChange={e => setRiskPct(parseFloat(e.target.value || '0'))}
            className="mt-1 w-full rounded-md border px-3 py-2"
          />
        </label>

        <label className="block">
          <span className="text-sm text-gray-600">Max drawdown (%)</span>
          <input
            type="number"
            min={0}
            max={100}
            step={0.5}
            value={maxDD}
            onChange={e => setMaxDD(parseFloat(e.target.value || '0'))}
            className="mt-1 w-full rounded-md border px-3 py-2"
          />
        </label>

        <button type="submit" className="rounded-lg bg-black text-white px-4 py-2">
          Save
        </button>
      </form>
    </div>
  );
}
