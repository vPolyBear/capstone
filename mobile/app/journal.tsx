import React, {useState} from 'react';
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
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    type JournalForm = {
        entry: string | null;

    };
    
    const [form, setForm] = useState<JournalForm>({
        entry: null,
    });

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
            Alert.alert('The Journal was submitted successfully!');

            const submittedJournal = await db.getAllAsync(
                'SELECT * FROM journal_entries'
            );
            console.log('Submitted Journal:', submittedJournal);

            setForm({
                entry: null,
            });

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
    >

    <SafeAreaProvider>
      <SafeAreaView style={{flex: 1}}>
        <Text style={style.header}>Journal Your Worries Away!</Text>

        <TextInput
          editable
          multiline
          numberOfLines={4}
          maxLength={10000}
          onChangeText={(text) => setForm({...form, entry: text })}
          value={form.entry ?? ''}
          placeholder='Here you can write a journal entry'
          style={style.body}
        />
      </SafeAreaView>
    </SafeAreaProvider>
    
    
    <View style={style.line}/>

        <Pressable style={style.button} onPress={handleSubmit}>
            <Text style={style.buttonText}>Submit Entry</Text>
        </Pressable>

        <Link href="/analysis" asChild>
            <Pressable style={style.button}>
              <Text style={style.buttonText}>Analysis Page</Text>
            </Pressable>
        </Link>

      </ScrollView>
    
  );
};