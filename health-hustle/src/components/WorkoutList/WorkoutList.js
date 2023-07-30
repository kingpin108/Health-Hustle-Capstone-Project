import React, { useState, useEffect, useContext } from "react";
import { View, SafeAreaView, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Text, Appbar, FAB, ActivityIndicator, Provider as PaperProvider, MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import styles from './styles';
import { StatusBar } from 'expo-status-bar';
import axios from "axios";
import { database } from '../../database/config';
import { auth } from '../../database/config';
import { AuthContext } from '../../contexts/AuthContext';

const WorkoutList = ({ route }) => {
    const navigation = useNavigation();
    const [workoutData, setWorkoutData] = useState([]);
    const { completedExercises } = route.params;
    const [completedExercisesList, setCompletedExercisesList] = useState(completedExercises || []);
    const [isWorkoutDone, setIsWorkoutDone] = useState({});
    const [workoutDay, setWorkoutDay] = useState(1);
    const [loading, setLoading] = useState(true); // Add loading state
    const [theme, setTheme] = useState(false);


    let workoutSet = 'default'
    const { uid } = useContext(AuthContext);
    console.log("Uid", uid)

    const fetchFormData = (uid) => {
        try {
            const usersRef = database.ref('users');
            const formDataRef = usersRef.child(uid).child('formData');
            formDataRef.on('value', (snapshot) => {
                const snapshotValue = snapshot.val();
                if (snapshotValue && snapshotValue.workoutList) {
                    workoutSet = snapshotValue.workoutList;
                } else {
                    workoutSet = 'default';
                }
            });
        } catch (error) {
            console.log('Error fetching form data:', error);
            throw error;
        }
    };

    fetchFormData(uid)

    const handleItemPress = (item) => {
        navigation.navigate('Workout_details', { item });
        setIsWorkoutDone(prevState => ({
            ...prevState,
            [item.id]: true
        }));
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://health-hustle-88599-default-rtdb.firebaseio.com/Exercises/${workoutSet}.json`);
                const jsonData = response.data;
                const workoutArray = Object.values(jsonData);
                setWorkoutData(workoutArray);
                setLoading(false); // Set loading to false when data is fetched

            } catch (error) {
                console.error('Error fetching API data:', error);
            }
        };

        fetchData();
    }, [workoutSet]);

    useEffect(() => {
        if (workoutData.length > 0) {
            const allDone = workoutData.every(item => isWorkoutDone[item.id]);
            if (allDone) {
                const userRef = database.ref(`users/${uid}/formData/workoutDays`);
                userRef.transaction((workoutDays) => {
                    return (workoutDays || 0) + 1;
                })
                    .then((result) => {
                        console.log('Workout days updated successfully');
                        if (result.committed) {
                            console.log('Day 1 workout marked as completed');
                            if (result.snapshot.val() > 7) {
                                userRef.set(1); // Reset workout days to 1
                            }
                        } else {
                            console.log('Transaction aborted');
                        }
                    })
                    .catch((error) => {
                        console.log('Error updating workout days:', error);
                    });
            }
        }
    }, [isWorkoutDone, uid, workoutData]);

    useEffect(() => {
        const userRef = database.ref(`users/${uid}/formData/workoutDays`);

        userRef.on('value', (snapshot) => {
            const workoutDays = snapshot.val();
            setWorkoutDay(workoutDays);
            setIsWorkoutDone({});
        });

        return () => userRef.off();
    }, [uid]);

    const handleBack = () => {
        navigation.navigate('Workout', { workoutDay: workoutDay });
    };

    const handlePlayButtonPress = () => {
        setWorkoutDay(prevDay => prevDay + 1);

        if (workoutDay % 4 === 0) {
            const userRef = database.ref(`users/${uid}/formData/workoutDays`);
            userRef.transaction((workoutDays) => {
                return (workoutDays || 0) + 1;
            })
                .then((result) => {
                    console.log('Workout days updated successfully');
                    if (result.committed) {
                        console.log('Day', workoutDay, 'workout marked as completed');
                        if (result.snapshot.val() > 7) {
                            userRef.set(1); // Reset workout days to 1
                        }
                    } else {
                        console.log('Transaction aborted');
                    }
                })
                .catch((error) => {
                    console.log('Error updating workout days:', error);
                });
        }
    };

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

    const ListItem = ({ item }) => (
        <TouchableOpacity
            style={[themeStyles.itemContainer]}
            onPress={() => handleItemPress(item)}
        >
            <View style={styles.listItem}>
                <Image source={{ uri: item.imageUrl }} style={styles.image} />
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{item.exerciseName}</Text>
                    <Text style={styles.duration}>{item.bodyGoals}</Text>
                </View>
                <TouchableOpacity style={styles.playButton}>
                    {isWorkoutDone[item.id] ? (
                        <AntDesign name="checkcircle" size={24} color="#EE7CDC" />
                    ) : (
                        <AntDesign name="checkcircleo" size={24} color="#ABB2B9" />
                    )}
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );


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
                    <Appbar.BackAction onPress={handleBack} />
                    <Appbar.Content
                        title={`Day ${workoutDay}`}
                        titleStyle={styles.appHeaderTitle}
                    />
                </Appbar.Header>

                <SafeAreaView style={[themeStyles.container]}>
                    {
                        workoutDay % 4 === 0 ? (
                            <View style={styles.containerBreak}>
                                <Image source={require('../../../assets/iconsBreak.png')} style={styles.imageBreak} />
                                <Text style={styles.textBreak} variant="displaySmall">Take a moment to appreciate your progress.</Text>
                                <View style={styles.fabContainer}>
                                    <FAB
                                        label="Resume workout"
                                        icon="play"
                                        style={styles.fab}
                                        onPress={handlePlayButtonPress}
                                    />
                                </View>
                            </View>
                        ) : (
                            <FlatList
                                data={workoutData}
                                keyExtractor={(item) => item.id}
                                ListHeaderComponent={
                                    <>
                                        <Text style={styles.titleTime} variant="titleMedium">
                                            Estimated time: 45 mins
                                        </Text>
                                        <Text style={styles.titleTime} variant="titleMedium">
                                            Total Exercises: {workoutData.length}
                                        </Text>
                                        <Text style={styles.titleInstruction} variant="titleLarge">
                                            Tip
                                        </Text>
                                        <Text style={styles.textInstruction} variant="titleSmall">
                                            Proper nutrition and hydration are crucial for optimal performance and recovery. Fuel your body with nutritious foods, including a balance of proteins, carbohydrates, and healthy fats. Drink plenty of water throughout the day to stay hydrated before, during, and after your workouts.
                                        </Text>
                                        <Text style={styles.titleInstruction} variant="headlineSmall">
                                            Exercises
                                        </Text>
                                    </>
                                }
                                renderItem={ListItem}
                                showsVerticalScrollIndicator={false}
                            />
                        )}
                </SafeAreaView>
            </PaperProvider>
        );
    }
};

export default WorkoutList;
const lightThemeStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',

    },
    itemContainer: {
        elevation: 4,
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 2,
        marginHorizontal: 20,
        marginVertical: 5,
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: 'black'
    },


});

const darkThemeStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#444444',

    },
    itemContainer: {
        elevation: 4,
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 2,
        marginHorizontal: 20,
        marginVertical: 5,
        backgroundColor: '#262626',
        borderRadius: 10,
        shadowColor: 'white'
    },

});
