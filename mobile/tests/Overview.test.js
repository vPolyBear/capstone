import React from 'react';
import { act, fireEvent, render, waitFor, within } from '@testing-library/react-native';
import { DatabaseSync } from 'node:sqlite';
import { afterAll, afterEach, beforeEach, describe, expect, jest, test } from '@jest/globals';
import Overview from '../app/overview';

let mockDb;

jest.mock('expo-sqlite', () => ({
  useSQLiteContext: () => mockDb,
}));

jest.mock('expo-router', () => {
  const React = require('react');
  return {
    Link: ({ children }) => React.createElement(React.Fragment, null, children),
  };
});

jest.mock('react-native-gifted-charts', () => {
  const React = require('react');
  const { Text, View } = require('react-native');
  const createChart = (name) => ({ data = [] }) =>
    React.createElement(
      View,
      { testID: `${name}-chart` },
      data.map((point, index) =>
        React.createElement(Text, { key: index }, `${point.label}:${point.value}`),
      ),
    );

  return {
    BarChart: createChart('bar'),
    LineChart: createChart('line'),
    PieChart: createChart('pie'),
  };
});

describe('Overview screen and SQLite integration', () => {
  afterAll(() => mockDb?.close());

  beforeEach(() => {
    jest.useRealTimers();
    mockDb?.close();
    mockDb = new DatabaseSync(':memory:');
    mockDb.exec(`
      CREATE TABLE check_ins (
        id INTEGER PRIMARY KEY,
        date TEXT NOT NULL,
        stress_level INTEGER NOT NULL,
        mood TEXT NOT NULL,
        physical_stress_location TEXT,
        physical_symptoms TEXT,
        hours_slept REAL,
        water_consumed REAL,
        eaten_recently INTEGER NOT NULL,
        concentration_level INTEGER NOT NULL,
        stress_cause TEXT,
        stress_duration INTEGER
      );
    `);
    mockDb.getAllAsync = jest.fn(async (query, params) => mockDb.prepare(query).all(...params));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  const dateString = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}T12:00:00`;
  };

  const addCheckIn = (date, stressLevel) => {
    mockDb.prepare(`
      INSERT INTO check_ins (
        date, stress_level, mood, eaten_recently, concentration_level
      ) VALUES (?, ?, ?, ?, ?)
    `).run(dateString(date), stressLevel, 'calm', 1, 6);
  };

  test('TC-104 loads the selected month and year data from SQLite', async () => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), 8);
    const anotherDay = new Date(now.getFullYear(), now.getMonth(), 10);
    const previousMonth = new Date(now.getFullYear(), now.getMonth() - 1, 20);
    addCheckIn(today, 7);
    addCheckIn(anotherDay, 9);
    addCheckIn(previousMonth, 3);

    const { getByText, findAllByTestId, queryByText } = await render(<Overview />);
    const stressChart = (await findAllByTestId('line-chart'))[0];
    expect(within(stressChart).getByText(`${String(today.getDate()).padStart(2, '0')}:7`)).toBeTruthy();
    expect(within(stressChart).getByText(`${String(anotherDay.getDate()).padStart(2, '0')}:9`)).toBeTruthy();
    expect(queryByText(`${String(previousMonth.getDate()).padStart(2, '0')}:3`)).toBeNull();

    await fireEvent.press(getByText('Year'));
    await waitFor(() => {
      expect(mockDb.getAllAsync).toHaveBeenCalledTimes(2);
      expect(mockDb.getAllAsync.mock.calls[1][1]).toEqual([
        `${now.getFullYear()}-01-01`,
        `${now.getFullYear() + 1}-01-01`,
      ]);
    });

    const updatedStressChart = (await findAllByTestId('line-chart'))[0];
    const currentMonthLabel = today.toLocaleDateString(undefined, { month: 'short' });
    expect(within(updatedStressChart).getByText(`${currentMonthLabel}:8`)).toBeTruthy();
  });

  test('TC-105 shows the empty state when SQLite has no check-ins in the selected month', async () => {
    const { findByText } = await render(<Overview />);
    expect(await findByText('No check-ins for this period.')).toBeTruthy();
  });

  test('TC-106 waits one second before showing loading and then displays SQLite failure', async () => {
    jest.useFakeTimers();
    let rejectLoad;
    mockDb.getAllAsync.mockImplementationOnce(() => new Promise((_resolve, reject) => {
      rejectLoad = reject;
    }));
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    const { getByText, queryByText } = await render(<Overview />);

    expect(queryByText('Loading Check-In Response Graphs...')).toBeNull();
    await act(async () => {
      jest.advanceTimersByTime(999);
    });
    expect(queryByText('Loading Check-In Response Graphs...')).toBeNull();

    await act(async () => {
      jest.advanceTimersByTime(1);
    });
    expect(getByText('Loading Check-In Response Graphs...')).toBeTruthy();

    await act(async () => {
      rejectLoad(new Error('database unavailable'));
    });
    expect(getByText('Something went wrong, please try again in a little bit.')).toBeTruthy();
    consoleError.mockRestore();
  });
});
