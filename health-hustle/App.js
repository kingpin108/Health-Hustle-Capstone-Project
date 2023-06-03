import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginRegister from './src/components/LoginRegister/LoginRegister';
import { AuthContext, AuthProvider } from './src/contexts/AuthContext';
import Workout from './src/components/Workout/Workout';
import Home from './src/components/Home/Home';
import Screen3 from './src/components/Screen3/Screen3';
import Screen4 from './src/components/Screen4/Screen4';
import RegistrationForm from './src/components/RegistrationForm/RegistrationForm';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}

const AppNavigator = () => {
  const { user } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!user ? (
        <Stack.Navigator>
<<<<<<< Updated upstream
          <Stack.Screen name="RegistrationForm" component={RegistrationForm} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
=======
          <Stack.Screen name="Demo" component={Workout} options={{ headerShown: false }} />
          <Stack.Screen name="Screen3" component={Screen3} options={{ headerShown: false }} />
          <Stack.Screen name="Screen2" component={Screen2} options={{ headerShown: false }} />

          <Stack.Screen name="Screen4" component={Screen4} options={{ headerShown: false }} />
>>>>>>> Stashed changes
        </Stack.Navigator>
        
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginRegister} options={{ headerShown: false }} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}