import { describe, expect, test } from '@jest/globals';
import { getTrendData } from '../src/lib/overviewData';

describe('Overview trend data', () => {
  const checkIns = [
    { date: '2026-01-03T12:00:00', stress: 4 },
    { date: '2026-01-03T18:00:00', stress: 5 },
    { date: '2026-01-04T12:00:00', stress: 8 },
    { date: '2026-02-02T12:00:00', stress: null },
  ];

  test('TC-102 groups monthly view data by day and rounds the daily average to a tenth', () => {
    expect(getTrendData(checkIns, 'month', (checkIn) => checkIn.stress)).toEqual([
      { label: '03', value: 4.5 },
      { label: '04', value: 8 },
    ]);
  });

  test('TC-103 groups yearly view data by month and excludes null values from averages', () => {
    const expectedJanuaryLabel = new Date(2026, 0, 1)
      .toLocaleDateString(undefined, { month: 'short' });

    expect(getTrendData(checkIns, 'year', (checkIn) => checkIn.stress)).toEqual([
      { label: expectedJanuaryLabel, value: 5.7 },
    ]);
  });
});
