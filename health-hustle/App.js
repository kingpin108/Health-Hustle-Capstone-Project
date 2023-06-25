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
import WorkoutGoal from './src/components/WorkoutGoal/WorkoutGoal';
import Settings from './src/components/Settings/Settings';
import WorkoutProfile from './src/components/WorkoutProfile/WorkoutProfile';
import DietPlan from './src/components/DietPlans/DietPlan';
import FitnessBlogs from './src/components/FitnessBlogs/FitnessBlogs';
import StepCount from './src/components/StepCount/StepCount';

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
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="Workout" component={Workout} options={{ headerShown: false }} />
            <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
            <Stack.Screen name="RegistrationForm" component={RegistrationForm} options={{ headerShown: false }} />
            <Stack.Screen name="WorkoutCalendar" component={WorkoutCalendar} options={{ headerShown: false }} />
            <Stack.Screen name="WorkoutList" component={WorkoutList} options={{ headerShown: false }} />
            <Stack.Screen name="Workout_details" component={Workout_details} options={{ headerShown: false }} />
            <Stack.Screen name="WorkoutProfile" component={WorkoutProfile} options={{ headerShown: false }} />
            <Stack.Screen name="DietPlan" component={DietPlan} options={{ headerShown: false }} />
            <Stack.Screen name="WorkoutGoal" component={WorkoutGoal} options={{ headerShown: false }} />
            <Stack.Screen name="FitnessBlogs" component={FitnessBlogs} options={{ headerShown: false }} />
            <Stack.Screen name="StepCount" component={StepCount} options={{ headerShown: false }} />

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