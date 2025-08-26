/** Safer date parser: returns null for invalid inputs. */
function toDateSafe(d: Date | string | number): Date | null {
  const dt = d instanceof Date ? d : new Date(d);
  return Number.isNaN(dt.getTime()) ? null : dt;
}

/** Currency with compact notation (e.g., $1.2K, €3.4M). */
export function formatCurrencyCompact(
  value: number,
  currency = 'USD',
  locale = 'en-US'
) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    notation: 'compact',
    maximumFractionDigits: 2,
  }).format(value);
}

/** Always show +/− sign for changes. */
export function formatSignedNumber(
  value: number,
  locale = 'en-US',
  options: Intl.NumberFormatOptions = {}
) {
  return new Intl.NumberFormat(locale, {
    signDisplay: 'always',
    ...options,
  }).format(value);
}

/** Relative time like "in 3h" / "5 min ago". */
export function formatRelativeTime(
  date: Date | string | number,
  now: Date | number = Date.now(),
  locale = 'en-US'
) {
  const target = toDateSafe(date);
  const base = toDateSafe(now);
  if (!target || !base) return '';
  const diffSec = Math.round((target.getTime() - base.getTime()) / 1000);

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
  const abs = Math.abs(diffSec);

  if (abs < 60) return rtf.format(Math.round(diffSec), 'second');
  const diffMin = Math.round(diffSec / 60);
  if (Math.abs(diffMin) < 60) return rtf.format(diffMin, 'minute');
  const diffHour = Math.round(diffMin / 60);
  if (Math.abs(diffHour) < 24) return rtf.format(diffHour, 'hour');
  const diffDay = Math.round(diffHour / 24);
  if (Math.abs(diffDay) < 30) return rtf.format(diffDay, 'day');
  const diffMonth = Math.round(diffDay / 30);
  if (Math.abs(diffMonth) < 12) return rtf.format(diffMonth, 'month');
  const diffYear = Math.round(diffMonth / 12);
  return rtf.format(diffYear, 'year');
}

/** Date range (uses formatRange when available, falls back if not). */
export function formatDateRange(
  start: Date | string | number,
  end: Date | string | number,
  locale = 'en-US',
  options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: '2-digit' }
) {
  const s = toDateSafe(start);
  const e = toDateSafe(end);
  if (!s || !e) return '';

  const df = new Intl.DateTimeFormat(locale, options);
  // @ts-ignore: formatRange not in older TS lib dom
  return typeof df.formatRange === 'function'
    // @ts-ignore
    ? df.formatRange(s, e)
    : `${df.format(s)} – ${df.format(e)}`;
}
