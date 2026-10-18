import * as SQLite from 'expo-sqlite';

export async function openDatabase() {
  const db = await SQLite.openDatabaseAsync('StressManagement.db');

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      version INTEGER PRIMARY KEY NOT NULL
    );
  `);

  const migration = await db.getFirstAsync<{ version: number }>(
    'SELECT version FROM schema_migrations WHERE version = 1'
  );

  if (!migration) {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS check_ins (
        id INTEGER PRIMARY KEY NOT NULL,
        date TEXT NOT NULL,
        stress_level INTEGER NOT NULL CHECK (stress_level >= 1 AND stress_level <= 10),
        mood TEXT NOT NULL CHECK (mood IN ('happy', 'angry', 'sad', 'frustrated', 'tense', 'bored', 'nervous', 'worried', 'calm', 'scared', 'lonely', 'excited')),
        physical_stress_location TEXT CHECK (physical_stress_location IN ('jaw', 'teeth', 'neck', 'shoulders/traps', 'head', 'stomach', 'chest', 'back', 'hips', 'arms', 'legs', 'hands', 'feet')),
        physical_symptoms TEXT CHECK (physical_symptoms IN ('headache', 'migraine', 'dizzy', 'fatigue', 'upset stomach', 'racing heart', 'tense muscles', 'twitches', 'shortness of breath', 'illness', 'heart palpitations')),
        hours_slept REAL,
        water_consumed REAL,
        eaten_recently INTEGER NOT NULL CHECK (eaten_recently IN (0, 1)),
        concentration_level INTEGER NOT NULL CHECK (concentration_level >= 1 AND concentration_level <= 10),
        stress_cause TEXT CHECK (stress_cause IN ('school', 'work', 'time', 'deadline', 'finances', 'relationship', 'family', 'argument', 'loss', 'health', 'big change', 'surroundings', 'lack of control', 'overthinking', 'uncertainty', 'lonely', 'procrastination')),
        stress_duration INTEGER
      );

      CREATE TABLE IF NOT EXISTS journal_entries (
        id INTEGER PRIMARY KEY NOT NULL,
        date TEXT NOT NULL,
        entry TEXT NOT NULL
      );

      INSERT INTO schema_migrations (version) VALUES (1);
    `);
  }

  const migration2 = await db.getFirstAsync<{ version: number }>(
    'SELECT version FROM schema_migrations WHERE version = 2'
  );

  if (!migration2) {
    await db.withTransactionAsync(async () => {
      await db.execAsync(`
        DROP TABLE IF EXISTS check_ins;

        CREATE TABLE check_ins (
            id INTEGER PRIMARY KEY NOT NULL,
            date TEXT NOT NULL,
            stress_level INTEGER NOT NULL CHECK (stress_level >= 1 AND stress_level <= 10),
            mood TEXT NOT NULL CHECK (mood IN ('happy', 'angry', 'sad', 'frustrated', 'tense', 'bored', 'nervous', 'worried', 'calm', 'scared', 'lonely', 'excited')),
            physical_stress_location TEXT CHECK (physical_stress_location IN ('jaw', 'teeth', 'neck', 'shoulders/traps', 'head', 'stomach', 'chest', 'back', 'hips', 'arms', 'legs', 'hands', 'feet')),
            physical_symptoms TEXT CHECK (physical_symptoms IN ('headache', 'migraine', 'dizzy', 'fatigue', 'upset stomach', 'racing heart', 'tense muscles', 'twitches', 'shortness of breath', 'illness', 'heart palpitations')),
            hours_slept REAL CHECK (hours_slept >= 0), 
            water_consumed REAL CHECK (water_consumed >= 0),
            eaten_recently INTEGER NOT NULL CHECK (eaten_recently IN (0, 1)),
            concentration_level INTEGER NOT NULL CHECK (concentration_level >= 1 AND concentration_level <= 10),
            stress_cause TEXT CHECK (stress_cause IN ('school', 'work', 'time', 'deadline', 'finances', 'relationship', 'family', 'argument', 'loss', 'health', 'big change', 'surroundings', 'lack of control', 'overthinking', 'uncertainty', 'lonely', 'procrastination')),
            stress_duration INTEGER CHECK (stress_duration >= 0)
        );

      INSERT INTO schema_migrations (version) VALUES (2);
    `);
    });
  }
  return db;
}