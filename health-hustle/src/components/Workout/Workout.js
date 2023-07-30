import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, ImageBackground, View, ScrollView, Alert } from 'react-native';
import { Button, Text, Appbar, useTheme, ActivityIndicator, Provider as PaperProvider, MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from './styles';
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../contexts/AuthContext';
import { database } from '../../database/config';
import NetInfo from '@react-native-community/netinfo'


const url = "https://info6127-1119668-default-rtdb.firebaseio.com/Health_husle/dummy/-NMemxkO7aLtUBPtdCmV.json";

const Workout = () => {
    const navigation = useNavigation();
    const route = useRoute();

    const [completedExercises, setCompletedExercises] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [theme, setTheme] = useState(false);

    const handleOpenWorkoutList = () => {
        navigation.navigate('WorkoutList', { completedExercises, workoutDay });
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

        const handleSnapshot = (snapshot) => {
            const workoutDays = snapshot.val();
            setWorkoutDay(workoutDays);
            console.log(workoutDay)
            setLoading(false); // Data fetched successfully, set loading to false

        };

        const handleFetchError = (error) => {
            console.log('Error fetching workout days:', error);
            setError(true); // Error occurred, set error to true
            setLoading(false); // Data fetching completed (with error), set loading to false
        };


        userRef.on('value', handleSnapshot, handleFetchError);

        return () => {
            userRef.off('value', handleSnapshot);
        };
    }, [uid, workoutDay]);



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

    useEffect(() => {
        const checkInternetConnection = async () => {
            const isConnected = await NetInfo.fetch().then(state => state.isConnected);
            if (!isConnected) {
                Alert.alert(
                    'No Internet Connection',
                    'Please check your internet connection and try again.',
                );
            }
        };

        checkInternetConnection();
    }, []);

    useEffect(() => {
        const userRef = database.ref(`users/${uid}/formData`);

        userRef
            .once('value')
            .then((snapshot) => {
                const formData = snapshot.val();
                if (formData && formData.isDarkActive !== undefined) {
                    setTheme(formData.isDarkActive);
                    setLoading(false);
                }
            })
            .catch((error) => {
                console.error('Error fetching isDarkActive from Firebase:', error);
                setLoading(false);

            });
    }, [uid]);

    const themeStyles = theme ? darkThemeStyles : lightThemeStyles;


    const paperTheme =
        theme
            ? { ...MD3DarkTheme }
            : { ...MD3LightTheme };

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    } else {
        return (

            <PaperProvider theme={paperTheme}>
                {theme ? <></> : <StatusBar bar-style={'light-content'} />}
                <Appbar.Header style={styles.appHeaderContainer}>
                    <Appbar.Content
                        title="Workout"
                        titleStyle={styles.appHeaderTitle}
                    />
                    <Appbar.Action icon="home" onPress={handleHomePress} />
                </Appbar.Header>
                <></>

                {loading ? (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size="large" />
                    </View>
                ) : error ? (
                    <View style={styles.loaderContainer}>
                        <Alert
                            title="Error"
                            message="Failed to fetch workout data. Please check your internet connection and try again."
                            buttonTitle="OK"
                            onPress={() => setError(false)}
                        />
                    </View>
                ) : (
                    <ScrollView style={[themeStyles.container]} showsVerticalScrollIndicator={false}>
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
                                            {`Day ${route.params?.workoutDay || workoutDay}`}
                                        </Button>
                                    </View>
                                </ImageBackground>
                            </View>

                            <TouchableOpacity style={{ alignSelf: 'center', marginTop: '5%', backgroundColor: "#EE7CDC", paddingBottom: '5%', width: "90%", borderRadius: 10 }} onPress={() => navigation.navigate('DietPlan')}>
                                <Text style={{ textAlign: 'center', fontWeight: 'bold', color: 'white', fontSize: 17, marginTop: '5%' }}>Diet Plans</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ alignSelf: 'center', marginTop: '5%', backgroundColor: "#150359", paddingBottom: '5%', width: "90%", borderRadius: 10 }} onPress={() => navigation.navigate('WorkoutGoal')}>
                                <Text style={{ textAlign: 'center', fontWeight: 'bold', color: 'white', fontSize: 17, marginTop: '5%' }}>Workout Goals</Text>
                            </TouchableOpacity>

                        </View>
                    </ScrollView>
                )}
            </PaperProvider>
        );
    }
};

export default Workout;

const lightThemeStyles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
});

const darkThemeStyles = StyleSheet.create({
    container: {
        
        backgroundColor: '#444444',
    },
});