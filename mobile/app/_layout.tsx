import { Stack } from 'expo-router';
import { Platform, Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { openDatabase } from '../src/lib/database'; 
import { SQLiteProvider } from 'expo-sqlite';

type HeaderProps = {
  navigation: { goBack: () => void };
  title: string;
  backTitle?: string;
};

function AppHeader({ navigation, title, backTitle }: HeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ paddingTop: insets.top, backgroundColor: '#112f2c' }}>
      <View style={{ height: 44, alignItems: 'center', justifyContent: 'center' }}>
        {backTitle && (
          <Pressable onPress={navigation.goBack} style={{ position: 'absolute', left: 16 }}>
            <Text style={{ color: '#ffffff', fontSize: 17 }}>‹ {backTitle}</Text>
          </Pressable>
        )}
        <Text style={{ color: '#ffffff', fontSize: 19, fontWeight: 'bold' }}>{title}</Text>
      </View>
      <View style={{ height: 2, backgroundColor: '#ffffff' }} />
    </View>
  );
}

export default function RootLayout() {
  return (
    <SQLiteProvider
      databaseName='StressManagement.db'
      onInit={openDatabase}
      >
      <Stack screenOptions={{
        headerStyle: { backgroundColor: '#112f2c' },
        headerTintColor: '#ffffff',
        headerTitleStyle: { fontWeight: 'bold' },
        header: Platform.OS === 'ios'
          ? ({ navigation, options, back, route }) => (
              <AppHeader
                navigation={navigation}
                title={options.title ?? route.name}
                backTitle={back?.title}
              />
            )
          : undefined,
      }}>
        <Stack.Screen name="home" options={{ title: 'Home' }} />
        <Stack.Screen name="analysis" options={{ title: 'Analysis', headerBackTitle: 'Home' }} />
        <Stack.Screen name="checkin" options={{ title: 'Check-in', headerBackTitle: 'Home' }} />
      </Stack>
    </SQLiteProvider>
  );
}
