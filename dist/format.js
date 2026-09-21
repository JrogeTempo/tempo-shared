/** Guaraní has no decimals; always render with thousands separators. */
export function gs(amount, opts = {}) {
    const value = Math.round(amount ?? 0);
    if (opts.compact && Math.abs(value) >= 1000000) {
        return `Gs. ${(value / 1000000).toLocaleString('es-PY', { maximumFractionDigits: 1 })} M`;
    }
    if (opts.compact && Math.abs(value) >= 1000) {
        return `Gs. ${Math.round(value / 1000).toLocaleString('es-PY')} mil`;
    }
    return `Gs. ${value.toLocaleString('es-PY')}`;
}
/** Shows an amount in the currency it actually happened in — not everyone banks in Gs. */
export function money(amount, currency) {
    if (!currency || currency === 'PYG')
        return gs(amount);
    const value = amount ?? 0;
    if (currency === 'USD') {
        return `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    return `${value.toLocaleString('en-US', { maximumFractionDigits: 2 })} ${currency}`;
}
export const pct = (value, digits = 0) => value === null || value === undefined ? '—' : `${(value * 100).toFixed(digits)}%`;
export const longDate = (iso) => new Date(iso).toLocaleDateString('es-PY', { day: '2-digit', month: 'long', year: 'numeric' });
/** Compact "Sep 23" style — the default everywhere; longDate is only for edit/detail pages. */
export const compactDate = (iso) => new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
/**
 * A 2-digit year ("sept. 26") reads exactly like a day-of-month — easy to
 * mistake for "September 26th" instead of "September 2026". The full year
 * only when it isn't obvious from context (a different year than today's).
 */
export const monthLabel = (key) => {
    const [year, month] = key.split('-').map(Number);
    const opts = year === new Date().getFullYear()
        ? { month: 'short' }
        : { month: 'short', year: 'numeric' };
    return new Date(year, month - 1, 1).toLocaleDateString('es-PY', opts);
};
export const currentMonthKey = () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
};
const previousMonthKey = () => {
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
export const relativeMonthLabel = (key) => {
    if (key === currentMonthKey())
        return 'Este mes';
    if (key === previousMonthKey())
        return 'Mes anterior';
    return monthLabel(key);
};
