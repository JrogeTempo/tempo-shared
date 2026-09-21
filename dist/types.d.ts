export type Category = {
    id: string;
    slug: string;
    name: string;
    icon: string | null;
    color: string | null;
    is_visible: boolean;
    budget_gs: number | null;
};
export type Account = {
    id: string;
    name: string;
    bank: string | null;
    kind: string;
    last4: string | null;
    currency: string;
    is_active: boolean;
};
export type Transaction = {
    id: string;
    amount_gs: number;
    currency: string;
    amount_original: number | null;
    merchant: string | null;
    description: string | null;
    occurred_at: string;
    type: 'expense' | 'income';
    source: 'gmail' | 'manual' | 'widget' | 'import';
    source_ref: string | null;
    category_id: string | null;
    account_id: string | null;
    raw_excerpt: string | null;
    raw_html: string | null;
    from_address: string | null;
    subject: string | null;
    categories: {
        name: string;
        icon: string | null;
        color: string | null;
        is_visible: boolean;
    } | null;
    accounts: {
        name: string;
        bank: string | null;
    } | null;
    matched_rule_id: string | null;
    matched_rule: {
        id: string;
        name: string | null;
        conditions: RuleCondition[];
        condition_operator: RuleOperator;
        action: 'categorize' | 'ignore';
        merchant_name: string | null;
    } | null;
    receiver_id: string | null;
};
/** Used only by the unmatched-emails resolve/ignore quick-rule flow (a single sender/body condition, not the full rule builder). */
export type MailRuleField = 'sender' | 'body' | 'merchant';
export type ApplyRange = 'current_month' | 'previous_month' | 'last_3_months' | 'last_3_months_and_current';
export declare const APPLY_RANGE_LABEL: Record<ApplyRange, string>;
export type RuleConditionType = 'contains' | 'from' | 'subject';
export type RuleCondition = {
    type: RuleConditionType;
    value: string;
};
export type RuleOperator = 'AND' | 'OR';
export declare const RULE_CONDITION_LABEL: Record<RuleConditionType, string>;
export type Receiver = {
    id: string;
    business_name: string;
    person_name: string | null;
    account_id: string | null;
    accounts: {
        name: string;
        bank: string | null;
    } | null;
};
export type MailRule = {
    id: string;
    name: string | null;
    is_active: boolean;
    conditions: RuleCondition[];
    condition_operator: RuleOperator;
    action: 'categorize' | 'ignore';
    transaction_type: 'expense' | 'income';
    merchant_name: string | null;
    category_id: string | null;
    receiver_id: string | null;
    priority: number;
    hits: number;
    categories: {
        name: string;
        icon: string | null;
        color: string | null;
    } | null;
    receiver: {
        id: string;
        business_name: string;
        person_name: string | null;
    } | null;
};
export type UnmatchedEmail = {
    id: string;
    message_id: string;
    from_address: string | null;
    subject: string | null;
    body_excerpt: string | null;
    received_at: string | null;
    status: 'pending' | 'resolved' | 'ignored';
    created_at: string;
};
export type Overview = {
    month: string;
    income_gs: number;
    extra_income_gs: number;
    total_income_gs: number;
    total_spent_gs: number;
    remaining_gs: number;
    savings_rate: number;
    daily_average_gs: number;
    projected_spend_gs: number;
    safe_daily_gs: number;
    previous_month_gs: number;
    change_vs_previous: number | null;
    transaction_count: number;
    by_category: Array<{
        category_id: string | null;
        name: string;
        icon: string;
        color: string | null;
        is_visible: boolean;
        budget_gs: number | null;
        total_gs: number;
        txn_count: number;
    }>;
    by_account: Array<{
        account_id: string | null;
        name: string;
        bank: string | null;
        kind: string | null;
        total_gs: number;
        txn_count: number;
    }>;
    daily: Array<{
        day: string;
        total_gs: number;
        cumulative_gs: number;
    }>;
    trend: Array<{
        month: string;
        total_gs: number;
    }>;
    top_merchants: Array<{
        merchant: string;
        total_gs: number;
        txn_count: number;
    }>;
};
export type Position = {
    holding_id: string;
    symbol: string;
    name: string;
    asset_type: string;
    broker: string | null;
    quantity: number;
    avg_cost_gs: number;
    price_gs: number;
    market_value_gs: number;
    cost_basis_gs: number;
    pnl_gs: number;
    pnl_pct: number;
};
export type Trade = {
    id: string;
    side: 'buy' | 'sell';
    quantity: number;
    unit_price_gs: number;
    currency: 'USD' | 'PYG';
    unit_price_native: number;
    fee_gs: number;
    broker: string | null;
    traded_at: string;
    instruments: {
        symbol: string;
        name: string;
        asset_type: string;
    } | null;
};
export type Portfolio = {
    total_value_gs: number;
    total_cost_gs: number;
    pnl_gs: number;
    pnl_pct: number;
    position_count: number;
    pyg_per_usd: number;
    allocation: Array<{
        symbol: string;
        value_gs: number;
        weight: number;
    }>;
    positions: Position[];
    best: Position | null;
    worst: Position | null;
};
export type Song = {
    title: string;
    artist: string;
    bpm: number;
    delta: number;
};
export type TempoZone = {
    key: 'largo' | 'adagio' | 'andante' | 'moderato' | 'allegro' | 'presto';
    name: string;
    description: string;
    min: number;
    max: number;
};
export type TempoRate = {
    per_day_gs: number;
    rate: number;
    pct_of_income_per_day: number;
    bpm_contribution: number;
};
export type TempoScore = {
    month: string;
    bpm: number;
    zone: TempoZone;
    pace: number;
    frequency: number;
    daily_allowance_gs: number;
    horizons: {
        daily: TempoRate;
        weekly: TempoRate;
        cycle: TempoRate;
    };
    payment: {
        ticket_rate: number;
        average_gs: number;
        median_gs: number;
        largest_gs: number;
        average_pct_of_income: number;
        average_days_of_income: number;
        count: number;
    };
    cycle: {
        payday_day: number | null;
        days_since_payday: number;
        spent_since_payday_gs: number;
        pct_of_salary_used: number;
        runway_days: number | null;
        runs_out_on: string | null;
    };
    ants: {
        threshold_gs: number;
        count: number;
        total_gs: number;
        share_of_spend: number;
        pct_of_income: number;
        per_week: number;
        bpm_contribution: number;
    };
    components: {
        base: number;
        pace: number;
        frequency: number;
    };
    trend: {
        direction: 'accelerating' | 'steady' | 'slowing';
        weekly_vs_monthly: number;
    };
    target: {
        bpm: number;
        zone: TempoZone;
        pace: number;
        monthly_spend_gs: number;
        daily_allowance_gs: number;
    };
    songs: Song[];
    target_songs: Song[];
    advice: Array<{
        key: string;
        title: string;
        detail: string;
        bpm_delta: number;
    }>;
    history: Array<{
        month: string;
        bpm: number;
        zone: string;
    }>;
};
