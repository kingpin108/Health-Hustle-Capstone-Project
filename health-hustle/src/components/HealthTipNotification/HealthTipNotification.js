import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, ImageBackground, View, Dimensions, SafeAreaView, Image, ScrollView, Touchable, Platform } from 'react-native';
import { Button, Text, IconButton, Appbar, useTheme, Drawer, Divider, TouchableRipple, Switch } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { StatusBar } from 'expo-status-bar';
import { AuthContext } from '../../contexts/AuthContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications'
import { database } from '../../database/config';

export default function HealthTipNotification() {
    const navigation = useNavigation();

    const handleHomePress = () => {
        navigation.navigate('Home');
    };

    const [activeItem, setActiveItem] = React.useState('home');
    const [healthTips, setHealthTips] = useState([]);
    const [selectedTip, setSelectedTip] = useState('');
    const [reminder, setReminder] = useState(false);
    const [hydration, setHydration] = useState(false);
    const [schedule, setSchedule] = useState([]);

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

    //Load scheduled reminders
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
        // Save the toggle state or any other data
        // Here you can perform actions like storing the state in AsyncStorage or sending it to a server
        console.log('Toggle state saved:', reminder);

        // Update the schedule if the reminder is enabled
        if (reminder) {
            await scheduleReminder();
        } else {
            await cancelReminder();
        }

        if (hydration) {
            await scheduleHydrationReminder();
        } else {
            await cancelHydrationReminder();
        }
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
    
    return (
        <>
            <StatusBar bar-style='dark-content' />
            <Appbar.Header style={styles.appHeaderContainer}>
                <Appbar.Content
                    title="Notification"
                    titleStyle={styles.appHeaderTitle}
                />
                <Appbar.Action icon="home" onPress={handleHomePress} />
            </Appbar.Header>
            <>
                <View style={{ flex: 1, paddingTop: 30, backgroundColor: 'white' }}>
                    <Drawer.Section>
                        <Drawer.Item
                            label="Daily Health Tips"
                            icon={({ color, size }) => <MaterialCommunityIcons name="tooltip-plus" size={size} color={color} />}
                            active={activeItem === 'DailyHealthTip'}
                            right={() => (
                                <Switch
                                    value={reminder} // Replace with your toggle value state
                                    onValueChange={handleReminderPress} // Replace with your toggle value change handler
                                />
                            )}
                        />
                    </Drawer.Section>
                    <Drawer.Section>
                        <Drawer.Item
                            label="Hydration Check"
                            icon={({ color, size }) => <MaterialCommunityIcons name="cup" size={size} color={color} />}
                            active={activeItem === 'hydrationCheck'}
                            right={() => (
                                <Switch
                                    value={hydration} // Replace with your toggle value state
                                    onValueChange={handleHydrationPress} // Replace with your toggle value change handler
                                />
                            )}
                        />
                    </Drawer.Section>
                    <Button icon={({ color, size }) => <MaterialCommunityIcons name="content-save" size={size} color={color} />}
                        mode="contained"
                        onPress={handleSave}
                        style={{ margin: 16 }}>
                        Save
                    </Button>
                </View>
            </>
        </>
    );
};

async function scheduleReminder() {
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

        //Schedule a Notification
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
                seconds: 5,
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


async function scheduleHydrationReminder() {
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

        //Schedule a Notification
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
                seconds: 8,
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

