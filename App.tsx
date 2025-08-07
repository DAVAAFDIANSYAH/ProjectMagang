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
import DetailProfileScreen from './src/screen/detailprofile';
import EditProfileScreen from './src/screen/editprofile';
import ChangePasswordScreen from './src/screen/ChangePassword';
import SplashScreen from './src/screen/SplashScreen'; // ✅ sesuai dengan nama file
import NotifikasiScreen from './src/screen/Notifikasi';
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
        <Stack.Screen name="bottomnav" component={BottomNav} options={{ headerShown: false }} />
        <Stack.Screen name="Maps" component={MapsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="gaji" component={gaji} options={{ headerShown: false }} />
        <Stack.Screen name="detailprofile" component={DetailProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="editprofile" component={EditProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="changePassword" component={ChangePasswordScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Notifikasi" component={NotifikasiScreen} options={{ headerShown: false }} />







      </Stack.Navigator>
    </NavigationContainer>
  );
}
