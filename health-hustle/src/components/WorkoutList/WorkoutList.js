import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, ImageBackground, View, Dimensions, SafeAreaView, Image, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { Button, Text, IconButton, Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import styles from './styles';

const WorkoutList = () => {
    const navigation = useNavigation();

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
        {
            id: '2',
            image: require('../../../assets/workout.png'),
            title: 'Item 2',
            duration: '00:50'

        },
        {
            id: '3',
            image: require('../../../assets/workout.png'),
            title: 'Item 3',
            duration: '00:50'

        },
        {
            id: '4',
            image: require('../../../assets/workout.png'),
            title: 'Item 4',
            duration: '00:50'

        },
        {
            id: '5',
            image: require('../../../assets/workout.png'),
            title: 'Item 5',
            duration: '00:50'

        },
        {
            id: '6',
            image: require('../../../assets/workout.png'),
            title: 'Item 6',
            duration: '00:50'

        }, {
            id: '7',
            image: require('../../../assets/workout.png'),
            title: 'Item 7',
            duration: '00:50'

        },
        {
            id: '8',
            image: require('../../../assets/workout.png'),
            title: 'Item 8',
            duration: '00:50'

        },
        {
            id: '9',
            image: require('../../../assets/workout.png'),
            title: 'Item 9',
            duration: '00:50'

        },
    ];
    const ListItem = ({ item }) => (
        <TouchableOpacity
            style={styles.listItem}
            onPress={() => navigation.navigate('Workout_details')}
        >
            <View style={styles.listItem}>
                <Image source={item.image} style={styles.image} />
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.duration}>{item.duration}</Text>
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
                    titleStyle={styles.appHeaderTitle} />
            </Appbar.Header>
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id}
                    ListHeaderComponent={
                        <>
                            <Text style={styles.titleTime} variant="titleMedium">
                                Estimated time: 9 mins
                            </Text>
                            <Text style={styles.titleTime} variant="titleMedium">
                                Total Exercises: 9
                            </Text>
                            <Text style={styles.titleInstruction} variant="titleLarge">
                                Instruction
                            </Text>
                            <Text style={styles.textInstruction} variant="titleSmall">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
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