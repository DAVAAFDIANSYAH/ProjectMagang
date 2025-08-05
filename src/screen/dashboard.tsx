import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/Navigation';
import styles from '../styles/Dashboardstyles';
import { getCurrentPosition, getLocationName } from '../services/location';
import { getPrayerTimes, PrayerTimes } from '../services/prayer';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Maps'>;

export default function Dashboard() {
  const navigation = useNavigation<NavigationProp>();
  const [username, setUsername] = useState('Guest User');
  const [time, setTime] = useState(new Date());
  const [location, setLocation] = useState('Memuat lokasi...');
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem('userName').then(name => {
      if (name) setUsername(name);
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => setLoading(false), 15000);

    getCurrentPosition()
      .then(async coords => {
        const { latitude, longitude } = coords;

        setLocation(await getLocationName(latitude, longitude));
        setPrayerTimes(await getPrayerTimes(latitude, longitude));

        clearTimeout(timeoutId);
        setLoading(false);
      })
      .catch(() => {
        setLocation('Gagal mendapatkan lokasi');
        setPrayerTimes({
          subuh: '04:30',
          terbit: '05:45',
          dzuhur: '12:00',
          ashar: '15:15',
          maghrib: '18:00',
          isya: '19:15',
        });
        clearTimeout(timeoutId);
        setLoading(false);
      });

    return () => clearTimeout(timeoutId);
  }, []);

  const formatTime = (d: Date) => ({
    hours: d.getHours().toString().padStart(2, '0'),
    minutes: d.getMinutes().toString().padStart(2, '0'),
    seconds: d.getSeconds().toString().padStart(2, '0'),
  });

  const { hours, minutes, seconds } = formatTime(time);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#22B14C" barStyle="light-content" />
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
       <View style={styles.headerBox}>
  <View style={styles.profileRow}>
    <View style={styles.avatar} />
    <View style={{ flex: 1 }}>
      <Text style={styles.welcome}>Selamat Pagi, {username}</Text>
    </View>
    <TouchableOpacity onPress={() => console.log('Notifikasi ditekan')}>
      <Icon name="bell" size={24} color="#fff" />
    </TouchableOpacity>
  </View>
</View>

        

        <View style={styles.absenCard}>
          <Text style={styles.dateText}>Senin 4 Agustus 2025</Text>
          <View style={styles.clockRow}>
            <Text style={styles.clockNumber}>{hours}</Text>
            <Text style={styles.clockNumber}>{minutes}</Text>
            <Text style={styles.clockNumber}>{seconds}</Text>
          </View>
          <Text style={styles.shift}>08:00 - 15:30</Text>
          <TouchableOpacity style={styles.btnMasuk} onPress={() => navigation.navigate('Maps')}>
            <Text style={styles.btnText}>→ Masuk</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.locationCard}>
          <Text style={styles.locationTitle}>{location}</Text>
          <Text style={styles.locationSubtitle}>Indonesia</Text>

          {loading ? (
            <View style={{ marginTop: 12, alignItems: 'center' }}>
              <ActivityIndicator size="small" color="#22B14C" />
              <Text style={{ marginTop: 8, fontSize: 12, color: '#666' }}>
                Memuat waktu sholat...
              </Text>
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

        <View style={styles.messageBox}>
          <Text style={styles.messageHeader}>Hai</Text>
          <Text style={styles.messageText}>
            Selamat datang di aplikasi Marison Regency. Silahkan melakukan absensi{'\n'}Jangan telat
            ya:))
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
