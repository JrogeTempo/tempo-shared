const TZ_OFFSET_HOURS = 3; // America/Asuncion is UTC-3 (no DST since 2024) — matches the backend's dateRanges.ts

export type TxnRange = 'current_week' | 'current_month' | 'previous_month' | 'last_7_days' | 'last_30_days' | 'all_time';

export const TXN_RANGE_LABEL: Record<TxnRange, string> = {
  current_week: 'Esta semana',
  current_month: 'Este mes',
  previous_month: 'Mes anterior',
  last_7_days: 'Últimos 7 días',
  last_30_days: 'Últimos 30 días',
  all_time: 'Todo el tiempo',
};

/** The first instant of the given local month, as a UTC Date. monthsAgo=0 is the current month. */
export function monthStart(monthsAgo: number, from = new Date()): Date {
  const local = new Date(from.getTime() - TZ_OFFSET_HOURS * 3600_000);
  return new Date(Date.UTC(local.getUTCFullYear(), local.getUTCMonth() - monthsAgo, 1, TZ_OFFSET_HOURS));
}

/** Monday 00:00 of the current local week, as a UTC Date — same week-start convention as the backend's mondayOf. */
export function weekStart(from = new Date()): Date {
  const local = new Date(from.getTime() - TZ_OFFSET_HOURS * 3600_000);
  const day = local.getUTCDay(); // 0 = Sunday
  const mondayOffset = day === 0 ? 6 : day - 1;
  return new Date(Date.UTC(local.getUTCFullYear(), local.getUTCMonth(), local.getUTCDate() - mondayOffset, TZ_OFFSET_HOURS));
}

export function resolveTxnRange(range: TxnRange, now = new Date()): { from?: string; to?: string } {
  switch (range) {
    case 'current_week':
      return { from: weekStart(now).toISOString() };
    case 'current_month':
      return { from: monthStart(0, now).toISOString() };
    case 'previous_month':
      return { from: monthStart(1, now).toISOString(), to: monthStart(0, now).toISOString() };
    case 'last_7_days':
      return { from: new Date(now.getTime() - 7 * 86_400_000).toISOString() };
    case 'last_30_days':
      return { from: new Date(now.getTime() - 30 * 86_400_000).toISOString() };
    case 'all_time':
      return {};
  }
}

/** A specific "YYYY-MM" month (as the dashboard's month picker uses) → its exact bounds. */
export function monthBounds(monthKey: string): { from: string; to: string } {
  const [year, monthIndex] = monthKey.split('-').map(Number);
  const from = new Date(Date.UTC(year, monthIndex - 1, 1, TZ_OFFSET_HOURS));
  const to = new Date(Date.UTC(year, monthIndex, 1, TZ_OFFSET_HOURS));
  return { from: from.toISOString(), to: to.toISOString() };
}
