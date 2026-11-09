import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { BarChart, LineChart, PieChart } from 'react-native-gifted-charts';
import style from '../style';
import { getTrendData } from '../src/lib/overviewData';

type CheckIn = {
    date: string;
    stress_level: number;
    mood: string;
    physical_stress_location: string | null;
    physical_symptoms: string | null;
    hours_slept: number;
    water_consumed: number;
    eaten_recently: number;
    concentration_level: number;
    stress_cause: string | null;
    stress_duration: number | null;
};

function toLocalDateString(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export default function Overview() {
    const db = useSQLiteContext();
    const [checkIns, setCheckIns] = useState<CheckIn[]>([]);
    const [view, setView] = useState<'month' | 'year'>('month');
    const [selectedDate, setSelectedDate] = useState(() => new Date());
    const [loadError, setLoadError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    

    useEffect(() => {
        let isCurrent = true;
        let loadingTimer: ReturnType<typeof setTimeout> | null = null;

        async function loadCheckIns() {
            setIsLoading(true);
            setShowLoading(false);
            loadingTimer = setTimeout(() => {
                if (isCurrent) {
                    setShowLoading(true);
                }
            }, 1000);

            const year = selectedDate.getFullYear();
            const month = selectedDate.getMonth();
            let startDate: Date;
            let endDate: Date;

            if (view === 'year') {
                startDate = new Date(year, 0, 1);
                endDate = new Date(year + 1, 0, 1);
            } else {
                startDate = new Date(year, month, 1);
                endDate = new Date(year, month + 1, 1);
            }

            try {
                
                const rows = await db.getAllAsync<CheckIn>(
                    `SELECT * FROM check_ins WHERE date(date, 'localtime') >= ? AND date(date, 'localtime') < ? ORDER BY date ASC`,
                    [toLocalDateString(startDate), toLocalDateString(endDate)],
                );
                if (!isCurrent) {
                    return;
                }

                setCheckIns(rows);
                setLoadError(null);

            } catch (error: unknown) {
                console.error('Could not load check-ins for Overview.', error);
                if (isCurrent) {
                    setLoadError('Could not load check-ins. Please try again.');
                }
            } finally {
                if (isCurrent) {
                    if (loadingTimer !== null) {
                        clearTimeout(loadingTimer);
                    }
                    setIsLoading(false);
                    setShowLoading(false);
                }
            }
        }
        loadCheckIns();

        return () => {
            isCurrent = false;
            if (loadingTimer !== null) {
                clearTimeout(loadingTimer);
            }
        };
    }, [db, selectedDate, view]);

    const navigatePeriod = (direction: number) => {
        setSelectedDate((current) => {
            if (view === 'month') {
                return new Date(current.getFullYear(), current.getMonth() + direction, 1);
            }
            return new Date(current.getFullYear() + direction, current.getMonth(), 1);
        });
    };

    let periodLabel: string;

    if (view === 'month') {
        periodLabel = selectedDate.toLocaleDateString(undefined, { month: 'long', year: 'numeric' });
    } else {
        periodLabel = String(selectedDate.getFullYear());
    }

    const stressChartData = getTrendData(checkIns, view, (item) => item.stress_level);
    const concentrationChartData = getTrendData(checkIns, view, (item) => item.concentration_level);
    const stressDurationChartData = getTrendData(checkIns, view, (item) => item.stress_duration);
    const stressDurationStep = Math.max(1, Math.ceil(Math.max(0, ...stressDurationChartData.map((item) => item.value)) / 5),);

    const moodCounts = checkIns.reduce<Record<string, number>>((counts, item) => {
        
        if (counts[item.mood] === undefined) {
            counts[item.mood] = 1;
        } else {
            counts[item.mood] += 1;
        }
        return counts;
    }, {});
    const moodChartData = Object.entries(moodCounts).map(([mood, count]) => ({ label: mood, value: count }));

    const physicalStressLocationCounts = checkIns.reduce<Record<string, number>>((counts, item) => {
        
        if (item.physical_stress_location == null) {
            return counts;
        }

        if (counts[item.physical_stress_location] === undefined) {
            counts[item.physical_stress_location] = 1;
        } else {
            counts[item.physical_stress_location] += 1;
        }
        return counts;
    }, {});
    const physicalStressLocationChartData = Object.entries(physicalStressLocationCounts).map(([location, count]) => ({ label: location, value: count }));

    const physicalSymptomsCounts = checkIns.reduce<Record<string, number>>((counts, item) => {
        
        if (item.physical_symptoms == null) {
            return counts;
        }

        if (counts[item.physical_symptoms] === undefined) {
            counts[item.physical_symptoms] = 1;
        } else {
            counts[item.physical_symptoms] += 1;
        }
        return counts;
    }, {});
    const physicalSymptomsChartData = Object.entries(physicalSymptomsCounts).map(([symptom, count]) => ({ label: symptom, value: count }));
    
    const hoursSleptChartData = getTrendData(checkIns, view, (item) => item.hours_slept);
    const waterIntakeChartData = getTrendData(checkIns, view, (item) => item.water_consumed);

    const eatenRecentlyCounts = checkIns.reduce(
        (counts, item) => {
            if (item.eaten_recently === 1) {
                counts.Yes += 1;
            } else {
                counts.No += 1;
            }

            return counts;
        },
        { Yes: 0, No: 0 },
    );
    const eatenRecentlyCategories = [
        { label: 'Yes', value: eatenRecentlyCounts.Yes, color: '#96d1aa' },
        { label: 'No', value: eatenRecentlyCounts.No, color: '#099197' },
    ];
    const eatenRecentlyChartData = eatenRecentlyCategories
        .filter(({ value }) => value > 0)
        .map(({ value, color }) => ({ value, color }));

    const stressCauseCounts = checkIns.reduce<Record<string, number>>((counts, item) => {
        
        if (item.stress_cause == null) {
            return counts;
        }
        
        if (counts[item.stress_cause] === undefined) {
            counts[item.stress_cause] = 1;
        } else {
            counts[item.stress_cause] += 1;
        }
        return counts;
    }, {});
    const causeChartData = Object.entries(stressCauseCounts).map(([cause, count]) => ({ label: cause, value: count }));

    const chartViewportWidth = Dimensions.get('window').width - 56;

    return (
        <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={[style.container, { backgroundColor: '#b71f57' }]}
            contentContainerStyle={[style.contentContainer, { alignItems: 'stretch', paddingHorizontal: 7 }]}
            indicatorStyle="white"
        >
            <View style={[style.selectDataButtons, { alignItems: 'center', justifyContent: 'center' }]}>
                <Pressable style={[style.button, { backgroundColor: '#099197' }]} onPress={() => setView('month')}>
                    <Text style={style.buttonText}>Month</Text>
                </Pressable>
                <Pressable style={[style.button, { backgroundColor: '#099197' }]} onPress={() => setView('year')}>
                    <Text style={style.buttonText}>Year</Text>
                </Pressable>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 12 }}>
                <Pressable style={[style.button, { backgroundColor: '#099197' }]} onPress={() => navigatePeriod(-1)} accessibilityLabel={`Previous ${view}`}>
                    <Text style={style.buttonText}>‹</Text>
                </Pressable>
                <Text style={[style.header, { marginHorizontal: 16 }]}>{periodLabel}</Text>
                <Pressable style={[style.button, { backgroundColor: '#099197' }]} onPress={() => navigatePeriod(1)} accessibilityLabel={`Next ${view}`}>
                    <Text style={style.buttonText}>›</Text>
                </Pressable>
            </View>
            

            {showLoading ? (
                <>
                    <ActivityIndicator size="large" color="#099197" />
                    <Text style={{ textAlign: 'center', fontSize: 16 }}>Loading Check-In Response Graphs...</Text>
                </>
            ) : isLoading ? null : loadError ? (
                <Text style={style.error}>Something went wrong, please try again in a little bit.</Text>
            ) : checkIns.length === 0 ? (
                <Text style={{ textAlign: 'center', fontSize: 16 }}>No check-ins for this period.</Text>
            ) : (
                <>
                    <View style={{ width: '100%', marginVertical: 0, alignItems: 'center' }}>
                        <Text style={style.header}>Stress Level</Text>
                        {stressChartData.length === 0 ? (
                            <Text style={{ textAlign: 'center', fontSize: 16 }}>No stress data for this period.</Text>
                        ) : (
                            <LineChart
                                data={stressChartData}
                                width={chartViewportWidth}
                                parentWidth={chartViewportWidth}
                                initialSpacing={12}
                                endSpacing={6}
                                nestedScrollEnabled
                                spacing={52}
                                height={240}
                                maxValue={10}
                                overflowTop={10}
                                noOfSections={5}
                                stepValue={2}
                                color="#96d1aa"
                                dataPointsColor="#099197"
                                thickness={3}
                                dataPointsRadius={5}
                                curved
                                xAxisColor="#96d1aa"
                                yAxisColor="#96d1aa"
                                xAxisThickness={1}
                                yAxisThickness={1}
                                rulesColor="#496b63"
                                rulesThickness={1}
                                yAxisTextStyle={{ color: '#ffffff' }}
                                xAxisLabelTextStyle={{ color: '#ffffff', fontSize: 11 }}
                                backgroundColor="#112f2c"
                            />
                        )}
                    </View>
                    <View style={{ width: '100%', marginVertical: 0, alignItems: 'center' }}>
                        <Text style={style.header}>Mood</Text>
                        {moodChartData.length === 0 ? (
                            <Text style={{ textAlign: 'center', fontSize: 16 }}>No mood data for this period.</Text>
                            ) : (
                                <BarChart
                                    data={moodChartData}
                                    width={chartViewportWidth}
                                    parentWidth={chartViewportWidth}
                                    nestedScrollEnabled
                                    height={240}
                                    barWidth={55}
                                    spacing={27}
                                    initialSpacing={5}
                                    endSpacing={5}
                                    frontColor="#099197"
                                    barBorderRadius={6}
                                    showValuesAsTopLabel
                                    topLabelTextStyle={{ color: '#ffffff', fontSize: 12 }}
                                    xAxisColor="#96d1aa"
                                    yAxisColor="#96d1aa"
                                    xAxisThickness={1}
                                    yAxisThickness={1}
                                    rulesColor="#496b63"
                                    rulesThickness={1}
                                    yAxisTextStyle={{ color: '#ffffff' }}
                                    xAxisLabelTextStyle={{ color: '#ffffff', fontSize: 11 }}
                                    xAxisTextNumberOfLines={2}
                                    xAxisLabelsHeight={37}
                                    labelWidth={60}
                                    backgroundColor="#112f2c"
                                    hideRules={false}
                                />
                        )}
                    </View>
                    <View style={{ width: '100%', marginVertical: 0, alignItems: 'center' }}>
                        <Text style={style.header}>Physical Stress Location</Text>
                        {physicalStressLocationChartData.length === 0 ? (
                            <Text style={{ textAlign: 'center', fontSize: 16 }}>No physical stress location data for this period.</Text>
                        ) : (
                            <BarChart
                                    data={physicalStressLocationChartData}
                                width={chartViewportWidth}
                                parentWidth={chartViewportWidth}
                                    nestedScrollEnabled
                                    height={240}
                                    barWidth={55}
                                    spacing={27}
                                    initialSpacing={5}
                                    endSpacing={5}
                                    frontColor="#96d1aa"
                                    barBorderRadius={6}
                                    showValuesAsTopLabel
                                    topLabelTextStyle={{ color: '#ffffff', fontSize: 12 }}
                                    xAxisColor="#96d1aa"
                                    yAxisColor="#96d1aa"
                                    xAxisThickness={1}
                                    yAxisThickness={1}
                                    rulesColor="#496b63"
                                    rulesThickness={1}
                                    yAxisTextStyle={{ color: '#ffffff' }}
                                    xAxisLabelTextStyle={{ color: '#ffffff', fontSize: 11 }}
                                    xAxisTextNumberOfLines={2}
                                    xAxisLabelsHeight={37}
                                    labelWidth={60}
                                    backgroundColor="#112f2c"
                                />
                        )}
                    </View>
                    <View style={{ width: '100%', marginVertical: 0, alignItems: 'center' }}>
                        <Text style={style.header}>Physical Symptoms</Text>
                        {physicalSymptomsChartData.length === 0 ? (
                            <Text style={{ textAlign: 'center', fontSize: 16 }}>No physical symptoms data for this period.</Text>
                        ) : (
                            <BarChart
                                    data={physicalSymptomsChartData}
                                width={chartViewportWidth}
                                parentWidth={chartViewportWidth}
                                    nestedScrollEnabled
                                    height={240}
                                    barWidth={55}
                                    spacing={27}
                                    initialSpacing={5}
                                    endSpacing={5}
                                    frontColor="#099197"
                                    barBorderRadius={6}
                                    showValuesAsTopLabel
                                    topLabelTextStyle={{ color: '#ffffff', fontSize: 12 }}
                                    xAxisColor="#96d1aa"
                                    yAxisColor="#96d1aa"
                                    xAxisThickness={1}
                                    yAxisThickness={1}
                                    rulesColor="#496b63"
                                    rulesThickness={1}
                                    yAxisTextStyle={{ color: '#ffffff' }}
                                    xAxisLabelTextStyle={{ color: '#ffffff', fontSize: 11 }}
                                    xAxisTextNumberOfLines={2}
                                    xAxisLabelsHeight={37}
                                    labelWidth={60}
                                    backgroundColor="#112f2c"
                                />
                        )}
                    </View>
                    <View style={{ width: '100%', marginVertical: 0, alignItems: 'center' }}>
                        <Text style={style.header}>Hours Slept</Text>
                        {hoursSleptChartData.length === 0 ? (
                            <Text style={{ textAlign: 'center', fontSize: 16 }}>No hours slept data for this period.</Text>
                        ) : (
                            <BarChart
                                    data={hoursSleptChartData}
                                width={chartViewportWidth}
                                parentWidth={chartViewportWidth}
                                    nestedScrollEnabled
                                    height={240}
                                    barWidth={55}
                                    spacing={27}
                                    initialSpacing={5}
                                    endSpacing={5}
                                    frontColor="#96d1aa"
                                    barBorderRadius={6}
                                    showValuesAsTopLabel
                                    topLabelTextStyle={{ color: '#ffffff', fontSize: 12 }}
                                    xAxisColor="#96d1aa"
                                    yAxisColor="#96d1aa"
                                    xAxisThickness={1}
                                    yAxisThickness={1}
                                    rulesColor="#496b63"
                                    rulesThickness={1}
                                    yAxisTextStyle={{ color: '#ffffff' }}
                                    xAxisLabelTextStyle={{ color: '#ffffff', fontSize: 11 }}
                                    xAxisTextNumberOfLines={2}
                                    xAxisLabelsHeight={37}
                                    labelWidth={60}
                                    backgroundColor="#112f2c"
                                />
                        )}
                    </View>
                    <View style={{ width: '100%', marginVertical: 0, alignItems: 'center' }}>
                        <Text style={style.header}>Water Intake</Text>
                        {waterIntakeChartData.length === 0 ? (
                            <Text style={{ textAlign: 'center', fontSize: 16 }}>No water intake data for this period.</Text>
                            ) : (
                                <BarChart
                                    data={waterIntakeChartData}
                                    width={chartViewportWidth}
                                    parentWidth={chartViewportWidth}
                                    nestedScrollEnabled
                                    height={240}
                                    barWidth={55}
                                    spacing={27}
                                    initialSpacing={5}
                                    endSpacing={5}
                                    frontColor="#099197"
                                    barBorderRadius={6}
                                    showValuesAsTopLabel
                                    topLabelTextStyle={{ color: '#ffffff', fontSize: 12 }}
                                    xAxisColor="#96d1aa"
                                    yAxisColor="#96d1aa"
                                    xAxisThickness={1}
                                    yAxisThickness={1}
                                    rulesColor="#496b63"
                                    rulesThickness={1}
                                    yAxisTextStyle={{ color: '#ffffff' }}
                                    xAxisLabelTextStyle={{ color: '#ffffff', fontSize: 11 }}
                                    xAxisTextNumberOfLines={2}
                                    xAxisLabelsHeight={37}
                                    labelWidth={60}
                                    backgroundColor="#112f2c"
                                />
                        )}
                    </View>
                    <View style={{ width: '100%', marginVertical: 0, alignItems: 'center' }}>
                        <Text style={style.header}>Eaten Recently</Text>
                        {eatenRecentlyChartData.length === 0 ? (
                            <Text style={{ textAlign: 'center', fontSize: 16 }}>No eaten recently data for this period.</Text>
                        ) : (
                            <View style={{ width: chartViewportWidth, alignItems: 'center', backgroundColor: '#112f2c', padding: 16, borderRadius: 12 }}>
                            <PieChart
                                data={eatenRecentlyChartData}
                                radius={88}
                                donut
                                innerRadius={54}
                                innerCircleColor="#112f2c"
                                backgroundColor="#112f2c"
                                centerLabelComponent={() => (
                                    <View style={{ alignItems: 'center' }}>
                                        <Text style={{ color: '#ffffff', fontSize: 24, fontWeight: 'bold' }}>{checkIns.length}</Text>
                                        <Text style={{ color: '#ffffff', fontSize: 12 }}>check-ins</Text>
                                    </View>
                                )}
                            />
                            <View style={{ flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', gap: 20, marginTop: 16 }}>
                                {eatenRecentlyCategories.map(({ label, value, color }) => (
                                    <View key={label} style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                                        <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: color }} />
                                        <Text style={{ color: '#ffffff' }}>{label}: {value}</Text>
                                    </View>
                                ))}
                            </View>
                            </View>
                        )}
                    </View>
                    <View style={{ width: '100%', marginVertical: 0, alignItems: 'center' }}>
                        <Text style={style.header}>Concentration Level</Text>
                        {concentrationChartData.length === 0 ? (
                            <Text style={{ textAlign: 'center', fontSize: 16 }}>No concentration data for this period.</Text>
                        ) : (
                            <LineChart
                                data={concentrationChartData}
                                width={chartViewportWidth}
                                parentWidth={chartViewportWidth}
                                initialSpacing={12}
                                endSpacing={7}
                                nestedScrollEnabled
                                spacing={52}
                                height={240}
                                maxValue={10}
                                overflowTop={10}
                                noOfSections={5}
                                stepValue={2}
                                color="#96d1aa"
                                dataPointsColor="#099197"
                                thickness={3}
                                dataPointsRadius={5}
                                curved
                                xAxisColor="#96d1aa"
                                yAxisColor="#96d1aa"
                                xAxisThickness={1}
                                yAxisThickness={1}
                                rulesColor="#496b63"
                                rulesThickness={1}
                                yAxisTextStyle={{ color: '#ffffff' }}
                                xAxisLabelTextStyle={{ color: '#ffffff', fontSize: 11 }}
                                backgroundColor="#112f2c"
                            />
                        )}
                    </View>
                    <View style={{ width: '100%', marginVertical: 0, alignItems: 'center' }}>
                        <Text style={style.header}>Stress Cause</Text>
                        {causeChartData.length === 0 ? (
                            <Text style={{ textAlign: 'center', fontSize: 16 }}>No stress cause data for this period.</Text>
                        ) : (
                                <BarChart
                                    data={causeChartData}
                                    width={chartViewportWidth}
                                    parentWidth={chartViewportWidth}
                                    nestedScrollEnabled
                                    height={240}
                                    barWidth={55}
                                    spacing={27}
                                    initialSpacing={5}
                                    endSpacing={5}
                                    frontColor="#96d1aa"
                                    barBorderRadius={6}
                                    showValuesAsTopLabel
                                    topLabelTextStyle={{ color: '#ffffff', fontSize: 12 }}
                                    xAxisColor="#96d1aa"
                                    yAxisColor="#96d1aa"
                                    xAxisThickness={1}
                                    yAxisThickness={1}
                                    rulesColor="#496b63"
                                    rulesThickness={1}
                                    yAxisTextStyle={{ color: '#ffffff' }}
                                    xAxisLabelTextStyle={{ color: '#ffffff', fontSize: 11 }}
                                    xAxisTextNumberOfLines={2}
                                    xAxisLabelsHeight={37}
                                    labelWidth={60}
                                    backgroundColor="#112f2c"
                                />
                        )}
                    </View>
                        <View style={{ width: '100%', marginVertical: 0, alignItems: 'center' }}>
                        <Text style={style.header}>Stress Duration</Text>
                        {stressDurationChartData.length === 0 ? (
                            <Text style={{ textAlign: 'center', fontSize: 16 }}>No stress duration data for this period.</Text>
                        ) : (
                            <LineChart
                                data={stressDurationChartData}
                                width={chartViewportWidth}
                                parentWidth={chartViewportWidth}
                                initialSpacing={12}
                                endSpacing={6}
                                nestedScrollEnabled
                                height={240}
                                maxValue={stressDurationStep * 5}
                                overflowTop={10}
                                noOfSections={5}
                                stepValue={stressDurationStep}
                                color="#96d1aa"
                                dataPointsColor="#099197"
                                thickness={3}
                                dataPointsRadius={5}
                                curved
                                xAxisColor="#96d1aa"
                                yAxisColor="#96d1aa"
                                xAxisThickness={1}
                                yAxisThickness={1}
                                rulesColor="#496b63"
                                rulesThickness={1}
                                yAxisTextStyle={{ color: '#ffffff' }}
                                xAxisLabelTextStyle={{ color: '#ffffff', fontSize: 11 }}
                                backgroundColor="#112f2c"
                            />
                        )}
                    </View>
                </>
            )}

            <View style={[style.selectDataButtons, { alignItems: 'center', justifyContent: 'center' }]}>
                <Link href="/journal" asChild>
                    <Pressable style={StyleSheet.flatten([style.button, { backgroundColor: '#099197' }])}>
                        <Text style={style.buttonText}>Journal Page</Text>
                    </Pressable>
                </Link>
            </View>
        </ScrollView>
    );
}
