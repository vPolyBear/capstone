export const DEVELOPMENT_SEED_SQL = `
  INSERT INTO check_ins (
    date, stress_level, mood, eaten_recently, concentration_level
  )
  SELECT CURRENT_TIMESTAMP, 10, 'tense', 1, 7
  WHERE NOT EXISTS (SELECT 1 FROM check_ins);


  INSERT INTO journal_entries (
    date, entry
  )
  SELECT CURRENT_TIMESTAMP, 'School has been really stressful so I feel overwhelmed all the time because I feel like time is always running out.'
  WHERE NOT EXISTS (SELECT 1 FROM journal_entries);
`;