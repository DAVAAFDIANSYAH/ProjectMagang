import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from './src/screen/Onboarding';
import LoginScreen from './src/screen/Login';
import RegisterScreen from './src/screen/Register';
import { RootStackParamList } from './src/types/navigation';
import Dashboard from './src/screen/dashboard';
import BottomNav from './src/screen/bottomnav';
import MapsScreen from './src/screen/Maps';
import gaji from './src/screen/gaji';
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="OnboardingScreen">
        <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
        <Stack.Screen name="bottomnav" component={BottomNav} options={{ headerShown: false }} />
        <Stack.Screen name="Maps" component={MapsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="gaji" component={gaji} options={{ headerShown: false }} />



      </Stack.Navigator>
    </NavigationContainer>
  );
}
