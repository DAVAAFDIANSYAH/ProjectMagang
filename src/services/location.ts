import Geolocation from '@react-native-community/geolocation';

export const getCurrentPosition = (): Promise<{ latitude: number; longitude: number }> => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => {
        resolve(position.coords);
      },
      error => reject(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  });
};

export const fetchWithTimeout = (url: string, options = {}, timeout = 10000) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  return fetch(url, { ...options, signal: controller.signal }).finally(() => clearTimeout(id));
};

export const getLocationName = async (latitude: number, longitude: number): Promise<string> => {
  try {
    const res = await fetchWithTimeout(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
      { headers: { 'User-Agent': 'MarisonApp/1.0' } },
      10000
    );
    const data = await res.json();
    const a = data?.address;
    const nama = `${a?.suburb || a?.village || ''}, ${a?.county || a?.city || ''}`;
    const wilayah = `${a?.state || ''}`;
    return `${nama} - ${wilayah}`;
  } catch {
    return 'Lokasi tidak ditemukan';
  }
};
