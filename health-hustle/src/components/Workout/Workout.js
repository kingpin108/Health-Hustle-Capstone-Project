import React, { useState } from 'react';
import { StyleSheet, ImageBackground, View, Dimensions, SafeAreaView, Image, ScrollView } from 'react-native';
import { Button, Text, IconButton, Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { StatusBar } from 'expo-status-bar';

const Workout = () => {
    const navigation = useNavigation();

    const handleButtonPress = () => {
        navigation.navigate('WorkoutList');
    };
    const [calendarVisible, setCalendarVisible] = useState(false);

    const handleOpenCalendar = () => {
        navigation.navigate('WorkoutCalendar');
    };
    
    return (
        <>
            <StatusBar bar-style='dark-content' />
            <Appbar.Header style={styles.appHeaderContainer}>
                <Appbar.Content
                    title="Workout"
                    titleStyle={styles.appHeaderTitle}
                />
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
                                <Text style={styles.text}>Monthly Workout Plan</Text>
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
                                    onPress={handleOpenCalendar}
                                >
                                    View
                                </Button>
                            </View>
                        </ImageBackground>
                    </View>
                    <Text style={styles.header}>Daily</Text>
                    <View style={styles.imageRow}>
                        <Image source={require('../../../assets/workout.png')} style={styles.image} />
                        <Image source={require('../../../assets/workout.png')} style={styles.image} />
                    </View>
                    <Text style={styles.header}>Body Focus</Text>
                    <View style={styles.imageRow}>
                        <Image source={require('../../../assets/workout.png')} style={styles.imgBodyFocus} />
                        <Image source={require('../../../assets/workout.png')} style={styles.imgBodyFocus} />
                    </View>
                    <View style={styles.imageRow}>
                        <Image source={require('../../../assets/workout.png')} style={styles.imgBodyFocus} />
                        <Image source={require('../../../assets/workout.png')} style={styles.imgBodyFocus} />
                    </View>
                </View>
            </ScrollView>
        </>
    );
};

export default Workout;