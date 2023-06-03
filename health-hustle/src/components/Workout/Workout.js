import React from 'react';
import { StyleSheet, ImageBackground, View, Dimensions, SafeAreaView, Image, ScrollView } from 'react-native';
import { Button, Text, IconButton, Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { StatusBar } from 'expo-status-bar';

const Workout = () => {
    const navigation = useNavigation();

    const handleButtonPress = () => {
        navigation.navigate('Screen3');
    };

    return (
        <>
            <StatusBar bar-style='dark-content'/>
            <Appbar.Header style={styles.appHeaderContainer}>
                <Appbar.Content
                    title="Workout"
                    titleStyle={styles.appHeaderTitle}
                />
            </Appbar.Header>
            <></>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    {/* <Text style={styles.header}>Workout</Text> */}
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
                                    icon={({ size, color }) => (
                                        <IconButton
                                            icon="play"
                                            color={color}
                                            size={28}
                                        />
                                    )}
                                    onPress={handleButtonPress}
                                >
                                    Day 1
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
<<<<<<< Updated upstream
            </>      
=======
            </>


          
>>>>>>> Stashed changes
    );
};

export default Workout;