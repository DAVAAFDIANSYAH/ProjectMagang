import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import SwipeButton from 'rn-swipe-button';

// Asumsi ini adalah import yang diperlukan dari file lain
import { RootStackParamList } from '../types/Navigation';
import { getCurrentPosition, getLocationName } from '../services/location';
import { getPrayerTimes, PrayerTimes } from '../services/prayer';
import api from '../services/api';
import styles from '../styles/Dashboardstyles';


type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Maps'>;

export default function Dashboard() {
  const navigation = useNavigation<NavigationProp>();
  const [username, setUsername] = useState('Guest User');
  const [time, setTime] = useState(new Date());
  const [location, setLocation] = useState('Memuat lokasi...');
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [infoTitle, setInfoTitle] = useState('');
  const [infoDescription, setInfoDescription] = useState('');
  const [userJabatan, setUserJabatan] = useState<string>('');
  const [shiftStatus, setShiftStatus] = useState<'masuk' | 'none'>('none');
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [elapsedTime, setElapsedTime] = useState('00:00:00');
  const [swipeKey, setSwipeKey] = useState(0); // State baru untuk mereset tombol

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (shiftStatus === 'masuk' && startTime) {
      interval = setInterval(() => {
        const now = new Date().getTime();
        const start = startTime.getTime();
        const diff = now - start;

        const hours = Math.floor(diff / (1000 * 60 * 60)).toString().padStart(2, '0');
        const minutes = Math.floor((diff / (1000 * 60)) % 60).toString().padStart(2, '0');
        const seconds = Math.floor((diff / 1000) % 60).toString().padStart(2, '0');

        setElapsedTime(`${hours}:${minutes}:${seconds}`);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [shiftStatus, startTime]);

  const fetchAllData = useCallback(async () => {
    setRefreshing(true);
    setLoading(true);

    try {
      const name = await AsyncStorage.getItem('userName');
      if (name) setUsername(name);

      const userDataStr = await AsyncStorage.getItem('userData');
      if (userDataStr) {
        const userData = JSON.parse(userDataStr);
        if (userData.position) {
          setUserJabatan(userData.position);
        }
      }

      const coords = await getCurrentPosition();
      const { latitude, longitude } = coords;

      const locName = await getLocationName(latitude, longitude);
      setLocation(locName);

      const prayer = await getPrayerTimes(latitude, longitude);
      setPrayerTimes(prayer);
    } catch {
      setLocation('Gagal mendapatkan lokasi');
      setPrayerTimes({
        subuh: '04:30',
        terbit: '05:45',
        dzuhur: '12:00',
        ashar: '15:15',
        maghrib: '18:00',
        isya: '19:15',
      });
    }

    try {
      const token = await AsyncStorage.getItem('auth_token');
      if (token) {
        const response = await api.get('/informasi-karyawan', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const info = response.data;
        if (info && info.title && info.description) {
          setInfoTitle(info.title);
          setInfoDescription(info.description);
        } else {
          setInfoTitle('Informasi');
          setInfoDescription('Tidak ada informasi tersedia.');
        }
      }
    } catch {
      setInfoTitle('Informasi');
      setInfoDescription('Tidak ada informasi tersedia.');
    }

    const status = await AsyncStorage.getItem('shiftStatus');
    const startTimeStr = await AsyncStorage.getItem('startTime');

    if (status === 'masuk' && startTimeStr) {
      setShiftStatus('masuk');
      setStartTime(new Date(startTimeStr));
    } else {
      setShiftStatus('none');
      setStartTime(null);
      setElapsedTime('00:00:00');
    }

    setRefreshing(false);
    setLoading(false);
  }, []);

  const handleSwipeSuccess = () => {
    navigation.navigate('Maps');
    // Reset tombol swipe dengan mengubah key
    setSwipeKey(prevKey => prevKey + 1);
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchAllData();
    }, [fetchAllData])
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#22B14C" barStyle="light-content" />
      <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={fetchAllData} colors={['#22B14C']} />}
      >
        {/* HEADER */}
        <View style={styles.headerBox}>
          <View style={styles.profileRow}>
            <View style={styles.avatar} />
            <View style={{ flex: 1 }}>
              <Text style={styles.welcome}>Welcome, {username}</Text>
              <Text style={styles.jabatanText}>{userJabatan}</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Notifikasi')}>
              <Icon name="bell" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* CARD ABSEN */}
        <View style={[styles.absenCard, { width: '75%', alignSelf: 'center' }]}>
          <Text style={styles.dateText}>
            {new Intl.DateTimeFormat('id-ID', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            }).format(time)}
          </Text>
          <View style={styles.clockRow}>
            <Text style={styles.clockNumber}>{elapsedTime}</Text>
          </View>
          <Text style={styles.shift}>10:00 - 18:00</Text>
        </View>

        {/* CARD LOKASI & SHOLAT */}
        <View style={styles.locationCard}>
          <Text style={styles.locationTitle}>{location}</Text>
          <Text style={styles.locationSubtitle}>Indonesia</Text>
          {loading ? (
            <View style={{ marginTop: 12, alignItems: 'center' }}>
              <ActivityIndicator size="small" color="#22B14C" />
              <Text style={{ marginTop: 8, fontSize: 12, color: '#666' }}>Memuat waktu sholat...</Text>
            </View>
          ) : prayerTimes ? (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 12 }}>
              <View style={styles.prayerTimesRow}>
                {[
                  { label: 'Subuh', time: prayerTimes.subuh, icon: 'cloud' },
                  { label: 'Terbit', time: prayerTimes.terbit, icon: 'sunrise' },
                  { label: 'Dzuhur', time: prayerTimes.dzuhur, icon: 'sun' },
                  { label: 'Ashar', time: prayerTimes.ashar, icon: 'sunset' },
                  { label: 'Maghrib', time: prayerTimes.maghrib, icon: 'moon' },
                  { label: 'Isya', time: prayerTimes.isya, icon: 'moon' },
                ].map((item, i) => (
                  <View key={i} style={styles.prayercard}>
                    <Icon name={item.icon} size={20} color="#333" />
                    <Text style={styles.prayerLabel}>{item.label}</Text>
                    <Text style={styles.prayerTime}>{item.time}</Text>
                  </View>
                ))}
              </View>
            </ScrollView>
          ) : (
            <View style={{ marginTop: 12, alignItems: 'center' }}>
              <Text style={{ fontSize: 12, color: '#666' }}>Waktu sholat tidak tersedia</Text>
            </View>
          )}
        </View>

        {/* CARD INFO */}
        <View style={styles.infoRow}>
          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>Keterlambatan</Text>
            <Text style={styles.infoValue}>0 Hari</Text>
          </View>
          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>Izin Kerja</Text>
            <Text style={styles.infoValue}>0 Hari</Text>
          </View>
        </View>

        {/* PESAN */}
        <View style={styles.messageBox}>
          <Text style={styles.messageHeader}>{infoTitle}</Text>
          <Text style={styles.messageText}>{infoDescription}</Text>
        </View>
      </ScrollView>
      {/* TOMBOL MASUK/KELUAR DI LUAR CARD - DIBAWAH */}
      <View style={styles.bottomButtonContainer}>
        <SwipeButton
          key={swipeKey}
          height={55}
          width={'95%'}
          railBackgroundColor={shiftStatus === 'none' ? '#d4f5e0' : '#ffd6d6'}
          railFillBackgroundColor={shiftStatus === 'none' ? '#22B14C' : '#FF5252'}
          thumbIconBackgroundColor={'#fff'}
          thumbIconComponent={() => (
            <Icon
              name="arrow-right"
              size={20}
              color={shiftStatus === 'none' ? '#22B14C' : '#FF5252'}
            />
          )}
          title={shiftStatus === 'none' ? 'Swipe to Clock In' : 'Swipe to Clock Out'}
          titleColor={shiftStatus === 'none' ? '#22B14C' : '#FF5252'}
          onSwipeSuccess={handleSwipeSuccess}
        />
      </View>
    </SafeAreaView>
  );
}