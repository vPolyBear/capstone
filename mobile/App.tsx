import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { useState } from 'react';

export default function App() {
  const [result, setResult] = useState('');

  async function createTable() {
      const db = await SQLite.openDatabaseAsync('StressManagement.db');

      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS check_ins (
          id INTEGER PRIMARY KEY NOT NULL,
          stress_level INTEGER NOT NULL
        );

        CREATE TABLE IF NOT EXISTS journal_entries (
          id INTEGER PRIMARY KEY NOT NULL,
          entry TEXT NOT NULL
        );
      `);
    }

  async function testData(){
      const startTime = Date.now();
      await createTable();
      const db = await SQLite.openDatabaseAsync('StressManagement.db');
      
      const endTime = Date.now();
      const elapsedTime = endTime - startTime;

      await db.execAsync(`
        INSERT INTO check_ins (stress_level) VALUES (1);
        INSERT INTO check_ins (stress_level) VALUES (2);
        INSERT INTO check_ins (stress_level) VALUES (3);
        INSERT INTO check_ins (stress_level) VALUES (4);        
        INSERT INTO check_ins (stress_level) VALUES (5);

        INSERT INTO journal_entries (entry) VALUES ('Test journal entry 1');
        INSERT INTO journal_entries (entry) VALUES ('Test journal entry 2');
        INSERT INTO journal_entries (entry) VALUES ('Test journal entry 3');
        INSERT INTO journal_entries (entry) VALUES ('Test journal entry 4');
        INSERT INTO journal_entries (entry) VALUES ('Test journal entry 5');
      `);

      const checkIns = await db.getAllAsync('SELECT * FROM check_ins');
      console.log('Retrieved Check-Ins:', checkIns);

      const journalEntries = await db.getAllAsync('SELECT * FROM journal_entries');
      console.log('Retrieved Journal Entries:', journalEntries);

      setResult(
        `Check-Ins: ${checkIns.length}/5\n` +
        `Journal Entries: ${journalEntries.length}/5\n` +
        `Time: ${elapsedTime}ms`
      );
  }

  return (
    <View style={styles.container}>
      <Text>Stress Management App</Text>
      <Button title="Press to Test Inserting 5 Check-Ins and Journal Entries" onPress={testData} />
      <Text>{result}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
