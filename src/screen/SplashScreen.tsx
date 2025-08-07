import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation<any>();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('auth_token');

        if (token) {
          navigation.reset({
            index: 0,
            routes: [{ name: 'bottomnav' }],
          });
        } else {
          navigation.reset({
            index: 0,
            routes: [{ name: 'OnboardingScreen' }],
          });
        }
      } catch (error) {
        console.error('Error checking token', error);
        navigation.reset({
          index: 0,
          routes: [{ name: 'OnboardingScreen' }],
        });
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#000" />
    </View>
  );
};

export default SplashScreen;