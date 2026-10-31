import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import style from './style';
import { Background } from 'expo-router/build/react-navigation/index.js';

export default function App() {

  return (

    <ScrollView
        style={[style.container, {backgroundColor: '#96d1aa'}]}
        contentContainerStyle={style.contentContainer}
    >
      <Text>Stress Manager</Text>
      
      <StatusBar style="light" />
      <Link href="/checkin" asChild>
        <Pressable style={style.button}>
          <Text style={style.buttonText}>Check-in Page</Text>
        </Pressable>
      </Link>
    </ScrollView>
  );
}
