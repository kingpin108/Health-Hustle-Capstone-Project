import React, { useContext } from 'react';
import { StyleSheet, ImageBackground, View, Dimensions, SafeAreaView, Image, ScrollView, Touchable } from 'react-native';
import { Button, Text, IconButton, Appbar, useTheme, Drawer, Divider, TouchableRipple } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { StatusBar } from 'expo-status-bar';
import { AuthContext } from '../../contexts/AuthContext';

const url = "https://info6127-1119668-default-rtdb.firebaseio.com/Health_husle/dummy/-NMemxkO7aLtUBPtdCmV.json";

const Settings = () => {
    const navigation = useNavigation();

    const handleHomePress = () => {
        navigation.navigate('Home');
    };

    const [activeItem, setActiveItem] = React.useState('home');

    const handleItemPress = (item) => {
        setActiveItem(item);
        navigation.navigate(item);
    };

    const { logout } = useContext(AuthContext);

    const handleLogout = async () => {
        try {
            await logout();
            console.log('User logged out successfully.');
        } catch (error) {
            console.log('Error logging out:', error);
        }
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
            <>
                <View style={{ flex: 1, paddingTop: 30, backgroundColor: 'white' }}>
                    <Drawer.Section>
                        <Drawer.Item
                            label="Profile"
                            icon="account"
                            active={activeItem === 'profile'}
                            onPress={() => handleItemPress('WorkoutProfile')}
                        />
                    </Drawer.Section>
                    <Drawer.Section>
                        <Drawer.Item
                            label="Notifications"
                            icon="bell"
                            active={activeItem === 'settings'}
                            onPress={() => handleItemPress('settings')}
                        />
                    </Drawer.Section>
                    <Drawer.Section>
                        <Drawer.Item
                            label="Theme"
                            icon="theme-light-dark"
                            active={activeItem === 'theme'}
                            onPress={() => handleItemPress('theme')}
                            right={() => (
                                <Text>Light</Text>
                            )}
                        />
                    </Drawer.Section>
                    <Drawer.Section>
                        <Drawer.Item
                            label="About"
                            icon="information"
                            active={activeItem === 'about'}
                            onPress={() => handleItemPress('about')}
                        />
                    </Drawer.Section>
                    <Button icon="logout" mode="contained" onPress={handleLogout} style={{ margin: 16 }}>
                        Logout
                    </Button>
                </View>
            </>
        </>
    );
};

export default Settings;