import React from 'react';
import { Alert } from 'react-native';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { DatabaseSync } from 'node:sqlite';
import { afterAll, afterEach, beforeEach, describe, expect, jest, test } from '@jest/globals';
import Checkin from '../app/checkin';

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

jest.mock('react-native-input-spinner', () => {
  const React = require('react');
  const { TextInput } = require('react-native');
  return {
    __esModule: true,
    default: ({ min, max, step, value, onChange }) =>
      React.createElement(TextInput, {
        testID: `spinner-${min}-${max}-${step ?? 'default'}`,
        value: String(value),
        onChangeText: (text) => onChange(Number(text)),
      }),
  };
});

jest.mock('@react-native-picker/picker', () => {
  const React = require('react');
  const { Pressable, Text, View } = require('react-native');
  const Picker = ({ children, onValueChange }) =>
    React.createElement(
      View,
      null,
      React.Children.map(children, (child) =>
        React.createElement(
          Pressable,
          {
            key: String(child.props.value),
            testID: `picker-${child.props.value}`,
            onPress: () => onValueChange(child.props.value),
          },
          React.createElement(Text, null, child.props.label),
        ),
      ),
    );
  Picker.Item = () => null;
  return { Picker };
});

describe('Check-in screen and SQLite integration', () => {
  let alertSpy;

  afterAll(() => mockDb?.close());

  beforeEach(() => {
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
    mockDb.runAsync = jest.fn(async (query, params) => mockDb.prepare(query).run(...params));
    mockDb.getAllAsync = jest.fn(async (query) => mockDb.prepare(query).all());
    alertSpy = jest.spyOn(Alert, 'alert').mockImplementation(() => {});
  });

  afterEach(() => alertSpy.mockRestore());

  test('TC-002 rejects an incomplete check-in without writing to SQLite', async () => {
    const { getByText } = await render(<Checkin />);

    await fireEvent.press(getByText('Submit Check-in'));

    expect(alertSpy).toHaveBeenCalledWith('Please select a Stress Level');
    expect(mockDb.runAsync).not.toHaveBeenCalled();
    expect(mockDb.prepare('SELECT COUNT(*) AS count FROM check_ins').get().count).toBe(0);
  });

  test('TC-019 reports a failed SQLite save and does not create a check-in', async () => {
    mockDb.runAsync.mockRejectedValueOnce(new Error('database unavailable'));
    const { getByTestId, getByText } = await render(<Checkin />);

    await fireEvent.changeText(getByTestId('spinner-1-10-default'), '5');
    await fireEvent.press(getByTestId('picker-calm'));
    await fireEvent.press(getByText('No'));
    await fireEvent.changeText(getByTestId('spinner-1-10-1'), '6');
    await fireEvent.press(getByText('Submit Check-in'));

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith(
        'An error occured when submitting the check-ins. Please try again later or try resubmitting the check-ins.',
      );
    });
    expect(mockDb.prepare('SELECT COUNT(*) AS count FROM check_ins').get().count).toBe(0);
  });
});
