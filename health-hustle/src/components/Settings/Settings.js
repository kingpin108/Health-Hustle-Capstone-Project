import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, View} from 'react-native';
import {
    Provider as PaperProvider, MD3DarkTheme, MD3LightTheme, Button, Appbar, Drawer, Switch
} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { StatusBar } from 'expo-status-bar';
import { AuthContext } from '../../contexts/AuthContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { database } from '../../database/config';



const url = "https://info6127-1119668-default-rtdb.firebaseio.com/Health_husle/dummy/-NMemxkO7aLtUBPtdCmV.json";

const Settings = () => {
    const navigation = useNavigation();

    const handleHomePress = () => {
        navigation.navigate('Home');
    };

    const [activeItem, setActiveItem] = React.useState('home');
    const [theme, setTheme] = useState(false);
    const { uid } = useContext(AuthContext);


    const handleItemPress = (item) => {
        setActiveItem(item);
        navigation.navigate(item);
    };

    const { logout } = useContext(AuthContext);

    const handleLogout = async () => {
        try {
            await logout();
            console.log('User logged out successfully.');
            navigation.navigate('Login');

        } catch (error) {
            console.log('Error logging out:', error);
        }
    };


    useEffect(() => {
        const userRef = database.ref(`users/${uid}/formData`);

        userRef.once('value')
            .then((snapshot) => {
                const formData = snapshot.val();
                if (formData && formData.isDarkActive !== undefined) {
                    setTheme(formData.isDarkActive);
                }
            })
            .catch((error) => {
                console.error('Error fetching isDarkActive from Firebase:', error);
            });
    }, [uid]);

    const themeStyles = theme ? darkThemeStyles : lightThemeStyles;


    const updateThemeInFirebase = (value) => {
        const userRef = database.ref(`users/${uid}/formData`);

        userRef.update({
            isDarkActive: value,
        }).then(() => {
            console.log('isDarkActive updated in Firebase:', value);
        }).catch((error) => {
            console.error('Error updating isDarkActive in Firebase:', error);
        });
    };

    useEffect(() => {
        const userRef = database.ref(`users/${uid}`);

        userRef.once('value').then((snapshot) => {
            const userData = snapshot.val();
            if (userData && userData.theme !== undefined) {
                setTheme(userData.theme);
            }
        }).catch((error) => {
            console.error('Error fetching theme from Firebase:', error);
        });
    }, [uid]);

    const handleThemePress = async () => {
        const newThemeValue = !theme;
        setTheme(newThemeValue);
        updateThemeInFirebase(newThemeValue);
    }

    const paperTheme =
        theme
            ? { ...MD3DarkTheme }
            : { ...MD3LightTheme };

    return (
        <PaperProvider theme={paperTheme}>
            {theme ? <></>: <StatusBar bar-style={'light-content'} />}
            <Appbar.Header style={styles.appHeaderContainer}>
                <Appbar.Content
                    title="Settings"
                    titleStyle={styles.appHeaderTitle}
                />
                <Appbar.Action icon="home" onPress={handleHomePress} />
            </Appbar.Header>
            <>
                <View style={[themeStyles.container]}>
                    <Drawer.Section >
                        <Drawer.Item
                            label="Profile"
                            icon="account"
                            active={activeItem === 'profile'}
                            onPress={() => handleItemPress('WorkoutProfile')}
                        />
                    </Drawer.Section>
                    <Drawer.Section>
                        <Drawer.Item
                            label="Provide Feedback"
                            icon="message-reply-text-outline"
                            active={activeItem === 'feedback'}
                            onPress={() => handleItemPress('Feedback')}
                        />
                    </Drawer.Section>
                    <Drawer.Section>
                        <Drawer.Item
                            label="Notifications"
                            icon="bell"
                            active={activeItem === 'settings'}
                            onPress={() => handleItemPress('HealthTipNotification')}
                        />
                    </Drawer.Section>
                    <Drawer.Section>
                        <Drawer.Item
                            label="Change Theme"
                            icon={({ color, size }) => <MaterialCommunityIcons name="theme-light-dark" size={size} color={color} />}
                            active={activeItem === 'theme'}
                            right={() => (
                                <Switch value={theme} onValueChange={handleThemePress} />
                            )}
                        />
                    </Drawer.Section>
                    <Button icon="logout" mode="contained" onPress={handleLogout} style={{ margin: 16 }}>
                        Logout
                    </Button>
                </View>
            </>
        </PaperProvider>
    );
};

export default Settings;

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
