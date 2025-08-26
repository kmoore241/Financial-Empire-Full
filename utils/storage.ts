/** SSR-safe local & session storage helpers with JSON + extras. */

function isBrowser() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function safeParse<T>(raw: string | null): T | null {
  if (raw == null) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function safeStringify(value: unknown): string {
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

export type Unsubscribe = () => void;

class SafeStorage {
  private store: Storage | null;
  public readonly prefix: string;

  constructor(store: Storage | null, prefix = 'fe:') {
    this.store = store;
    this.prefix = prefix;
  }

  private key(k: string) {
    return `${this.prefix}${k}`;
  }

  has(key: string): boolean {
    return this.get(key) !== null;
  }

  get(key: string): string | null {
    if (!this.store) return null;
    try {
      return this.store.getItem(this.key(key));
    } catch {
      return null;
    }
  }

  set(key: string, value: string): void {
    if (!this.store) return;
    try {
      this.store.setItem(this.key(key), value);
    } catch {
      // ignore quota/security errors
    }
  }

  remove(key: string): void {
    if (!this.store) return;
    try {
      this.store.removeItem(this.key(key));
    } catch {}
  }

  clear(): void {
    if (!this.store) return;
    try {
      const keys: string[] = [];
      for (let i = 0; i < this.store.length; i++) {
        const k = this.store.key(i);
        if (k && k.startsWith(this.prefix)) keys.push(k);
      }
      keys.forEach((k) => this.store!.removeItem(k));
    } catch {}
  }

  getJSON<T>(key: string): T | null {
    return safeParse<T>(this.get(key));
  }

  getJSONOr<T>(key: string, fallback: T): T {
    const v = this.getJSON<T>(key);
    return v == null ? fallback : v;
  }

  setJSON(key: string, value: unknown): void {
    this.set(key, safeStringify(value));
  }

  /** Listen for cross-tab changes to this key. */
  onKeyChange(
    key: string,
    cb: (newValue: string | null, oldValue: string | null) => void
  ): Unsubscribe {
    if (!isBrowser()) return () => {};
    const full = this.key(key);
    const handler = (e: StorageEvent) => {
      if (e.storageArea === this.store && e.key === full) {
        cb(e.newValue, e.oldValue);
      }
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }

  /** Create a namespaced store: e.g., localStore.scoped('user:') */
  scoped(suffix: string): SafeStorage {
    return new SafeStorage(this.store, this.prefix + suffix);
  }
}

export const localStore = new SafeStorage(isBrowser() ? window.localStorage : null);
export const sessionStore = new SafeStorage(isBrowser() ? window.sessionStorage : null);
export type { SafeStorage };
