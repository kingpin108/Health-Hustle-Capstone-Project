import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, ImageBackground, View, Dimensions, SafeAreaView, Image, ScrollView, Touchable, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { Drawer, Appbar, Divider, Text, Button, Checkbox, TextInput, Switch, RadioButton, SegmentedButtons, Card, Title, Paragraph } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
// import ProgressCircle from 'react-native-progress-circle'
import styles from './styles';
import { AuthContext } from '../../contexts/AuthContext';
import { database } from '../../database/config';


const WorkoutGoal = () => {
    const navigation = useNavigation();

    const handleHomePress = () => {
        navigation.navigate('Workout');
    };

    const handleBack = () => {
        navigation.goBack();
    };

    const [value, setValue] = useState('A');
    const [duration, setDuration] = useState('');
    const [count, setCount] = useState('');
    const [cardData, setCardData] = useState([]);
    const [percent, setPercent] = useState(20);
    const [isLoading, setIsLoading] = useState(true);


    const fetchGoals = async () => {
        try {
            const goalsRef = database.ref(`users/${uid}/goals`);
            const snapshot = await goalsRef.once('value');
            const goalsData = snapshot.val();

            if (goalsData === null) {
                setCardData([]);
            } else {
                const goalsArray = Object.values(goalsData);
                setCardData(goalsArray);
            }
        } catch (error) {
            console.error('Error fetching goals:', error);
        }

    };

    const handleSubmit = async () => {
        setIsLoading(true);

        if (value === 'A' && duration) {
            const trimmedDuration = duration.trim();
            const durationVal = parseInt(trimmedDuration, 10);

            if (
                !Number.isInteger(durationVal) ||
                durationVal <= 0 ||
                duration.includes('.') ||
                durationVal < 10 ||
                durationVal > 100
            ) {
                setIsLoading(false);
                console.log('Invalid Duration:', duration);
                if (durationVal < 10) {
                    Alert.alert('Invalid Input', 'Minimum duration should be 10!');
                } else if (durationVal > 100) {
                    Alert.alert(
                        'Invalid Input',
                        'Please set an achievable goal which is less than 101!'
                    );
                } else {
                    Alert.alert(
                        'Invalid Input',
                        'Duration should be a valid numeric input.'
                    );
                }
                return;
            }
            if (trimmedDuration !== duration) {
                Alert.alert('Invalid Input', 'Duration should be a valid numeric input');
                setIsLoading(false);

                return;
            }
            if (/\s/.test(trimmedDuration)) {
                Alert.alert('Invalid Input', 'Duration should not contain spaces between numbers.');
                setIsLoading(false);
                return;
            }

            const trimmedValue = durationVal.toString().replace(/^0+/, '');


            const newCard = {
                title: 'Duration',
                description: trimmedValue + ' minutes'
            };
            setCardData(prevData => [...prevData, newCard]);
            setDuration('');
            console.log('Trimmed Duration:', trimmedValue);

            const durationValue = parseInt(duration);
            const sum = durationValue + percent;
            const percentage = ((percent / sum) * 100).toFixed(2);
            console.log("WorkoutDuration: " + percent)
            console.log("Percentage %: " + percentage)

            const formDataRef = database.ref(`users/${uid}/goals`);
            formDataRef.push({
                type: 'Duration',
                value: trimmedValue,
                text: 'minutes',
                percent: percentage,
            });
            fetchGoals();
        } else if (value === 'B' && count) {
            const newCard = { title: 'Step Count', description: count };
            setCardData(prevData => [...prevData, newCard]);
            setCount('');

            const formDataRef = database.ref(`users/${uid}/goals`);
            formDataRef.push({
                type: 'Step Count',
                value: count,
                text: 'steps',
                percent: percent,
            });
            fetchGoals();
        }
        setIsLoading(false);

    };

    useEffect(() => {
        const goalsRef = database.ref(`users/${uid}/goals`);

        const fetchGoals = async () => {
            try {
                const snapshot = await goalsRef.once('value');
                const goalsData = snapshot.val();

                if (goalsData === null) {
                    setCardData([]);
                } else {
                    const goalsArray = Object.values(goalsData);
                    setCardData(goalsArray);
                }
            } catch (error) {
                console.error('Error fetching goals:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchGoals();

        return () => goalsRef.off();
    }, [uid]);

    // useEffect(() => {
    //     const goalsRef = database.ref(`users/${uid}/goals`);

    //     const fetchGoals = async () => {
    //         try {
    //             const snapshot = await goalsRef.once('value');
    //             const goalsData = snapshot.val();
    //             const goalsArray = Object.values(goalsData);
    //             setCardData(goalsArray);
    //         } catch (error) {
    //             console.error('Error fetching goals:', error);
    //         }
    //     };

    //     fetchGoals();

    //     return () => goalsRef.off();
    // }, [uid]);

    const { user } = useContext(AuthContext);
    const { uid } = user;

    useEffect(() => {
        const formDataRef = database.ref(`users/${uid}/formData`);

        const fetchData = async () => {
            try {
                const snapshot = await formDataRef.once('value');
                const formData = snapshot.val();
                setPercent(formData.workoutDuration)
            } catch (error) {
                console.error('Error fetching formData:', error);
            }
        };

        fetchData();

        return () => formDataRef.off();
    }, [uid]);

    return (
        <>
            <StatusBar bar-style='dark-content' />
            <Appbar.Header style={styles.appHeaderContainer}>
                <Appbar.BackAction onPress={handleBack} />
                <Appbar.Content
                    title="Set Workout Goal"
                    titleStyle={styles.appHeaderTitle}
                />
            </Appbar.Header>
            <SafeAreaView style={styles.safeAreaContainer}>
                <View style={styles.container}>
                    <SegmentedButtons
                        value={value}
                        onValueChange={setValue}
                        buttons={[
                            {
                                value: 'A',
                                label: 'Workout Duration',
                            },
                            {
                                value: 'B',
                                label: 'Step Count',
                            },
                        ]}
                    />

                    {value === 'A' && (
                        <View style={{ borderBottomColor: 'grey', borderBottomWidth: 2, alignItems: 'center', width: 350 }}>
                            <Text variant='titleLarge' style={{ paddingVertical: 10 }}>Enter target time in minutes</Text>
                            <TextInput
                                label="Enter Duration"
                                value={duration}
                                onChangeText={text => setDuration(text)}
                                keyboardType='numeric'
                                style={{ marginVertical: 10, width: 300 }}
                            />
                            <Button mode="contained" onPress={handleSubmit} style={{ marginVertical: 10 }}>
                                Add Goal
                            </Button>
                        </View>
                    )}

                    {value === 'B' && (
                        <View style={{ borderBottomColor: 'grey', borderBottomWidth: 2, alignItems: 'center', width: 350 }}>
                            <Text variant='titleLarge' style={{ paddingVertical: 10 }}>Enter step target in minutes</Text>
                            <TextInput
                                label="Enter Count"
                                value={count}
                                onChangeText={text => setCount(text)}
                                keyboardType='numeric'
                                style={{ marginVertical: 10, width: 300 }}
                            />
                            <Button mode="contained" onPress={handleSubmit} style={{ marginVertical: 10 }}>
                                Add Goal
                            </Button>
                        </View>
                    )}

                    <ScrollView contentContainerStyle={{ padding: 16 }} style={{ margin: 10 }}>
                        {isLoading ? (
                            <ActivityIndicator size="small" color="gray" />
                        ) : cardData.length === 0 ? (
                            <Text style={styles.noGoalsText}>No Goals set</Text>
                        ) : (
                            cardData.map((item, index) => (
                                <Card key={index} style={styles.card}>
                                    <Card.Content style={styles.cardContent}>
                                        <View style={styles.cardTextContainer}>
                                            <Title>{item.type}</Title>

                                            <Paragraph>{item.value}</Paragraph>
                                            <Paragraph>{item.percent}</Paragraph>
                                        </View>
                                        {/* <ProgressCircle
                      percent={0}
                      radius={30}
                      borderWidth={4}
                      color="purple"
                      shadowColor="#999"
                      bgColor="#fff"
                    >
                      <Text style={{ fontSize: 14 }}>{0 + '%'}</Text>
                    </ProgressCircle> */}
                                    </Card.Content>
                                </Card>
                            ))
                        )}
                    </ScrollView>
                </View>
            </SafeAreaView>
        </>
    );
};

export default WorkoutGoal;
