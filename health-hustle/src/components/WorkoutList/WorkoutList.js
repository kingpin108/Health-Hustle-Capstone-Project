import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, ImageBackground, View, Dimensions, SafeAreaView, Image, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { Button, Text, IconButton, Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import styles from './styles';
import axios from "axios";

const WorkoutList = () => {
    const navigation = useNavigation();
    const [jsonData, setJsonData] = useState(null);

    useEffect(() => {
        axios.get('https://info6127-1119668-default-rtdb.firebaseio.com/Health_husle/dummy/-NMemxkO7aLtUBPtdCmV.json')
          .then(response => {
            const jsonData = response.data;
            setJsonData(jsonData);
          })
          .catch(error => {
            console.error('Error fetching API data:', error);
          });
    }, []);

    const handleBack = () => {
        navigation.goBack();
    };
    const [isWorkoutDone, setIsWorkoutDone] = useState(false);


    const data = [
        {
            id: '1',
            image: require('../../../assets/workout.png'),
            title: 'Item 1',
            duration: '00:50'
        },
    ];
    const ListItem = ({ item }) => (
        <TouchableOpacity
            style={styles.listItem}
            onPress={() => navigation.navigate('Workout_details')}
        >
            {jsonData && (
            <View style={styles.listItem}>        
                <Image source={item.image} style={styles.image} />
                <View style={styles.textContainer}>
                    
                    <Text style={styles.title}>{JSON.stringify(jsonData.exerciseName).replace(/"/g, '')}</Text>
                    <Text style={styles.duration}>{JSON.stringify(jsonData.bodyGoals).replace(/"/g, '')}</Text>
                </View>
               
                <TouchableOpacity style={styles.playButton}>
                    {isWorkoutDone ? (
                        <AntDesign name="checkcircle" size={24} color="#EE7CDC" />
                    ) : (
                        <AntDesign name="checkcircleo" size={24} color="#ABB2B9" />
                    )}
                </TouchableOpacity>
            </View>
            )}
            
        </TouchableOpacity>
    );

    return (
        <>
            <Appbar.Header style={styles.appHeaderContainer}>
                <Appbar.BackAction onPress={handleBack} />
                <Appbar.Content
                    title="Day 1"
                    titleStyle={styles.appHeaderTitle} />
            </Appbar.Header>
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id}
                    ListHeaderComponent={
                        <>
                        {jsonData && (
                            <View>
                            <Text style={styles.titleTime} variant="titleMedium">
                                Estimated time: 9 mins
                            </Text>
                            <Text style={styles.titleTime} variant="titleMedium">
                                Total Exercises: 1
                            </Text>
                            <Text style={styles.titleInstruction} variant="titleLarge">
                                Instruction
                            </Text>
                            <Text style={styles.textInstruction} variant="titleSmall">
                               {JSON.stringify(jsonData.description).replace(/"/g, '')}
                            </Text>
                            <Text style={styles.titleInstruction} variant="headlineSmall">
                                Exercises
                            </Text>
                            </View>
                        )}
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