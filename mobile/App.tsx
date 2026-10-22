import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useEffect } from 'react';
import { openDatabase } from './src/lib/database';
import { Link } from 'expo-router';

export default function App() {
  useEffect(() => {
    async function initDatabase() {
      await openDatabase();
    }

    void initDatabase().catch((error: unknown) => {
      console.error('Failed to initialize the local database.', error);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text>Stress Manager</Text>
      
      <StatusBar style="light" />
      <Link href="/analysis" asChild>
        <Pressable accessibilityRole="button" style={styles.button}>
          <Text style={styles.buttonText}>Analysis Page</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#96d1aa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#112f2c',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
