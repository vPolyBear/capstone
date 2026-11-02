import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Alert, TextInput } from 'react-native';
import InputSpinner from 'react-native-input-spinner';
import { useSQLiteContext } from 'expo-sqlite';
import { Picker } from '@react-native-picker/picker';
//import { Picker } from '@expo/ui/community/picker';
import style from '../style';
import { Color, Link } from 'expo-router';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';



export default function Journal() {
    const db = useSQLiteContext();
    const [entries, setEntries] = useState<any[]>([]);
    const [selectedEntry, setSelectedEntry] = useState<any>(null);
    const [view, setView] = useState('listAllEntries');
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    type JournalForm = {
        entry: string | null;

    };
    
    const [form, setForm] = useState<JournalForm>({
        entry: null,
    });

    const loadEntries = async () => {
        const result = await db.getAllAsync(
            'SELECT * FROM journal_entries ORDER BY date DESC'
        );
        setEntries(result);
    };

    useEffect(() => {
        loadEntries();
    }, []);

    const handleSubmit = async () => {
        try{

            if (!form.entry || !form.entry.trim()) {
                Alert.alert('Please input text into the Journal');
                return;
            }
            
            const currentDate = new Date().toISOString();
            

            await db.runAsync(
                'INSERT INTO journal_entries (date, entry) VALUES (?, ?)',
                [currentDate, form.entry]
            );

            await loadEntries();

            setForm({entry: null});
            setView('listAllEntries');

            Alert.alert('The Journal was submitted successfully!');

        } catch (error) {
            console.error(error);
            Alert.alert('An error occured when submitting the entry. Please try again later or try resubmitting the entry.');
        }

    };

    
return (
    <ScrollView
        style={[style.container]}
        contentContainerStyle={style.contentContainer}
        keyboardShouldPersistTaps="handled"
        indicatorStyle='white'
    >

            {view === 'listAllEntries' && (
                <View>
                    <View style={{alignItems: 'center'}}>
                        <Text style={style.header}>Journal Your Worries Away!</Text>

                        <Pressable style={style.button} onPress={() => setView('writeAnEntry')}>
                            <Text style={style.buttonText}>Write Journal Entry</Text>
                        </Pressable>

                        <Link href="/analysis" asChild>
                            <Pressable style={style.button}>
                                <Text style={style.buttonText}>Analysis Page</Text>
                            </Pressable>
                        </Link>
                        <Text style={style.header}>Previous Entries</Text>
                    </View>
                    <View style={style.previewContainer}>
                        {entries.map((item, index) => (
                            <Pressable 
                                key={index} 
                                style={style.previewBody} 
                                onPress={() => { setSelectedEntry(item); setView('lookInAnEntry'); }}
                            >
                                <Text style={{fontSize: 16, color: '#FFFFFF'}}>{new Date(item.date).toLocaleDateString()}</Text>
                                <Text style={{fontSize: 14, color: '#FFFFFF'}} numberOfLines={3}> {item.entry}</Text>
                            </Pressable>
                        ))}
                    </View>
                </View>
            )}

            {view === 'lookInAnEntry' && selectedEntry && (
                <View>
                    <View style={{alignItems: 'center'}}>
                        <Text style={style.header}>Entry: {new Date(selectedEntry.date).toLocaleString()}</Text>
                    </View>
                    <View style={style.previewContainerView}>
                        <ScrollView style={style.previewBodyView} indicatorStyle='white'>
                            <Text style={{fontSize: 16, color: '#FFFFFF'}}>{selectedEntry.entry}</Text>
                        </ScrollView>
                        <View style={{alignItems: 'center'}}>
                            <Pressable style={style.button} onPress={() => setView('listAllEntries')}>
                                <Text style={style.buttonText}>Back</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            )}

            {view === 'writeAnEntry' && (
                <View>
                    <TextInput 
                        multiline maxLength={10000} 
                        value={form.entry ?? ''} 
                        onChangeText={(text) => setForm({...form, entry: text})} 
                        placeholder="Here you can write a journal entry" 
                        style={style.body}
                    />


                    <View style={{alignItems: 'center'}}>
                        <Pressable style={style.button} onPress={handleSubmit}>
                            <Text style={style.buttonText}>Submit Entry</Text>
                        </Pressable>

                        <Pressable style={style.button} onPress={() => setView('listAllEntries')}>
                            <Text style={style.buttonText}>Cancel</Text>
                        </Pressable>
                    </View>

                </View>
            )}


      </ScrollView>
    
  );
};