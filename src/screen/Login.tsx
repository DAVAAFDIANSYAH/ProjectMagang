import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/Navigation';
import styles from '../styles/Loginstyles'; // <== Import styling terpisah
import api from '../services/api';  
import AsyncStorage from '@react-native-async-storage/async-storage';
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export default function LoginScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
  if (!email || !password) {
    Alert.alert('Error', 'Please enter email and password');
    return;
  }

  try {
    const response = await api.post('/login', { email, password });
    const { token, user } = response.data;

    // Simpan nama user ke AsyncStorage
    await AsyncStorage.setItem('userName', user.name);

    Alert.alert('Welcome', `Hello, ${user.name}`);
    navigation.replace('bottomnav');
  } catch (error: any) {
    console.error(error.response?.data || error.message);
    Alert.alert('Login Failed', error.response?.data?.message || 'Something went wrong');
  }
};

  return (
    <View style={styles.root}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.innerContainer}>
            <Text style={styles.title}>Welcome Back 👋</Text>
            <Image
              source={require('../assets/images/chatbot.png')}
              style={styles.image}
              resizeMode="contain"
            />

            <View style={styles.form}>
              <TextInput
                style={styles.input}
                placeholder="Email Address"
                placeholderTextColor="#00FF99"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#00FF99"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />

              <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>

              <View style={styles.signUpContainer}>
                <Text style={styles.signUpText}>Don't have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                  <Text style={styles.signUpLink}> Register</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
