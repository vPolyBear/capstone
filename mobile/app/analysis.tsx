import React, {useState} from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import {FunctionsFetchError, FunctionsHttpError, FunctionsRelayError} from "@supabase/supabase-js";
import { supabase } from "../src/lib/supabase";
import style from '../style';
import { useSQLiteContext } from 'expo-sqlite';

export default function Analysis() {
    
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);
    const [analysis, setAnalysis] = useState<string | null>(null);
    const [analysisError, setAnalysisError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const db = useSQLiteContext();

    const selectAnalysisType = (option: string) => {
        setSelectedOption(option);
        setSelectedPrompt(null);
        setAnalysisError(null);
    };

    const generateAnalysis = async () => {
        const checkIns = await db.getAllAsync(
            'SELECT * FROM check_ins'
        );
        const journalEntries = await db.getAllAsync(
            'SELECT * FROM journal_entries'
        );

        if (!selectedOption || !selectedPrompt) {
            setAnalysisError('Choose an analysis type and prompt first.');
            return;
        }

        setIsLoading(true);
        setAnalysis(null);
        setAnalysisError(null);

        try {
            const { data, error } = await supabase.functions.invoke<{ output: string }>(
                "sendAnalysis",
                { body: { analysisType: selectedOption, promptId: selectedPrompt, checkIns: checkIns, journalEntries: journalEntries } },
            );

            if (error instanceof FunctionsRelayError) {
                throw new Error(
                    "Supabase could not relay the request to the analysis function. " +
                    "This can happen even when the relay response itself shows HTTP 200. Please retry.",
                );
            }

            if (error instanceof FunctionsFetchError) {
                throw new Error("Could not reach the analysis function. Check your connection and retry.");
            }

            if (error instanceof FunctionsHttpError) {
                const response = error.context;
                let details = "";

                if (response instanceof Response) {
                    const body = await response.text();
                    try {
                        const payload: unknown = JSON.parse(body);
                        if (payload && typeof payload === "object" && "error" in payload &&
                            typeof payload.error === "string") {
                            details = payload.error;
                            if ("upstreamStatus" in payload && typeof payload.upstreamStatus === "number") {
                                details += ` (Gemini HTTP ${payload.upstreamStatus})`;
                            }
                        } else {
                            details = body;
                        }
                    } catch {
                        details = body;
                    }
                }

                throw new Error(
                    `${error.message} (${response instanceof Response ? response.status : "unknown"})` +
                    `${details ? `: ${details}` : ""}`,
                );
            }

            if (error) {
                throw error;
            }
            if (!data) {
                throw new Error("The analysis function returned no data.");
            }
            if (typeof data.output !== 'string' || !data.output.trim()) {
                throw new Error("The analysis function returned an empty response.");
            }

            setAnalysis(data.output);
        } catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            setAnalysisError(message);
        } finally {
            setIsLoading(false);
        }
    };

  return (
    <ScrollView
        style={style.container}
        contentContainerStyle={style.contentContainer}
        keyboardShouldPersistTaps="handled"
    >

        <Text style={style.title}>Would you like to analyze your stress?</Text>

        {/* Selection options for prompt type */}
        <Pressable style={style.radio} onPress={() => selectAnalysisType('explanation')}>
            <View style={style.radioCircle}>
                {selectedOption === 'explanation' && <View style={style.radioCircleSelected} />}
            </View>
            <Text style={style.radioText}>Explain the Stress</Text>
        </Pressable>
        <Pressable style={style.radio} onPress={() => selectAnalysisType('activities')}>
            <View style={style.radioCircle}>
                {selectedOption === 'activities' && <View style={style.radioCircleSelected} />}
            </View>
            <Text style={style.radioText}>Suggest Destressing Activities</Text>
        </Pressable>
        <Pressable style={style.radio} onPress={() => selectAnalysisType('both')}>
            <View style={style.radioCircle}>
                {selectedOption === 'both' && <View style={style.radioCircleSelected} />}
            </View>
            <Text style={style.radioText}>Both</Text>
        </Pressable>

        {/* Prompt options based on the selected analysis type */}
        {/* Explanation prompts */}
        {selectedOption === 'explanation' && (
            <View style={style.prompts}>
                <Text style={style.promptText}>Explanation Prompts</Text>
                    <Pressable
                        style={style.radio}
                        onPress={() => setSelectedPrompt('explanation1')}
                    >
                        <View style={style.radioCircle}>
                            {selectedPrompt === 'explanation1' && (
                                <View style={style.radioCircleSelected} />
                            )}
                        </View>
                        <Text style={style.radioText}>Explanation Prompt 1</Text>
                    </Pressable>

                    <Pressable
                        style={style.radio}
                        onPress={() => setSelectedPrompt('explanation2')}
                    >
                        <View style={style.radioCircle}>
                            {selectedPrompt === 'explanation2' && (
                                <View style={style.radioCircleSelected} />
                            )}
                        </View>
                        <Text style={style.radioText}>Explanation Prompt 2</Text>
                    </Pressable>

                    <Pressable
                        style={style.radio}
                        onPress={() => setSelectedPrompt('explanation3')}
                    >
                        <View style={style.radioCircle}>
                            {selectedPrompt === 'explanation3' && (
                                <View style={style.radioCircleSelected} />
                            )}
                        </View>
                        <Text style={style.radioText}>Explanation Prompt 3</Text>
                    </Pressable>

                {selectedPrompt === 'explanation1' && (
                    <Text style={style.promptText}>You have chosen Explanation Prompt 1</Text>
                )}
                {selectedPrompt === 'explanation2' && (
                    <Text style={style.promptText}>You have chosen Explanation Prompt 2</Text>
                )}
                {selectedPrompt === 'explanation3' && (
                    <Text style={style.promptText}>You have chosen Explanation Prompt 3</Text>
                )}
            </View>
        )}
        {/* Activities prompts */}
        {selectedOption === 'activities' && (
            <View style={style.prompts}>
                <Text style={style.promptText}>Activities Prompts</Text>
                    <Pressable
                        style={style.radio}
                        onPress={() => setSelectedPrompt('activities1')}
                    >
                        <View style={style.radioCircle}>
                            {selectedPrompt === 'activities1' && (
                                <View style={style.radioCircleSelected} />
                            )}
                        </View>
                        <Text style={style.radioText}>Activities Prompt 1</Text>
                    </Pressable>

                    <Pressable
                        style={style.radio}
                        onPress={() => setSelectedPrompt('activities2')}
                    >
                        <View style={style.radioCircle}>
                            {selectedPrompt === 'activities2' && (
                                <View style={style.radioCircleSelected} />
                            )}
                        </View>
                        <Text style={style.radioText}>Activities Prompt 2</Text>
                    </Pressable>

                    <Pressable
                        style={style.radio}
                        onPress={() => setSelectedPrompt('activities3')}
                    >
                        <View style={style.radioCircle}>
                            {selectedPrompt === 'activities3' && (
                                <View style={style.radioCircleSelected} />
                            )}
                        </View>
                        <Text style={style.radioText}>Activities Prompt 3</Text>
                    </Pressable>

                {selectedPrompt === 'activities1' && (
                    <Text style={style.promptText}>You have chosen Activities Prompt 1</Text>
                )}
                {selectedPrompt === 'activities2' && (
                    <Text style={style.promptText}>You have chosen Activities Prompt 2</Text>
                )}
                {selectedPrompt === 'activities3' && (
                    <Text style={style.promptText}>You have chosen Activities Prompt 3</Text>
                )}
            </View>
        )}
        {/* Both prompts */}
        {selectedOption === 'both' && (
            <View style={style.prompts}>
                <Text style={style.promptText}>Both Prompts</Text>
                    <Pressable
                        style={style.radio}
                        onPress={() => setSelectedPrompt('both1')}
                    >
                        <View style={style.radioCircle}>
                            {selectedPrompt === 'both1' && (
                                <View style={style.radioCircleSelected} />
                            )}
                        </View>
                        <Text style={style.radioText}>Both Prompt 1</Text>
                    </Pressable>

                    <Pressable
                        style={style.radio}
                        onPress={() => setSelectedPrompt('both2')}
                    >
                        <View style={style.radioCircle}>
                            {selectedPrompt === 'both2' && (
                                <View style={style.radioCircleSelected} />
                            )}
                        </View>
                        <Text style={style.radioText}>Both Prompt 2</Text>
                    </Pressable>

                    <Pressable
                        style={style.radio}
                        onPress={() => setSelectedPrompt('both3')}
                    >
                        <View style={style.radioCircle}>
                            {selectedPrompt === 'both3' && (
                                <View style={style.radioCircleSelected} />
                            )}
                        </View>
                        <Text style={style.radioText}>Both Prompt 3</Text>
                    </Pressable>

                {selectedPrompt === 'both1' && (
                    <Text style={style.promptText}>You have chosen Both Prompt 1</Text>
                )}
                {selectedPrompt === 'both2' && (
                    <Text style={style.promptText}>You have chosen Both Prompt 2</Text>
                )}
                {selectedPrompt === 'both3' && (
                    <Text style={style.promptText}>You have chosen Both Prompt 3</Text>
                )}
            </View>
        )}

        <Pressable
            disabled={isLoading}
            style={[style.generateButton, isLoading && style.generateButtonDisabled]}
            onPress={generateAnalysis}
        >
            <Text style={style.generateButtonText}>
                {isLoading ? 'Generating...' : 'Generate Analysis'}
            </Text>
        </Pressable>
        {analysis && <Text style={style.result}>{analysis}</Text>}
        {analysisError && <Text style={style.error}>{analysisError}</Text>}
    </ScrollView>

    
  );
};

