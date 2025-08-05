import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  Text,
} from 'react-native';
import MapView, { Marker, Circle, Region } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import haversine from 'haversine-distance';

// Buat tipe koordinat
type LatLng = {
  latitude: number;
  longitude: number;
};

const App = () => {
  const [userLocation, setUserLocation] = useState<LatLng | null>(null);
  const [distance, setDistance] = useState<string | null>(null);
  const [withinRange, setWithinRange] = useState(false);

  // Titik absen tetap
  const absenLocation: LatLng = {
    latitude: -7.828194,
    longitude: 110.374139,
  };

  const radius = 100;

  useEffect(() => {
    let watchId: number;

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

    requestLocationPermission();

    return () => {
      if (watchId != null) {
        Geolocation.clearWatch(watchId);
      }
    };
  }, []);

  if (!userLocation) return <View style={styles.container} />;

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
            ? '✅ Anda Berada Dalam Lingkup Absen'
            : `❌ Anda Tidak Dalam Lingkup Absen${'\n'}Jarak Anda: ${distance} meter`}
        </Text>
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
  },
});

export default App;
