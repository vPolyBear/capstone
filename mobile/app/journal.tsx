import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Alert, TextInput } from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';
import style from '../style';
import { Link } from 'expo-router';
import { canSubmitJournalEntry } from '../src/lib/validation';
import { MaterialIcons } from '@expo/vector-icons';

export default function Journal() {
    const db = useSQLiteContext();
    const [entries, setEntries] = useState<any[]>([]);
    const [selectedEntry, setSelectedEntry] = useState<any>(null);
    const [view, setView] = useState('listAllEntries');
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const parseJournalDate = (dateValue: string) => {
        const normalizedDate = dateValue.includes('T') ? dateValue : `${dateValue.replace(' ', 'T')}Z`;
        return new Date(normalizedDate);
    };

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

            if (!canSubmitJournalEntry(form.entry)) {
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

    const handleEdit = async (item: any) => {
        try {
            if (!canSubmitJournalEntry(form.entry)) {
                Alert.alert('Please input text into the Journal');
                return;
            }            

            await db.runAsync(
                'UPDATE journal_entries SET entry = ? WHERE id = ?',
                [form.entry, item.id]
            );

            await loadEntries();

            setForm({entry: null});
            setSelectedEntry(null);
            setView('listAllEntries');

            Alert.alert('The Journal was updated successfully with the edits made!');

        } catch (error) {
            console.error(error);
            Alert.alert('An error occurred when updating the edited entry. Please try again later.');
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

                        <Pressable style={style.button} onPress={() => { setView('writeAnEntry'); setForm({entry: null}); setSelectedEntry(null); }}>
                            <Text style={style.buttonText}>Write Journal Entry</Text>
                        </Pressable>

                        <Link href="/activities" asChild>
                            <Pressable style={style.button}>
                                <Text style={style.buttonText}>Activities Page</Text>
                            </Pressable>
                        </Link>
                        <Text style={style.header}>Previous Entries</Text>
                    </View>
                    <View style={[style.previewContainer, {paddingTop: 10}]}>
                        {entries.map((item, index) => (
                            <Pressable key={item.id} style={style.previewBody} onPress={() => { setSelectedEntry(item); setView('lookInAnEntry'); }}>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: -25, zIndex: 1, elevation: 1}}>
                                        <Text style={{fontSize: 16, color: '#FFFFFF'}}>{parseJournalDate(item.date).toLocaleDateString()}</Text>
                                        <View style={{alignItems: 'flex-end'}}>
                                            <Pressable style={[style.button, {width: 30, height: 30, padding: 0, justifyContent: 'center', alignItems: 'center', transform: [{translateY: 5}]}]} onPress={() => { setSelectedEntry(item); setView('editAnEntry'); setForm({...form, entry: item.entry}); }}>
                                                <MaterialIcons name="edit" size={20} color="#FFFFFF" style={{margin: -15, justifyContent: 'center', alignItems: 'center'}} />
                                            </Pressable>
                                        </View>
                                    </View>
                                        <Text style={{fontSize: 14, color: '#FFFFFF', paddingRight: 45}} numberOfLines={3}> {item.entry}</Text>
                            </Pressable>
                        ))}
                    </View>
                </View>
            )}

            {view === 'lookInAnEntry' && selectedEntry && (
                <View>
                    <View style={{alignItems: 'center'}}>
                        <Text style={style.header}>Entry: {parseJournalDate(selectedEntry.date).toLocaleString()}</Text>
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

            {view === 'editAnEntry' && selectedEntry && (
                <View>
                    <TextInput
                        multiline maxLength={10000}
                        value={form.entry ?? ''}
                        onChangeText={(text) => setForm({...form, entry: text})}
                        placeholder="Edit your journal entry"
                        style={style.body}
                    />

                    <View style={{alignItems: 'center'}}>
                        <Pressable style={style.button} onPress={() => handleEdit(selectedEntry)}>
                            <Text style={style.buttonText}>Save Entry</Text>
                        </Pressable>

                        <Pressable style={style.button} onPress={() => { setView('listAllEntries'); setForm({entry: null}); setSelectedEntry(null); }}>
                            <Text style={style.buttonText}>Cancel</Text>
                        </Pressable>
                    </View>
                </View>
            )}
            


      </ScrollView>
    
  );
};