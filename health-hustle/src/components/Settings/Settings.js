import React, { useState } from 'react';
import { StyleSheet, ImageBackground, View, Dimensions, SafeAreaView, Image, ScrollView, Touchable } from 'react-native';
import { Button, Text, IconButton, Appbar, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity } from 'react-native-gesture-handler';

const url = "https://info6127-1119668-default-rtdb.firebaseio.com/Health_husle/dummy/-NMemxkO7aLtUBPtdCmV.json";

const Settings = () => {
    const navigation = useNavigation();

    const handleHomePress = () => {
        navigation.navigate('Home');
    };

    return (
        <>
            <StatusBar bar-style='dark-content' />
            <Appbar.Header style={styles.appHeaderContainer}>
                <Appbar.Content
                    title="Settings"
                    titleStyle={styles.appHeaderTitle}
                />
                <Appbar.Action icon="home" onPress={handleHomePress} />
            </Appbar.Header>
            <></>
        </>
    );
};

export default Settings;