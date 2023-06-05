import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginRegister from './src/components/LoginRegister/LoginRegister';
import { AuthContext, AuthProvider } from './src/contexts/AuthContext';
import Home from './src/components/Home/Home';
import RegistrationForm from './src/components/RegistrationForm/RegistrationForm';
import Workout from './src/components/Workout/Workout';
import WorkoutList from './src/components/WorkoutList/WorkoutList';
import WorkoutCalendar from './src/components/WorkoutCalendar/WorkoutCalendar';
import Workout_details from './src/components/Workout_details/Workout_details';

const Stack = createStackNavigator();

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
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen name="Workout" component={Workout} options={{ headerShown: false }} />
            <Stack.Screen name="RegistrationForm" component={RegistrationForm} options={{ headerShown: false }} />
            <Stack.Screen name="WorkoutCalendar" component={WorkoutCalendar} options={{ headerShown: false }} />
            <Stack.Screen name="WorkoutList" component={WorkoutList} options={{ headerShown: false }} />
            <Stack.Screen name="Workout_details" component={Workout_details} options={{ headerShown: false }} />

          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginRegister} options={{ headerShown: false }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}