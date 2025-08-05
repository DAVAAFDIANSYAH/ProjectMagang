import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles, pickerSelectStyles } from '../styles/gaji';
import { salaryTypes, months, years } from '../data/gaji';

const GajiAndaScreen: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);

  return (
    <View style={styles.container}>
      <View style={styles.dropdownWrapper}>
        <RNPickerSelect
          onValueChange={(value) => setSelectedType(value)}
          items={salaryTypes}
          placeholder={{ label: 'Slip Gaji', value: null }}
          style={pickerSelectStyles}
          Icon={() => <Icon name="arrow-drop-down" size={24} color="gray" />}
        />

        <View style={styles.row}>
          <View style={styles.halfDropdown}>
            <RNPickerSelect
              onValueChange={(value) => setSelectedMonth(value)}
              items={months}
              placeholder={{ label: 'Agustus', value: null }}
              style={pickerSelectStyles}
              Icon={() => <Icon name="arrow-drop-down" size={24} color="gray" />}
            />
          </View>
          <View style={styles.halfDropdown}>
            <RNPickerSelect
              onValueChange={(value) => setSelectedYear(value)}
              items={years}
              placeholder={{ label: '2025', value: null }}
              style={pickerSelectStyles}
              Icon={() => <Icon name="arrow-drop-down" size={24} color="gray" />}
            />
          </View>
        </View>
      </View>

      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/images/chatbot.png')}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.noDataText}>Tidak Ada Data Yang Ditampilkan</Text>
      </View>
    </View>
  );
};

export default GajiAndaScreen;
