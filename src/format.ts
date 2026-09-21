/** Guaraní has no decimals; always render with thousands separators. */
export function gs(amount: number | null | undefined, opts: { compact?: boolean } = {}): string {
  const value = Math.round(amount ?? 0);
  if (opts.compact && Math.abs(value) >= 1_000_000) {
    return `Gs. ${(value / 1_000_000).toLocaleString('es-PY', { maximumFractionDigits: 1 })} M`;
  }
  if (opts.compact && Math.abs(value) >= 1_000) {
    return `Gs. ${Math.round(value / 1_000).toLocaleString('es-PY')} mil`;
  }
  return `Gs. ${value.toLocaleString('es-PY')}`;
}

/** Shows an amount in the currency it actually happened in — not everyone banks in Gs. */
export function money(amount: number | null | undefined, currency?: string | null): string {
  if (!currency || currency === 'PYG') return gs(amount);
  const value = amount ?? 0;
  if (currency === 'USD') {
    return `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
  return `${value.toLocaleString('en-US', { maximumFractionDigits: 2 })} ${currency}`;
}

export const pct = (value: number | null | undefined, digits = 0): string =>
  value === null || value === undefined ? '—' : `${(value * 100).toFixed(digits)}%`;

export const longDate = (iso: string): string =>
  new Date(iso).toLocaleDateString('es-PY', { day: '2-digit', month: 'long', year: 'numeric' });

/** Compact "Sep 23" style — the default everywhere; longDate is only for edit/detail pages. */
export const compactDate = (iso: string): string =>
  new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

/**
 * A 2-digit year ("sept. 26") reads exactly like a day-of-month — easy to
 * mistake for "September 26th" instead of "September 2026". The full year
 * only when it isn't obvious from context (a different year than today's).
 */
export const monthLabel = (key: string): string => {
  const [year, month] = key.split('-').map(Number);
  const opts: Intl.DateTimeFormatOptions = year === new Date().getFullYear()
    ? { month: 'short' }
    : { month: 'short', year: 'numeric' };
  return new Date(year, month - 1, 1).toLocaleDateString('es-PY', opts);
};

export const currentMonthKey = (): string => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
};

const previousMonthKey = (): string => {
  const now = new Date();
  const date = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
};

/**
 * Same "Este mes" / "Mes anterior" convention as the transactions range
 * filter (TXN_RANGE_LABEL) — for a "YYYY-MM" month picker/filter, not just
 * the range pills, so the whole project reads the same way. Older months
 * still fall back to a spelled-out monthLabel.
 */
export const relativeMonthLabel = (key: string): string => {
  if (key === currentMonthKey()) return 'Este mes';
  if (key === previousMonthKey()) return 'Mes anterior';
  return monthLabel(key);
};
