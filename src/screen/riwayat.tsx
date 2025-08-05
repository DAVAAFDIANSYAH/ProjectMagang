import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import RiwayatStyles from '../styles/Riwayat';

export default function Riwayat() {
  const [selectedDate, setSelectedDate] = useState('');

  return (
    <View style={RiwayatStyles.container}>
      <View style={RiwayatStyles.calendarWrapper}>
        <Calendar
          current={new Date().toISOString().split('T')[0]}
          onDayPress={(day) => setSelectedDate(day.dateString)}
          markedDates={{
            [selectedDate]: {
              selected: true,
              selectedColor: '#22B14C',
              disableTouchEvent: true,
            },
          }}
          theme={{
            backgroundColor: '#D9D9D9',
            calendarBackground: '#D9D9D9',
            textSectionTitleColor: '#000',
            selectedDayBackgroundColor: '#22B14C',
            selectedDayTextColor: '#fff',
            todayTextColor: '#22B14C',
            dayTextColor: '#000',
            monthTextColor: '#000',
            arrowColor: '#22B14C',
            textMonthFontWeight: 'bold',
            textDayFontSize: 16,
            textMonthFontSize: 18,
            textDayHeaderFontSize: 14,
          }}
        />
      </View>

      <View style={RiwayatStyles.content}>
        <Text style={RiwayatStyles.header}>Riwayat Absen</Text>
        <Image
          source={require('../assets/images/chatbot.png')}
          style={RiwayatStyles.image}
          resizeMode="contain"
        />
        <Text style={RiwayatStyles.description}>
          Silahkan pilih tanggal, lalu tap button pengajuan izin kerja
        </Text>
        <TouchableOpacity style={RiwayatStyles.button}>
          <Text style={RiwayatStyles.buttonText}>Ajukan Izin Kerja</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
