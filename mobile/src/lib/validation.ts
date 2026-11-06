export type CheckInRequiredFields = {
  stressLevel: number | null;
  mood: string | null;
  eatenRecently: number | null;
  concentrationLevel: number | null;
};

export type CheckInRequiredField = keyof CheckInRequiredFields;

export const CHECK_IN_REQUIRED_FIELD_MESSAGES: Record<CheckInRequiredField, string> = {
  stressLevel: 'Please select a Stress Level',
  mood: 'Please select the mood option you align the best with',
  eatenRecently: 'Please select if you have eaten in the past 6 hours',
  concentrationLevel: 'Please select a Concentration Level',
};

export function getMissingCheckInField(
  form: CheckInRequiredFields,
): CheckInRequiredField | null {
  if (form.stressLevel === null) return 'stressLevel';
  if (form.mood === null || form.mood.trim() === '') return 'mood';
  if (form.eatenRecently === null) return 'eatenRecently';
  if (form.concentrationLevel === null) return 'concentrationLevel';
  return null;
}

export function canSubmitJournalEntry(entry: string | null): boolean {
  return Boolean(entry?.trim());
}

export const ANALYSIS_PROMPTS = {
  explanation: ['explanation1', 'explanation2', 'explanation3'],
  activities: ['activities1', 'activities2', 'activities3'],
  both: ['both1', 'both2', 'both3'],
} as const;

export function isPredeterminedPrompt(analysisType: string, promptId: string): boolean {
  if (analysisType === 'explanation') {
    return ANALYSIS_PROMPTS.explanation.some((id) => id === promptId);
  }
  if (analysisType === 'activities') {
    return ANALYSIS_PROMPTS.activities.some((id) => id === promptId);
  }
  if (analysisType === 'both') {
    return ANALYSIS_PROMPTS.both.some((id) => id === promptId);
  }
  return false;
}

export function getPromptValidationError(analysisType: string, promptId: string): string | null {
  return isPredeterminedPrompt(analysisType, promptId)
    ? null
    : 'Use one of the predetermined prompts above.';
}

export function hasSufficientAnalysisData(
  checkIns: readonly unknown[],
  journalEntries: readonly unknown[],
): boolean {
  return checkIns.length > 0 && journalEntries.length > 0;
}

export type AnalysisPayload = {
  analysisType: string;
  promptId: string;
  checkIns: readonly unknown[];
  journalEntries: readonly unknown[];
};

export function buildAnalysisPayload(
  analysisType: string,
  promptId: string,
  checkIns: readonly unknown[],
  journalEntries: readonly unknown[],
): AnalysisPayload {
  return { analysisType, promptId, checkIns, journalEntries };
}
