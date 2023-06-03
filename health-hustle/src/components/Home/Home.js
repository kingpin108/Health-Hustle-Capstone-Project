import React, { useState } from 'react';
import styles from './styles';
import { View, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { ProgressBar, Button, RadioButton, Provider as PaperProvider, Text, Checkbox, TextInput, Switch } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Text>
                    Hello
                </Text>
            </View>
        </SafeAreaView>
    );
};

export default Home;