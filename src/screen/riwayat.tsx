import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  TextInput,
  StyleSheet,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';

import RiwayatStyles from '../styles/Riwayat';
import { launchImageLibrary } from 'react-native-image-picker';

const opsijenisizin = [
  { label: 'Terlambat', value: 'Terlambat' },
  { label: 'Tidak Masuk', value: 'Tidak Masuk' },
];
const opsilamaizin = Array.from({ length: 7 }, (_, i) => ({
  label: `${i + 1} hari`,
  value: `${i + 1} hari`,
}));
const opsikondisiizin = [
  { label: 'Izin', value: 'Izin' },
  { label: 'Sakit', value: 'Sakit' },
  { label: 'Izin Khusus', value: 'Izin Khusus' },
];
const statusKeterlambatan = [
  { label: 'Pekerjaan', value: 'Pekerjaan' },
  { label: 'Pribadi', value: 'Pribadi' },
];

export default function Riwayat() {
  const today = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState<string>(today);

  const [modalVisible, setModalVisible] = useState(false);

  const [jenisIzin, setJenisIzin] = useState<string | null>(null);
  const [lamaIzin, setLamaIzin] = useState<string | null>(null);
  const [kondisiIzin, setKondisiIzin] = useState<string | null>(null);
  const [statusTelat, setStatusTelat] = useState<string | null>(null);
  const [keterangan, setKeterangan] = useState<string>('');
  const [lampiran, setLampiran] = useState<string | null>(null);

  // 🆕 Data izin dummy
  const [izinData, setIzinData] = useState<{ [date: string]: any }>({});
  const isPastDate = (date: string) => {
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);

    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);

    return checkDate < todayDate;
  };

  const pilihLampiran = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
      selectionLimit: 2,
    });
    if (result.assets && result.assets.length > 0) {
      setLampiran(result.assets[0].uri ?? null);
    }
  };

  type DropdownItem = { label: string; value: string };

  const renderDropdown = (
    data: DropdownItem[],
    value: string | null,
    setValue: React.Dispatch<React.SetStateAction<string | null>>,
    placeholder: string,
  ) => (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      data={data}
      labelField="label"
      valueField="value"
      placeholder={placeholder}
      value={value}
      onChange={(item: DropdownItem) => setValue(item.value)}
      renderLeftIcon={() => (
        <AntDesign style={styles.icon} name="Safety" size={20} color="black" />
      )}
    />
  );

  // 🆕 Function untuk menambah hari pada tanggal
  const addDays = (dateString: string, days: number) => {
    const date = new Date(dateString);
    date.setDate(date.getDate() + days);
    return date.toISOString().split('T')[0];
  };

  // 🆕 Simpan izin dummy dengan rentang tanggal
  const handleAjukan = () => {
    if (!selectedDate) return;

    let lama = 1; // default 1 hari
    if (jenisIzin === 'Tidak Masuk' && lamaIzin) {
      lama = parseInt(lamaIzin); // karena lamaIzin disimpan "X hari"
    }

    const newIzin = {
      jenisIzin,
      lamaIzin,
      kondisiIzin,
      statusTelat,
      keterangan,
      lampiran,
      approval: 'Pending', // 🆕 Default approval status
    };

    setIzinData(prev => {
      const updated = { ...prev };

      // Simpan izin untuk setiap hari dalam rentang
      for (let i = 0; i < lama; i++) {
        const currentDate = addDays(selectedDate, i);
        updated[currentDate] = newIzin;
      }
      return updated;
    });

    setModalVisible(false);
    // Reset form
    setJenisIzin(null);
    setLamaIzin(null);
    setKondisiIzin(null);
    setStatusTelat(null);
    setKeterangan('');
    setLampiran(null);
  };

  const izinHariIni = selectedDate ? izinData[selectedDate] : null;

  // 🆕 Fungsi untuk cek apakah tanggal terblokir
  const isTanggalBlocked = (date: string) => {
    return izinData.hasOwnProperty(date);
  };

  return (
    <ScrollView style={RiwayatStyles.container}>
      <View style={RiwayatStyles.calendarWrapper}>
        <Calendar
          current={new Date().toISOString().split('T')[0]}
          onDayPress={day => setSelectedDate(day.dateString)}
          markedDates={{
            [selectedDate]: {
              selected: true,
              selectedColor: '#22B14C',
              disableTouchEvent: true,
            },
          }}
        />
      </View>

      <View style={RiwayatStyles.content}>
        <Text style={RiwayatStyles.header}>Riwayat Absen</Text>
        {selectedDate && izinHariIni ? (
          <>
            <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>
              Data Izin {selectedDate}:
            </Text>
            <Text>Jenis: {izinHariIni.jenisIzin}</Text>
            {izinHariIni.lamaIzin && <Text>Lama: {izinHariIni.lamaIzin}</Text>}
            {izinHariIni.kondisiIzin && (
              <Text>Kondisi: {izinHariIni.kondisiIzin}</Text>
            )}
            {izinHariIni.statusTelat && (
              <Text>Status Telat: {izinHariIni.statusTelat}</Text>
            )}
            {izinHariIni.keterangan && (
              <Text>Keterangan: {izinHariIni.keterangan}</Text>
            )}
            {izinHariIni.lampiran && (
              <Image
                source={{ uri: izinHariIni.lampiran }}
                style={{ width: 100, height: 100, marginTop: 5 }}
              />
              
            )}
            <Text>Status: {izinHariIni.approval}</Text>

          </>
        ) : (
          <>
            <Image
              source={require('../assets/images/chatbot.png')}
              style={RiwayatStyles.image}
              resizeMode="contain"
            />
            <Text style={RiwayatStyles.description}>
              Silahkan pilih tanggal, lalu tap button pengajuan izin kerja
            </Text>
            {selectedDate &&
            !isTanggalBlocked(selectedDate) &&
            !isPastDate(selectedDate) ? (
              <TouchableOpacity
                style={RiwayatStyles.button}
                onPress={() => setModalVisible(true)}
              >
                <Text style={RiwayatStyles.buttonText}>Ajukan Izin Kerja</Text>
              </TouchableOpacity>
            ) : null}
          </>
        )}
      </View>

      {/* Modal Form */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Izin Kerja</Text>

            {renderDropdown(
              opsijenisizin,
              jenisIzin,
              setJenisIzin,
              'Pilih Jenis Izin',
            )}

            {/* Jika Terlambat */}
            {jenisIzin === 'Terlambat' && (
              <>
                {renderDropdown(
                  statusKeterlambatan,
                  statusTelat,
                  setStatusTelat,
                  'Pilih Status Izin',
                )}
                <TextInput
                  placeholder="Keterangan"
                  value={keterangan}
                  onChangeText={setKeterangan}
                  style={styles.textArea}
                  multiline
                />
                {/* Lampiran hanya untuk Terlambat */}
                <TouchableOpacity
                  style={styles.lampiranBtn}
                  onPress={pilihLampiran}
                >
                  <Text style={styles.lampiranText}>Pilih Lampiran Bukti</Text>
                </TouchableOpacity>
                {lampiran && (
                  <Image
                    source={{ uri: lampiran }}
                    style={styles.previewImage}
                  />
                )}
              </>
            )}

            {/* Jika Tidak Masuk */}
            {jenisIzin === 'Tidak Masuk' && (
              <>
                {renderDropdown(
                  opsilamaizin,
                  lamaIzin,
                  setLamaIzin,
                  'Pilih Lama Izin',
                )}
                {renderDropdown(
                  opsikondisiizin,
                  kondisiIzin,
                  setKondisiIzin,
                  'Pilih Kondisi Izin',
                )}

                {/* Lampiran hanya jika kondisi Sakit */}
                {kondisiIzin === 'Sakit' && (
                  <>
                    <TouchableOpacity
                      style={styles.lampiranBtn}
                      onPress={pilihLampiran}
                    >
                      <Text style={styles.lampiranText}>
                        Pilih Lampiran Bukti
                      </Text>
                    </TouchableOpacity>
                    {lampiran && (
                      <Image
                        source={{ uri: lampiran }}
                        style={styles.previewImage}
                      />
                    )}
                  </>
                )}
              </>
            )}

            <View style={styles.actionRow}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setModalVisible(false)}
              >
                <Text style={{ color: 'white' }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.submitBtn} onPress={handleAjukan}>
                <Text style={{ color: 'white' }}>Ajukan</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    backgroundColor: '#ccc',
    padding: 20,
    borderRadius: 20,
    width: '90%',
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  dropdown: {
    height: 50,
    borderColor: 'green',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  placeholderStyle: { fontSize: 14, color: '#999' },
  selectedTextStyle: { fontSize: 14 },
  icon: { marginRight: 5 },
  textArea: {
    borderWidth: 0.5,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    minHeight: 60,
    textAlignVertical: 'top',
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  lampiranBtn: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  lampiranText: { color: 'black' },
  previewImage: { width: 100, height: 100, marginTop: 5, marginBottom: 10 },
  actionRow: { flexDirection: 'row', justifyContent: 'space-between' },
  cancelBtn: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 8,
    width: '45%',
    alignItems: 'center',
  },
  submitBtn: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 8,
    width: '45%',
    alignItems: 'center',
  },
});
