import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import changeStyles from '../styles/ChangePassword'; // ubah ini agar tidak bentrok

export default function ChangePasswordScreen({ navigation }: any) {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user'); // sesuaikan key-nya
        const storedToken = await AsyncStorage.getItem('userToken'); // key token

        if (storedUser) setUser(JSON.parse(storedUser));
        if (storedToken) setToken(storedToken);
      } catch (error) {
        console.error('Gagal memuat user/token:', error);
      }
    };

    loadData();
  }, []);

  const handleSubmit = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      Alert.alert('Error', 'Semua field wajib diisi.');
      return;
    }
    if (newPassword.length < 6) {
      Alert.alert('Error', 'Password baru minimal 6 karakter.');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Konfirmasi password tidak cocok.');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('https://API-KAMU.com/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({
          old_password: oldPassword,
          new_password: newPassword,
          user_id: user?.id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Gagal mengganti password');
      }

      Alert.alert('Berhasil', 'Password berhasil diganti', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={changeStyles.container}>
      <View style={changeStyles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#007bff" />
        </TouchableOpacity>
        <Text style={changeStyles.headerTitle}>Change Password</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={changeStyles.form}>
        <Text style={changeStyles.label}>Password Lama</Text>
        <TextInput
          style={changeStyles.input}
          secureTextEntry
          value={oldPassword}
          onChangeText={setOldPassword}
          placeholder="Masukkan password lama"
        />

        <Text style={changeStyles.label}>Password Baru</Text>
        <TextInput
          style={changeStyles.input}
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
          placeholder="Masukkan password baru"
        />

        <Text style={changeStyles.label}>Konfirmasi Password Baru</Text>
        <TextInput
          style={changeStyles.input}
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Ulangi password baru"
        />

        <TouchableOpacity
          style={[changeStyles.button, loading && { opacity: 0.7 }]}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={changeStyles.buttonText}>
            {loading ? 'Menyimpan...' : 'Simpan'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
