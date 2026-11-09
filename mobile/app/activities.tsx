import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Alert, TextInput } from 'react-native';
import InputSpinner from 'react-native-input-spinner';
import { useSQLiteContext } from 'expo-sqlite';
import { Picker } from '@react-native-picker/picker';
import style from '../style';
import { Color, Link } from 'expo-router';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { canSubmitJournalEntry } from '../src/lib/validation';



export default function Journal() {
    const [view, setView] = useState('listAllActivities');
    
return (
    <ScrollView
        style={[style.container, { backgroundColor: '#b71f57' }]}
        contentContainerStyle={style.contentContainer}
        keyboardShouldPersistTaps="handled"
        indicatorStyle='white'
    >

    {/* List All Activities */}
            {view === 'listAllActivities' && (
                <View>
                    <View style={{alignItems: 'center'}}>
                        <Text style={style.header}>De-stressing Activities</Text>
                    </View>
                    <View style={[style.previewContainer, {paddingTop: 10}]}>
                            <Pressable 
                                style={[style.activityBody]}
                                onPress={() => { setView('doBreathingActivity'); }}
                            >
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 10, paddingHorizontal: 10 }}>
                                    <Text style={{fontSize: 20, color: '#FFFFFF'}}>Breathing Activity 🌬️</Text>
                                    <Text style={{fontSize: 20, color: '#FFFFFF'}}>➔</Text>
                                </View>
                            </Pressable>
                    </View>
                    <View style={[style.previewContainer, {paddingTop: 10}]}>
                            <Pressable 
                                style={[style.activityBody]}
                                onPress={() => { setView('doSoundActivity'); }}
                            >
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 10, paddingHorizontal: 10 }}>
                                    <Text style={{fontSize: 20, color: '#FFFFFF'}}>Sound Activity 🔊</Text>
                                    <Text style={{fontSize: 20, color: '#FFFFFF'}}>➔</Text>
                                </View>
                            </Pressable>
                    </View>
                    <View style={[style.previewContainer, {paddingTop: 10}]}>
                            <Pressable 
                                style={[style.activityBody]}
                                onPress={() => { setView('doCreativeActivity'); }}
                            >
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 10, paddingHorizontal: 10 }}>
                                    <Text style={{fontSize: 20, color: '#FFFFFF'}}>Creative Activity 🎨</Text>
                                    <Text style={{fontSize: 20, color: '#FFFFFF'}}>➔</Text>
                                </View>
                            </Pressable>
                    </View>
                    <View style={[style.previewContainer, {paddingTop: 10}]}>
                            <Pressable 
                                style={[style.activityBody]}
                                onPress={() => { setView('doPhysicalActivity'); }}
                            >
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 10, paddingHorizontal: 10 }}>
                                    <Text style={{fontSize: 20, color: '#FFFFFF'}}>Physical Activity 🌅</Text>
                                    <Text style={{fontSize: 20, color: '#FFFFFF'}}>➔</Text>
                                </View>
                            </Pressable>
                    </View>
                    <View style={[style.previewContainer, {paddingTop: 10}]}>
                            <Pressable 
                                style={[style.activityBody]}
                                onPress={() => { setView('doSelfCareActivity'); }}
                            >
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 10, paddingHorizontal: 10 }}>
                                    <Text style={{fontSize: 20, color: '#FFFFFF'}}>Self-Care Activity 🍵</Text>
                                    <Text style={{fontSize: 20, color: '#FFFFFF'}}>➔</Text>
                                </View>
                            </Pressable>
                    </View>
                    <Link href="/analysis" asChild>
                        <Pressable style={StyleSheet.flatten([style.button,{ backgroundColor: '#099197', alignSelf: 'center' },])}>
                            <Text style={style.buttonText}>Analysis Page</Text>
                        </Pressable>
                    </Link>
                </View>
            )}

    {/* List Breathing Activities */}
            {view === 'doBreathingActivity' && (

                <View>
                    <Text style={style.header}>Select A Breathing Activity</Text>
                    <View style={[style.previewContainer, {paddingTop: 10}]}>
                        <Pressable 
                            style={[style.activityBody]}
                            onPress={() => { setView('doBreathingActivity1'); }}
                        >
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 10, paddingHorizontal: 10 }}>
                                    <Text style={{fontSize: 20, color: '#FFFFFF'}}>Breathing Activity 1</Text>
                                    <Text style={{fontSize: 20, color: '#FFFFFF'}}>➔</Text>
                                </View>
                        </Pressable>
                    </View>
                    <View style={[style.previewContainer, {paddingTop: 10}]}>
                        <Pressable 
                            style={[style.activityBody]}
                            onPress={() => { setView('doBreathingActivity2'); }}
                        >
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 10, paddingHorizontal: 10 }}>
                                    <Text style={{fontSize: 20, color: '#FFFFFF'}}>Breathing Activity 2</Text>
                                    <Text style={{fontSize: 20, color: '#FFFFFF'}}>➔</Text>
                                </View>
                        </Pressable>
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <Pressable style={[style.button, { backgroundColor: '#099197' }]} onPress={() => setView('listAllActivities')}>
                            <Text style={style.buttonText}>Back</Text>
                        </Pressable>
                    </View>
                
                </View>
            )}

            {view === 'doBreathingActivity1' && (
                <View>
                    <View style={{alignItems: 'center'}}>
                        <Text style={style.header}>Breathing Activity 1</Text>
                    </View>
                    <View style={style.previewContainerView}>
                        <ScrollView style={style.previewBodyView} indicatorStyle='white'>
                            <Text style={{fontSize: 16, color: '#FFFFFF'}}>
                                Breathe in for 4 seconds, hold for 4 seconds, and breathe out for 4 seconds. Repeat this cycle for 4 minutes.
                            </Text>
                        </ScrollView>
                        <View style={{alignItems: 'center'}}>
                            <Pressable style={[style.button, { backgroundColor: '#099197' }]} onPress={() => setView('doBreathingActivity')}>
                                <Text style={style.buttonText}>Back</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            )}
            {view === 'doBreathingActivity2' && (
                <View>
                    <View style={{alignItems: 'center'}}>
                        <Text style={style.header}>Breathing Activity 2</Text>
                    </View>
                    <View style={style.previewContainerView}>
                        <ScrollView style={style.previewBodyView} indicatorStyle='white'>
                            <Text style={{fontSize: 16, color: '#FFFFFF'}}>
                                flower breathing
                            </Text>
                        </ScrollView>
                        <View style={{alignItems: 'center'}}>
                            <Pressable style={[style.button, { backgroundColor: '#099197' }]} onPress={() => setView('doBreathingActivity')}>
                                <Text style={style.buttonText}>Back</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            )}

    {/* List Sound Activities */}
            {view === 'doSoundActivity' && (

                <View>
                    <Text style={style.header}>Select A Sound Activity</Text>
                    <View style={[style.previewContainer, {paddingTop: 10}]}>
                        <Pressable 
                            style={[style.activityBody]}
                            onPress={() => { setView('doSoundActivity1'); }}
                        >
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 10, paddingHorizontal: 10 }}>
                                    <Text style={{fontSize: 20, color: '#FFFFFF'}}>Sound Activity 1</Text>
                                    <Text style={{fontSize: 20, color: '#FFFFFF'}}>➔</Text>
                                </View>
                        </Pressable>
                    </View>
                    <View style={[style.previewContainer, {paddingTop: 10}]}>
                        <Pressable 
                            style={[style.activityBody]}
                            onPress={() => { setView('doSoundActivity2'); }}
                        >
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 10, paddingHorizontal: 10 }}>
                                    <Text style={{fontSize: 20, color: '#FFFFFF'}}>Sound Activity 2</Text>
                                    <Text style={{fontSize: 20, color: '#FFFFFF'}}>➔</Text>
                                </View>
                        </Pressable>
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <Pressable style={[style.button, { backgroundColor: '#099197' }]} onPress={() => setView('listAllActivities')}>
                            <Text style={style.buttonText}>Back</Text>
                        </Pressable>
                    </View>
                
                </View>
            )}

            {view === 'doSoundActivity1' && (
                <View>
                    <View style={{alignItems: 'center'}}>
                        <Text style={style.header}>Sound Activity 1</Text>
                    </View>
                    <View style={style.previewContainerView}>
                        <ScrollView style={style.previewBodyView} indicatorStyle='white'>
                            <Text style={{fontSize: 16, color: '#FFFFFF'}}>
                                sounds
                            </Text>
                        </ScrollView>
                        <View style={{alignItems: 'center'}}>
                            <Pressable style={[style.button, { backgroundColor: '#099197' }]} onPress={() => setView('doSoundActivity')}>
                                <Text style={style.buttonText}>Back</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            )}
            {view === 'doSoundActivity2' && (
                <View>
                    <View style={{alignItems: 'center'}}>
                        <Text style={style.header}>Sound Activity 2</Text>
                    </View>
                    <View style={style.previewContainerView}>
                        <ScrollView style={style.previewBodyView} indicatorStyle='white'>
                            <Text style={{fontSize: 16, color: '#FFFFFF'}}>
                                music
                            </Text>
                        </ScrollView>
                        <View style={{alignItems: 'center'}}>
                            <Pressable style={[style.button, { backgroundColor: '#099197' }]} onPress={() => setView('doSoundActivity')}>
                                <Text style={style.buttonText}>Back</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            )}

    {/* List Creative Activities */}
            {view === 'doCreativeActivity' && (

                <View>
                    <Text style={style.header}>Select A Creative Activity</Text>
                    <View style={[style.previewContainer, {paddingTop: 10}]}>
                        <Pressable 
                            style={[style.activityBody]}
                            onPress={() => { setView('doCreativeActivity1'); }}
                        >
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 10, paddingHorizontal: 10 }}>
                                    <Text style={{fontSize: 20, color: '#FFFFFF'}}>Creative Activity 1</Text>
                                    <Text style={{fontSize: 20, color: '#FFFFFF'}}>➔</Text>
                                </View>
                        </Pressable>
                    </View>
                    <View style={[style.previewContainer, {paddingTop: 10}]}>
                        <Pressable 
                            style={[style.activityBody]}
                            onPress={() => { setView('doCreativeActivity2'); }}
                        >
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 10, paddingHorizontal: 10 }}>
                                    <Text style={{fontSize: 20, color: '#FFFFFF'}}>Creative Activity 2</Text>
                                    <Text style={{fontSize: 20, color: '#FFFFFF'}}>➔</Text>
                                </View>
                        </Pressable>
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <Pressable style={[style.button, { backgroundColor: '#099197' }]} onPress={() => setView('listAllActivities')}>
                            <Text style={style.buttonText}>Back</Text>
                        </Pressable>
                    </View>
                
                </View>
            )}

            {view === 'doCreativeActivity1' && (
                <View>
                    <View style={{alignItems: 'center'}}>
                        <Text style={style.header}>Creative Activity 1</Text>
                    </View>
                    <View style={style.previewContainerView}>
                        <ScrollView style={style.previewBodyView} indicatorStyle='white'>
                            <Text style={{fontSize: 16, color: '#FFFFFF'}}>
                                Draw a flower using your favorite colors. Focus on the details and let your creativity flow.
                            </Text>
                        </ScrollView>
                        <View style={{alignItems: 'center'}}>
                            <Pressable style={[style.button, { backgroundColor: '#099197' }]} onPress={() => setView('doCreativeActivity')}>
                                <Text style={style.buttonText}>Back</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            )}
            {view === 'doCreativeActivity2' && (
                <View>
                    <View style={{alignItems: 'center'}}>
                        <Text style={style.header}>Creative Activity 2</Text>
                    </View>
                    <View style={style.previewContainerView}>
                        <ScrollView style={style.previewBodyView} indicatorStyle='white'>
                            <Text style={{fontSize: 16, color: '#FFFFFF'}}>
                                Draw your favorite animal using your favorite colors. Focus on the details and let your creativity flow.
                            </Text>
                        </ScrollView>
                        <View style={{alignItems: 'center'}}>
                            <Pressable style={[style.button, { backgroundColor: '#099197' }]} onPress={() => setView('doCreativeActivity')}>
                                <Text style={style.buttonText}>Back</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            )}

    {/* List Physical Activities */}
            {view === 'doPhysicalActivity' && (

                <View>
                    <Text style={style.header}>Select A Physical Activity</Text>
                    <View style={[style.previewContainer, {paddingTop: 10}]}>
                        <Pressable 
                            style={[style.activityBody]}
                            onPress={() => { setView('doPhysicalActivity1'); }}
                        >
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 10, paddingHorizontal: 10 }}>
                                    <Text style={{fontSize: 20, color: '#FFFFFF'}}>Physical Activity 1</Text>
                                    <Text style={{fontSize: 20, color: '#FFFFFF'}}>➔</Text>
                                </View>
                        </Pressable>
                    </View>
                    <View style={[style.previewContainer, {paddingTop: 10}]}>
                        <Pressable 
                            style={[style.activityBody]}
                            onPress={() => { setView('doPhysicalActivity2'); }}
                        >
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 10, paddingHorizontal: 10 }}>
                                    <Text style={{fontSize: 20, color: '#FFFFFF'}}>Physical Activity 2</Text>
                                    <Text style={{fontSize: 20, color: '#FFFFFF'}}>➔</Text>
                                </View>
                        </Pressable>
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <Pressable style={[style.button, { backgroundColor: '#099197' }]} onPress={() => setView('listAllActivities')}>
                            <Text style={style.buttonText}>Back</Text>
                        </Pressable>
                    </View>
                
                </View>
            )}

            {view === 'doPhysicalActivity1' && (
                <View>
                    <View style={{alignItems: 'center'}}>
                        <Text style={style.header}>Physical Activity 1</Text>
                    </View>
                    <View style={style.previewContainerView}>
                        <ScrollView style={style.previewBodyView} indicatorStyle='white'>
                            <Text style={{fontSize: 16, color: '#FFFFFF'}}>
                                stretch
                            </Text>
                        </ScrollView>
                        <View style={{alignItems: 'center'}}>
                            <Pressable style={[style.button, { backgroundColor: '#099197' }]} onPress={() => setView('doPhysicalActivity')}>
                                <Text style={style.buttonText}>Back</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            )}
            {view === 'doPhysicalActivity2' && (
                <View>
                    <View style={{alignItems: 'center'}}>
                        <Text style={style.header}>Physical Activity 2</Text>
                    </View>
                    <View style={style.previewContainerView}>
                        <ScrollView style={style.previewBodyView} indicatorStyle='white'>
                            <Text style={{fontSize: 16, color: '#FFFFFF'}}>
                                walk outside
                            </Text>
                        </ScrollView>
                        <View style={{alignItems: 'center'}}>
                            <Pressable style={[style.button, { backgroundColor: '#099197' }]} onPress={() => setView('doPhysicalActivity')}>
                                <Text style={style.buttonText}>Back</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            )}

        {/* List Self-Care Activities */}
            {view === 'doSelfCareActivity' && (

                <View>
                    <Text style={style.header}>Select A Self-Care Activity</Text>
                    <View style={[style.previewContainer, {paddingTop: 10}]}>
                        <Pressable 
                            style={[style.activityBody]}
                            onPress={() => { setView('doSelfCareActivity1'); }}
                        >
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 10, paddingHorizontal: 10 }}>
                                    <Text style={{fontSize: 20, color: '#FFFFFF'}}>Self-Care Activity 1</Text>
                                    <Text style={{fontSize: 20, color: '#FFFFFF'}}>➔</Text>
                                </View>
                        </Pressable>
                    </View>
                    <View style={[style.previewContainer, {paddingTop: 10}]}>
                        <Pressable 
                            style={[style.activityBody]}
                            onPress={() => { setView('doSelfCareActivity2'); }}
                        >
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 10, paddingHorizontal: 10 }}>
                                    <Text style={{fontSize: 20, color: '#FFFFFF'}}>Self-Care Activity 2</Text>
                                    <Text style={{fontSize: 20, color: '#FFFFFF'}}>➔</Text>
                                </View>
                        </Pressable>
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <Pressable style={[style.button, { backgroundColor: '#099197' }]} onPress={() => setView('listAllActivities')}>
                            <Text style={style.buttonText}>Back</Text>
                        </Pressable>
                    </View>
                
                </View>
            )}

            {view === 'doSelfCareActivity1' && (
                <View>
                    <View style={{alignItems: 'center'}}>
                        <Text style={style.header}>Self-Care Activity 1</Text>
                    </View>
                    <View style={style.previewContainerView}>
                        <ScrollView style={style.previewBodyView} indicatorStyle='white'>
                            <Text style={{fontSize: 16, color: '#FFFFFF'}}>
                                Take a nap.
                            </Text>
                        </ScrollView>
                        <View style={{alignItems: 'center'}}>
                            <Pressable style={[style.button, { backgroundColor: '#099197' }]} onPress={() => setView('doSelfCareActivity')}>
                                <Text style={style.buttonText}>Back</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            )}
            {view === 'doSelfCareActivity2' && (
                <View>
                    <View style={{alignItems: 'center'}}>
                        <Text style={style.header}>Self-Care Activity 2</Text>
                    </View>
                    <View style={style.previewContainerView}>
                        <ScrollView style={style.previewBodyView} indicatorStyle='white'>
                            <Text style={{fontSize: 16, color: '#FFFFFF'}}>
                                Take a shower.
                            </Text>
                        </ScrollView>
                        <View style={{alignItems: 'center'}}>
                            <Pressable style={[style.button, { backgroundColor: '#099197' }]} onPress={() => setView('doSelfCareActivity')}>
                                <Text style={style.buttonText}>Back</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            )}

      </ScrollView>
    
  );
};