// tests/hooks/useLocalStorage.test.ts
import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns initial value and updates localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('k', 'v1'));
    expect(result.current[0]).toBe('v1');

    act(() => result.current[1]('v2'));
    expect(result.current[0]).toBe('v2');
    expect(JSON.parse(localStorage.getItem('k') as string)).toBe('v2');
  });

  it('reads an existing value from localStorage on first render', () => {
    localStorage.setItem('k', JSON.stringify('existing'));
    const { result } = renderHook(() => useLocalStorage('k', 'fallback'));
    expect(result.current[0]).toBe('existing');
  });

  it('supports functional updater form', () => {
    const { result } = renderHook(() => useLocalStorage('k', 'A'));
    act(() => result.current[1]((prev: string) => prev + 'B'));
    expect(result.current[0]).toBe('AB');
    expect(JSON.parse(localStorage.getItem('k') as string)).toBe('AB');
  });

  it('stores and retrieves objects', () => {
    type T = { a: number; b: string };
    const initial: T = { a: 1, b: 'x' };
    const { result } = renderHook(() => useLocalStorage<T>('obj', initial));
    expect(result.current[0]).toEqual(initial);

    const next: T = { a: 2, b: 'y' };
    act(() => result.current[1](next));
    expect(result.current[0]).toEqual(next);
    expect(JSON.parse(localStorage.getItem('obj') as string)).toEqual(next);
  });

  it('falls back to initialValue when stored JSON is invalid', () => {
    localStorage.setItem('bad', '{ oops: not json');
    const { result } = renderHook(() => useLocalStorage('bad', 'fallback'));
    expect(result.current[0]).toBe('fallback');
  });

  // If you add a key-change effect to the hook, enable this test:
  // useEffect(() => { setStoredValue(readFromLocalStorage(key)); }, [key])
  // it('reinitializes when the key changes', () => {
  //   const { result, rerender } = renderHook(
  //     ({ k }) => useLocalStorage(k, 'init'),
  //     { initialProps: { k: 'k1' } }
  //   );
  //   act(() => result.current[1]('v1'));
  //   expect(result.current[0]).toBe('v1');
  //
  //   rerender({ k: 'k2' });
  //   expect(result.current[0]).toBe('init');
  // });
});
