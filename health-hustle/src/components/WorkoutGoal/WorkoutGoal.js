import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, ImageBackground, View, Dimensions, SafeAreaView, Image, ScrollView, Touchable, TouchableOpacity } from 'react-native';
import { Drawer, Appbar, Divider, Text, Button, Checkbox, TextInput, Switch, RadioButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { StatusBar } from 'expo-status-bar';
import { AuthContext } from '../../contexts/AuthContext';
import Popover from 'react-native-popover-view';
import { database } from '../../database/config';


const WorkoutGoal = () => {
    const navigation = useNavigation();

    const handleHomePress = () => {
        navigation.navigate('Workout');
    };

    const handleBack = () => {
        navigation.goBack();
    };

    return (
        <>
            <StatusBar bar-style='dark-content' />
            <Appbar.Header style={styles.appHeaderContainer}>
                <Appbar.BackAction onPress={handleBack} />
                <Appbar.Content
                    title="Set Workout Goal"
                    titleStyle={styles.appHeaderTitle}
                />
            </Appbar.Header>
            <SafeAreaView style={styles.safeAreaContainer}>
                
            </SafeAreaView>
        </>
    );
};

export default WorkoutGoal;