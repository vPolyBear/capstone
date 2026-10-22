import React, {useState} from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';



const Analysis = () => {
    
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Would you like to analyze your stress?</Text>

      {/* Selection options for prompt type */}
        <Pressable accessibilityRole="radio" accessibilityState={{ checked: selectedOption === 'explanation' }} style={styles.radio} onPress={() => setSelectedOption('explanation')}>
            <View style={styles.radioCircle}>
                {selectedOption === 'explanation' && <View style={styles.radioCircleSelected} />}
            </View>
            <Text style={styles.radioText}>Explain the Stress</Text>
        </Pressable>
        <Pressable accessibilityRole="radio" accessibilityState={{ checked: selectedOption === 'activities' }} style={styles.radio} onPress={() => setSelectedOption('activities')}>
            <View style={styles.radioCircle}>
                {selectedOption === 'activities' && <View style={styles.radioCircleSelected} />}
            </View>
            <Text style={styles.radioText}>Suggest Destressing Activities</Text>
        </Pressable>
        <Pressable accessibilityRole="radio" accessibilityState={{ checked: selectedOption === 'both' }} style={styles.radio} onPress={() => setSelectedOption('both')}>
            <View style={styles.radioCircle}>
                {selectedOption === 'both' && <View style={styles.radioCircleSelected} />}
            </View>
            <Text style={styles.radioText}>Both</Text>
        </Pressable>

        {/* Prompt options based on the selected analysis type */}
        {/* Explanation prompts */}
        {selectedOption === 'explanation' && (
            <View style={styles.prompts}>
                <Text style={styles.promptText}>Explanation Prompts</Text>
                    <Pressable
                        accessibilityRole="radio"
                        accessibilityState={{ checked: selectedPrompt === 'explanation1' }}
                        style={styles.radio}
                        onPress={() => setSelectedPrompt('explanation1')}
                    >
                        <View style={styles.radioCircle}>
                            {selectedPrompt === 'explanation1' && (
                                <View style={styles.radioCircleSelected} />
                            )}
                        </View>
                        <Text style={styles.radioText}>Explanation Prompt 1</Text>
                    </Pressable>

                    <Pressable
                        accessibilityRole="radio"
                        accessibilityState={{ checked: selectedPrompt === 'explanation2' }}
                        style={styles.radio}
                        onPress={() => setSelectedPrompt('explanation2')}
                    >
                        <View style={styles.radioCircle}>
                            {selectedPrompt === 'explanation2' && (
                                <View style={styles.radioCircleSelected} />
                            )}
                        </View>
                        <Text style={styles.radioText}>Explanation Prompt 2</Text>
                    </Pressable>

                    <Pressable
                        accessibilityRole="radio"
                        accessibilityState={{ checked: selectedPrompt === 'explanation3' }}
                        style={styles.radio}
                        onPress={() => setSelectedPrompt('explanation3')}
                    >
                        <View style={styles.radioCircle}>
                            {selectedPrompt === 'explanation3' && (
                                <View style={styles.radioCircleSelected} />
                            )}
                        </View>
                        <Text style={styles.radioText}>Explanation Prompt 3</Text>
                    </Pressable>

                {selectedPrompt === 'explanation1' && (
                    <Text style={styles.promptText}>You have chosen Explanation Prompt 1</Text>
                )}
                {selectedPrompt === 'explanation2' && (
                    <Text style={styles.promptText}>You have chosen Explanation Prompt 2</Text>
                )}
                {selectedPrompt === 'explanation3' && (
                    <Text style={styles.promptText}>You have chosen Explanation Prompt 3</Text>
                )}
            </View>
        )}
        {/* Activities prompts */}
        {selectedOption === 'activities' && (
            <View style={styles.prompts}>
                <Text style={styles.promptText}>Activities Prompts</Text>
                    <Pressable
                        accessibilityRole="radio"
                        accessibilityState={{ checked: selectedPrompt === 'activities1' }}
                        style={styles.radio}
                        onPress={() => setSelectedPrompt('activities1')}
                    >
                        <View style={styles.radioCircle}>
                            {selectedPrompt === 'activities1' && (
                                <View style={styles.radioCircleSelected} />
                            )}
                        </View>
                        <Text style={styles.radioText}>Activities Prompt 1</Text>
                    </Pressable>

                    <Pressable
                        accessibilityRole="radio"
                        accessibilityState={{ checked: selectedPrompt === 'activities2' }}
                        style={styles.radio}
                        onPress={() => setSelectedPrompt('activities2')}
                    >
                        <View style={styles.radioCircle}>
                            {selectedPrompt === 'activities2' && (
                                <View style={styles.radioCircleSelected} />
                            )}
                        </View>
                        <Text style={styles.radioText}>Activities Prompt 2</Text>
                    </Pressable>

                    <Pressable
                        accessibilityRole="radio"
                        accessibilityState={{ checked: selectedPrompt === 'activities3' }}
                        style={styles.radio}
                        onPress={() => setSelectedPrompt('activities3')}
                    >
                        <View style={styles.radioCircle}>
                            {selectedPrompt === 'activities3' && (
                                <View style={styles.radioCircleSelected} />
                            )}
                        </View>
                        <Text style={styles.radioText}>Activities Prompt 3</Text>
                    </Pressable>

                {selectedPrompt === 'activities1' && (
                    <Text style={styles.promptText}>You have chosen Activities Prompt 1</Text>
                )}
                {selectedPrompt === 'activities2' && (
                    <Text style={styles.promptText}>You have chosen Activities Prompt 2</Text>
                )}
                {selectedPrompt === 'activities3' && (
                    <Text style={styles.promptText}>You have chosen Activities Prompt 3</Text>
                )}
            </View>
        )}
        {/* Both prompts */}
        {selectedOption === 'both' && (
            <View style={styles.prompts}>
                <Text style={styles.promptText}>Both Prompts</Text>
                    <Pressable
                        accessibilityRole="radio"
                        accessibilityState={{ checked: selectedPrompt === 'both1' }}
                        style={styles.radio}
                        onPress={() => setSelectedPrompt('both1')}
                    >
                        <View style={styles.radioCircle}>
                            {selectedPrompt === 'both1' && (
                                <View style={styles.radioCircleSelected} />
                            )}
                        </View>
                        <Text style={styles.radioText}>Both Prompt 1</Text>
                    </Pressable>

                    <Pressable
                        accessibilityRole="radio"
                        accessibilityState={{ checked: selectedPrompt === 'both2' }}
                        style={styles.radio}
                        onPress={() => setSelectedPrompt('both2')}
                    >
                        <View style={styles.radioCircle}>
                            {selectedPrompt === 'both2' && (
                                <View style={styles.radioCircleSelected} />
                            )}
                        </View>
                        <Text style={styles.radioText}>Both Prompt 2</Text>
                    </Pressable>

                    <Pressable
                        accessibilityRole="radio"
                        accessibilityState={{ checked: selectedPrompt === 'both3' }}
                        style={styles.radio}
                        onPress={() => setSelectedPrompt('both3')}
                    >
                        <View style={styles.radioCircle}>
                            {selectedPrompt === 'both3' && (
                                <View style={styles.radioCircleSelected} />
                            )}
                        </View>
                        <Text style={styles.radioText}>Both Prompt 3</Text>
                    </Pressable>

                {selectedPrompt === 'both1' && (
                    <Text style={styles.promptText}>You have chosen Both Prompt 1</Text>
                )}
                {selectedPrompt === 'both2' && (
                    <Text style={styles.promptText}>You have chosen Both Prompt 2</Text>
                )}
                {selectedPrompt === 'both3' && (
                    <Text style={styles.promptText}>You have chosen Both Prompt 3</Text>
                )}
            </View>
        )}
    </View>

    
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#099197',
        paddingTop: 35,
        gap: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff',
        backgroundColor: '#112f2c',
        padding: 12,
        borderRadius: 8,
    },
    radio: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#96d1aa',
        width: '90%',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 8,
    },
    radioText: {
        color: '#000000',
        fontSize: 16,
        fontWeight: 'normal',
    },
    prompts: {
        width: '90%',
        gap: 10,
    },
    promptText: {
        color: '#ffffff',
        fontSize: 16,
        backgroundColor: '#112f2c',
        padding: 12,
        borderRadius: 8,
        fontWeight: 'bold',
    },
    radioCircle: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 2,
        marginRight: 10,
        borderColor: '#b71f57',
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioCircleSelected: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#b71f57',

    },
});

export default Analysis;