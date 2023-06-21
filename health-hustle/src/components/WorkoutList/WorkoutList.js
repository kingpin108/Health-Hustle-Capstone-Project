import React, { useState, useEffect, useContext } from "react";
import { View, SafeAreaView, Image, FlatList, TouchableOpacity } from 'react-native';
import { Text, Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import styles from './styles';
import axios from "axios";
import { database } from '../../database/config';
import { auth } from '../../database/config';
import { AuthContext } from '../../contexts/AuthContext';

const WorkoutList = ({route}) => {
    const navigation = useNavigation();
    const [workoutData, setWorkoutData] = useState([]);
    const [completedExercisesList, setCompletedExercisesList] = useState(completedExercises || []);
    const { uid } = useContext(AuthContext);
    const { completedExercises } = route.params;
    console.log(uid)

    let workoutSet = 'default';

    useEffect(() => {
        const fetchFormData = async () => {
            try {
                const usersRef = database.ref('users');
                const formDataRef = usersRef.child(uid).child('formData');
                const snapshot = await formDataRef.once('value');
                workoutSet = snapshot.val().workoutList;
            } catch (error) {
                console.log('Error fetching form data:', error);
            }
        };

        fetchFormData();
    }, [uid]);

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

    const handleBack = () => {
        navigation.goBack();
    };

    const handleItemPress = (exerciseId) => {
        navigation.navigate('Workout_details', { exerciseId });
        if (!completedExercisesList.includes(exerciseId)) {
            const updatedCompletedExercises = [...completedExercisesList, exerciseId];
            setCompletedExercisesList(updatedCompletedExercises);
        }

        if (completedExercises.length + 1 === workoutData.length) {
            try {
                const workoutTrackRef = database.ref(`users/${uid}/formData/workoutTrack/Day1`);
                workoutTrackRef.update({ isCompleted: true });
            } catch (error) {
                console.log('Error updating Firebase database:', error);
            }
        }
    };

    const ListItem = ({ item }) => {
        const isExerciseCompleted = completedExercisesList.includes(item.id);

        return (
            <TouchableOpacity
                style={styles.itemContainer}
                onPress={() => handleItemPress(item.id)}
            >
                <View style={styles.listItem}>
                    <Image source={{ uri: item.imageUrl }} style={styles.image} />
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>{item.exerciseName}</Text>
                        <Text style={styles.duration}>{item.bodyGoals}</Text>
                    </View>
                    <TouchableOpacity style={styles.playButton}>
                        {isExerciseCompleted ? (
                            <AntDesign name="checkcircle" size={24} color="#EE7CDC" />
                        ) : (
                            <AntDesign name="checkcircleo" size={24} color="#ABB2B9" />
                        )}
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <>
            <Appbar.Header style={styles.appHeaderContainer}>
                <Appbar.BackAction onPress={handleBack} />
                <Appbar.Content
                    title="Day 1"
                    titleStyle={styles.appHeaderTitle}
                />
            </Appbar.Header>
            <SafeAreaView style={styles.container}>
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
            </SafeAreaView>
        </>
    );
};

export default WorkoutList;