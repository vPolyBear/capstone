import React, {useState} from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import {FunctionsFetchError, FunctionsHttpError, FunctionsRelayError} from "@supabase/supabase-js";
import { supabase } from "../src/lib/supabase";
import style from '../style';
import { useSQLiteContext } from 'expo-sqlite';

export default function Analysis() {
    
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);
    const [analysis, setAnalysis] = useState<string | null>(null);
    const [analysisError, setAnalysisError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedCheckInDataOption, setSelectedCheckInDataOption] = useState<string | null>(null);
    const [selectedCheckInDuration, setSelectedCheckInDuration] = useState<string | null>(null);
    const [selectedJournalEntryDataOption, setSelectedJournalEntryDataOption] = useState<string | null>(null);
    const [selectedJournalEntryDuration, setSelectedJournalEntryDuration] = useState<string | null>(null);


    const db = useSQLiteContext();

    const selectAnalysisType = (option: string) => {
        setSelectedOption(option);
        setSelectedPrompt(null);
        setAnalysisError(null);
    };

    {/* Select Check Ins Section for Analysis*/}
    const selectCheckInsForAnalysis = (type: string) => {
        setSelectedCheckInDataOption(type);
        setSelectedCheckInDuration(null);
        setAnalysisError(null);
    };

    {/* Select Journal Entries Section for Analysis*/}
    const selectJournalEntriesForAnalysis = (type: string) => {
        setSelectedJournalEntryDataOption(type);
        setSelectedJournalEntryDuration(null);
        setAnalysisError(null);
    };

    const selectData = async (selectedCheckInDataOption: string, selectedJournalEntryDataOption: string, selectedCheckInDuration: string, selectedJournalEntryDuration: string) => {

        let checkInData: any[] = [];
        let journalEntryData: any[] = [];

            if(selectedCheckInDuration === 'dayCheckIns'){
                checkInData = await db.getAllAsync(
                    "SELECT * FROM check_ins WHERE date(date,'localtime') = date('now','localtime')"
                );        
            }
            if(selectedCheckInDuration === 'weekCheckIns'){
                checkInData = await db.getAllAsync(
                    "SELECT * FROM check_ins WHERE date(date,'localtime') >= date('now', '-6 days', 'localtime') AND date <= date('now', 'localtime')"
                );            
            }
            if(selectedCheckInDuration === 'monthCheckIns'){
                checkInData = await db.getAllAsync(
                    "SELECT * FROM check_ins WHERE date(date,'localtime') >= date('now','-1 month', 'localtime') AND date('now','localtime') <= date('now', 'localtime')"
                );  
            }
            if(selectedCheckInDuration === 'allTimeCheckIns'){
                checkInData = await db.getAllAsync(
                    "SELECT * FROM check_ins"
                );        
            }     
        

            if(selectedJournalEntryDuration === 'dayJournalEntries'){
                journalEntryData = await db.getAllAsync(
                    "SELECT * FROM journal_entries WHERE date(date,'localtime') = date('now','localtime')"
                );        
            }
            if(selectedJournalEntryDuration === 'weekJournalEntries'){
                journalEntryData = await db.getAllAsync(
                    "SELECT * FROM journal_entries WHERE date(date,'localtime') >= date('now', '-6 days', 'localtime') AND date('now','localtime') <= date('now', 'localtime')"
                );            
            }
            if(selectedJournalEntryDuration === 'monthJournalEntries'){
                journalEntryData = await db.getAllAsync(
                    "SELECT * FROM journal_entries WHERE date(date,'localtime') >= date('now','-1 month', 'localtime') AND date('now','localtime') <= date('now', 'localtime')"
                );        
            }
            if(selectedJournalEntryDuration === 'allTimeJournalEntries'){
                journalEntryData = await db.getAllAsync(
                    'SELECT * FROM journal_entries'
                );               
            }

        return {
            checkIns: checkInData,
            journalEntries: journalEntryData
        };
    }

    {/* Fallback Section */}
    const fallback = async (checkIns: any[], journalEntries: any[], selectedOption: string, selectedPrompt: string) => {

        {/* Explanation Fallback Section */}

        let explanation = "";
        
        let veryStressedLevelCount = 0;
        let okayStressLevelCount = 0;

        let goodMoodCount = 0;
        let tenseMoodCount = 0;
        let lowMoodCount = 0;
        let anxiousMoodCount = 0;

        let topBodyLocationCount = 0;
        let upperBodyLocationCount = 0;
        let armLocationCount = 0;
        let lowerBodyLocationCount = 0;

        let goodAmountOfSleepCount = 0;
        let lowAmountOfSleepCount = 0;

        let haveNotEatenRecentlyCount = 0;
        let haveEatenRecentlyCount = 0;

        let hardToConcentrationCount = 0;
        let easyToConcentrationCount = 0;

        let schoolCount = 0;
        let workCount = 0;
        let moneyCount = 0;
        let needTimeCount = 0;
        let relationshipCount = 0;
        let uncertaintyCount = 0;
        let healthCount = 0;
        let hardshipCount = 0;

        const basicWords = new Set(["a", "the", "to", "of", "be", "by", "but", "because", "use", "most", "take", "tell", "just", "my", "me", "i", "am", "are", "about", "and", "an", "on", "in", "it", "its", "it's", "is", "isn't", "them", "their", "they", "there", "they're", "that", "that's", "this", "do", "doing", "does", "did", "was", "were", "where", "who", "whom", "when", "with", "will", "well", "want", "therefore", "however", "how", "can", "can't", "should", "shouldn't", "would", "won't", "was", "have", "haven't", "not", "with", "without", "for", "from", "he", "his", "her", "she", "him", "lady", "sir", "man", "many", "give", "get", "day", "week", "month", "year", "matter", "journal", "entry", "works", "first", "one", "you", "you're", "believe", "catch", "really", "right"]);
        const wordCounts: Record<string, number> = {};
        let fallbackExplanation = "";

        for(let i = 0; i < checkIns.length; i++ )
        {
            const checkIn = checkIns[i];

                if(checkIn.stress_level >= 6){
                    veryStressedLevelCount++;
                }
                else{
                    okayStressLevelCount++;
                }

                if (checkIn.physical_stress_location != null && (checkIn.physical_stress_location === "jaw" || checkIn.physical_stress_location === "teeth" || checkIn.physical_stress_location === "neck" || checkIn.physical_stress_location === "shoulders/traps" || checkIn.physical_stress_location === "head")){
                    topBodyLocationCount++;
                }
                if(checkIn.physical_stress_location != null && (checkIn.physical_stress_location === "stomach" || checkIn.physical_stress_location === "chest" || checkIn.physical_stress_location === "back" || checkIn.physical_stress_location === "hips")){
                    upperBodyLocationCount++;
                }
                if(checkIn.physical_stress_location != null && (checkIn.physical_stress_location === "arms" || checkIn.physical_stress_location === "hands")){
                    armLocationCount++;
                }
                if(checkIn.physical_stress_location != null && (checkIn.physical_stress_location === "legs" || checkIn.physical_stress_location === "feet")){
                    lowerBodyLocationCount++;
                }

                if(checkIn.mood === "happy" || checkIn.mood === "calm" || checkIn.mood === "excited"){
                    goodMoodCount++;
                }
                if(checkIn.mood === "angry" || checkIn.mood === "frustrated" || checkIn.mood === "tense" ){ 
                    tenseMoodCount++;
                }
                if(checkIn.mood === "sad" || checkIn.mood === "lonely" || checkIn.mood === "bored"){
                    lowMoodCount++;
                }
                if(checkIn.mood === "nervous" || checkIn.mood === "worried" || checkIn.mood === "scared"){
                    anxiousMoodCount++;
                }


        }

        if (checkIns.length > 0){
        
            if(veryStressedLevelCount >= okayStressLevelCount){
                explanation += "- This may explain why you have been quite stressed so that can cause a lot of anguish. Your body is responding to your surroundings and the life events you are in right now. Though don't forget stress is typically temporary. Though no matter if you feel stuck, time will get you through this hardship.\n";
            }
            else{
                explanation += "- This may explain why you may still feel a bit stressed but you are still consistently doing good. Stress can be off and on but right now the stress will feel sustainable. Continue working on yourself as you deserve to feel okay.\n";
            }

            
            if (topBodyLocationCount > upperBodyLocationCount && topBodyLocationCount > armLocationCount && topBodyLocationCount > lowerBodyLocationCount){
                explanation += "- You seem to be holding a lot of your stress from your shoulders/traps and above these areas can feel really tense and tight. Try relaxing your shoulders, stretching your neck, and slowly opening and closing your mouth, this can help with the pressure, soreness, and pain.\n";
            }
            else if(upperBodyLocationCount > topBodyLocationCount && upperBodyLocationCount > armLocationCount && upperBodyLocationCount > lowerBodyLocationCount){
                explanation += "- You seem to be holding a lot of your stress in the middle of your body and this can create a lot of discomfort and make getting comfortable harder. Your lifestyle may be the result of this pain, try switching up your position and gently moving your body.\n";
            }
            else if(armLocationCount > upperBodyLocationCount && armLocationCount > topBodyLocationCount && armLocationCount > lowerBodyLocationCount){
                explanation += "- You seem to be holding a lot of your stress in your arms/hands. This could be the result of nervousness and overwork. Try finding something that can comfort you in hard times.\n";
            }
            else if(lowerBodyLocationCount > upperBodyLocationCount && lowerBodyLocationCount > armLocationCount && lowerBodyLocationCount > topBodyLocationCount){
                explanation += "- You seem to be holding a lot of your stress in your legs/feet and this could be from restlessness or anxiety. Finding an activity to do make help you to center yourself.\n";
            }
            else if(topBodyLocationCount  + upperBodyLocationCount + armLocationCount + lowerBodyLocationCount > 0  ){
                explanation += "- The places in your body where stress is present has been more all over the place. Try starting to ease one sore place at a time.\n";
            }

            if(goodMoodCount > tenseMoodCount && goodMoodCount > lowMoodCount && goodMoodCount > anxiousMoodCount){
                explanation += "- Your moods have also shown to be steadly uplifted. Your nervous system may be calming down so if possible, keep doing what are you doing to keep your mood higher like this.";
            }
            else if(tenseMoodCount > goodMoodCount && tenseMoodCount > lowMoodCount && tenseMoodCount > anxiousMoodCount){
                explanation += "- Your moods also seem to be consistently tense. Your nervous system seems to be overloaded with a lot of combining factors, try slowing down and ensuring you are taking time for yourself.";
            }
            else if(lowMoodCount > goodMoodCount && lowMoodCount > tenseMoodCount && lowMoodCount > anxiousMoodCount){
                explanation += "- Your moods were also consistenly lower. However, there is always hope to improve this mood, even if it feels hopeless at times. Take this time to reflect and sit with your emotions, I know you will get through this!";
            }
            else if(anxiousMoodCount > goodMoodCount && anxiousMoodCount > tenseMoodCount && anxiousMoodCount > lowMoodCount){
                explanation += "- Your moods were also more anxious. You may feel out of control and unsure of what you can do. Though you know that you have made out to the other side, every other time you were worried, you will be/do okay!";
            }
            else {
                explanation += "- Your moods were also a bit more over the place. Though this is not a bad thing but can reveal a change incoming. Times will always look up eventually!";
            }


        }

        for(let i = 0; i < journalEntries.length; i++ )
        {
            const journalEntry = journalEntries[i];

            if (typeof journalEntry.entry !== "string") {
                continue;
            }

            const entry = journalEntry.entry.toLowerCase();

            if(entry.includes("school") || entry.includes("homework") || entry.includes("teacher") || entry.includes("teachers") || entry.includes("assignment") || entry.includes("test") || entry.includes("quiz") || entry.includes("grade") || entry.includes("professor") || entry.includes("study")  || entry.includes("college")) {
                schoolCount++;
            }
            if(entry.includes("job") || entry.includes("co-workers") || entry.includes("coworkers") || entry.includes("career") || entry.includes("project")  || entry.includes("meeting")  || entry.includes("boss")){
                workCount++
            }
            if(entry.includes("money") || entry.includes("broke") || entry.includes("rich") || entry.includes("finances") || entry.includes("payment") || entry.includes("bill") || entry.includes("debt") || entry.includes("spend") || entry.includes("afford") || entry.includes("rent") || entry.includes("mortgage")){
                moneyCount++;
            }
            if(entry.includes("time") || entry.includes("falling behind")  || entry.includes("lost") || entry.includes("deadline") || entry.includes("waiting") || entry.includes("await") || entry.includes("big change")){
                needTimeCount++;
            }
            if(entry.includes("relationship") || entry.includes("family") || entry.includes("sister") || entry.includes("brother") || entry.includes("wife") || entry.includes("husband") || entry.includes("sibling") || entry.includes("family member")  || entry.includes("lonely")  || entry.includes("girlfriend") || entry.includes("boyfriend") || entry.includes("argument") || entry.includes("partner")){
                relationshipCount++;
            }
            if(entry.includes("uncertainty") || entry.includes("late") || entry.includes("overwhelmed") ||entry.includes("shift") || entry.includes("lack of control") || entry.includes("overthinking") || entry.includes("procrastination")){
                uncertaintyCount++;
            }
            if(entry.includes("health") || entry.includes("sick") || entry.includes("loss") || entry.includes("funeral") || entry.includes("disease")  || entry.includes("hospital") || entry.includes("cancer") || entry.includes("migraines")){
                healthCount++;
            }
            if(entry.includes("give up") || entry.includes("idk") || entry.includes("i don't care") || entry.includes("stupid") || entry.includes("horrible") || entry.includes("anymore")  || entry.includes("worst")  || entry.includes("tired")  || entry.includes("exhausted")  || entry.includes("sleep") || entry.includes("overwhelmed")){
                hardshipCount++;
            }
            
            const words = entry.match(/\b[a-z']+\b/g) || [];

            for (let j = 0; j < words.length; j++) {
                const word = words[j];

                if (basicWords.has(word) || word.length < 3) {
                    continue;
                }

                if (wordCounts[word]) {
                    wordCounts[word]++;
                } else {
                    wordCounts[word] = 1;
                }
            }

        }

        fallbackExplanation += "The Analysis Page is presenting its fallback as the AI Analysis could not be completed at this time, if you want the full experience please try again later but in the meantime here is the altered experience \n\n";


        const topWords = Object.keys(wordCounts).sort((a, b) => wordCounts[b] - wordCounts[a]).slice(0, 5);

        if (topWords.length > 0) {
            fallbackExplanation += "Some words that appear frequently in your journal are: " + topWords.join(", ") + ". ";
        }

        const topics: Record<string, number> = {
            school: schoolCount,
            work: workCount,
            money: moneyCount,
            "time management": needTimeCount,
            relationships: relationshipCount,
            uncertainty: uncertaintyCount,
            health: healthCount,
            hardship: hardshipCount
        };

        let keyTopic = "";
        let keyCount = 0;

        for (const topic in topics) {
            if (topics[topic] > keyCount) {
                keyCount = topics[topic];
                keyTopic = topic;
            }
        }

        if (keyTopic !== "") {
            fallbackExplanation += "Among the topics this fallback checks, " + keyTopic + " appears most frequently in your journal. This may be an area contributing to your stress the most. \n\n";
        }

        if (explanation.trim() !== "") {
            fallbackExplanation += explanation;
        }

        if( selectedOption === "explanation") {
            return fallbackExplanation;
        }

        {/* Activity Fallback Section */}

        let random = Math.floor(Math.random() * (10)) + 1;
        let activity = "";

        if(random === 1){
            activity += "Try a simple breathing exercise. Box breathing can help calm down your nerves and mind. Start by inhaling for 4 seconds then holding that breath for 4 seconds, then exhale for 4 seconds and hold for 4 seconds again. Repeat this 4 times.";
        }
        if(random === 2){
            activity += "Sit down or get up slowly. Roll you shoulders back then gently and slowly inhale and exhale. Start placing your favorite song and sit there for a second taking it in.";
        }
        if(random === 3){
            activity += "Find an area on the ground or your bed and slowly start to gently stretch. Touching your feet or stretching your arms. Move your head from side to side and roll it around slowly. Contuine doing gentle stretches of your choice for 5 minutes.";
        }
        if(random === 4){
            activity += "If possible find a piece of paper, it can even be digital. Grab a pencil and draw what is on your mind. It doesn't have to look good or make sense. It can be scribbles or even abstract. Start right away, there doesn't need to be a plan.";
        }
        if(random === 5){
            activity += "If possible go outside for 5 minutes and just breathe and watch the clouds, birds, or stars. You can walk around, stand, or just sit there. Pretend for one second time doesn't exist.";
        }
        if(random === 6){
            activity += "Turn off all electronics and just lay down. Stare at the ceiling and wash away your thoughts and when your thoughts are gone wait until you know you are okay to get back up again";
        }
        if(random === 7){
            activity += "If possible, find someone to talk to even if it's just a pet, plant, or stuffed animal. Talk out what is causing you this stress and how you feel.";
        }
        if(random === 8){
            activity += "Listen to environment sounds such as an ocean, birds chirping, or trees rustling, or listen to a classical music playlist with soft instruments. ";
        }
        if(random === 9){
            activity += "Do your favorite physical activity. It can be a slow walk, a run, dancing, or even weight lifting. This can help ease your nerves and redirect your energy.";
        }
        if(random === 10){
            activity += "Ground yourself. Start by finding 5 things you can see then 4 things you can touch, 3 things you can hear around you, 2 things that you can smeel, and 1 thing that you can taste. These can all be really simple but they can help ground your senses and mind.";
        }

        if(selectedOption === "activities"){
            return activity;
        }

        {/* Both Explanation and Activity Fallback Section */}

        if(selectedOption === "both") {
            return fallbackExplanation + "\n\n" + activity;
        }

        return fallbackExplanation;

    }

    {/* AI Analysis Section */}
    const generateAnalysis = async () => {

        if (!selectedOption || !selectedPrompt) {
            setAnalysisError('Choose an analysis type and prompt first.');
            return;
        }
        
        let checkIns: any[] = [];
        let journalEntries: any[] = [];
        
        if((!selectedCheckInDataOption && !selectedCheckInDuration) || (selectedCheckInDataOption === 'checkIns' && !selectedCheckInDuration) || (selectedJournalEntryDataOption === 'journalEntries' && !selectedJournalEntryDuration)){
            setAnalysisError("Select at least one duration from a least one of the sections: Check-ins or Journal Entries");
            return;
        }

        setIsLoading(true);
        setAnalysis(null);
        setAnalysisError(null);

        try {

            const selectedData = await selectData (selectedCheckInDataOption ?? '', selectedJournalEntryDataOption ?? '', selectedCheckInDuration ?? '', selectedJournalEntryDuration ?? '');

            checkIns = selectedData.checkIns;
            journalEntries = selectedData.journalEntries;

            if (checkIns.length === 0 && journalEntries.length === 0) {
                setAnalysisError("There is no data available for the duration selected. Please either select a different duration or adding in a check-in or journal entry.");
                return;
            }
            //throw new Error("Testing fallback");

            const { data, error } = await supabase.functions.invoke<{ output: string }>(
                "sendAnalysis",
                { body: { analysisType: selectedOption, promptId: selectedPrompt, checkIns: checkIns, journalEntries: journalEntries } },
            );

            if (error instanceof FunctionsRelayError) {
                throw new Error(
                    "Supabase could not relay the request to the analysis function. " +
                    "This can happen even when the relay response itself shows HTTP 200. Please retry.",
                );
            }

            if (error instanceof FunctionsFetchError) {
                throw new Error("Could not reach the analysis function. Check your connection and retry.");
            }

            if (error instanceof FunctionsHttpError) {
                const response = error.context;
                let details = "";

                if (response instanceof Response) {
                    const body = await response.text();
                    try {
                        const payload: unknown = JSON.parse(body);
                        if (payload && typeof payload === "object" && "error" in payload &&
                            typeof payload.error === "string") {
                            details = payload.error;
                            if ("upstreamStatus" in payload && typeof payload.upstreamStatus === "number") {
                                details += ` (Gemini HTTP ${payload.upstreamStatus})`;
                            }
                        } else {
                            details = body;
                        }
                    } catch {
                        details = body;
                    }
                }

                throw new Error(
                    `${error.message} (${response instanceof Response ? response.status : "unknown"})` +
                    `${details ? `: ${details}` : ""}`,
                );
            }

            if (error) {
                throw error;
            }
            if (!data) {
                throw new Error("The analysis function returned no data.");
            }
            if (typeof data.output !== 'string' || !data.output.trim()) {
                throw new Error("The analysis function returned an empty response.");
            }

            setAnalysis(data.output);
        } catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            console.log("Gemini AI API has failed the fallback is being used: ", message)

            const fallbackResult = await fallback(checkIns, journalEntries, selectedOption, selectedPrompt);
            setAnalysis(fallbackResult);
            setAnalysisError(null);

        } finally {
            setIsLoading(false);
        }
    };

  return (
    <ScrollView
        style={style.container}
        contentContainerStyle={style.contentContainer}
    >

        <Text style={style.title}>Would you like to analyze your stress?</Text>

        {/* Selection options for prompt type */}
        <Pressable style={style.radio} onPress={() => selectAnalysisType('explanation')}>
            <View style={style.radioCircle}>
                {selectedOption === 'explanation' && <View style={style.radioCircleSelected} />}
            </View>
            <Text style={style.radioText}>Explain the Stress</Text>
        </Pressable>
        <Pressable style={style.radio} onPress={() => selectAnalysisType('activities')}>
            <View style={style.radioCircle}>
                {selectedOption === 'activities' && <View style={style.radioCircleSelected} />}
            </View>
            <Text style={style.radioText}>Suggest Destressing Activities</Text>
        </Pressable>
        <Pressable style={style.radio} onPress={() => selectAnalysisType('both')}>
            <View style={style.radioCircle}>
                {selectedOption === 'both' && <View style={style.radioCircleSelected} />}
            </View>
            <Text style={style.radioText}>Both</Text>
        </Pressable>

        {/* Prompt options based on the selected analysis type */}
        {/* Explanation prompts */}
        {selectedOption === 'explanation' && (
            <View style={style.prompts}>
                <Text style={style.promptText}>Explanation Prompts</Text>
                    <Pressable
                        style={[style.radio, { width: '100%' }]}
                        onPress={() => setSelectedPrompt('explanation1')}
                    >
                        <View style={style.radioCircle}>
                            {selectedPrompt === 'explanation1' && (
                                <View style={style.radioCircleSelected} />
                            )}
                        </View>
                        <Text style={style.radioText}>Explain briefly and simply what the reported stress and mood may suggest.</Text>
                    </Pressable>

                    <Pressable
                        style={[style.radio, { width: '100%' }]}
                        onPress={() => setSelectedPrompt('explanation2')}
                    >
                        <View style={style.radioCircle}>
                            {selectedPrompt === 'explanation2' && (
                                <View style={style.radioCircleSelected} />
                            )}
                        </View>
                        <Text style={style.radioText}>Explain how the physical feelings and daily patterns may suggest and relate to the reported stress and mood.</Text>
                    </Pressable>

                    <Pressable
                        style={[style.radio, { width: '100%' }]}
                        onPress={() => setSelectedPrompt('explanation3')}
                    >
                        <View style={style.radioCircle}>
                            {selectedPrompt === 'explanation3' && (
                                <View style={style.radioCircleSelected} />
                            )}
                        </View>
                        <Text style={style.radioText}>Explain what the progression and patterns of stress and mood may suggest and how to help it.</Text>
                    </Pressable>

                {selectedPrompt === 'explanation1' && (
                    <Text style={style.promptText}>You have chosen Explanation Prompt 1</Text>
                )}
                {selectedPrompt === 'explanation2' && (
                    <Text style={style.promptText}>You have chosen Explanation Prompt 2</Text>
                )}
                {selectedPrompt === 'explanation3' && (
                    <Text style={style.promptText}>You have chosen Explanation Prompt 3</Text>
                )}
            </View>
        )}
        {/* Activities prompts */}
        {selectedOption === 'activities' && (
            <View style={style.prompts}>
                <Text style={style.promptText}>Activities Prompts</Text>
                    <Pressable
                        style={[style.radio, { width: '100%' }]}
                        onPress={() => setSelectedPrompt('activities1')}
                    >
                        <View style={style.radioCircle}>
                            {selectedPrompt === 'activities1' && (
                                <View style={style.radioCircleSelected} />
                            )}
                        </View>
                        <Text style={style.radioText}>Suggest one simple and quick activity based on the reported stress.</Text>
                    </Pressable>

                    <Pressable
                        style={[style.radio, { width: '100%' }]}
                        onPress={() => setSelectedPrompt('activities2')}
                    >
                        <View style={style.radioCircle}>
                            {selectedPrompt === 'activities2' && (
                                <View style={style.radioCircleSelected} />
                            )}
                        </View>
                        <Text style={style.radioText}>Suggest one activity based on the reported physical feelings.</Text>
                    </Pressable>

                    <Pressable
                        style={[style.radio, { width: '100%' }]}
                        onPress={() => setSelectedPrompt('activities3')}
                    >
                        <View style={style.radioCircle}>
                            {selectedPrompt === 'activities3' && (
                                <View style={style.radioCircleSelected} />
                            )}
                        </View>
                        <Text style={style.radioText}>Suggest a longer activity to do that will make the most impact on the reported stress.</Text>
                    </Pressable>

                {selectedPrompt === 'activities1' && (
                    <Text style={style.promptText}>You have chosen Activities Prompt 1</Text>
                )}
                {selectedPrompt === 'activities2' && (
                    <Text style={style.promptText}>You have chosen Activities Prompt 2</Text>
                )}
                {selectedPrompt === 'activities3' && (
                    <Text style={style.promptText}>You have chosen Activities Prompt 3</Text>
                )}
            </View>
        )}
        {/* Both prompts */}
        {selectedOption === 'both' && (
            <View style={style.prompts}>
                <Text style={style.promptText}>Both Prompts</Text>
                    <Pressable
                        style={[style.radio, { width: '100%' }]}
                        onPress={() => setSelectedPrompt('both1')}
                    >
                        <View style={style.radioCircle}>
                            {selectedPrompt === 'both1' && (
                                <View style={style.radioCircleSelected} />
                            )}
                        </View>
                        <Text style={style.radioText}>Pair a brief explanation on the reported stress with one simple activity.</Text>
                    </Pressable>

                    <Pressable
                        style={[style.radio, { width: '100%' }]}
                        onPress={() => setSelectedPrompt('both2')}
                    >
                        <View style={style.radioCircle}>
                            {selectedPrompt === 'both2' && (
                                <View style={style.radioCircleSelected} />
                            )}
                        </View>
                        <Text style={style.radioText}>Pair a moderate length explanation on the reported stress with an average length activity.</Text>
                    </Pressable>

                    <Pressable
                        style={[style.radio, { width: '100%' }]}
                        onPress={() => setSelectedPrompt('both3')}
                    >
                        <View style={style.radioCircle}>
                            {selectedPrompt === 'both3' && (
                                <View style={style.radioCircleSelected} />
                            )}
                        </View>
                        <Text style={style.radioText}>Pair a longer explanation on the reported stress with one longer activity.</Text>
                    </Pressable>

                {selectedPrompt === 'both1' && (
                    <Text style={style.promptText}>You have chosen Both Prompt 1</Text>
                )}
                {selectedPrompt === 'both2' && (
                    <Text style={style.promptText}>You have chosen Both Prompt 2</Text>
                )}
                {selectedPrompt === 'both3' && (
                    <Text style={style.promptText}>You have chosen Both Prompt 3</Text>
                )}
            </View>
        )}

        <Text style={style.header}>Select Past Responses To Base The Analysis On</Text>

        <View style={style.selectDataButtons}>
            <Pressable style={[style.button, {flex: 1}]} onPress={() => selectCheckInsForAnalysis('checkIns')}>
                <Text style={style.buttonText}>Select Check-Ins</Text>
            </Pressable>

            <Pressable style={[style.button, {flex: 1}]} onPress={() => selectJournalEntriesForAnalysis('journalEntries')}>
                <Text style={style.buttonText}>Select Journal Entries</Text>
            </Pressable>
        </View>

        <View style={style.selectDataColumns}>
        <View style={style.dataSection}>
        {selectedCheckInDataOption === 'checkIns' && (
            <>
                <Pressable
                    style={[style.radio]}
                    onPress={() => setSelectedCheckInDuration('dayCheckIns')}
                >
                    <View style={style.radioCircle}>
                        {selectedCheckInDuration === 'dayCheckIns' && (
                            <View style={style.radioCircleSelected} />
                        )}
                    </View>
                    <Text style={style.radioText}>Day</Text>
                </Pressable>

                <Pressable
                    style={[style.radio]}
                    onPress={() => setSelectedCheckInDuration('weekCheckIns')}
                >
                    <View style={style.radioCircle}>
                        {selectedCheckInDuration === 'weekCheckIns' && (
                            <View style={style.radioCircleSelected} />
                        )}
                    </View>
                    <Text style={style.radioText}>Week</Text>
                </Pressable>

                <Pressable
                    style={[style.radio]}
                    onPress={() => setSelectedCheckInDuration('monthCheckIns')}
                >
                    <View style={style.radioCircle}>
                        {selectedCheckInDuration === 'monthCheckIns' && (
                            <View style={style.radioCircleSelected} />
                        )}
                    </View>
                    <Text style={style.radioText}>Month</Text>
                </Pressable>

                <Pressable
                    style={[style.radio]}
                    onPress={() => setSelectedCheckInDuration('allTimeCheckIns')}
                >
                    <View style={style.radioCircle}>
                        {selectedCheckInDuration === 'allTimeCheckIns' && (
                            <View style={style.radioCircleSelected} />
                        )}
                    </View>
                    <Text style={style.radioText}>All Time</Text>
                </Pressable>
            
            </>

        )}
</View>
        <View style={style.dataSection}>
            {selectedJournalEntryDataOption === 'journalEntries' && (
                <>
                <Pressable
                    style={[style.radio]}
                    onPress={() => setSelectedJournalEntryDuration('dayJournalEntries')}
                >
                    <View style={style.radioCircle}>
                        {selectedJournalEntryDuration === 'dayJournalEntries' && (
                            <View style={style.radioCircleSelected} />
                        )}
                    </View>
                    <Text style={style.radioText}>Day</Text>
                </Pressable>

                <Pressable
                    style={[style.radio]}
                    onPress={() => setSelectedJournalEntryDuration('weekJournalEntries')}
                >
                    <View style={style.radioCircle}>
                        {selectedJournalEntryDuration === 'weekJournalEntries' && (
                            <View style={style.radioCircleSelected} />
                        )}
                    </View>
                    <Text style={style.radioText}>Week</Text>
                </Pressable>

                <Pressable
                    style={[style.radio]}
                    onPress={() => setSelectedJournalEntryDuration('monthJournalEntries')}
                >
                    <View style={style.radioCircle}>
                        {selectedJournalEntryDuration === 'monthJournalEntries' && (
                            <View style={style.radioCircleSelected} />
                        )}
                    </View>
                    <Text style={style.radioText}>Month</Text>
                </Pressable>

                <Pressable
                    style={[style.radio]}
                    onPress={() => setSelectedJournalEntryDuration('allTimeJournalEntries')}
                >
                    <View style={style.radioCircle}>
                        {selectedJournalEntryDuration === 'allTimeJournalEntries' && (
                            <View style={style.radioCircleSelected} />
                        )}
                    </View>
                    <Text style={style.radioText}>All Time</Text>
                </Pressable>
                </>
            )}
        </View>
</View>

        <Pressable
            disabled={isLoading}
            style={[style.generateButton, isLoading && style.generateButtonDisabled]}
            onPress={generateAnalysis}
        >
            <Text style={style.generateButtonText}>
                {isLoading ? 'Generating...' : 'Generate Analysis'}
            </Text>
        </Pressable>
        {analysis && <Text style={style.result}>{analysis}</Text>}
        {analysisError && <Text style={style.error}>{analysisError}</Text>}
    </ScrollView>

    
  );
};

