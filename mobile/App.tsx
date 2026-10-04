import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useEffect } from 'react';
import { openDatabase } from './src/lib/database';

export default function App() {
  useEffect(() => {
    async function initDatabase() {
      const db = await openDatabase();
      
    }

    initDatabase();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Stress Manager</Text>
      <StatusBar style="auto" />
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
