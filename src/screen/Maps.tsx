import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import haversine from 'haversine-distance';
import { launchCamera } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

type LatLng = {
  latitude: number;
  longitude: number;
};

const App = () => {
  const [userLocation, setUserLocation] = useState<LatLng | null>(null);
  const [distance, setDistance] = useState<string | null>(null);
  const [withinRange, setWithinRange] = useState(false);
  const [shiftStatus, setShiftStatus] = useState<'none' | 'masuk' | 'keluar'>('none');

  const navigation = useNavigation();

  const absenLocation: LatLng = {
    latitude: -7.828194,
    longitude: 110.374139,
  };

  const radius = 100;

  useEffect(() => {
    let watchId: number;

    const getShift = async () => {
      const status = await AsyncStorage.getItem('shiftStatus');
      if (status === 'masuk') {
        setShiftStatus('masuk');
      } else {
        setShiftStatus('none');
      }
    };

    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          watchUserLocation();
        } else {
          console.log('Izin lokasi ditolak');
        }
      } else {
        watchUserLocation();
      }
    };

    const watchUserLocation = () => {
      watchId = Geolocation.watchPosition(
        position => {
          const { latitude, longitude } = position.coords;
          const userPos = { latitude, longitude };
          setUserLocation(userPos);

          const distanceInMeters = haversine(userPos, absenLocation);
          setDistance(distanceInMeters.toFixed(2));
          setWithinRange(distanceInMeters <= radius);
        },
        error => console.log(error.message),
        {
          enableHighAccuracy: true,
          distanceFilter: 1,
          interval: 3000,
          fastestInterval: 2000,
        }
      );
    };

    getShift();
    requestLocationPermission();

    return () => {
      if (watchId != null) {
        Geolocation.clearWatch(watchId);
      }
    };
  }, []);

  const handleCameraAbsen = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA
    );

    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
      Alert.alert('Izin Kamera Ditolak', 'Anda harus mengizinkan kamera');
      return;
    }

    launchCamera({ mediaType: 'photo', cameraType: 'back' }, async response => {
      if (response.didCancel) {
        console.log('Batal ambil foto');
      } else if (response.errorCode) {
        Alert.alert('Error', response.errorMessage || 'Gagal membuka kamera');
      } else {
        const photo = response.assets?.[0];
        console.log('Foto berhasil:', photo?.uri);

        const now = new Date();

        if (shiftStatus === 'none') {
          await AsyncStorage.setItem('shiftStatus', 'masuk');
          await AsyncStorage.setItem('startTime', now.toISOString());
          Alert.alert('Berhasil', '✅ Absen Masuk Berhasil');
          setShiftStatus('masuk');
        } else if (shiftStatus === 'masuk') {
          await AsyncStorage.setItem('shiftStatus', 'none');
          await AsyncStorage.removeItem('startTime');
          Alert.alert('Berhasil', '✅ Absen Keluar Berhasil');
          setShiftStatus('keluar'); // untuk sementara visual feedback
        }

        navigation.goBack(); // Kembali ke dashboard
      }
    });
  };

  if (!userLocation) return <View style={styles.container} />;

  const getAbsenLabel = () => {
    if (shiftStatus === 'none') return '📸 Absen Masuk';
    if (shiftStatus === 'masuk') return '📸 Absen Keluar';
    return '';
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        showsUserLocation={true}
        followsUserLocation={true}
      >
        <Marker coordinate={userLocation} title="Lokasi Anda" />
        <Marker coordinate={absenLocation} title="Titik Absen" pinColor="green" />
        <Circle
          center={absenLocation}
          radius={radius}
          strokeWidth={1}
          strokeColor="green"
          fillColor="rgba(0,255,0,0.2)"
        />
      </MapView>

      <View style={styles.statusContainer}>
        <Text
          style={[
            styles.statusText,
            { color: withinRange ? 'green' : 'red' },
          ]}
        >
          {withinRange
            ? `✅ Anda Dalam Lingkup Absen`
            : `❌ Anda Diluar Lingkup\nJarak: ${distance} meter`}
        </Text>

        {withinRange && (
          <TouchableOpacity style={styles.absenButton} onPress={handleCameraAbsen}>
            <Text style={styles.absenButtonText}>{getAbsenLabel()}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  statusContainer: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    elevation: 5,
  },
  statusText: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 10,
  },
  absenButton: {
    backgroundColor: '#22B14C',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
  },
  absenButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default App;
