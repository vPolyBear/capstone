const { DatabaseSync } = require('node:sqlite');
const { test, expect} = require('@jest/globals');
const { DEVELOPMENT_SEED_SQL } = require('../src/lib/developmentSeed.js');

test('development seed inserts varied check-ins and journal entries once', () => {
  const db = new DatabaseSync(':memory:');

  try{
    db.exec(`
      CREATE TABLE check_ins (
        id INTEGER PRIMARY KEY,
        date TEXT NOT NULL,
        stress_level INTEGER NOT NULL CHECK (stress_level BETWEEN 1 AND 10),
        mood TEXT NOT NULL,
        physical_stress_location TEXT,
        physical_symptoms TEXT,
        hours_slept REAL,
        water_consumed REAL,
        eaten_recently INTEGER NOT NULL CHECK (eaten_recently IN (0, 1)),
        concentration_level INTEGER NOT NULL CHECK (concentration_level BETWEEN 1 AND 10),
        stress_cause TEXT,
        stress_duration INTEGER
      );
      CREATE TABLE journal_entries (
        id INTEGER PRIMARY KEY,
        date TEXT NOT NULL,
        entry TEXT NOT NULL
      );
    `);

    db.exec(DEVELOPMENT_SEED_SQL);
    const firstCheckInCount = db.prepare('SELECT COUNT(*) AS count FROM check_ins').get().count;
    const firstJournalEntryCount = db.prepare('SELECT COUNT(*) AS count FROM journal_entries').get().count;
    const seededMonths = db.prepare(`
      SELECT COUNT(DISTINCT strftime('%m', date)) AS count
      FROM check_ins
      WHERE strftime('%Y', date) = strftime('%Y', 'now')
    `).get().count;
    const monthlyVariety = db.prepare(`
      SELECT COUNT(DISTINCT mood) AS moods,
             COUNT(DISTINCT stress_level) AS stress_levels,
             COUNT(DISTINCT hours_slept) AS sleep_values
      FROM check_ins
      WHERE strftime('%Y', date) = strftime('%Y', 'now')
        AND strftime('%d', date) IN ('05', '15', '25')
    `).get();
    const distinctMonthlyStressAverages = db.prepare(`
      SELECT COUNT(DISTINCT monthly_average) AS count
      FROM (
        SELECT ROUND(AVG(stress_level), 2) AS monthly_average
        FROM check_ins
        WHERE strftime('%Y', date) = strftime('%Y', 'now')
        GROUP BY strftime('%m', date)
      )
    `).get().count;
    const previousMonthSample = db.prepare(`
      SELECT physical_stress_location, stress_duration, concentration_level
      FROM check_ins
      WHERE date(date) = date('now', 'start of month', '-1 month', '+7 days')
    `).get();
    const octoberSeededLocations = db.prepare(`
      SELECT physical_stress_location, stress_duration, concentration_level
      FROM check_ins
      WHERE date(date) IN (
        date('now', 'start of year', '+9 months', '+7 days'),
        date('now', 'start of year', '+9 months', '+4 days'),
        date('now', 'start of year', '+9 months', '+14 days'),
        date('now', 'start of year', '+9 months', '+24 days')
      )
    `).all();
    db.exec(DEVELOPMENT_SEED_SQL);

    const checkIn = db.prepare('SELECT * FROM check_ins').get();
    expect(checkIn.stress_level).toBe(10);
    expect(checkIn.mood).toBe('tense');
    expect(checkIn.eaten_recently).toBe(1);
    expect(checkIn.concentration_level).toBe(7);

    const journalEntry = db.prepare('SELECT * FROM journal_entries').get();
    expect(journalEntry.entry).toBe('School has been really stressful.');
    expect(firstCheckInCount).toBeGreaterThan(1);
    expect(firstJournalEntryCount).toBeGreaterThan(1);
    expect(seededMonths).toBe(Number(db.prepare("SELECT strftime('%m', 'now') AS month").get().month));
    expect(monthlyVariety.moods).toBeGreaterThan(1);
    expect(monthlyVariety.stress_levels).toBeGreaterThan(1);
    expect(monthlyVariety.sleep_values).toBeGreaterThan(1);
    expect(distinctMonthlyStressAverages).toBeGreaterThan(1);
    expect(previousMonthSample.physical_stress_location).toBeNull();
    expect(previousMonthSample.stress_duration).toBeNull();
    expect(previousMonthSample.concentration_level).not.toBeNull();
    expect(octoberSeededLocations).toHaveLength(4);
    expect(octoberSeededLocations.every((sample) => sample.physical_stress_location === null)).toBe(true);
    expect(octoberSeededLocations.every((sample) => sample.stress_duration === null)).toBe(true);
    expect(octoberSeededLocations.every((sample) => sample.concentration_level !== null)).toBe(true);
    expect(db.prepare('SELECT COUNT(*) AS count FROM check_ins').get().count).toBe(firstCheckInCount);
    expect(db.prepare('SELECT COUNT(*) AS count FROM journal_entries').get().count).toBe(firstJournalEntryCount);
    expect(db.prepare('SELECT COUNT(DISTINCT stress_level) AS count FROM check_ins').get().count).toBeGreaterThan(1);
  }
  finally{
    db.close();
  }

});
