import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, ImageBackground, View, Dimensions, SafeAreaView, Image, ScrollView, Touchable } from 'react-native';
import { Button, Text, IconButton, Appbar, useTheme, FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../contexts/AuthContext';
import { database } from '../../database/config';

const url = "https://info6127-1119668-default-rtdb.firebaseio.com/Health_husle/dummy/-NMemxkO7aLtUBPtdCmV.json";

const Workout = () => {
    const navigation = useNavigation();
    const theme = useTheme();
    const [completedExercises, setCompletedExercises] = useState([]);

    const handleOpenWorkoutList = () => {
        navigation.navigate('WorkoutList', { completedExercises });
    };
    const [calendarVisible, setCalendarVisible] = useState(false);

    const handleOpenCalendar = () => {
        navigation.navigate('WorkoutCalendar');
    };

    const handleHomePress = () => {
        navigation.navigate('Home');
    };

    const [workoutDay, setWorkoutDay] = useState(1);

    const { uid } = useContext(AuthContext);
    console.log("Uid", uid)

    useEffect(() => {
        const userRef = database.ref(`users/${uid}/formData/workoutDays`);

        userRef.on('value', (snapshot) => {
            const workoutDays = snapshot.val();
            setWorkoutDay(workoutDays + 1);
        });

        return () => userRef.off();
    }, [uid]);

    const BodyFocusCardView = ({ imageSource, onPress }) => {
        return (
            <View>
                <TouchableOpacity onPress={onPress}>
                    <Image source={imageSource} style={styles.imgBodyFocus} />
                </TouchableOpacity>
            </View>
        );
    };

    const loadCompletedExercises = async () => {
        try {
            const completedExercisesString = await AsyncStorage.getItem('completedExercises');
            return completedExercisesString ? JSON.parse(completedExercisesString) : [];
        } catch (error) {
            console.log('Error loading completed exercises:', error);
            return [];
        }
    };
    useEffect(() => {
        loadCompletedExercises().then((completedExercisesData) => {
            setCompletedExercises(completedExercisesData);
        });
    }, []);

    return (
        <>
            <StatusBar bar-style='dark-content' />
            <Appbar.Header style={styles.appHeaderContainer}>
                <Appbar.Content
                    title="Workout"
                    titleStyle={styles.appHeaderTitle}
                />
                <Appbar.Action icon="home" onPress={handleHomePress} />
            </Appbar.Header>
            <></>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <View style={styles.imageContainer}>
                        <ImageBackground
                            source={require('../../../assets/workout.png')}
                            style={styles.backgroundImage}
                        >
                            <View style={styles.content}>
                                <Text style={styles.text}>Weekly Workout Plan</Text>
                                <Button
                                    mode="contained"
                                    style={styles.button}
                                    labelStyle={styles.buttonLabel}
                                    onPress={handleOpenWorkoutList}
                                >
                                    {`Day ${workoutDay}`}
                                </Button>
                            </View>
                        </ImageBackground>
                    </View>

                    <TouchableOpacity style={{ alignSelf: 'center', marginTop: '5%', backgroundColor: "#EE7CDC", paddingBottom: '5%', width: "90%", borderRadius: 10 }} onPress={() => navigation.navigate('DietPlan')}>
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', color: 'white', fontSize: 17, marginTop: '5%' }}>Diet Plans</Text>
                    </TouchableOpacity>

                    <Text style={styles.header}>Set Workout Goal</Text>
                    <View>
                    <Button icon="camera" mode="elevated" onPress={() => console.log('Pressed')}>
                        Workout Goal
                    </Button>
                    {/* <Button icon="camera" mode="elevated" onPress={() => console.log('Pressed')}>
                        Step Counter
                    </Button> */}

                    </View>
                    
                    <Text style={styles.header}>Body Focus</Text>
                    <View style={styles.imageRow}>
                        <BodyFocusCardView
                            imageSource={require('../../../assets/workout.png')}
                            onPress={handleOpenWorkoutList}
                        />
                        <BodyFocusCardView
                            imageSource={require('../../../assets/workout.png')}
                            onPress={handleOpenWorkoutList}
                        />
                    </View>
                    <View style={styles.imageRow}>
                        <BodyFocusCardView
                            imageSource={require('../../../assets/workout.png')}
                            onPress={handleOpenWorkoutList}
                        />
                        <BodyFocusCardView
                            imageSource={require('../../../assets/workout.png')}
                            onPress={handleOpenWorkoutList}
                        />
                    </View>



                </View>
            </ScrollView>
        </>
    );
};

export default Workout;