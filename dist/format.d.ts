/** Guaraní has no decimals; always render with thousands separators. */
export declare function gs(amount: number | null | undefined, opts?: {
    compact?: boolean;
}): string;
/** Shows an amount in the currency it actually happened in — not everyone banks in Gs. */
export declare function money(amount: number | null | undefined, currency?: string | null): string;
export declare const pct: (value: number | null | undefined, digits?: number) => string;
export declare const longDate: (iso: string) => string;
/** Compact "Sep 23" style — the default everywhere; longDate is only for edit/detail pages. */
export declare const compactDate: (iso: string) => string;
/**
 * A 2-digit year ("sept. 26") reads exactly like a day-of-month — easy to
 * mistake for "September 26th" instead of "September 2026". The full year
 * only when it isn't obvious from context (a different year than today's).
 */
export declare const monthLabel: (key: string) => string;
export declare const currentMonthKey: () => string;
/**
 * Same "Este mes" / "Mes anterior" convention as the transactions range
 * filter (TXN_RANGE_LABEL) — for a "YYYY-MM" month picker/filter, not just
 * the range pills, so the whole project reads the same way. Older months
 * still fall back to a spelled-out monthLabel.
 */
export declare const relativeMonthLabel: (key: string) => string;
