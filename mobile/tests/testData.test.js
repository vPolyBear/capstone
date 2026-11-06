const fs = require('node:fs');
const path = require('node:path');
const { DatabaseSync } = require('node:sqlite');
const { afterAll, describe, expect, test } = require('@jest/globals');

const generatedDirectory = path.join(__dirname, '..', 'test-data', 'generated');
const happy = require('../test-data/generated/happy.json');
const boundary = require('../test-data/generated/boundary.json');
const hostile = require('../test-data/generated/hostile.json');
const jpegCsv = path.join(generatedDirectory, 'wrong-type-image.csv');

function createDatabase() {
  const db = new DatabaseSync(':memory:');
  db.exec(`
    CREATE TABLE check_ins (
      id INTEGER PRIMARY KEY,
      date TEXT NOT NULL,
      stress_level INTEGER NOT NULL CHECK (stress_level BETWEEN 1 AND 10),
      mood TEXT NOT NULL CHECK (mood IN ('happy', 'angry', 'sad', 'frustrated', 'tense', 'bored', 'nervous', 'worried', 'calm', 'scared', 'lonely', 'excited')),
      physical_stress_location TEXT,
      physical_symptoms TEXT,
      hours_slept REAL CHECK (hours_slept >= 0),
      water_consumed REAL CHECK (water_consumed >= 0),
      eaten_recently INTEGER NOT NULL CHECK (eaten_recently IN (0, 1)),
      concentration_level INTEGER NOT NULL CHECK (concentration_level BETWEEN 1 AND 10),
      stress_cause TEXT,
      stress_duration INTEGER CHECK (stress_duration >= 0)
    );
    CREATE TABLE journal_entries (
      id INTEGER PRIMARY KEY,
      date TEXT NOT NULL,
      entry TEXT NOT NULL CHECK (length(entry) <= 10000)
    );
  `);
  return db;
}

function insertRecord(db, item) {
  db.prepare(`
    INSERT INTO check_ins (
      date, stress_level, mood, physical_stress_location, physical_symptoms,
      hours_slept, water_consumed, eaten_recently, concentration_level,
      stress_cause, stress_duration
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    item.date,
    item.checkIn.stress_level,
    item.checkIn.mood,
    item.checkIn.physical_stress_location,
    item.checkIn.physical_symptoms,
    item.checkIn.hours_slept,
    item.checkIn.water_consumed,
    item.checkIn.eaten_recently,
    item.checkIn.concentration_level,
    item.checkIn.stress_cause,
    item.checkIn.stress_duration,
  );
  db.prepare('INSERT INTO journal_entries (date, entry) VALUES (?, ?)').run(
    item.date,
    item.journalEntry,
  );
}

describe('generated synthetic test data', () => {
  let db;

  afterAll(() => db?.close());

  test('happy set contains 30 deterministic, plausible records', () => {
    expect(happy.records).toHaveLength(30);
    expect(new Set(happy.records.map((item) => item.id)).size).toBe(30);
    expect(happy.records.every((item) => item.checkIn.stress_level >= 1 && item.checkIn.stress_level <= 10)).toBe(true);
    expect(happy.records.every((item) => item.journalEntry.length > 0)).toBe(true);
    expect(happy.seed).toBe(20261105);
  });

  test('boundary set records empty, one-row, supported limits, zero, negative, date, and length cases', () => {
    expect(boundary.records).toHaveLength(7);
    expect(boundary.scenarios.some((scenario) => scenario.id === 'empty-set' && scenario.recordIds.length === 0)).toBe(true);
    expect(boundary.scenarios).toHaveLength(9);

    db = createDatabase();
    expect(db.prepare('SELECT COUNT(*) AS count FROM check_ins').get().count).toBe(0);

    const recordsById = new Map(boundary.records.map((item) => [item.id, item]));
    for (const scenario of boundary.scenarios.filter((item) => item.recordIds.length > 0)) {
      const item = recordsById.get(scenario.recordIds[0]);
      if (item.expectedInsert === 'rejected') {
        expect(() => insertRecord(db, item)).toThrow(/constraint failed/i);
      } else {
        insertRecord(db, item);
      }
    }

    expect(db.prepare('SELECT COUNT(*) AS count FROM check_ins').get().count).toBe(6);
    expect(db.prepare('SELECT date FROM check_ins WHERE date = ?').get('0001-01-01T00:00:00.000Z')).toBeTruthy();
    expect(db.prepare('SELECT date FROM check_ins WHERE date = ?').get('9999-12-31T23:59:59.999Z')).toBeTruthy();
    expect(
      db.prepare('SELECT length(entry) AS size FROM journal_entries WHERE entry = ?')
        .get('B'.repeat(10000)).size,
    ).toBe(10000);
  });

  test('hostile journal strings survive parameterized SQLite writes without executing as SQL', () => {
    db = createDatabase();
    for (const item of hostile.records) insertRecord(db, item);

    const savedEntries = db.prepare('SELECT entry FROM journal_entries').all().map((row) => row.entry);
    expect(savedEntries).toEqual(expect.arrayContaining(hostile.records.map((item) => item.journalEntry)));
    expect(savedEntries).toContain("O'Brien's deadline isn't the whole story; I'll take it step by step.");
    expect(savedEntries).toContain("'; DROP TABLE journal_entries;--");
    expect(db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='journal_entries'").get()).toBeTruthy();
    expect(db.prepare('SELECT COUNT(*) AS count FROM journal_entries').get().count).toBe(7);
    expect(savedEntries.find((entry) => entry.startsWith("O'Brien "))).toHaveLength(10000);
  });

  test('wrong-type fixture is JPEG-signature data with a CSV extension and no importer is assumed', () => {
    const bytes = fs.readFileSync(jpegCsv);
    expect(path.extname(jpegCsv)).toBe('.csv');
    expect(bytes.subarray(0, 3)).toEqual(Buffer.from([0xff, 0xd8, 0xff]));
    expect(bytes.at(-2)).toBe(0xff);
    expect(bytes.at(-1)).toBe(0xd9);
    expect(hostile.wrongTypeFile.expected).toMatch(/no CSV import feature currently exists/);
  });
});
