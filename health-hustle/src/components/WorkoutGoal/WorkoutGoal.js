import React, { useState, useEffect } from "react";
import { View, SafeAreaView, Image, FlatList, TouchableOpacity } from 'react-native';
import { Text, Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import styles from './styles';
import axios from "axios";
import { database } from '../../database/config';
import { auth } from '../../database/config';

const WorkoutGoal = () => {
    const navigation = useNavigation();
    const [workoutData, setWorkoutData] = useState([]);
    const [isWorkoutDone, setIsWorkoutDone] = useState(false);

    let workoutSet = 'default'
    const user = auth.currentUser;
    const uid = user.uid;

    const fetchFormData = (uid) => {
        try {
            const usersRef = database.ref('users');
            const formDataRef = usersRef.child(uid).child('formData');
            formDataRef.on('value', (snapshot) => {
                workoutSet = snapshot.val().                                                                                                                    workoutList;
            });
        } catch (error) {
            console.log('Error fetching form data:', error);
            throw error;
        }
    };

    fetchFormData(uid)
    useEffect(() => {
        axios.get(`https://health-hustle-88599-default-rtdb.firebaseio.com/Exercises/${workoutSet}.json`)
            .then(response => {
                const jsonData = response.data;
                const workoutArray = Object.values(jsonData);
                setWorkoutData(workoutArray);
            })
            .catch(error => {
                console.error('Error fetching API data:', error);
            });
    }, []);

    const handleBack = () => {
        navigation.goBack();
    };

    const ListItem = ({ item }) => (
        <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => navigation.navigate('Workout_details')}
        >
            <View style={styles.listItem}>
                <Image source={{ uri: item.imageUrl }} style={styles.image} />
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{item.exerciseName}</Text>
                    <Text style={styles.duration}>{item.bodyGoals}</Text>
                </View>
                <TouchableOpacity style={styles.playButton}>
                    {isWorkoutDone ? (
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

export default WorkoutGoal;