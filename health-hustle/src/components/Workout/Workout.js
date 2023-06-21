import React, { useState, useEffect } from 'react';
import { StyleSheet, ImageBackground, View, Dimensions, SafeAreaView, Image, ScrollView, Touchable } from 'react-native';
import { Button, Text, IconButton, Appbar, useTheme, FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
                <Appbar.Action icon="theme-light-dark" onPress={() => { }} />
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
                                    Day 1
                                </Button>
                            </View>
                        </ImageBackground>
                    </View>
                    <Text style={styles.header}>Set Workout Goal</Text>

                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        contentContainerStyle={styles.scrollContainer}
                    >
                        <View style={styles.FABContainer}>
                            <FAB
                                icon={() => (
                                    <View style={styles.iconContainer}>
                                        <Image
                                            source={require('../../../assets/iconWeightlift.png')}
                                            style={styles.icon}
                                        />
                                    </View>
                                )}
                                style={styles.fab}
                                size="large"
                                onPress={handleOpenWorkoutList}
                            />
                        </View>

                        <View style={styles.FABContainer}>
                            <FAB
                                icon={() => (
                                    <View style={styles.iconContainer}>
                                        <Image
                                            source={require('../../../assets/iconsMuscleGain.png')}
                                            style={styles.icon}
                                        />
                                    </View>
                                )}
                                style={styles.fab}
                                size="large"
                                onPress={handleOpenWorkoutList}
                            />
                        </View>
                        <View style={styles.FABContainer}>
                            <FAB
                                icon={() => (
                                    <View style={styles.iconContainer}>
                                        <Image
                                            source={require('../../../assets/iconCardio.png')}
                                            style={styles.icon}
                                        />
                                    </View>
                                )}
                                style={styles.fab}
                                size="large"
                                onPress={handleOpenWorkoutList}
                            />
                        </View><View style={styles.FABContainer}>
                            <FAB
                                icon={() => (
                                    <View style={styles.iconContainer}>
                                        <Image
                                            source={require('../../../assets/iconFlexibility.png')}
                                            style={styles.icon}
                                        />
                                    </View>
                                )}
                                style={styles.fab}
                                size="large"
                                onPress={handleOpenWorkoutList}
                            />
                        </View>
                    </ScrollView>

                    <Text style={styles.header}>Body Focus</Text>
                    <View style={styles.imageRow}>
                        <BodyFocusCardView
                            imageSource={require('../../../assets/workout.png')}
                            onPress={() => navigation.navigate('WorkoutList')}
                        />
                        <BodyFocusCardView
                            imageSource={require('../../../assets/workout.png')}
                            onPress={() => navigation.navigate('WorkoutList')}
                        />
                    </View>
                    <View style={styles.imageRow}>
                        <BodyFocusCardView
                            imageSource={require('../../../assets/workout.png')}
                            onPress={() => navigation.navigate('WorkoutList')}
                        />
                        <BodyFocusCardView
                            imageSource={require('../../../assets/workout.png')}
                            onPress={() => navigation.navigate('WorkoutList')}
                        />
                    </View>
                </View>
            </ScrollView>
        </>
    );
};

export default Workout;