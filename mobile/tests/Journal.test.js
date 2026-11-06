import React from 'react';
import { Alert } from 'react-native';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { DatabaseSync } from 'node:sqlite';
import { afterAll, afterEach, beforeEach, describe, expect, jest, test } from '@jest/globals';
import Journal from '../app/journal';
import hostileDataset from '../test-data/generated/hostile.json';

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

describe('Journal screen and SQLite integration', () => {
  const hostileTest = process.env.TEST_DATA_SET === 'hostile' ? test : test.skip;
  let alertSpy;

  afterAll(() => mockDb?.close());

  beforeEach(() => {
    mockDb?.close();
    mockDb = new DatabaseSync(':memory:');
    mockDb.exec(`
      CREATE TABLE journal_entries (
        id INTEGER PRIMARY KEY,
        date TEXT NOT NULL,
        entry TEXT NOT NULL
      );
    `);
    mockDb.runAsync = jest.fn(async (query, params) => mockDb.prepare(query).run(...params));
    mockDb.getAllAsync = jest.fn(async (query) => mockDb.prepare(query).all());
    alertSpy = jest.spyOn(Alert, 'alert').mockImplementation(() => {});
  });

  afterEach(() => alertSpy.mockRestore());

  test('TC-025 reports a failed SQLite save and does not add the journal entry', async () => {
    mockDb.runAsync.mockRejectedValueOnce(new Error('database unavailable'));
    const { getByText, getByPlaceholderText } = await render(<Journal />);

    await fireEvent.press(getByText('Write Journal Entry'));
    await fireEvent.changeText(
      getByPlaceholderText('Here you can write a journal entry'),
      'A test journal entry',
    );
    await fireEvent.press(getByText('Submit Entry'));

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith(
        'An error occured when submitting the entry. Please try again later or try resubmitting the entry.',
      );
    });
    expect(mockDb.prepare('SELECT COUNT(*) AS count FROM journal_entries').get().count).toBe(0);
  });

  hostileTest('hostile dataset entries persist exactly through the Journal screen and SQLite', async () => {
    const { getByText, getByPlaceholderText } = await render(<Journal />);

    for (const [index, item] of hostileDataset.records.entries()) {
      await fireEvent.press(getByText('Write Journal Entry'));
      await fireEvent.changeText(
        getByPlaceholderText('Here you can write a journal entry'),
        item.journalEntry,
      );
      await fireEvent.press(getByText('Submit Entry'));
      await waitFor(() => {
        expect(mockDb.prepare('SELECT COUNT(*) AS count FROM journal_entries').get().count)
          .toBe(index + 1);
      });
    }

    const savedEntries = mockDb.prepare('SELECT entry FROM journal_entries').all().map((row) => row.entry);
    expect(savedEntries).toEqual(expect.arrayContaining(hostileDataset.records.map((item) => item.journalEntry)));
    expect(mockDb.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='journal_entries'").get()).toBeTruthy();
  });
});
