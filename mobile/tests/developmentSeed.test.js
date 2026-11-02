const { DatabaseSync } = require('node:sqlite');
const { test, expect} = require('@jest/globals');
const { DEVELOPMENT_SEED_SQL } = require('../src/lib/developmentSeed.js');

test('development seed inserts a check-in and journal entry into SQLite', () => {
  const db = new DatabaseSync(':memory:');

  try{
    db.exec(`
      CREATE TABLE check_ins (
        id INTEGER PRIMARY KEY,
        date TEXT NOT NULL,
        stress_level INTEGER NOT NULL,
        mood TEXT NOT NULL,
        eaten_recently INTEGER NOT NULL,
        concentration_level INTEGER NOT NULL
      );
      CREATE TABLE journal_entries (
        id INTEGER PRIMARY KEY,
        date TEXT NOT NULL,
        entry TEXT NOT NULL
      );
    `);

    db.exec(DEVELOPMENT_SEED_SQL);

    const checkIn = db.prepare('SELECT * FROM check_ins').get();
    expect(checkIn.stress_level).toBe(10);
    expect(checkIn.mood).toBe('tense');
    expect(checkIn.eaten_recently).toBe(1);
    expect(checkIn.concentration_level).toBe(7);

    const journalEntry = db.prepare('SELECT * FROM journal_entries').get();
    expect(journalEntry.entry).toBe('School has been really stressful so I feel overwhelmed all the time because I feel like time is always running out.');
  }
  finally{
    db.close();
  }

});
