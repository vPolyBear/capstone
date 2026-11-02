
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Analysis from '../app/analysis';
import { describe, test, expect, jest, beforeEach } from '@jest/globals';

const mockGetAllAsync = jest.fn<(query: string) => Promise<any[]>>(async (query: string) => []);
const mockInvoke = jest.fn<(...args: any[]) => Promise<any>>();
// Mock SQLite
jest.mock('expo-sqlite', () => ({
    useSQLiteContext: () => ({
        getAllAsync: mockGetAllAsync,
    }),
}));

// Mock Supabase
jest.mock('../src/lib/supabase', () => ({
    supabase: {
        functions: {
            invoke: (...args: any[]) => mockInvoke(...args),
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

    beforeEach(() => {
        mockGetAllAsync.mockReset();
        mockInvoke.mockReset();

        mockGetAllAsync.mockResolvedValue([]);
    });

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
        expect(getByText('Choose an analysis type and prompt first.')).toBeTruthy();

    });

    test('fallback is displayed if Supabase fails', async() => {

        mockGetAllAsync.mockImplementation(async (query: string) => {
            if(query.includes('check_ins')){

                return [{stress_level: 8, mood: 'worried', physical_stress_location: 'shoulders/traps',}];

            }

            if(query.includes('journal_entries')){

                return [{entry:'I have been worried about school a lot'}];

            }
            
            return [];

        });

        mockInvoke.mockRejectedValue(new Error('Network unavailable'));
        const { getByText, getAllByText, findByText } = await render(<Analysis/>);
        
        await fireEvent.press(getByText('Explain the Stress'));
        await fireEvent.press(getByText('Explain briefly and simply what the reported stress and mood may suggest.'));
        await fireEvent.press(getByText('Select Check-Ins'));
        await fireEvent.press(getByText('Select Journal Entries'));
        
        const dayOption = getAllByText('Day');
        await fireEvent.press(dayOption[0]);
        await fireEvent.press(dayOption[1]);

        await fireEvent.press(getByText('Generate Analysis'));
        expect(mockInvoke).toHaveBeenCalled();

        expect(await findByText(/The Analysis Page is presenting its fallback/)).toBeTruthy();


    });

});
