import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { supabase } from './src/lib/supabase';

export default function App() {
  async function testCheckInInsert() {
    const { data, error } = await supabase
      .from('check_ins')
      .insert({ stress_level: 3, mood: 'test' })
      .select()
      .single();

    if (error) {
      console.error('Supabase insert failed:', error.message);
      return;
    }

    console.log('Supabase check-in insert succeeded:', data);
  }

  return (
    <View style={styles.container}>
      <Text>Stress Management App</Text>
      <Button title="Test Check-In Insert" onPress={testCheckInInsert} />
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
