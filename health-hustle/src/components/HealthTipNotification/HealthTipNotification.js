import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, View, Platform, Alert, ActivityIndicator } from 'react-native';
import { Provider as PaperProvider, Button, Appbar, Drawer, Switch, List, MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { StatusBar } from 'expo-status-bar';
import { AuthContext } from '../../contexts/AuthContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications'
import { database } from '../../database/config';
import { TextInput } from 'react-native-gesture-handler';


//[#4] Users get daily health tip notifications
//[#12]Notify users about the hydration check.


export default function HealthTipNotification() {
    const navigation = useNavigation();

    const handleBack = () => {
        navigation.goBack();
    };

    const [activeItem, setActiveItem] = React.useState('home');
    const [healthTips, setHealthTips] = useState([]);
    const [selectedTip, setSelectedTip] = useState('');
    const [reminder, setReminder] = useState(false);
    const [hydration, setHydration] = useState(false);
    const [schedule, setSchedule] = useState([]);
    const [theme, setTheme] = useState(false);
    const [timeValue, setTimeValue] = useState('');
    const [timeHydration, setTimeHydration] = useState('');
    const { uid } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);



    const handleTimeInputChange = (text) => {
        setTimeValue(text);
    };

    const handleHydrationInputChange = (text) => {
        setTimeHydration(text);
    };

    const handleReminderPress = async () => {
        setReminder(!reminder)
        // if (!reminder) {
        //     const scheduled = await scheduleReminder();
        //     if (scheduled) {
        //         setReminder(true);
        //         setSchedule(await getSchedule());
        //     }
        // } else {
        //     const cancelled = await cancelReminder();
        //     if (cancelled) {
        //         setReminder(false);
        //         setSchedule(await getSchedule());
        //     }
        // }
    }

    const handleHydrationPress = async () => {
        setHydration(!hydration)
    }

    useEffect(() => {
        (async () => {
            const previouslyScheduled = await getSchedule();
            setSchedule(previouslyScheduled);
            if (previouslyScheduled.find((item) => item.type === 'reminder')) {
                setReminder(true);
            }
            if (previouslyScheduled.find((item) => item.type === 'hydration')) {
                setHydration(true);
            }
        })();
    }, []);

    const handleSave = async () => {
        const timeValueInt = parseInt(timeValue);
        const timeHydrationInt = parseInt(timeHydration);

        if (reminder && timeValue.trim() === '') {
            Alert.alert('Invalid Reminder Time', 'Please enter a valid reminder time between 1 and 60.');
            return;
        }

        if (hydration && timeHydration.trim() === '') {
            Alert.alert('Invalid Hydration Time', 'Please enter a valid hydration time between 1 and 60.');
            return;
        }

        setTimeValue(validateTime(timeValueInt));
        setTimeHydration(validateTime(timeHydrationInt));

        console.log('Toggle state saved:', reminder);

        if (reminder) {
            if (isNaN(timeValueInt) || timeValueInt < 1 || timeValueInt > 60) {
                Alert.alert('Invalid Reminder Time', 'Please enter a valid reminder time between 1 and 60.');
                return;
            }
            await scheduleReminder(timeValueInt);

        } else {
            await cancelReminder();
        }

        if (hydration) {
            if (isNaN(timeHydrationInt) || timeHydrationInt < 1 || timeHydrationInt > 60) {
                Alert.alert('Invalid Hydration Time', 'Please enter a valid hydration time between 1 and 60.');
                return;
            }
            await scheduleHydrationReminder(timeHydrationInt);
        } else {
            await cancelHydrationReminder();
        }

        Alert.alert('Settings Saved', 'Your settings have been saved successfully.');
    };

    const validateTime = (time) => {
        const parsedTime = parseInt(time);
        return isNaN(parsedTime) ? '' : parsedTime.toString();
    };

    // const fetchHealthTips = async () => {
    //     try {
    //       const healthTipsRef = database.ref('HealthTips');
    //       const snapshot = await healthTipsRef.once('value');
    //       const healthTipsData = snapshot.val();
    //       const healthTipsArray = Object.values(healthTipsData);
    //     //   console.log("Health Array: ", healthTipsArray);
    //       setHealthTips(healthTipsArray);

    //       if (healthTipsArray.length > 0) {
    //         const randomIndex = Math.floor(Math.random() * healthTipsArray.length);
    //         const tip = healthTipsArray[randomIndex];
    //         console.log("Tip: ", tip);
    //         setSelectedTip(tip);
    //       }
    //     } catch (error) {
    //       console.log('Error fetching health tips:', error);
    //     }
    //   };

    //   useEffect(() => {
    //     fetchHealthTips();
    //   }, []);

    //Load scheduled reminders

    useEffect(() => {
        const userRef = database.ref(`users/${uid}/formData`);
    
        userRef
          .once('value')
          .then((snapshot) => {
            const formData = snapshot.val();
            if (formData && formData.isDarkActive !== undefined) {
              setTheme(formData.isDarkActive); 
              setIsLoading(false);
            }
          })
          .catch((error) => {
            console.error('Error fetching isDarkActive from Firebase:', error);
            setIsLoading(false);

          });
      }, [uid]);

    const themeStyles = theme ? darkThemeStyles : lightThemeStyles;


    const paperTheme =
        theme
            ? { ...MD3DarkTheme }
            : { ...MD3LightTheme };

    
        if (isLoading) {
            return (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color="#1e0578" />
                </View>
            );
        } else {
            return (

        <PaperProvider theme={paperTheme}>
            {theme ? <></> : <StatusBar bar-style={'light-content'} />}            
            <Appbar.Header style={styles.appHeaderContainer}>
                <Appbar.BackAction onPress={handleBack} />
                <Appbar.Content
                    title="Notification"
                    titleStyle={styles.appHeaderTitle}
                />
            </Appbar.Header>
            <>
                <View style={[themeStyles.container]}>
                    <Drawer.Section>
                        <List.Item
                            title="Daily Health Tips"
                            left={(props) => <MaterialCommunityIcons name="tooltip-plus" size={24} {...props} />}
                            right={() => (
                                <Switch
                                    value={reminder}
                                    onValueChange={handleReminderPress}
                                />
                            )}
                        />
                        {reminder && (
                            <TextInput
                                label="Enter time"
                                placeholder="Enter time (mins)"
                                value={timeValue}
                                onChangeText={handleTimeInputChange}
                                style={styles.textInput}
                                keyboardType="numeric"
                            />
                        )}
                    </Drawer.Section>
                    <Drawer.Section>
                        <List.Item
                            title="Hydration Check"
                            left={(props) => <MaterialCommunityIcons name="cup" size={24} {...props} />}
                            right={() => (
                                <Switch
                                    value={hydration}
                                    onValueChange={handleHydrationPress}
                                />
                            )}
                        />
                        {hydration && (
                            <TextInput
                                label="Enter time"
                                placeholder="Enter time (mins)"
                                value={timeHydration}
                                onChangeText={handleHydrationInputChange}
                                style={styles.textInput}
                                keyboardType="numeric"
                            />
                        )}
                    </Drawer.Section>
                    <Button icon={({ color, size }) => <MaterialCommunityIcons name="content-save" size={size} color={color} />}
                        mode="contained"
                        onPress={handleSave}
                        style={{ margin: 16 }}>
                        Save
                    </Button>
                </View>
            </>
            </PaperProvider>
    )};

};

