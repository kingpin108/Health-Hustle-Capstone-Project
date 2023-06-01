import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginRegister from './src/components/LoginRegister/LoginRegister';
import { AuthContext, AuthProvider } from './src/contexts/AuthContext';
import Workout from './src/components/Workout/Workout';
import Screen2 from './src/components/Screen2/Screen2';
import Screen3 from './src/components/Screen3/Screen3';
import Screen4 from './src/components/Screen4/Screen4';
import Demo from './src/components/Demo/Demo';

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
        // <Tab.Navigator
        //   screenOptions={{
        //     activeTintColor: 'blue',
        //     inactiveTintColor: 'gray',
        //     style: { backgroundColor: 'white' },
        //   }}
        // >
        //   <Tab.Screen name="Demo" component={Demo} />
        //   <Tab.Screen name="Screen2" component={Screen2} />
        //   <Tab.Screen name="Screen3" component={Screen3} />
        //   <Tab.Screen name="Screen4" component={Screen4} />
        // </Tab.Navigator>
        <Stack.Navigator>
          <Stack.Screen name="Demo" component={Demo} options={{ headerShown: false }} />
          {/* <Stack.Screen name="Screen2" component={Screen2} options={{ headerShown: false }} /> */}

        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginRegister} options={{ headerShown: false }} />

        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}