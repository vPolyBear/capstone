export const DEVELOPMENT_SEED_SQL = `
  INSERT INTO check_ins (
    date, stress_level, mood, eaten_recently, concentration_level
  )
  SELECT CURRENT_TIMESTAMP, 10, 'tense', 1, 7
  WHERE NOT EXISTS (SELECT 1 FROM check_ins);

  INSERT INTO check_ins (
    date, stress_level, mood, physical_stress_location, physical_symptoms,
    hours_slept, water_consumed, eaten_recently, concentration_level,
    stress_cause, stress_duration
  )
  SELECT datetime('now', 'start of month', '+1 day', '12 hours'),
         6, 'worried', 'shoulders/traps', 'tense muscles',
         6.5, 40, 1, 5, 'school', 12
  WHERE date('now') >= date('now', 'start of month', '+1 day')
    AND NOT EXISTS (
      SELECT 1 FROM check_ins
      WHERE date(date, 'localtime') = date('now', 'start of month', '+1 day')
        AND stress_level = 6 AND mood = 'worried'
    );

  INSERT INTO check_ins (
    date, stress_level, mood, physical_stress_location, physical_symptoms,
    hours_slept, water_consumed, eaten_recently, concentration_level,
    stress_cause, stress_duration
  )
  SELECT datetime('now', 'start of month', '+2 days', '12 hours'),
         4, 'calm', 'neck', 'fatigue',
         8, 56, 1, 8, 'work', 4
  WHERE date('now') >= date('now', 'start of month', '+2 days')
    AND NOT EXISTS (
      SELECT 1 FROM check_ins
      WHERE date(date, 'localtime') = date('now', 'start of month', '+2 days')
        AND stress_level = 4 AND mood = 'calm'
    );

  INSERT INTO check_ins (
    date, stress_level, mood, physical_stress_location, physical_symptoms,
    hours_slept, water_consumed, eaten_recently, concentration_level,
    stress_cause, stress_duration
  )
  SELECT datetime('now', 'start of month', '+3 days', '12 hours'),
         8, 'nervous', 'chest', 'racing heart',
         5, 28, 0, 3, 'deadline', 36
  WHERE date('now') >= date('now', 'start of month', '+3 days')
    AND NOT EXISTS (
      SELECT 1 FROM check_ins
      WHERE date(date, 'localtime') = date('now', 'start of month', '+3 days')
        AND stress_level = 8 AND mood = 'nervous'
    );

  INSERT INTO check_ins (
    date, stress_level, mood, physical_stress_location, physical_symptoms,
    hours_slept, water_consumed, eaten_recently, concentration_level,
    stress_cause, stress_duration
  )
  SELECT datetime('now', 'start of month', '+4 days', '12 hours'),
         3, 'happy', 'jaw', 'headache',
         7.5, 64, 1, 9, 'family', 2
  WHERE date('now') >= date('now', 'start of month', '+4 days')
    AND NOT EXISTS (
      SELECT 1 FROM check_ins
      WHERE date(date, 'localtime') = date('now', 'start of month', '+4 days')
        AND stress_level = 3 AND mood = 'happy'
    );

  WITH RECURSIVE months(month_start, month_number) AS (
    SELECT date('now', 'start of year'), 1
    UNION ALL
    SELECT date(month_start, '+1 month'), month_number + 1
    FROM months
    WHERE month_start < date('now', 'start of month')
  ),
  legacy_samples(day_offset, sample_index, stress_level, mood, physical_stress_location,
                 physical_symptoms, hours_slept, water_consumed, eaten_recently,
                 concentration_level, stress_cause, stress_duration) AS (
    VALUES
      (4, 0, 6, 'worried', 'shoulders/traps', 'tense muscles', 6.5, 40, 1, 5, 'school', 12),
      (14, 1, 4, 'calm', 'neck', 'fatigue', 8, 56, 1, 8, 'work', 4),
      (24, 2, 8, 'nervous', 'chest', 'racing heart', 5, 28, 0, 3, 'deadline', 36)
  )
  UPDATE check_ins AS existing
  SET stress_level = ((legacy_samples.stress_level + months.month_number + legacy_samples.sample_index - 2) % 10) + 1,
      mood = CASE (months.month_number + legacy_samples.sample_index) % 8
        WHEN 0 THEN 'happy' WHEN 1 THEN 'calm' WHEN 2 THEN 'nervous' WHEN 3 THEN 'worried'
        WHEN 4 THEN 'frustrated' WHEN 5 THEN 'excited' WHEN 6 THEN 'sad' ELSE 'tense'
      END,
      physical_stress_location = CASE
        WHEN months.month_number = 10 THEN NULL
        ELSE CASE (months.month_number + legacy_samples.sample_index) % 7
          WHEN 0 THEN 'jaw' WHEN 1 THEN 'neck' WHEN 2 THEN 'shoulders/traps'
          WHEN 3 THEN 'chest' WHEN 4 THEN 'back' WHEN 5 THEN 'stomach' ELSE 'head'
        END
      END,
      physical_symptoms = CASE (months.month_number + legacy_samples.sample_index) % 6
        WHEN 0 THEN 'headache' WHEN 1 THEN 'tense muscles' WHEN 2 THEN 'fatigue'
        WHEN 3 THEN 'racing heart' WHEN 4 THEN 'dizzy' ELSE 'upset stomach'
      END,
      hours_slept = MAX(0.5, legacy_samples.hours_slept + ((months.month_number + legacy_samples.sample_index) % 5 - 2) * 0.5),
      water_consumed = MAX(8, legacy_samples.water_consumed + ((months.month_number + legacy_samples.sample_index) % 5 - 2) * 8),
      eaten_recently = (legacy_samples.eaten_recently + months.month_number + legacy_samples.sample_index) % 2,
      concentration_level = ((legacy_samples.concentration_level + months.month_number + legacy_samples.sample_index - 2) % 10) + 1,
      stress_cause = CASE (months.month_number + legacy_samples.sample_index) % 8
        WHEN 0 THEN 'school' WHEN 1 THEN 'work' WHEN 2 THEN 'deadline' WHEN 3 THEN 'time'
        WHEN 4 THEN 'family' WHEN 5 THEN 'finances' WHEN 6 THEN 'overthinking' ELSE 'uncertainty'
      END,
      stress_duration = CASE
        WHEN months.month_number = 10 THEN NULL
        ELSE (legacy_samples.stress_duration + (months.month_number + legacy_samples.sample_index) * 3) % 49
      END
  FROM months CROSS JOIN legacy_samples
  WHERE date(existing.date, 'localtime') = date(datetime(months.month_start, '+' || legacy_samples.day_offset || ' days', '12 hours'))
    AND existing.stress_level = legacy_samples.stress_level
    AND existing.mood = legacy_samples.mood
    AND existing.physical_stress_location = legacy_samples.physical_stress_location
    AND existing.physical_symptoms = legacy_samples.physical_symptoms
    AND existing.hours_slept = legacy_samples.hours_slept
    AND existing.water_consumed = legacy_samples.water_consumed
    AND existing.eaten_recently = legacy_samples.eaten_recently
    AND existing.concentration_level = legacy_samples.concentration_level
    AND existing.stress_cause = legacy_samples.stress_cause
    AND existing.stress_duration = legacy_samples.stress_duration;

  UPDATE check_ins
  SET concentration_level = CASE
        WHEN stress_level = 5 AND mood = 'nervous' THEN 4
        WHEN stress_level = 4 AND mood = 'worried' THEN 8
        WHEN stress_level = 9 AND mood = 'frustrated' THEN 4
      END,
      stress_duration = NULL
  WHERE date(date, 'localtime') IN (
    date('now', 'start of year', '+9 months', '+4 days'),
    date('now', 'start of year', '+9 months', '+14 days'),
    date('now', 'start of year', '+9 months', '+24 days')
  )
    AND physical_stress_location IS NULL
    AND (
      (stress_level = 5 AND mood = 'nervous' AND stress_cause = 'deadline')
      OR (stress_level = 4 AND mood = 'worried' AND stress_cause = 'time')
      OR (stress_level = 9 AND mood = 'frustrated' AND stress_cause = 'family')
    );

  UPDATE check_ins
  SET stress_duration = NULL
  WHERE date(date, 'localtime') = date('now', 'start of month', '-1 month', '+7 days')
    AND stress_level = 5
    AND mood = 'calm'
    AND physical_stress_location IS NULL
    AND physical_symptoms = 'fatigue'
    AND hours_slept = 7
    AND water_consumed = 48
    AND eaten_recently = 1
    AND concentration_level = 6
    AND stress_cause = 'work'
    AND stress_duration = 8;

  WITH RECURSIVE months(month_start, month_number) AS (
    SELECT date('now', 'start of year'), 1
    UNION ALL
    SELECT date(month_start, '+1 month'), month_number + 1
    FROM months
    WHERE month_start < date('now', 'start of month')
  ),
  samples(day_offset, sample_index, stress_level, physical_stress_location, physical_symptoms,
          hours_slept, water_consumed, eaten_recently, concentration_level, stress_cause, stress_duration) AS (
    VALUES
      (4, 0, 6, 'shoulders/traps', 'tense muscles', 6.5, 40, 1, 5, 'school', 12),
      (14, 1, 4, 'neck', 'fatigue', 8, 56, 1, 8, 'work', 4),
      (24, 2, 8, 'chest', 'racing heart', 5, 28, 0, 3, 'deadline', 36)
  )
  INSERT INTO check_ins (
    date, stress_level, mood, physical_stress_location, physical_symptoms,
    hours_slept, water_consumed, eaten_recently, concentration_level,
    stress_cause, stress_duration
  )
  SELECT datetime(months.month_start, '+' || samples.day_offset || ' days', '12 hours'),
         ((samples.stress_level + months.month_number + samples.sample_index - 2) % 10) + 1,
         CASE (months.month_number + samples.sample_index) % 8
           WHEN 0 THEN 'happy' WHEN 1 THEN 'calm' WHEN 2 THEN 'nervous' WHEN 3 THEN 'worried'
           WHEN 4 THEN 'frustrated' WHEN 5 THEN 'excited' WHEN 6 THEN 'sad' ELSE 'tense'
         END,
         CASE
           WHEN months.month_number = 10 THEN NULL
           ELSE CASE (months.month_number + samples.sample_index) % 7
             WHEN 0 THEN 'jaw' WHEN 1 THEN 'neck' WHEN 2 THEN 'shoulders/traps'
             WHEN 3 THEN 'chest' WHEN 4 THEN 'back' WHEN 5 THEN 'stomach' ELSE 'head'
           END
         END,
         CASE (months.month_number + samples.sample_index) % 6
           WHEN 0 THEN 'headache' WHEN 1 THEN 'tense muscles' WHEN 2 THEN 'fatigue'
           WHEN 3 THEN 'racing heart' WHEN 4 THEN 'dizzy' ELSE 'upset stomach'
         END,
         MAX(0.5, samples.hours_slept + ((months.month_number + samples.sample_index) % 5 - 2) * 0.5),
         MAX(8, samples.water_consumed + ((months.month_number + samples.sample_index) % 5 - 2) * 8),
         (samples.eaten_recently + months.month_number + samples.sample_index) % 2,
         ((samples.concentration_level + months.month_number + samples.sample_index - 2) % 10) + 1,
         CASE (months.month_number + samples.sample_index) % 8
           WHEN 0 THEN 'school' WHEN 1 THEN 'work' WHEN 2 THEN 'deadline' WHEN 3 THEN 'time'
           WHEN 4 THEN 'family' WHEN 5 THEN 'finances' WHEN 6 THEN 'overthinking' ELSE 'uncertainty'
         END,
         CASE
           WHEN months.month_number = 10 THEN NULL
           ELSE (samples.stress_duration + (months.month_number + samples.sample_index) * 3) % 49
         END
  FROM months CROSS JOIN samples
  WHERE date(datetime(months.month_start, '+' || samples.day_offset || ' days', '12 hours')) <= date('now')
    AND NOT EXISTS (
      SELECT 1
      FROM check_ins
      WHERE date(date, 'localtime') = date(datetime(months.month_start, '+' || samples.day_offset || ' days', '12 hours'))
    );

  UPDATE check_ins
  SET physical_stress_location = NULL
  WHERE date(date, 'localtime') IN (
    date('now', 'start of year', '+9 months', '+4 days'),
    date('now', 'start of year', '+9 months', '+14 days'),
    date('now', 'start of year', '+9 months', '+24 days')
  )
    AND (
      (stress_cause = 'deadline' AND stress_duration = 42)
      OR (stress_cause = 'time' AND stress_duration = 37)
      OR (stress_cause = 'family' AND stress_duration = 23)
    );

  INSERT INTO check_ins (
    date, stress_level, mood, physical_stress_location, physical_symptoms,
    hours_slept, water_consumed, eaten_recently, concentration_level,
    stress_cause, stress_duration
  )
  SELECT datetime('now', 'start of month', '-1 month', '+7 days', '12 hours'),
         5, 'calm', NULL, 'fatigue',
         7, 48, 1, 6, 'work', NULL
  WHERE NOT EXISTS (
    SELECT 1
    FROM check_ins
    WHERE date(date, 'localtime') = date('now', 'start of month', '-1 month', '+7 days')
  );

  INSERT INTO journal_entries (
    date, entry
  )
  SELECT CURRENT_TIMESTAMP, 'School has been really stressful.'
  WHERE NOT EXISTS (SELECT 1 FROM journal_entries);

  INSERT INTO journal_entries (date, entry)
  SELECT datetime('now', 'start of month', '+1 day', '13 hours'),
         'I felt pressure from school today, but breaking the work into smaller steps helped.'
  WHERE date('now') >= date('now', 'start of month', '+1 day')
    AND NOT EXISTS (
      SELECT 1 FROM journal_entries
      WHERE entry = 'I felt pressure from school today, but breaking the work into smaller steps helped.'
    );

  INSERT INTO journal_entries (date, entry)
  SELECT datetime('now', 'start of month', '+2 days', '13 hours'),
         'Work felt busy. A short walk and a conversation helped me reset.'
  WHERE date('now') >= date('now', 'start of month', '+2 days')
    AND NOT EXISTS (
      SELECT 1 FROM journal_entries
      WHERE entry = 'Work felt busy. A short walk and a conversation helped me reset.'
    );

  INSERT INTO journal_entries (date, entry)
  SELECT datetime('now', 'start of month', '+4 days', '13 hours'),
         'I slept better and felt more focused. I want to keep making time for rest.'
  WHERE date('now') >= date('now', 'start of month', '+4 days')
    AND NOT EXISTS (
      SELECT 1 FROM journal_entries
      WHERE entry = 'I slept better and felt more focused. I want to keep making time for rest.'
    );
`;