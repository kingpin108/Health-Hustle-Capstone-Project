import React, { useState, useEffect, useContext } from "react";
import { View, SafeAreaView, Image, FlatList, TouchableOpacity } from 'react-native';
import { Text, Appbar, FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import styles from './styles';
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
            setWorkoutDay(workoutDays + 1);
            setIsWorkoutDone({});

        });

        return () => userRef.off();
    }, [uid]);

    const handleBack = () => {
        navigation.navigate('Workout', { workoutDay: workoutDay });
    };

    

    const handlePlayButtonPress = () => {
        setWorkoutDay(prevDay => prevDay + 1);

        if (workoutDay % 5 === 0) {
            const userRef = database.ref(`users/${uid}/formData/workoutDays`);
            userRef.transaction((workoutDays) => {
                return (workoutDays || 0) + 1;
            })
                .then((result) => {
                    console.log('Workout days updated successfully');
                    if (result.committed) {
                        console.log('Day', workoutDay + 1, 'workout marked as completed');
                    } else {
                        console.log('Transaction aborted');
                    }
                })
                .catch((error) => {
                    console.log('Error updating workout days:', error);
                });
        }
    };

    const ListItem = ({ item }) => (
        <TouchableOpacity
            style={styles.itemContainer}
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

    return (
        <>
            <Appbar.Header style={styles.appHeaderContainer}>
                <Appbar.BackAction onPress={handleBack} />
                <Appbar.Content
                    title={`Day ${workoutDay}`}
                    titleStyle={styles.appHeaderTitle}
                />
            </Appbar.Header>
            <SafeAreaView style={styles.container}>
                {workoutDay % 5 === 0 ? (
                    <View style={styles.containerBreak}>
                        <Image source={require('../../../assets/iconsBreak.png')} style={styles.imageBreak} />
                        <Text style={styles.textBreak} variant="displaySmall">Take a moment to appreciate your progress.</Text>

                        {/* <Text style={styles.textBreak}>Take a moment to appreciate your progress.</Text> */}
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
                                    Estimated time: 9 mins
                                </Text>
                                <Text style={styles.titleTime} variant="titleMedium">
                                    Total Exercises: {workoutData.length}
                                </Text>
                                <Text style={styles.titleInstruction} variant="titleLarge">
                                    Instruction
                                </Text>
                                <Text style={styles.textInstruction} variant="titleSmall">
                                    {workoutData.length > 0 ? workoutData[0].description : ''}
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
        </>
    );
};

export default WorkoutList;