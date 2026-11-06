const fs = require('node:fs');
const path = require('node:path');

const dataDirectory = path.join(__dirname, '..', 'test-data');
const outputDirectory = path.join(dataDirectory, 'generated');
const seedConfig = JSON.parse(
  fs.readFileSync(path.join(dataDirectory, 'seed.json'), 'utf8'),
);

function randomGenerator(seed) {
  let state = seed >>> 0;
  return () => {
    state += 0x6d2b79f5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function pick(random, values) {
  return values[Math.floor(random() * values.length)];
}

function checkIn(overrides = {}) {
  return {
    stress_level: 5,
    mood: 'calm',
    physical_stress_location: null,
    physical_symptoms: null,
    hours_slept: 7,
    water_consumed: 48,
    eaten_recently: 1,
    concentration_level: 5,
    stress_cause: 'school',
    stress_duration: 12,
    ...overrides,
  };
}

function record(id, date, journalEntry, values = {}, expectedInsert = 'accepted') {
  return { id, date, checkIn: checkIn(values), journalEntry, expectedInsert };
}

function generateHappyRecords(seed) {
  const random = randomGenerator(seed);
  const moods = ['calm', 'worried', 'tense', 'sad', 'excited', 'nervous', 'happy'];
  const locations = ['shoulders/traps', 'head', 'stomach', 'neck', 'jaw', 'back'];
  const causes = ['school', 'work', 'deadline', 'family', 'finances', 'relationship'];
  const entries = [
    'I have a paper due this week, so I made an outline and set aside time to work on it.',
    'Work was busy today. A short walk after my shift helped me reset before dinner.',
    'I felt tense before my presentation, but practicing with a friend made it easier.',
    'I am balancing classes and family plans. I will focus on one task at a time.',
    'I slept less than usual and noticed it was harder to concentrate this afternoon.',
    'A difficult conversation took energy today. Writing down my thoughts helped.',
    'My schedule felt crowded, so I moved one task and left some time to rest.',
    'I felt more relaxed after taking a break outside and drinking some water.',
    'A deadline is coming up. I finished the first step and will continue tomorrow.',
    'I was worried this morning, but checking in helped me name what was bothering me.',
  ];

  return Array.from({ length: 30 }, (_, index) => {
    const date = new Date(Date.UTC(2026, 1, 1 + index * 2, 12)).toISOString();
    return record(
      `happy-${String(index + 1).padStart(3, '0')}`,
      date,
      pick(random, entries),
      {
        stress_level: 1 + Math.floor(random() * 10),
        mood: pick(random, moods),
        physical_stress_location: pick(random, locations),
        physical_symptoms: pick(random, ['headache', 'fatigue', 'tense muscles', null]),
        hours_slept: Math.round((5 + random() * 4) * 2) / 2,
        water_consumed: Math.round((24 + random() * 72) * 2) / 2,
        eaten_recently: Math.floor(random() * 2),
        concentration_level: 1 + Math.floor(random() * 10),
        stress_cause: pick(random, causes),
        stress_duration: Math.floor(random() * 48),
      },
    );
  });
}

function generateBoundaryRecords() {
  return [
    record('boundary-one', '2026-06-15T12:00:00.000Z', 'One check-in and journal entry.'),
    record(
      'boundary-maximum-values',
      '2026-06-16T12:00:00.000Z',
      'Maximum UI-supported numeric values.',
      {
        stress_level: 10,
        hours_slept: 1000,
        water_consumed: 1000,
        concentration_level: 10,
        stress_duration: 8760,
      },
    ),
    record(
      'boundary-zero-values',
      '2026-06-17T12:00:00.000Z',
      'Zero is valid for nonnegative measurements.',
      { hours_slept: 0, water_consumed: 0, eaten_recently: 0, stress_duration: 0 },
    ),
    record(
      'boundary-negative-values',
      '2026-06-18T12:00:00.000Z',
      'Negative measurements must be rejected.',
      { hours_slept: -1, water_consumed: -1, stress_duration: -1 },
      'rejected',
    ),
    record(
      'boundary-earliest-date',
      seedConfig.earliestAcceptedDate,
      'Earliest fixture date.',
    ),
    record(
      'boundary-latest-date',
      seedConfig.latestAcceptedDate,
      'Latest fixture date.',
    ),
    record(
      'boundary-maximum-journal',
      '2026-06-19T12:00:00.000Z',
      'B'.repeat(10000),
    ),
  ];
}

function generateHostileRecords() {
  const maximumTextPrefix = "O'Brien ";
  const maximumText = maximumTextPrefix + 'x'.repeat(10000 - maximumTextPrefix.length);
  const inputs = [
    ['hostile-unicode', '2026-07-01T12:00:00.000Z', 'Café notes: naïve, Ελληνικά, 日本語, and مرحباً.'],
    ['hostile-emoji', '2026-07-02T12:00:00.000Z', 'Today felt difficult 😟; a walk 🌳 and a call ☎️ helped.'],
    ['hostile-apostrophe', '2026-07-03T12:00:00.000Z', "O'Brien's deadline isn't the whole story; I'll take it step by step."],
    ['hostile-sql', '2026-07-04T12:00:00.000Z', "'; DROP TABLE journal_entries;--"],
    ['hostile-html', '2026-07-05T12:00:00.000Z', '<script>alert(1)</script> & <img src=x onerror=alert(1)>'],
    ['hostile-path', '2026-07-06T12:00:00.000Z', '../../etc/passwd'],
    ['hostile-maximum-text', '2026-07-07T12:00:00.000Z', maximumText],
  ];

  return inputs.map(([id, date, journalEntry]) => record(id, date, journalEntry));
}

const datasets = {
  happy: {
    description: 'Thirty synthetic, plausible check-in and journal records.',
    records: generateHappyRecords(seedConfig.seed),
  },
  boundary: {
    description: 'Boundary-value records and explicit empty-set scenario.',
    records: generateBoundaryRecords(),
    scenarios: [
      { id: 'empty-set', recordIds: [], expected: 'No rows are present.' },
      { id: 'one-record', recordIds: ['boundary-one'], expected: 'Exactly one record is present.' },
      { id: 'maximum-values', recordIds: ['boundary-maximum-values'], expected: 'UI-supported numeric maxima are accepted.' },
      { id: 'zero-values', recordIds: ['boundary-zero-values'], expected: 'Zero is accepted for nonnegative measurements.' },
      { id: 'negative-values', recordIds: ['boundary-negative-values'], expected: 'Negative measurements are rejected.' },
      { id: 'earliest-date', recordIds: ['boundary-earliest-date'], expected: 'The earliest fixture date is preserved.' },
      { id: 'latest-date', recordIds: ['boundary-latest-date'], expected: 'The latest fixture date is preserved.' },
      { id: 'maximum-journal-length', recordIds: ['boundary-maximum-journal'], expected: 'Exactly 10000 journal characters are preserved.' },
      { id: 'maximum-record-count', recordIds: [], expected: 'No maximum record count is defined by the requirements.' },
    ],
    notes: [
      'No maximum number of application records is specified; maximum-record-count is a documented requirements gap.',
      'Date endpoints are fixture limits, not product requirements.',
      'Maximum values match current UI limits: stress/concentration 10, sleep/water 1000, duration 8760, journal text 10000 characters.',
      'Negative measurements are intentionally invalid and expected to be rejected by SQLite constraints.',
    ],
  },
  hostile: {
    description: 'Hostile text cases for Unicode, emoji, apostrophes, SQL/HTML-like text, traversal, and maximum length.',
    records: generateHostileRecords(),
    wrongTypeFile: {
      path: 'wrong-type-image.csv',
      expected: 'JPEG signature bytes with a .csv extension; no CSV import feature currently exists.',
    },
  },
};

function writeJson(fileName, data) {
  fs.writeFileSync(
    path.join(outputDirectory, fileName),
    `${JSON.stringify(data, null, 2)}\n`,
    'utf8',
  );
}

function main() {
  fs.mkdirSync(outputDirectory, { recursive: true });

  for (const [name, dataset] of Object.entries(datasets)) {
    writeJson(`${name}.json`, {
      name,
      seed: seedConfig.seed,
      generatedAt: seedConfig.generatedAt,
      ...dataset,
    });
    console.log(`${name}: ${dataset.records.length} records`);
  }

  const jpegBytes = Buffer.from(
    '/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////2wBDAf//////////////////////////////////////////////////////////////////////////////////////wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAX/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIQAxAAAAF//8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABBQJ//8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAgBAwEBPwF//8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAgBAgEBPwF//8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQAGPwJ//8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABPyF//9k=',
    'base64',
  );
  fs.writeFileSync(path.join(outputDirectory, 'wrong-type-image.csv'), jpegBytes);
  console.log('hostile wrong-type file: JPEG bytes -> wrong-type-image.csv');
}

main();
