import React from 'react';
import { View, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { Surface, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

const Home = () => {
    const navigation = useNavigation();

    const handleTilePress = (screenName) => {
        navigation.navigate(screenName);
    };

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../../../assets/backPattern.png')} style={styles.backgroundImage}>
                <>
                    <Image
                        style={styles.logo}
                        source={require('../../../assets/HHLogoLight.jpg')}
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
};

export default Home;