async function scheduleReminder(notificationTime) {
    console.log('Schedule for', Platform.OS);

    try {
        const permissions = await Notifications.getPermissionsAsync();
        console.log('Permissions:', permissions);
        if (!permissions.granted) {
            const request = await Notifications.requestPermissionsAsync({
                ios: {
                    allowAlert: true,
                    allowSound: true,
                    allowBadge: true
                }
            });
            console.log('Request: ', request);
            if (!request.granted) {
                return false;
            }
        }

        const id = await Notifications.scheduleNotificationAsync({
            content: {
                title: 'Daily Health Tip',
                body: 'Get enough sleep to support your overall well-being.',
                sound: true,
                subtitle: 'Stay Healthy!',
                color: 'green',
                priority: Notifications.AndroidNotificationPriority.HIGH,
                badge: 1,
                data: {
                    userId: 205,
                    userName: 'Ruhi',
                    type: 'reminder'
                }
            },
            trigger: {
                seconds: notificationTime * 60,
                repeats: true
            }
        });
        console.log('Schedule Id: ', id);

        if (!id) {
            return false
        }
        return true;
    }
    catch {
        return false;
    }
}

async function cancelReminder() {
    console.log('Cancel for', Platform.OS);
    let cancelled = false;

    const schedule = await getSchedule();

    for (const item of schedule) {
        if (item.type === 'reminder') {
            await Notifications.cancelScheduledNotificationAsync(item.id);
            console.log('Cancelled:', item.id);
            cancelled = true;
        }
    }

    console.log('Was cancelled:', cancelled);
    return cancelled;
}

async function getSchedule() {
    const scheduledNotifications = await Notifications.getAllScheduledNotificationsAsync();
    const schedule = [];
    scheduledNotifications.forEach((scheduledNotification) => {
        schedule.push({
            id: scheduledNotification.identifier,
            type: scheduledNotification.content.data.type
        });
    });

    return schedule;

}


async function scheduleHydrationReminder(notificationTime) {
    console.log('Schedule for', Platform.OS);

    try {
        const permissions = await Notifications.getPermissionsAsync();
        console.log('Permissions:', permissions);
        if (!permissions.granted) {
            const request = await Notifications.requestPermissionsAsync({
                ios: {
                    allowAlert: true,
                    allowSound: true,
                    allowBadge: true
                }
            });
            console.log('Request: ', request);
            if (!request.granted) {
                return false;
            }
        }

        const id = await Notifications.scheduleNotificationAsync({
            content: {
                title: 'Hydration Check',
                body: 'Remember to drink water',
                sound: true,
                subtitle: 'Stay Hydrated!',
                color: 'blue',
                priority: Notifications.AndroidNotificationPriority.HIGH,
                badge: 1,
                data: {
                    userId: 205,
                    userName: 'Ruhi',
                    type: 'hydration'
                },
            },
            trigger: {
                seconds: notificationTime * 60,
                repeats: true
            }
        });
        console.log('Schedule Id: ', id);

        if (!id) {
            return false
        }
        return true;
    }
    catch {
        return false;
    }
}

async function cancelHydrationReminder() {
    console.log('Cancel for', Platform.OS);
    let cancelled = false;

    const schedule = await getSchedule();

    for (const item of schedule) {
        if (item.type === 'hydration') {
            await Notifications.cancelScheduledNotificationAsync(item.id);
            console.log('Cancelled:', item.id);
            cancelled = true;
        }
    }

    console.log('Was cancelled:', cancelled);
    return cancelled;
}

const lightThemeStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        backgroundColor: 'white',
    },
});

const darkThemeStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        backgroundColor: '#444444',
    },
});

