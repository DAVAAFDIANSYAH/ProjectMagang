import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/Navigation';
import api from '../services/api';
import registerStyles from '../styles/Registerstyles';
import AsyncStorage from '@react-native-async-storage/async-storage';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;

export default function RegisterScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setConfrim_password] =useState('');

  const handleRegister = async () => {
  if (!name || !email || !password || !password_confirmation) {
    Alert.alert('Error', 'Please fill in all fields');
    return;
  }

  if (password !== password_confirmation) {
    Alert.alert('Error', 'Passwords do not match');
    return;
  }

  try {
    const response = await api.post('/register', {
      name,
      email,  
      password,
      password_confirmation
    });

    const { user } = response.data;

    await AsyncStorage.setItem('userName', user.name);

    console.log('Registration success:', user);
    Alert.alert('Success', 'Account created successfully!');
    navigation.navigate('Login');
  } catch (error: any) {
    console.error('Registration failed:', error.response?.data || error.message);
    Alert.alert(
      'Registration Failed',
      error.response?.data?.message || 'Unexpected error'
    );
  }
};



  return (
    <View style={registerStyles.root}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={registerStyles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={registerStyles.innerContainer}>
            <Image
              source={require('../assets/images/chatbot.png')}
              style={registerStyles.image}
              resizeMode="contain"
            />

            <View style={registerStyles.form}>
              <TextInput
                style={registerStyles.input}
                placeholder="Name"
                placeholderTextColor="#00FF99"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />
              <TextInput
                style={registerStyles.input}
                placeholder="Email Address"
                placeholderTextColor="#00FF99"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TextInput
                style={registerStyles.input}
                placeholder="Password"
                placeholderTextColor="#00FF99"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
               <TextInput
                style={registerStyles.input}
                placeholder="confirm password"
                placeholderTextColor="#00FF99"
                secureTextEntry
                value={password_confirmation}
                onChangeText={setConfrim_password}
              />

              <TouchableOpacity style={registerStyles.button} onPress={handleRegister}>
                <Text style={registerStyles.buttonText}>Create Account</Text>
              </TouchableOpacity>

              <View style={registerStyles.signInContainer}>
                <Text style={registerStyles.signInText}>Already have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Text style={registerStyles.signInLink}> Sign In</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
