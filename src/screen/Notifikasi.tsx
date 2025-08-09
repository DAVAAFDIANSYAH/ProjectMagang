import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

interface Notification {
  id: number;
  title: string;
  message: string;
  created_at?: string;
}

export default function NotificationScreen() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const fetchNotifications = async () => {
    try {
      const token = await AsyncStorage.getItem('auth_token');
      const userId = await AsyncStorage.getItem('userId');

      if (!token || !userId) {
        Alert.alert('Error', 'User tidak ditemukan');
        return;
      }

      const response = await api.get(`/notifikasi/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Gabungkan data lama dan baru, filter duplikat berdasarkan id
      setNotifications(prev => {
        const merged = [...prev, ...response.data];
        const unique = merged.filter(
          (item, index, self) =>
            index === self.findIndex(n => n.id === item.id)
        );
        return unique;
      });
    } catch (error: any) {
      console.error(error.response?.data || error.message);
      Alert.alert('Gagal Memuat', 'Tidak bisa memuat notifikasi');
    } finally {
      setLoading(false);
    }
  };

  // Panggil pertama kali saat halaman dibuka
  useEffect(() => {
    fetchNotifications();
  }, []);

  // Auto refresh setiap kali balik ke halaman ini
  useFocusEffect(
    React.useCallback(() => {
      fetchNotifications();
    }, [])
  );

  const renderItem = ({ item }: { item: Notification }) => (
    <View style={styles.card}>
      <View style={styles.iconBox}>
        <Icon name="notifications" size={24} color="#22B14C" />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.message}>{item.message}</Text>
        {item.created_at && (
          <Text style={styles.date}>
            {new Date(item.created_at).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.sideButton}>
          <Icon name="arrow-back" size={24} color="#007bff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>📬 Notifikasi</Text>

        <View style={styles.sideButton} />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#22B14C" />
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          ListEmptyComponent={
            <View style={styles.emptyBox}>
              <Icon name="information-circle-outline" size={48} color="#bbb" />
              <Text style={styles.emptyText}>Tidak ada notifikasi baru.</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 50,
    marginBottom: 20,
  },
  sideButton: {
    width: 24,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    flex: 1,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FAFAFA',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E6F8ED',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222',
    marginBottom: 4,
  },
  message: {
    fontSize: 14,
    color: '#555',
  },
  date: {
    fontSize: 12,
    color: '#888',
    marginTop: 6,
  },
  emptyBox: {
    marginTop: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    marginTop: 12,
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});
