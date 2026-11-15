import React, {useState} from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Alert } from 'react-native';
import InputSpinner from 'react-native-input-spinner';
import { useSQLiteContext } from 'expo-sqlite';
import { Picker } from '@react-native-picker/picker';
//import { Picker } from '@expo/ui/community/picker';
import style from '../style';
import { Color, Link } from 'expo-router';
import { CHECK_IN_REQUIRED_FIELD_MESSAGES, getMissingCheckInField, type CheckInRequiredFields } from '../src/lib/validation';


export default function Checkin() {
    const db = useSQLiteContext();
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [spinnerResetKey, setSpinnerResetKey] = useState(0);

    type checkInForm = CheckInRequiredFields & {
        physicalStressLocation: string | null;
        physicalSymptoms: string | null;
        hoursSlept: number | null;
        waterConsumed: number | null;
        stressCause: string | null
        stressDuration: number | null;

    };
    
    const [form, setForm] = useState<checkInForm>({
        stressLevel: null,
        mood: null,
        physicalStressLocation: null,
        physicalSymptoms: null,
        hoursSlept: null,
        waterConsumed: null,
        eatenRecently: null,
        concentrationLevel: null,
        stressCause: null,
        stressDuration: null
    });

    const handleSubmit = async () => {
        try{

            const missingField = getMissingCheckInField(form);
            if (missingField) {
                Alert.alert(CHECK_IN_REQUIRED_FIELD_MESSAGES[missingField]);
                return;
            }
            const currentDate = new Date().toISOString();
            

            await db.runAsync(
                'INSERT INTO check_ins (date, stress_level, mood, physical_stress_location, physical_symptoms, hours_slept, water_consumed, eaten_recently, concentration_level, stress_cause, stress_duration) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [currentDate, form.stressLevel, form.mood, form.physicalStressLocation, form.physicalSymptoms, form.hoursSlept, form.waterConsumed, form.eatenRecently, form.concentrationLevel, form. stressCause, form.stressDuration]
            );
            Alert.alert('The Check-in was submitted successfully!');


            setForm({
                stressLevel: null,
                mood: null,
                physicalStressLocation: null,
                physicalSymptoms: null,
                hoursSlept: null,
                waterConsumed: null,
                eatenRecently: null,
                concentrationLevel: null,
                stressCause: null,
                stressDuration: null
            });
            setSpinnerResetKey(prev => prev + 1);

        } catch (error) {
            console.error(error);
            Alert.alert('An error occured when submitting the check-ins. Please try again later or try resubmitting the check-ins.');
        }

    };

    
return (
    <ScrollView
        style={[style.container, {backgroundColor: '#112f2c'}]}
        contentContainerStyle={style.contentContainer}
        indicatorStyle='white'
    >
    
        <Text style={style.header}>Check-in on yourself!</Text>
        <Text style={style.header}>You deserve to take care of yourself!</Text>
    
    <View style={style.line}/>

        {/* Check-in options */}
        <Text style={style.header}>From 1-10 how is your stress</Text>
        <Text style={style.header}>1 = very mild - 10 = very bad</Text>
        <InputSpinner
            resetKey={spinnerResetKey}
            editable={false}
            emptied={true}
            placeholderOnZero={true}
            min={1}
            max={10}
            color="#b71f57"
            textColor="#000000"
            skin="round"
            width={255}
            height={35}
            fontSize={16}
            placeholder="Enter stress level"
            value={form.stressLevel ?? ""}
            onChange={(value) => { if(value == null || value === "") { setForm((prev) => ({...prev, stressLevel: null})); return;} if (Number(value) === 0) { return false;} setForm((prev) => ({...prev, stressLevel: Number(value)}));}}
        />

<View style={style.line}/>


        <Text style={style.header}>What is your current mood?</Text>
        <View style={style.pickerOutside}>
            <Picker selectedValue={form.mood ?? ""} onValueChange={value => setForm((prev) => ({...prev, mood: value === "" ? null : String(value) }))}>
                <Picker.Item label="Select Mood" value=""/>
                <Picker.Item label="Happy" value="happy" />
                <Picker.Item label="Angry" value="angry" />
                <Picker.Item label="Sad" value="sad" />
                <Picker.Item label="Tense" value="tense" />
                <Picker.Item label="Bored" value="bored" />
                <Picker.Item label="Nervous" value="nervous" />
                <Picker.Item label="Worried" value="worried" />
                <Picker.Item label="Calm" value="calm" />
                <Picker.Item label="Scared" value="scared" />
                <Picker.Item label="Lonely" value="lonely" />
                <Picker.Item label="Excited" value="excited" />
            </Picker>
            <Text style={{ color: '#000000', paddingLeft:25}}>
                Selected: {form.mood}
            </Text>
        </View>
<View style={style.line}/>
        <Text style={style.header}>Where in stress most prevelant in your body?</Text>
        <View style={style.pickerOutside}>
            <Picker selectedValue={form.physicalStressLocation ?? ""} onValueChange={value => setForm((prev) => ({...prev, physicalStressLocation: value === "" ? null : String(value) }))}>
                <Picker.Item label="Stress Location" value=""/>
                <Picker.Item label="Jaw" value="jaw" />
                <Picker.Item label="Teeth" value="teeth" />
                <Picker.Item label="Neck" value="neck" />
                <Picker.Item label="Shoulders/Traps" value="shoulders/traps" />
                <Picker.Item label="Head" value="head" />
                <Picker.Item label="Stomach" value="stomach" />
                <Picker.Item label="Chest" value="chest" />
                <Picker.Item label="Back" value="back" />
                <Picker.Item label="Hips" value="hips" />
                <Picker.Item label="Arms" value="arms" />
                <Picker.Item label="Legs" value="legs" />
                <Picker.Item label="Hands" value="hands" />
                <Picker.Item label="Feet" value="feet" />
            </Picker>
            <Text style={{ color: '#000000', paddingLeft:25}}>
                Selected: {form.physicalStressLocation}
            </Text>
        </View>
<View style={style.line}/>

        <Text style={style.header}>What is the most prevelant physical symptom?</Text>
        <View style={style.pickerOutside}>
            <Picker selectedValue={form.physicalSymptoms ?? ""} onValueChange={value => setForm((prev) => ({...prev, physicalSymptoms: value === "" ? null : String(value) }))}>
                <Picker.Item label="Physical Symptoms" value="" />
                <Picker.Item label="Headache" value="headache" />
                <Picker.Item label="Migraine" value="migraine" />
                <Picker.Item label="Dizzy" value="dizzy" />
                <Picker.Item label="Fatigue" value="fatigue" />
                <Picker.Item label="Upset stomach" value="upset stomach" />
                <Picker.Item label="Racing heart" value="racing heart" />
                <Picker.Item label="Tense muscles" value="tense muscles" />
                <Picker.Item label="Twitches" value="twitches" />
                <Picker.Item label="Shortness of breath" value="shortness of breath" />
                <Picker.Item label="Illness" value="illness" />
                <Picker.Item label="Heart palpitations" value="heart palpitations" />
            </Picker>
            <Text style={{ color: '#000000', paddingLeft:25}}>
                Selected: {form.physicalSymptoms}
            </Text>
        </View>
<View style={style.line}/>

        <Text style={style.header}>How much sleep did you get?</Text>
        <InputSpinner
            resetKey={spinnerResetKey}
            editable={false}
            emptied={true}
            placeholderOnZero={true}
            min={0}
            max={1000}
            startAtZeroOnFirstIncrement={true}
            color="#b71f57"
            textColor="#000000"
            skin="round"
            width={255}
            height={35}
            fontSize={16}
            placeholder="Enter hours slept"
            value={form.hoursSlept ?? ""}
            onChange={(value) => setForm((prev) => ({...prev, hoursSlept: value === null || value === "" ? null : Number(value)}))}
        />

<View style={style.line}/>

        <Text style={style.header}>How much water have you drank today?</Text>
        <Text style={style.header}>Measured in ounces</Text>
        <InputSpinner
            resetKey={spinnerResetKey}
            editable={false}
            emptied={true}
            placeholderOnZero={true}
            min={0}
            max={1000}
            startAtZeroOnFirstIncrement={true}
            color="#b71f57"
            textColor="#000000"
            skin="round"
            width={255}
            height={35}
            fontSize={16}
            placeholder="Enter water consumed"
            value={form.waterConsumed ?? ""}
            onChange={(value) => setForm((prev) => ({...prev, waterConsumed: value === null || value === "" ? null : Number(value)}))}
        />
<View style={style.line}/>

        <Text style={style.header}>Have you eaten within the past 6 hours?</Text>
        <Pressable style={style.radio} onPress={() => setForm({...form, eatenRecently: 1})}>
            <View style={style.radioCircle}>
                {form.eatenRecently === 1 && ( 
                    <View style={style.radioCircleSelected} />
                )}
            </View>
            <Text style={style.radioText}>Yes</Text>
        </Pressable>
        <Pressable style={style.radio} onPress={() => setForm({...form, eatenRecently: 0})}>
            <View style={style.radioCircle}>
                {form.eatenRecently === 0 && ( 
                    <View style={style.radioCircleSelected} />
                )}
            </View>
            <Text style={style.radioText}>No</Text>
        </Pressable>

<View style={style.line}/>

        <Text style={style.header}>How easy does it feel to focus?</Text>
        <Text style={style.header}>1 = very easy - 10 = very difficult</Text>
        <InputSpinner
            resetKey={spinnerResetKey}
            editable={false}
            emptied={true}
            placeholderOnZero={true}
            min={1}
            max={10}
            color="#b71f57"
            textColor="#000000"
            skin="round"
            width={255}
            height={35}
            fontSize={16}
            placeholder="Enter concentration level"
            value={form.concentrationLevel ?? ""}
            onChange={(value) => { if(value == null || value === "") { setForm((prev) => ({...prev, concentrationLevel: null})); return;} if (Number(value) === 0) { return false;} setForm((prev) => ({...prev, concentrationLevel: Number(value)}));}}
        />

<View style={style.line}/>

        <Text style={style.header}>What do you believe to be the main cause of your stress?</Text>
        <View style={style.pickerOutside}>
            <Picker selectedValue={form.stressCause ?? ""} onValueChange={value => setForm((prev) => ({...prev, stressCause: value === "" ? null : String(value) }))}>
                <Picker.Item label="Stress Cause" value="" />
                <Picker.Item label="School" value="school" />
                <Picker.Item label="Work" value="work" />
                <Picker.Item label="Time" value="time" />
                <Picker.Item label="Deadline" value="deadline" />
                <Picker.Item label="Finances" value="finances" />
                <Picker.Item label="Relationship" value="relationship" />
                <Picker.Item label="Family" value="family" />
                <Picker.Item label="Argument" value="argument" />
                <Picker.Item label="Loss" value="loss" />
                <Picker.Item label="Health" value="health" />
                <Picker.Item label="Big change" value="big change" />
                <Picker.Item label="Surroundings" value="surroundings" />
                <Picker.Item label="Overthinking" value="overthinking" />
                <Picker.Item label="Uncertainty" value="uncertainty" />
                <Picker.Item label="Lonely" value="lonely" />
                <Picker.Item label="Procrastination" value="procrastination" />
            </Picker>
            <Text style={{ color: '#000000', paddingLeft:25}}>
                Selected: {form.stressCause}
            </Text>
        </View>
<View style={style.line}/>

        <Text style={style.header}>How long has your stress been happening?</Text>
        <Text style={style.header}>Measured with hours</Text>
        <InputSpinner
            resetKey={spinnerResetKey}
            editable={false}
            emptied={true}
            placeholderOnZero={true}
            min={0}
            max={1000}
            startAtZeroOnFirstIncrement={true}
            color="#b71f57"
            textColor="#000000"
            skin="round"
            width={255}
            height={35}
            fontSize={16}
            placeholder="Enter stress duration"
            value={form.stressDuration ?? ""}
            onChange={(value) => setForm((prev) => ({...prev, stressDuration: value === null || value === "" ? null : Number(value)}))}
        />
<View style={style.line}/>

        <Pressable style={style.button} onPress={handleSubmit}>
            <Text style={style.buttonText}>Submit Check-in</Text>
        </Pressable>

        <Link href="/overview" asChild>
            <Pressable style={style.button}>
              <Text style={style.buttonText}>Overview Page</Text>
            </Pressable>
        </Link>

      </ScrollView>
    
  );
};