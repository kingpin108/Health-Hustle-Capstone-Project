import React, { useEffect, useContext, useState } from 'react';
import { View, Image, ImageBackground, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Provider as PaperProvider, MD3DarkTheme, MD3LightTheme, Surface, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { AuthContext } from '../../contexts/AuthContext';
import { database } from '../../database/config';


const Home = () => {
    const navigation = useNavigation();
    const { uid } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    const [theme, setTheme] = useState(false);

    const handleTilePress = (screenName) => {
        navigation.navigate(screenName);
    };

    useEffect(() => {
        const userRef = database.ref(`users/${uid}/formData`);
        const isDarkActiveRef = userRef.child('isDarkActive');

        const handleSnapshot = (snapshot) => {
            const isDarkActive = snapshot.val();
            setTheme(isDarkActive);
            setIsLoading(false);
        };

        const handleFetchError = (error) => {
            console.error('Error fetching isDarkActive from Firebase:', error);
            setIsLoading(false);
        };

        isDarkActiveRef.on('value', handleSnapshot, handleFetchError);

        return () => {
            isDarkActiveRef.off('value', handleSnapshot);
        };
    }, [uid]);

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    } else {
        return (
            <View style={styles.container}>
                <ImageBackground source={theme ? require('../../../assets/invertedBackPattern.png') : require('../../../assets/backPattern.png')} style={styles.backgroundImage}>
                    <>
                        <Image
                            style={styles.logo}
                            source={theme ? require('../../../assets/HHLogo.png') : require('../../../assets/HHLogoLight.jpg')}
                        />
                        <View style={styles.row}>
                            <TouchableOpacity onPress={() => handleTilePress('Workout')}>
                                <Surface style={styles.tile}>
                                    <Image
                                        style={styles.tileImage}
                                        source={require('../../../assets/tileIcon1.png')}
                                    />
                                    <Text variant="titleMedium" style={styles.tileText}>Workouts</Text>
                                </Surface>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleTilePress('FitnessBlogs')}>
                                <Surface style={styles.tile}>
                                    <Image
                                        style={styles.tileImage}
                                        source={require('../../../assets/tileIcon2.png')}
                                    />
                                    <Text variant="titleMedium" style={styles.tileText}>Fitness Blogs</Text>
                                </Surface>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.row}>
                            <TouchableOpacity onPress={() => handleTilePress('StepCount')}>
                                <Surface style={styles.tile}>
                                    <Image
                                        style={styles.tileImage}
                                        source={require('../../../assets/tileIcon3.png')}
                                    />
                                    <Text variant="titleMedium" style={styles.tileText}>Step Count</Text>
                                </Surface>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleTilePress('Settings')}>
                                <Surface style={styles.tile}>
                                    <Image
                                        style={styles.tileImage}
                                        source={require('../../../assets/tileIcon4.png')}
                                    />
                                    <Text variant="titleMedium" style={styles.tileText}>Settings</Text>
                                </Surface>
                            </TouchableOpacity>
                        </View>
                    </>
                </ImageBackground>
            </View>
        );
    }
};

export default Home;
