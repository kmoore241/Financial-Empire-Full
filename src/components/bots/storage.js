
export const getLS = (k, fb) => { try { const v = localStorage.getItem(k); return v? JSON.parse(v): fb; } catch { return fb; } };
export const setLS = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };

export function exportCSV(filename, rows){
  const esc = (s) => (''+s).replace(/"/g,'""');
  const headers = Object.keys(rows[0] || {});
  const body = rows.map(r => headers.map(h => `"${esc(r[h] ?? '')}"`).join(',')).join('\n');
  const csv = [headers.join(','), body].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename; a.click(); URL.revokeObjectURL(url);
}
export function exportJSON(filename, data){
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename; a.click(); URL.revokeObjectURL(url);
}
