const assert = require('node:assert/strict');
const { DatabaseSync } = require('node:sqlite');
const test = require('node:test');
const { DEVELOPMENT_SEED_SQL } = require('../src/lib/developmentSeed.js');

test('development seed inserts a check-in into SQLite', () => {
  const db = new DatabaseSync(':memory:');
  db.exec(`
    CREATE TABLE check_ins (
      id INTEGER PRIMARY KEY,
      date TEXT NOT NULL,
      stress_level INTEGER NOT NULL,
      mood TEXT NOT NULL,
      eaten_recently INTEGER NOT NULL,
      concentration_level INTEGER NOT NULL
    )
  `);

  db.exec(DEVELOPMENT_SEED_SQL);

  const checkIn = db.prepare('SELECT * FROM check_ins').get();
  assert.equal(checkIn.stress_level, 1);
  assert.equal(checkIn.mood, 'calm');
  assert.equal(checkIn.eaten_recently, 1);
  assert.equal(checkIn.concentration_level, 3);
  db.close();
});
