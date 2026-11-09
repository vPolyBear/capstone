export type OverviewPeriod = 'month' | 'year';

export type TrendDataPoint = {
    value: number;
    label: string;
};

export function getTrendData<T extends { date: string }>(
    checkIns: T[],
    view: OverviewPeriod,
    getValue: (checkIn: T) => number | null,
): TrendDataPoint[] {
    const groups = checkIns.reduce<Record<string, { total: number; count: number }>>((result, item) => {
        const value = getValue(item);

        if (value === null) {
            return result;
        }
        const period = view === 'year' ? item.date.slice(0, 7) : item.date.slice(0, 10);
        const group = result[period] ?? { total: 0, count: 0 };
        group.total += value;
        group.count += 1;
        result[period] = group;
        return result;
    }, {});

    return Object.entries(groups).map(([period, { total, count }]) => ({
        value: Number((total / count).toFixed(1)),
        label: view === 'year'
            ? new Date(Number(period.slice(0, 4)), Number(period.slice(5, 7)) - 1, 1)
                .toLocaleDateString(undefined, { month: 'short' })
            : period.slice(8, 10),
    }));
}
