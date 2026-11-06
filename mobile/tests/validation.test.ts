import { describe, expect, test } from '@jest/globals';
import {
  ANALYSIS_PROMPTS,
  CHECK_IN_REQUIRED_FIELD_MESSAGES,
  buildAnalysisPayload,
  canSubmitJournalEntry,
  getMissingCheckInField,
  getPromptValidationError,
  hasSufficientAnalysisData,
} from '../src/lib/validation';

describe('journal entry validation', () => {
  test.each([
    ['TC-026 null entry', null, false],
    ['TC-027 empty entry', '', false],
    ['TC-028 spaces', '   ', false],
    ['TC-029 tabs and line breaks', ' \t\n ', false],
    ['TC-030 single word', 'Worried', true],
    ['TC-031 multiline entry', 'School is stressful.\nI need a break.', true],
  ])('%s', (_description, entry, expected) => {
    expect(canSubmitJournalEntry(entry)).toBe(expected);
  });
});

describe('check-in required field validation', () => {
  const validForm = {
    stressLevel: 5,
    mood: 'calm',
    eatenRecently: 1,
    concentrationLevel: 6,
  };

  test.each([
    ['TC-003 stressLevel', 'stressLevel', { stressLevel: null }],
    ['TC-004 null mood', 'mood', { mood: null }],
    ['TC-005 empty mood', 'mood', { mood: '' }],
    ['TC-006 whitespace mood', 'mood', { mood: ' \t ' }],
    ['TC-007 eatenRecently', 'eatenRecently', { eatenRecently: null }],
    ['TC-008 concentrationLevel', 'concentrationLevel', { concentrationLevel: null }],
  ] as const)('%s', (_case, expectedField, missingValue) => {
    expect(getMissingCheckInField({ ...validForm, ...missingValue })).toBe(expectedField);
  });

  test.each([
    ['TC-009 minimum stress level', { stressLevel: 1 }],
    ['TC-010 maximum stress level', { stressLevel: 10 }],
    ['TC-011 false eaten response', { eatenRecently: 0 }],
    ['TC-012 minimum concentration level', { concentrationLevel: 1 }],
    ['TC-013 maximum concentration level', { concentrationLevel: 10 }],
  ] as const)('%s', (_case, fieldValue) => {
    expect(getMissingCheckInField({ ...validForm, ...fieldValue })).toBeNull();
  });

  test('TC-014 reports the first missing field when multiple answers are missing', () => {
    expect(
      getMissingCheckInField({
        stressLevel: null,
        mood: null,
        eatenRecently: null,
        concentrationLevel: null,
      }),
    ).toBe('stressLevel');
  });

  test.each([
    ['TC-015 stress level error message', 'stressLevel', 'Please select a Stress Level'],
    ['TC-016 mood error message', 'mood', 'Please select the mood option you align the best with'],
    ['TC-017 eaten-recently error message', 'eatenRecently', 'Please select if you have eaten in the past 6 hours'],
    ['TC-018 concentration error message', 'concentrationLevel', 'Please select a Concentration Level'],
  ] as const)('%s identifies the required response', (_case, field, expectedMessage) => {
    expect(CHECK_IN_REQUIRED_FIELD_MESSAGES[field]).toBe(expectedMessage);
  });
});

