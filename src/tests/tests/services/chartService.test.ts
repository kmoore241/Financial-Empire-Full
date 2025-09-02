// tests/services/chartService.test.ts
import { getChartData } from '@/services/chartService';

describe('chartService.getChartData', () => {
  const BASE = (process.env.REACT_APP_API_BASE_URL ?? '/api') + '/chart';

  beforeEach(() => {
    sessionStorage.clear();
    vi.restoreAllMocks();
  });

  it('POSTs symbols and returns JSON', async () => {
    const mock = vi.fn().mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve([{ time: 1, open: 1, high: 1, low: 1, close: 1, volume: 1 }]),
    });
    vi.stubGlobal('fetch', mock as unknown as typeof fetch);

    const data = await getChartData(['BTC', 'ETH']);
    expect(mock).toHaveBeenCalledWith(
      BASE,
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symbols: ['BTC', 'ETH'] }),
        // signal may be present or not; we don't assert it here
      }),
    );
    expect(Array.isArray(data)).toBe(true);
    expect(data[0]).toHaveProperty('time');
  });

  it('throws on non-OK responses', async () => {
    const mock = vi.fn().mockResolvedValue({ ok: false, statusText: 'Bad Request' });
    vi.stubGlobal('fetch', mock as unknown as typeof fetch);

    await expect(getChartData(['BTC'])).rejects.toThrow(
      'Error fetching chart data: Bad Request',
    );
  });

  it('caches results in sessionStorage (no second fetch)', async () => {
    const mock = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve([{ time: 2, open: 2, high: 2, low: 2, close: 2, volume: 2 }]),
    });
    vi.stubGlobal('fetch', mock as unknown as typeof fetch);

    // First call hits network
    const first = await getChartData(['SOL']);
    expect(first[0].time).toBe(2);
    expect(mock).toHaveBeenCalledTimes(1);

    // Second call returns cached value; no additional fetch
    const second = await getChartData(['SOL']);
    expect(second[0].time).toBe(2);
    expect(mock).toHaveBeenCalledTimes(1);
  });
});
