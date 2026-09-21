export type TxnRange = 'current_week' | 'current_month' | 'previous_month' | 'last_7_days' | 'last_30_days' | 'all_time';
export declare const TXN_RANGE_LABEL: Record<TxnRange, string>;
/** The first instant of the given local month, as a UTC Date. monthsAgo=0 is the current month. */
export declare function monthStart(monthsAgo: number, from?: Date): Date;
/** Monday 00:00 of the current local week, as a UTC Date — same week-start convention as the backend's mondayOf. */
export declare function weekStart(from?: Date): Date;
export declare function resolveTxnRange(range: TxnRange, now?: Date): {
    from?: string;
    to?: string;
};
/** A specific "YYYY-MM" month (as the dashboard's month picker uses) → its exact bounds. */
export declare function monthBounds(monthKey: string): {
    from: string;
    to: string;
};
