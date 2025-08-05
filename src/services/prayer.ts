import { fetchWithTimeout } from './location';

export interface PrayerTimes {
  subuh: string;
  terbit: string;
  dzuhur: string;
  ashar: string;
  maghrib: string;
  isya: string;
}

export const getPrayerTimes = async (latitude: number, longitude: number): Promise<PrayerTimes> => {
  const today = new Date().toISOString().slice(0, 10);

  try {
    const res = await fetchWithTimeout(
      `https://api.myquran.com/v2/sholat/jadwal/posisi?latitude=${latitude}&longitude=${longitude}&tanggal=${today}`,
      { headers: { Accept: 'application/json', 'Content-Type': 'application/json' } },
      10000
    );
    if (res.ok) {
      const json = await res.json();
      const jadwal = json?.data?.jadwal || json?.jadwal;
      if (jadwal) {
        return jadwal;
      } else throw new Error('Invalid structure');
    } else throw new Error('MyQuran failed');
  } catch {
    // Aladhan fallback
    try {
      const res = await fetchWithTimeout(
        `https://api.aladhan.com/v1/timings/${today}?latitude=${latitude}&longitude=${longitude}&method=20`,
        { headers: { Accept: 'application/json' } },
        10000
      );
      const json = await res.json();
      const t = json?.data?.timings;
      if (t) {
        return {
          subuh: t.Fajr,
          terbit: t.Sunrise,
          dzuhur: t.Dhuhr,
          ashar: t.Asr,
          maghrib: t.Maghrib,
          isya: t.Isha,
        };
      } else throw new Error('Aladhan invalid');
    } catch {
      return {
        subuh: '04:30',
        terbit: '05:45',
        dzuhur: '12:00',
        ashar: '15:15',
        maghrib: '18:00',
        isya: '19:15',
      };
    }
  }
};
