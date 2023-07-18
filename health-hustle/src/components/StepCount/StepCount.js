import React, { useEffect, useState } from 'react';
import { StatusBar, PermissionsAndroid, Platform } from 'react-native';
import { View, Dimensions, Image } from 'react-native';
import { Pedometer } from 'expo-sensors';
import { useNavigation } from '@react-navigation/native';
import { Badge, Text, Appbar } from 'react-native-paper';
import styles from './styles';
import { AuthContext } from '../../contexts/AuthContext';
import { database } from '../../database/config';

//[#11] Users get a daily step count update.
export default function App() {
  const [pedometerAvailability, setPedometerAvailability] = useState('');
  const [stepCount, setStepCount] = useState(0);

  // const windowHeight = Dimensions.get('window').height;

  useEffect(() => {
    subscribe();
  }, []);

  const subscribe = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await requestAndroidPermission();
        if (granted) {
          console.log('Activity recognition permission granted');
          startStepCountSubscription();
        } else {
          console.log('Activity recognition permission denied');
        }
      } else {
        startStepCountSubscription();
      }
    } catch (error) {
      console.log('Error requesting permission:', error);
    }
  };

  const requestAndroidPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACTIVITY_RECOGNITION
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (error) {
      console.log('Error requesting permission:', error);
      return false;
    }
  };

  const startStepCountSubscription = () => {
    const subscription = Pedometer.watchStepCount((result) => {
      setStepCount(result.steps);
    });

    Pedometer.isAvailableAsync().then(
      (result) => {
        setPedometerAvailability(String(result));
      },
      (error) => {
        setPedometerAvailability(error);
      }
    );
  };

  const dist = stepCount / 1300;
  const distanceCovered = dist.toFixed(4);

  const cal = distanceCovered * 60;
  const caloriesBurnt = cal.toFixed(4);

  const navigation = useNavigation();
  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Appbar.Header style={styles.appHeaderContainer}>
        <Appbar.BackAction onPress={handleBack} />
        <Appbar.Content
          title="Step Count"
          titleStyle={styles.appHeaderTitle}
        />
      </Appbar.Header>
      <View style={styles.container}>
        <View style={styles.row_container}>
          <Text variant="titleLarge">
            Pedometer status:
          </Text>
          <Badge size={20} style={{ backgroundColor: pedometerAvailability ? 'green' : 'red', marginBottom: 2, marginLeft: 5, borderColor: 'white', borderWidth: 2 }}></Badge>
        </View>
        <Image
          style={styles.demoImage}
          source={require('../../../assets/step_count.png')}
          resizeMode="contain"
        />
        <View style={{ flex: 1 }}>
          <View style={styles.stepCountCircle}>
            <Text variant="titleMedium" style={{ alignSelf: 'center' }}>Step Count</Text>
            <Text variant="titleLarge" style={{ alignSelf: 'center', fontWeight: '700' }}>{stepCount}</Text>
          </View>
          <View style={styles.stepCountCircle}>
            <Text variant="titleMedium" style={{ alignSelf: 'center', textAlign: 'center', paddingBottom: 5 }}>Distance Covered</Text>
            <Text variant="titleLarge" style={{ alignSelf: 'center', fontWeight: '700' }}>{distanceCovered} km</Text>
          </View>
          <View style={styles.stepCountCircle}>
            <Text variant="titleMedium" style={{ alignSelf: 'center', textAlign: 'center', paddingBottom: 5 }}>Calories Burnt</Text>
            <Text variant="titleLarge" style={{ alignSelf: 'center', fontWeight: '700' }}>{caloriesBurnt}</Text>
          </View>
        </View>
      </View>
    </>
  );
}
