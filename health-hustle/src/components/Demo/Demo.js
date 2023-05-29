import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import styles from './styles';

const Demo = () => {
    return (
        <View style={styles.container}>
            <StatusBar style="auto" hidden />
            <Text>Demo Page</Text>
        </View>
    );
};

export default Demo;
