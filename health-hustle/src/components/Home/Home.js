import React from 'react';
import { View, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { Surface, Text } from 'react-native-paper';
import styles from './styles';

const Home = () => {
    const handleTilePress = (tileName) => {
        // Handle the press event based on the tile name
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
                        <TouchableOpacity onPress={() => handleTilePress('Workouts')}>
                            <Surface style={styles.tile}>
                                <Image
                                    style={styles.tileImage}
                                    source={require('../../../assets/tileIcon1.png')}
                                />
                                <Text variant="titleMedium" style={styles.tileText}>Workouts</Text>
                            </Surface>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleTilePress('Fitness Blogs')}>
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
                        <TouchableOpacity onPress={() => handleTilePress('Step Count')}>
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
