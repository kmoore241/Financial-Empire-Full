export async function jsonFetcher<T>(url: string): Promise<T> {
  const r = await fetch(url, { headers: { accept: 'application/json' } });
  if (!r.ok) throw new Error(`Fetch ${url} failed: ${r.status}`);
  return r.json() as Promise<T>;
}
