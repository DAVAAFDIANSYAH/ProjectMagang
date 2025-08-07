// src/screens/DetailProfileScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/detailprofilestyles';

export default function DetailProfileScreen({ navigation }: any) {
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'personal' | 'professional' | 'document'>('personal');

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUserData = await AsyncStorage.getItem('userData');
        if (storedUserData) {
          setUser(JSON.parse(storedUserData));
        }
      } catch (error) {
        console.error('Gagal memuat data user dari AsyncStorage:', error);
      }
    };

    loadUser();
  }, []);

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Memuat data...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="#007bff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>My Profile</Text>

        <TouchableOpacity onPress={() => navigation.navigate('editprofile', { user })}>
          <Feather name="edit" size={24} color="#007bff" />
        </TouchableOpacity>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        {['personal', 'professional', 'document'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tabItem, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab as any)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      <View style={styles.content}>
        {activeTab === 'personal' && (
          <View>
            <Text style={styles.label}>Nama:</Text>
            <Text style={styles.value}>{user.name || '-'}</Text>

            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{user.email || '-'}</Text>

            <Text style={styles.label}>No. Telepon:</Text>
            <Text style={styles.value}>{user.telephone || '-'}</Text>

            <Text style={styles.label}>Jenis Kelamin:</Text>
            <Text style={styles.value}>{user.jenis_kelamin || '-'}</Text>

            <Text style={styles.label}>Tempat Lahir:</Text>
            <Text style={styles.value}>{user.tempat_lahir || '-'}</Text>

            <Text style={styles.label}>Tanggal Lahir:</Text>
            <Text style={styles.value}>
              {user.tanggal_lahir ? new Date(user.tanggal_lahir).toLocaleDateString('id-ID') : '-'}
            </Text>

            <Text style={styles.label}>Alamat:</Text>
            <Text style={styles.value}>{user.address || '-'}</Text>
          </View>
        )}

        {activeTab === 'professional' && (
          <View>
            <Text style={styles.label}>Jabatan:</Text>
            <Text style={styles.value}>{user.position || '-'}</Text>

            <Text style={styles.label}>Pangkat:</Text>
            <Text style={styles.value}>{user.rank || '-'}</Text>

            <Text style={styles.label}>Divisi:</Text>
            <Text style={styles.value}>{user.department || '-'}</Text>
          </View>
        )}

        {activeTab === 'document' && (
          <View>
            <Text style={styles.label}>Bank:</Text>
            <Text style={styles.value}>{user.bankName || '-'}</Text>

            <Text style={styles.label}>No Rekening:</Text>
            <Text style={styles.value}>{user.bankAccountNumber || '-'}</Text>

            <Text style={styles.label}>Atas Nama:</Text>
            <Text style={styles.value}>{user.bankAccountHolder || '-'}</Text>

            <Text style={styles.label}>Tanggal Join:</Text>
            <Text style={styles.value}>
              {user.joinDate ? new Date(user.joinDate).toLocaleDateString('id-ID') : '-'}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}
