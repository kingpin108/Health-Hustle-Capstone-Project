import React, { useState } from 'react';
import { StyleSheet, ImageBackground, View, Dimensions, SafeAreaView, Image, ScrollView, Touchable } from 'react-native';
import { Button, Text, IconButton, Appbar, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Workout = () => {
    const navigation = useNavigation();
    const theme = useTheme();

    const handleOpenWorkoutList = () => {
        navigation.navigate('WorkoutList');
    };
    const [calendarVisible, setCalendarVisible] = useState(false);

    const handleOpenCalendar = () => {
        navigation.navigate('WorkoutCalendar');
    };

    const handleHomePress = () => {
        navigation.navigate('Home');
    };

    const DailyCardView = ({ imageSource, onPress }) => {
        return (
            <View>
                <TouchableOpacity onPress={onPress}>
                    <Image source={imageSource} style={styles.image} />
                </TouchableOpacity>
            </View>
        );
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

    return (
        <>
            <StatusBar bar-style='dark-content' />
            <Appbar.Header style={styles.appHeaderContainer}>
                <Appbar.Content
                    title="Workout"
                    titleStyle={styles.appHeaderTitle}
                />
                <Appbar.Action icon="home" onPress={handleHomePress} />
                <Appbar.Action icon="theme-light-dark" onPress={() => {}} />
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
                                    // icon={({ size, color }) => (
                                    //     <IconButton
                                    //         icon="play"
                                    //         color={color}
                                    //         size={28}
                                    //     />
                                    // )}
                                    onPress={handleOpenWorkoutList}
                                >
                                    Day 1
                                </Button>
                            </View>
                        </ImageBackground>
                    </View>
                    <Text style={styles.header}>Daily</Text>
                    <View style={styles.imageRow}>
                        <DailyCardView
                            imageSource={require('../../../assets/workout.png')}
                            onPress={() => navigation.navigate('CardDemo')}
                        />
                        <DailyCardView
                            imageSource={require('../../../assets/workout.png')}
                            onPress={() => navigation.navigate('CardDemo')}
                        />
                    </View>
                    <Text style={styles.header}>Body Focus</Text>
                    <View style={styles.imageRow}>
                        <BodyFocusCardView
                            imageSource={require('../../../assets/workout.png')}
                            onPress={() => navigation.navigate('CardDemo')}
                        />
                        <BodyFocusCardView
                            imageSource={require('../../../assets/workout.png')}
                            onPress={() => navigation.navigate('CardDemo')}
                        />
                    </View>
                    <View style={styles.imageRow}>
                        <BodyFocusCardView
                            imageSource={require('../../../assets/workout.png')}
                            onPress={() => navigation.navigate('CardDemo')}
                        />
                        <BodyFocusCardView
                            imageSource={require('../../../assets/workout.png')}
                            onPress={() => navigation.navigate('CardDemo')}
                        />
                    </View>
                </View>
            </ScrollView>
        </>
    );
};

export default Workout;