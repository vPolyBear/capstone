
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { DatabaseSync } from 'node:sqlite';
import Analysis from '../app/analysis';
import { describe, test, expect, jest, beforeEach, afterAll, afterEach } from '@jest/globals';

let mockDb;
const mockGetAllAsync = jest.fn(async (query) => {
    return mockDb.prepare(query).all();
});
const mockInvoke = jest.fn();
// Use a real in-memory SQLite database behind the Expo SQLite context.
jest.mock('expo-sqlite', () => ({
    useSQLiteContext: () => ({
        getAllAsync: mockGetAllAsync,
    }),
}));

// Mock Supabase
jest.mock('../src/lib/supabase', () => ({
    supabase: {
        functions: {
            invoke: (...args) => mockInvoke(...args),
        },
    },
}));

// Mock Toast
jest.mock('react-native-toast-message', () => ({
    __esModule: true,
    default: {
        show: () => {},
    },
}));

describe('Analysis Page', () => {

    afterAll(() => mockDb?.close());
    afterEach(() => jest.restoreAllMocks());

    beforeEach(() => {
        mockDb?.close();
        mockDb = new DatabaseSync(':memory:');
        mockDb.exec(`
            CREATE TABLE check_ins (
                id INTEGER PRIMARY KEY,
                date TEXT NOT NULL,
                stress_level INTEGER NOT NULL,
                mood TEXT NOT NULL,
                physical_stress_location TEXT,
                physical_symptoms TEXT,
                hours_slept REAL,
                water_consumed REAL,
                eaten_recently INTEGER NOT NULL,
                concentration_level INTEGER NOT NULL,
                stress_cause TEXT,
                stress_duration INTEGER
            );
            CREATE TABLE journal_entries (
                id INTEGER PRIMARY KEY,
                date TEXT NOT NULL,
                entry TEXT NOT NULL
            );
        `);
        mockGetAllAsync.mockReset();
        mockInvoke.mockReset();
        mockGetAllAsync.mockImplementation(async (query) => mockDb.prepare(query).all());
    });

    const seedAnalysisData = () => {
        const date = new Date().toISOString();
        mockDb.prepare(`
            INSERT INTO check_ins (
                date, stress_level, mood, physical_stress_location, physical_symptoms,
                hours_slept, water_consumed, eaten_recently, concentration_level,
                stress_cause, stress_duration
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).run(date, 8, 'worried', 'shoulders/traps', null, 7, 2, 1, 4, 'school', 3);
        mockDb.prepare(`
            INSERT INTO journal_entries (date, entry) VALUES (?, ?)
        `).run(date, 'I have been worried about school a lot');
    };

    const selectAnalysisData = async (getByText, getAllByText) => {
        await fireEvent.press(getByText('Select Check-Ins'));
        await fireEvent.press(getByText('Day'));
        await fireEvent.press(getByText('Select Journal Entries'));
        const dayOptions = getAllByText('Day');
        await fireEvent.press(dayOptions[1]);
    };

    test('renders the Analysis page', async () => {

        const { getByText } = await render(<Analysis />);
        expect(getByText('Would you like to analyze your stress?')).toBeTruthy();
        expect(getByText('Explain the Stress')).toBeTruthy();
        expect(getByText('Suggest Destressing Activities')).toBeTruthy();
        expect(getByText('Both')).toBeTruthy();

    });

    test('the explanation prompt is displayed when explanation is selected', async () => {

        const { getByText } = await render(<Analysis />);
        await fireEvent.press(getByText('Explain the Stress'));
        expect(getByText('Explanation Prompts')).toBeTruthy();
        expect(getByText('Explain briefly and simply what the reported stress and mood may suggest.')).toBeTruthy();

    });

    test('selects a check in', async () => {

        const { getByText } = await render(<Analysis />);
        await fireEvent.press(getByText('Select Check-Ins'));
        expect(getByText('Day')).toBeTruthy();

    });

    test('an error is displayed if a prompt selection is missing', async () => {

        const { getByText } = await render(<Analysis />);
        await fireEvent.press(getByText('Generate Analysis'));
        expect(
            getByText('Choose an analysis type and one of its predetermined prompts first.'),
        ).toBeTruthy();
        expect(mockInvoke).not.toHaveBeenCalled();

    });

    test('TC-060 does not request explanation analysis when no check-ins or journal entries exist', async () => {
        const { getByText, getAllByText } = await render(<Analysis />);
        await fireEvent.press(getByText('Explain the Stress'));
        await fireEvent.press(getByText('Explain briefly and simply what the reported stress and mood may suggest.'));
        await selectAnalysisData(getByText, getAllByText);
        await fireEvent.press(getByText('Generate Analysis'));

        expect(await getByText(/More check-in question responses and journal entries are needed/)).toBeTruthy();
        expect(mockInvoke).not.toHaveBeenCalled();
    });

    test('TC-068 does not request activity analysis when no check-ins or journal entries exist', async () => {
        const { getByText, getAllByText } = await render(<Analysis />);
        await fireEvent.press(getByText('Suggest Destressing Activities'));
        await fireEvent.press(getByText('Suggest one simple and quick activity based on the reported stress.'));
        await selectAnalysisData(getByText, getAllByText);
        await fireEvent.press(getByText('Generate Analysis'));

        expect(await getByText(/More check-in question responses and journal entries are needed/)).toBeTruthy();
        expect(mockInvoke).not.toHaveBeenCalled();
    });

    test.each([
        [
            'TC-040',
            'Explain the Stress',
            'Explain briefly and simply what the reported stress and mood may suggest.',
            'Suggest Destressing Activities',
        ],
        [
            'TC-067',
            'Suggest Destressing Activities',
            'Suggest one simple and quick activity based on the reported stress.',
            'Explain the Stress',
        ],
    ])('%s prevents reusing a prompt from a different analysis type', async (_case, initialType, initialPrompt, nextType) => {
        const { getByText } = await render(<Analysis />);
        await fireEvent.press(getByText(initialType));
        await fireEvent.press(getByText(initialPrompt));
        await fireEvent.press(getByText(nextType));
        await fireEvent.press(getByText('Generate Analysis'));

        expect(
            getByText('Choose an analysis type and one of its predetermined prompts first.'),
        ).toBeTruthy();
        expect(mockInvoke).not.toHaveBeenCalled();
    });

    test('sends the selected SQLite data and predetermined prompt through the Supabase boundary', async () => {
        seedAnalysisData();
        mockInvoke.mockResolvedValue({
            data: {
                analysis_explanation: 'Your school workload may be contributing to stress.',
                activity_suggestion: 'Take a short breathing break.',
            },
            error: null,
        });
        const { getByText, getAllByText, findByText } = await render(<Analysis />);

        await fireEvent.press(getByText('Explain the Stress'));
        await fireEvent.press(getByText('Explain briefly and simply what the reported stress and mood may suggest.'));
        await selectAnalysisData(getByText, getAllByText);
        await fireEvent.press(getByText('Generate Analysis'));

        expect(await findByText(/Your school workload may be contributing to stress/)).toBeTruthy();
        expect(mockInvoke).toHaveBeenCalledWith('sendAnalysis', {
            body: {
                analysisType: 'explanation',
                promptId: 'explanation1',
                checkIns: [expect.objectContaining({ stress_level: 8, mood: 'worried' })],
                journalEntries: [expect.objectContaining({ entry: 'I have been worried about school a lot' })],
            },
        });
    });

    test('TC-039 uses the explanation fallback when the external analysis request fails', async () => {
        seedAnalysisData();
        mockInvoke.mockRejectedValue(new Error('Network unavailable'));
        const { getByText, getAllByText, findByText } = await render(<Analysis/>);
        
        await fireEvent.press(getByText('Explain the Stress'));
        await fireEvent.press(getByText('Explain briefly and simply what the reported stress and mood may suggest.'));
        await selectAnalysisData(getByText, getAllByText);
        await fireEvent.press(getByText('Generate Analysis'));
        expect(mockInvoke).toHaveBeenCalled();

        expect(await findByText(/The Analysis Page is presenting its fallback/)).toBeTruthy();

    });

    test('TC-066 uses the activity fallback when the external analysis request fails', async () => {
        seedAnalysisData();
        mockInvoke.mockRejectedValue(new Error('Network unavailable'));
        jest.spyOn(Math, 'random').mockReturnValue(0);
        const { getByText, getAllByText, findByText } = await render(<Analysis />);

        await fireEvent.press(getByText('Suggest Destressing Activities'));
        await fireEvent.press(getByText('Suggest one simple and quick activity based on the reported stress.'));
        await selectAnalysisData(getByText, getAllByText);
        await fireEvent.press(getByText('Generate Analysis'));

        expect(await findByText(/Try a simple breathing exercise/)).toBeTruthy();
        expect(mockInvoke).toHaveBeenCalledWith(
            'sendAnalysis',
            expect.objectContaining({ body: expect.objectContaining({ analysisType: 'activities' }) }),
        );
    });

    test('discards an analysis if its SQLite source data changes while the request is pending', async () => {
        seedAnalysisData();
        mockInvoke.mockImplementation(async () => {
            mockDb.prepare(`
                INSERT INTO journal_entries (date, entry) VALUES (?, ?)
            `).run(new Date().toISOString(), 'A newer journal entry');
            return {
                data: { analysis_explanation: 'Explanation', activity_suggestion: 'Activity' },
                error: null,
            };
        });
        const { getByText, getAllByText, findByText, queryByText } = await render(<Analysis />);

        await fireEvent.press(getByText('Explain the Stress'));
        await fireEvent.press(getByText('Explain briefly and simply what the reported stress and mood may suggest.'));
        await selectAnalysisData(getByText, getAllByText);
        await fireEvent.press(getByText('Generate Analysis'));

        expect(await findByText(/selected check-ins or journal entries changed while the analysis was being generated/)).toBeTruthy();
        expect(queryByText('Explanation')).toBeNull();
    });

});
