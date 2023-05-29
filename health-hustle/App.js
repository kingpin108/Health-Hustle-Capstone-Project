import React, { useContext } from 'react';
import styles from './src/styles/main';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginRegister from './src/components/LoginRegister/LoginRegister';
import Demo from './src/components/Demo/Demo';
import { AuthContext } from './src/contexts/AuthContext';

const Stack = createStackNavigator();


export default function App() {
  const { user } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <Stack.Screen name="Demo" component={Demo} options={{ headerShown: false, }} />
        ) : (
          <Stack.Screen name="Login" component={LoginRegister} options={{ headerShown: false, }} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
