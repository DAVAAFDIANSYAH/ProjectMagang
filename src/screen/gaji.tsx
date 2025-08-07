import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles, pickerSelectStyles } from '../styles/gaji';
import { salaryTypes, months, years } from '../data/gaji';

const dummySalaryData = [
  {
    type: 'Gaji Pokok',
    month: 'Agustus',
    year: '2025',
    data: {
      nama: 'LYZN',
      jabatan: 'Staff IT',
      gajiPokok: 5000000,
      tunjangan: 1000000,
      potongan: 500000,
      totalGaji: 5500000,
    },
  },
  {
    type: 'Bonus',
    month: 'Agustus',
    year: '2025',
    data: {
      nama: 'LYZN',
      jabatan: 'Staff IT',
      bonus: 1000000,
      keterangan: 'Bonus proyek akhir tahun',
    },
  },
];

const GajiAndaScreen: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);

  const selectedData = dummySalaryData.find(
    item =>
      item.type === selectedType &&
      item.month === selectedMonth &&
      item.year === selectedYear,
  );

  return (
    <View style={styles.container}>
      <View style={styles.dropdownWrapper}>
        <RNPickerSelect
          onValueChange={value => setSelectedType(value)}
          items={salaryTypes}
          placeholder={{ label: 'Slip Gaji', value: null }}
          style={pickerSelectStyles}
          Icon={() => <Icon name="arrow-drop-down" size={24} color="gray" />}
        />

        <View style={styles.row}>
          <View style={styles.halfDropdown}>
            <RNPickerSelect
              onValueChange={value => setSelectedMonth(value)}
              items={months}
              placeholder={{ label: 'Bulan', value: null }}
              style={pickerSelectStyles}
              Icon={() => (
                <Icon name="arrow-drop-down" size={24} color="gray" />
              )}
            />
          </View>
          <View style={styles.halfDropdown}>
            <RNPickerSelect
              onValueChange={value => setSelectedYear(value)}
              items={years}
              placeholder={{ label: 'Tahun', value: null }}
              style={pickerSelectStyles}
              Icon={() => (
                <Icon name="arrow-drop-down" size={24} color="gray" />
              )}
            />
          </View>
        </View>
      </View>

      {selectedData ? (
        <View style={styles.reportContainer}>
          <Text style={styles.reportTitle}>Slip Gaji: {selectedData.type}</Text>
          <Text>Nama: {selectedData.data.nama}</Text>
          <Text>Jabatan: {selectedData.data.jabatan}</Text>

          {selectedData.type === 'Gaji Pokok' &&
          selectedData.data.gajiPokok !== undefined ? (
            <>
              <Text>
                Gaji Pokok: Rp {selectedData.data.gajiPokok.toLocaleString()}
              </Text>
              <Text>
                Tunjangan: Rp {selectedData.data.tunjangan?.toLocaleString()}
              </Text>
              <Text>
                Potongan: Rp {selectedData.data.potongan?.toLocaleString()}
              </Text>
              <Text style={styles.totalGaji}>
                Total Diterima: Rp{' '}
                {selectedData.data.totalGaji?.toLocaleString()}
              </Text>
            </>
          ) : selectedData.type === 'Bonus' &&
            selectedData.data.bonus !== undefined ? (
            <>
              <Text>Bonus: Rp {selectedData.data.bonus.toLocaleString()}</Text>
              <Text>Keterangan: {selectedData.data.keterangan}</Text>
            </>
          ) : null}
        </View>
      ) : (
        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/images/chatbot.png')}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.noDataText}>Tidak Ada Data Yang Ditampilkan</Text>
        </View>
      )}
    </View>
  );
};

export default GajiAndaScreen;
