import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator
} from 'react-native';
import api from '../services/api';

export default function products() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/items')
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching all products:', err);
        setLoading(false);
      });
  }, []);

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.card}>
      {item.image ? (
        <Image source={{ uri: item.image }} style={styles.image} />
      ) : (
        <View style={styles.imagePlaceholder}><Text>No Image</Text></View>
      )}
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>Rp {Number(item.price).toLocaleString('id-ID')}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Semua Produk</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#66BB6A" />
      ) : (
        <FlatList
          data={data}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#E8F5E9' },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    padding: 10,
    width: '48%',
  },
  image: { width: '100%', aspectRatio: 1, borderRadius: 10 },
  imagePlaceholder: {
    width: '100%', aspectRatio: 1,
    justifyContent: 'center', alignItems: 'center', backgroundColor: '#ccc'
  },
  name: { marginTop: 6, fontWeight: '600' },
  price: { fontWeight: 'bold', color: '#2e7d32' }
});
