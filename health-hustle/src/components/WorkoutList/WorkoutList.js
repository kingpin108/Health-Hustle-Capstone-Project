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
    const { completedExercises } = route.params;
    const [completedExercisesList, setCompletedExercisesList] = useState(completedExercises || []);
    const [isWorkoutDone, setIsWorkoutDone] = useState({});

    let workoutSet = 'default'
    const { uid } = useContext(AuthContext);
    console.log("Uid",uid)

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
            const userRef = database.ref(`users/${uid}/formData`);
            userRef.update({ daysCompleted: 1 })
              .then(() => console.log('Day 1 workout marked as completed'))
              .catch(error => console.log('Error marking day 1 workout as completed:', error));
          }
        }
      }, [isWorkoutDone, uid, workoutData]);

    const handleBack = () => {
        navigation.goBack();
    };

    const handleItemPress = (item) => {
        navigation.navigate('Workout_details', { item });
        setIsWorkoutDone(prevState => ({
          ...prevState,
          [item.id]: true
        }));
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