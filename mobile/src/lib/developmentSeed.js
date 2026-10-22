export const DEVELOPMENT_SEED_SQL = `
  INSERT INTO check_ins (
    date, stress_level, mood, eaten_recently, concentration_level
  )
  SELECT CURRENT_TIMESTAMP, 1, 'calm', 1, 3
  WHERE NOT EXISTS (SELECT 1 FROM check_ins);
`;
