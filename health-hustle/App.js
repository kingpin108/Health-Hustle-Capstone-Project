import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import styles from './src/styles/main';
import LoginRegister from './src/components/LoginRegister/LoginRegister';

export default function App() {
  return (
    <View style={styles.container}>
      <LoginRegister />
      <StatusBar style="auto" />
    </View>
  );
}
