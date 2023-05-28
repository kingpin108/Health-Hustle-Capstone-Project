import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import styles from './src/styles/main';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginRegister from './src/components/LoginRegister/LoginRegister';
import Demo from './src/components/Demo/Demo';
const Stack = createStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginRegister} />
        <Stack.Screen name="Demo" component={Demo} />
        {/* Other screens */}
      </Stack.Navigator>
    </NavigationContainer>



  );
}
