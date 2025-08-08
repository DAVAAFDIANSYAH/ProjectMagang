import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Feather';
import { launchImageLibrary } from 'react-native-image-picker';
import styles from '../styles/profilestyles';

export default function ProfileScreen({ navigation }: any) {
  const [username, setUsername] = useState<string>('Guest User');
  const [avatar, setAvatar] = useState<string>(
    'https://i.pinimg.com/736x/21/f6/fc/21f6fc4abd29ba736e36e540a787e7da.jpg'
  );
  const [userJabatan, setUserJabatan] = useState<string>('Memuat...');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const storedName = await AsyncStorage.getItem('userName');
        const storedAvatar = await AsyncStorage.getItem('profileImage');
        const storedUserData = await AsyncStorage.getItem('userData');

        if (storedName) setUsername(storedName);
        if (storedAvatar) setAvatar(storedAvatar);

        console.log('STORED USER DATA:', storedUserData);

        if (storedUserData) {
          const parsedUser = JSON.parse(storedUserData);
          console.log('PARSED USER DATA:', parsedUser);
          setUserJabatan(parsedUser.position || 'Tidak diketahui');
        } else {
          setUserJabatan('Tidak diketahui');
        }
      } catch (error) {
        console.log('Error loading profile:', error);
        setUserJabatan('Gagal memuat');
      } finally {
        setLoading(false);
      }
    };

    const unsubscribe = navigation.addListener('focus', loadProfile);
    return unsubscribe;
  }, [navigation]);

  const handlePickImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.5,
    });

    if (result.didCancel) {
      console.log('User cancelled image picker');
    } else if (result.errorCode) {
      Alert.alert('Error', result.errorMessage || 'Gagal memilih gambar');
    } else if (result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      if (uri) {
        setAvatar(uri);
        await AsyncStorage.setItem('profileImage', uri);
        console.log('Foto profil diperbarui.');
      }
    }
  };

  const handleSignOut = async () => {
    try {
      await AsyncStorage.multiRemove([
        'auth_token',
        'userName',
        'profileImage',
        'userData', // Hapus semua user data
      ]);

      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.error('Error signing out:', error);
      Alert.alert('Logout Gagal', 'Terjadi kesalahan saat keluar.');
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.avatarWrapper}>
          <Image source={{ uri: avatar }} style={styles.avatar} />
          <TouchableOpacity style={styles.cameraButton} onPress={handlePickImage}>
            <Icon name="camera" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.nameText}>{username}</Text>
        <Text style={styles.jabatanText}>{userJabatan}</Text>
      </View>

      {/* Profile Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Profile</Text>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('detailprofile')}
        >
          <View style={styles.menuLeft}>
            <Icon name="user" size={24} color="#333" />
            <Text style={styles.menuText}>Profil Saya</Text>
          </View>
          <Icon name="chevron-right" size={20} color="#888" />
        </TouchableOpacity>
      </View>

      {/* Pengaturan Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pengaturan</Text>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('changePassword')}
        >
          <View style={styles.menuLeft}>
            <Icon name="key" size={24} color="#7c3aed" />
            <Text style={styles.menuText}>Keamanan</Text>
          </View>
          <Icon name="chevron-right" size={20} color="#888" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuLeft}>
            <Icon name="moon" size={24} color="#0ea5e9" />
            <Text style={styles.menuText}>Dark Mode</Text>
          </View>
          <Icon name="chevron-right" size={20} color="#888" />
        </TouchableOpacity>
      </View>

      {/* Sign Out */}
      <TouchableOpacity
        style={styles.signOutButton}
        onPress={() =>
          Alert.alert('Konfirmasi', 'Apakah kamu yakin ingin keluar?', [
            { text: 'Batal', style: 'cancel' },
            { text: 'Ya', onPress: handleSignOut },
          ])
        }
      >
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}