describe('predetermined analysis prompt validation', () => {
  test.each([
    ['TC-041 explanation prompt 1', 'explanation', ANALYSIS_PROMPTS.explanation[0]],
    ['TC-042 explanation prompt 2', 'explanation', ANALYSIS_PROMPTS.explanation[1]],
    ['TC-043 explanation prompt 3', 'explanation', ANALYSIS_PROMPTS.explanation[2]],
    ['TC-044 activity prompt 1', 'activities', ANALYSIS_PROMPTS.activities[0]],
    ['TC-045 activity prompt 2', 'activities', ANALYSIS_PROMPTS.activities[1]],
    ['TC-046 activity prompt 3', 'activities', ANALYSIS_PROMPTS.activities[2]],
    ['TC-047 combined prompt 1', 'both', ANALYSIS_PROMPTS.both[0]],
    ['TC-048 combined prompt 2', 'both', ANALYSIS_PROMPTS.both[1]],
    ['TC-049 combined prompt 3', 'both', ANALYSIS_PROMPTS.both[2]],
  ])('%s accepts a predetermined prompt', (_case, analysisType, prompt) => {
    expect(getPromptValidationError(analysisType, prompt)).toBeNull();
  });

  test.each([
    ['TC-050 explanation rejects activity prompt', 'explanation', ANALYSIS_PROMPTS.activities[0]],
    ['TC-051 explanation rejects combined prompt', 'explanation', ANALYSIS_PROMPTS.both[0]],
    ['TC-052 activities rejects explanation prompt', 'activities', ANALYSIS_PROMPTS.explanation[0]],
    ['TC-053 activities rejects combined prompt', 'activities', ANALYSIS_PROMPTS.both[0]],
    ['TC-054 combined rejects explanation prompt', 'both', ANALYSIS_PROMPTS.explanation[0]],
    ['TC-055 combined rejects activity prompt', 'both', ANALYSIS_PROMPTS.activities[0]],
  ] as const)('%s', (_case, analysisType, prompt) => {
    expect(getPromptValidationError(analysisType, prompt)).toBe(
      'Use one of the predetermined prompts above.',
    );
  });

  test.each([
    ['TC-056 empty analysis type', '', 'explanation1'],
    ['TC-057 unknown analysis type', 'unknown', 'explanation1'],
    ['TC-058 empty prompt id', 'explanation', ''],
    ['TC-059 free-form prompt', 'explanation', 'Tell me something else'],
  ])('%s', (_case, analysisType, prompt) => {
    expect(getPromptValidationError(analysisType, prompt)).toBe(
      'Use one of the predetermined prompts above.',
    );
  });
});

describe('analysis information sufficiency', () => {
  test.each([
    ['TC-061 no check-ins or journals', [], [], false],
    ['TC-062 check-ins without journals', [{ stress_level: 5 }], [], false],
    ['TC-063 journals without check-ins', [], [{ entry: 'School is stressful.' }], false],
    [
      'TC-064 both types of information',
      [{ stress_level: 5 }],
      [{ entry: 'School is stressful.' }],
      true,
    ],
  ])('%s checks the shared information requirement for both AI analysis types', (_case, checkIns, entries, expected) => {
    expect(hasSufficientAnalysisData(checkIns, entries)).toBe(expected);
  });
});

describe('AI request payload', () => {
  const checkIns = [{ stress_level: 7, mood: 'worried' }];
  const journalEntries = [{ entry: 'School has been stressful.' }];

  test('TC-076 contains only the analysis type, predetermined prompt, and selected data', () => {
    const payload = buildAnalysisPayload(
      'explanation',
      ANALYSIS_PROMPTS.explanation[0],
      checkIns,
      journalEntries,
    );

    expect(Object.keys(payload).sort()).toEqual([
      'analysisType',
      'checkIns',
      'journalEntries',
      'promptId',
    ]);
  });

  test('TC-077 preserves selected data without adding unrelated fields', () => {
    const payload = buildAnalysisPayload(
      'activities',
      ANALYSIS_PROMPTS.activities[0],
      checkIns,
      journalEntries,
    );

    expect(payload).toEqual({
      analysisType: 'activities',
      promptId: 'activities1',
      checkIns,
      journalEntries,
    });
    expect(payload).not.toHaveProperty('device');
    expect(payload).not.toHaveProperty('location');
    expect(payload).not.toHaveProperty('apiKey');
  });

  test('TC-078 keeps the selected prompt and analysis type paired in the payload', () => {
    expect(
      buildAnalysisPayload(
        'both',
        ANALYSIS_PROMPTS.both[2],
        checkIns,
        journalEntries,
      ),
    ).toMatchObject({ analysisType: 'both', promptId: 'both3' });
  });
});
