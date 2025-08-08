// EditProfileScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/editprofilestyles';

export default function EditProfileScreen({ navigation }: any) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState<string | null>(null);
  const [birthPlace, setBirthPlace] = useState('');
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [address, setAddress] = useState('');
  const [bankName, setBankName] = useState<string | null>(null);
  const [bankAccountNumber, setBankAccountNumber] = useState('');
  const [bankAccountHolder, setBankAccountHolder] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profileData = await AsyncStorage.getItem('userProfile');
        const userData = await AsyncStorage.getItem('userData');

        const profile = profileData ? JSON.parse(profileData) : {};
        const user = userData ? JSON.parse(userData) : {};

        // Gunakan userProfile jika ada, fallback ke userData
        setPhoneNumber(profile.phoneNumber ?? user.telephone ?? '');
        setEmail(profile.email ?? user.email ?? '');
        setGender(profile.gender ?? user.jenis_kelamin ?? null);
        setBirthPlace(profile.birthPlace ?? user.tempat_lahir ?? '');
        setBirthDate(
          profile.birthDate
            ? new Date(profile.birthDate)
            : user.tanggal_lahir
            ? new Date(user.tanggal_lahir)
            : null,
        );
        setAddress(profile.address ?? user.address ?? '');
        setBankName(profile.bankName ?? user.bankName ?? null);
        setBankAccountNumber(
          profile.bankAccountNumber ?? user.bankAccountNumber ?? '',
        );
        setBankAccountHolder(
          profile.bankAccountHolder ?? user.bankAccountHolder ?? '',
        );
      } catch (error) {
        console.log('Error loading profile:', error);
      }
    };
    loadProfile();
  }, []);

  const validateField = (field: string, value: string | null | Date) => {
    let message = '';
    switch (field) {
      case 'phoneNumber':
        if (!value || !/^\d+$/.test(String(value)))
          message = 'Phone number harus berupa angka!';
        break;
      case 'email':
        if (!value || !/\S+@\S+\.\S+/.test(String(value)))
          message = 'Format email tidak valid!';
        break;
      case 'gender':
        if (!value) message = 'Pilih gender!';
        break;
      case 'birthPlace':
        if (!value) message = 'Tempat lahir wajib diisi!';
        break;
      case 'birthDate':
        if (!value) message = 'Pilih tanggal lahir!';
        break;
      case 'address':
        if (!value) message = 'Alamat wajib diisi!';
        break;
      case 'bankName':
        if (!value) message = 'Pilih nama bank!';
        break;
      case 'bankAccountNumber':
        if (!value || !/^\d+$/.test(String(value)))
          message = 'Nomor rekening harus berupa angka!';
        break;
      case 'bankAccountHolder':
        if (!value) message = 'Nama pemilik rekening wajib diisi!';
        break;
    }
    setErrors(prev => ({ ...prev, [field]: message }));
    return message === '';
  };

  const validateForm = () => {
    return (
      validateField('phoneNumber', phoneNumber) &&
      validateField('email', email) &&
      validateField('gender', gender) &&
      validateField('birthPlace', birthPlace) &&
      validateField('birthDate', birthDate) &&
      validateField('address', address) &&
      validateField('bankName', bankName) &&
      validateField('bankAccountNumber', bankAccountNumber) &&
      validateField('bankAccountHolder', bankAccountHolder)
    );
  };

  const handleSave = async () => {
    if (validateForm()) {
      const newProfile = {
        phoneNumber,
        email,
        gender,
        birthPlace,
        birthDate: birthDate ? birthDate.toISOString() : null,
        address,
        bankName,
        bankAccountNumber,
        bankAccountHolder,
      };
      try {
        await AsyncStorage.setItem('userProfile', JSON.stringify(newProfile));
        Alert.alert('Sukses', 'Data berhasil diperbarui!', [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
      } catch (error) {
        Alert.alert('Error', 'Gagal menyimpan data');
      }
    } else {
      Alert.alert('Error', 'Mohon lengkapi data yang masih salah atau kosong.');
    }
  };

  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setBirthDate(selectedDate);
      validateField('birthDate', selectedDate);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="#007bff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Personal</Text>

        {/* Phone Number */}
        <Text style={styles.label}>Phone Number</Text>
        <View style={styles.inputWrapper}>
          <Feather
            name="phone"
            size={20}
            color="#007bff"
            style={{ marginRight: 8 }}
          />
          <TextInput
            style={styles.inputField}
            placeholder="Masukkan nomor telepon"
            value={phoneNumber}
            onChangeText={text => {
              setPhoneNumber(text);
              validateField('phoneNumber', text);
            }}
            keyboardType="numeric"
          />
        </View>
        {errors.phoneNumber && (
          <Text style={styles.errorText}>{errors.phoneNumber}</Text>
        )}

        {/* Email */}
        <Text style={styles.label}>Email</Text>
        <View style={styles.inputWrapper}>
          <Feather
            name="mail"
            size={20}
            color="#007bff"
            style={{ marginRight: 8 }}
          />
          <TextInput
            style={styles.inputField}
            placeholder="Masukkan email"
            value={email}
            onChangeText={text => {
              setEmail(text);
              validateField('email', text);
            }}
            keyboardType="email-address"
          />
        </View>
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

        {/* Gender */}
        <Text style={styles.label}>Gender</Text>
        <View style={[styles.inputWrapper, { paddingHorizontal: 0 }]}>
          <Picker
            selectedValue={gender}
            onValueChange={value => {
              setGender(value);
              validateField('gender', value);
            }}
            style={{ flex: 1, color: '#333' }}
          >
            <Picker.Item label="Pilih Gender" value={null} />
            <Picker.Item label="Laki-laki" value="Laki-laki" />
            <Picker.Item label="Perempuan" value="Perempuan" />
          </Picker>
          <Feather
            name="chevron-down"
            size={20}
            color="#555"
            style={{ marginRight: 12 }}
          />
        </View>
        {errors.gender && <Text style={styles.errorText}>{errors.gender}</Text>}

        {/* Birth Place */}
        <Text style={styles.label}>Birth Place</Text>
        <View style={styles.inputWrapper}>
          <Feather
            name="map-pin"
            size={20}
            color="#007bff"
            style={{ marginRight: 8 }}
          />
          <TextInput
            style={styles.inputField}
            placeholder="Masukkan tempat lahir"
            value={birthPlace}
            onChangeText={text => {
              setBirthPlace(text);
              validateField('birthPlace', text);
            }}
          />
        </View>
        {errors.birthPlace && (
          <Text style={styles.errorText}>{errors.birthPlace}</Text>
        )}

        {/* Birth Date */}
        <Text style={styles.label}>Birth Date</Text>
        <TouchableOpacity
          style={[styles.inputWrapper, styles.dateInput]}
          onPress={() => setShowDatePicker(true)}
        >
          <Feather
            name="calendar"
            size={20}
            color="#007bff"
            style={{ marginRight: 8 }}
          />
          <Text style={birthDate ? styles.dateText : styles.datePlaceholder}>
            {birthDate
              ? birthDate.toLocaleDateString('id-ID')
              : 'Pilih Tanggal Lahir'}
          </Text>
        </TouchableOpacity>
        {errors.birthDate && (
          <Text style={styles.errorText}>{errors.birthDate}</Text>
        )}
        {showDatePicker && (
          <DateTimePicker
            value={birthDate || new Date()}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={onDateChange}
          />
        )}

        {/* Address */}
        <Text style={styles.label}>Address</Text>
        <View style={styles.inputWrapper}>
          <Feather
            name="home"
            size={20}
            color="#007bff"
            style={{ marginRight: 8 }}
          />
          <TextInput
            style={[styles.inputField, styles.textArea]}
            placeholder="Masukkan alamat lengkap"
            value={address}
            onChangeText={text => {
              setAddress(text);
              validateField('address', text);
            }}
            multiline
            numberOfLines={4}
          />
        </View>
        {errors.address && (
          <Text style={styles.errorText}>{errors.address}</Text>
        )}

        {/* Documents */}
        <Text style={styles.sectionTitle}>Documents</Text>

        {/* Bank Name */}
        <Text style={styles.label}>Nama Bank</Text>
        <View style={[styles.inputWrapper, { paddingHorizontal: 0 }]}>
          <Picker
            selectedValue={bankName}
            onValueChange={value => {
              setBankName(value);
              validateField('bankName', value);
            }}
            style={{ flex: 1, color: '#333' }}
          >
            <Picker.Item label="Pilih Bank" value={null} />
            <Picker.Item label="BCA" value="BCA" />
            <Picker.Item label="Mandiri" value="Mandiri" />
            <Picker.Item label="BNI" value="BNI" />
            <Picker.Item label="BRI" value="BRI" />
            <Picker.Item label="CIMB Niaga" value="CIMB" />
          </Picker>
          <Feather
            name="chevron-down"
            size={20}
            color="#555"
            style={{ marginRight: 12 }}
          />
        </View>
        {errors.bankName && (
          <Text style={styles.errorText}>{errors.bankName}</Text>
        )}

        {/* Bank Account Number */}
        <Text style={styles.label}>Bank Account Number</Text>
        <View style={styles.inputWrapper}>
          <Feather
            name="credit-card"
            size={20}
            color="#007bff"
            style={{ marginRight: 8 }}
          />
          <TextInput
            style={styles.inputField}
            placeholder="Masukkan nomor rekening"
            value={bankAccountNumber}
            onChangeText={text => {
              setBankAccountNumber(text);
              validateField('bankAccountNumber', text);
            }}
            keyboardType="numeric"
          />
        </View>
        {errors.bankAccountNumber && (
          <Text style={styles.errorText}>{errors.bankAccountNumber}</Text>
        )}

        {/* Bank Account Holder */}
        <Text style={styles.label}>Bank Account Holder</Text>
        <View style={styles.inputWrapper}>
          <Feather
            name="user"
            size={20}
            color="#007bff"
            style={{ marginRight: 8 }}
          />
          <TextInput
            style={styles.inputField}
            placeholder="Masukkan nama pemilik rekening"
            value={bankAccountHolder}
            onChangeText={text => {
              setBankAccountHolder(text);
              validateField('bankAccountHolder', text);
            }}
          />
        </View>
        {errors.bankAccountHolder && (
          <Text style={styles.errorText}>{errors.bankAccountHolder}</Text>
        )}

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}