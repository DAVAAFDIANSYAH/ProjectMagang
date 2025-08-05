import { StyleSheet } from 'react-native';

const RiwayatStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FB',
  },
  calendarWrapper: {
    backgroundColor: '#D9D9D9',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingBottom: 10,
    marginTop: 30, // ✅ Tambahkan ini untuk geser ke bawah
    elevation: 4,
  },
  content: {
    alignItems: 'center',
    padding: 16,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 12,
  },
  image: {
    width: 180,
    height: 120,
    marginVertical: 10,
  },
  description: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 20,
  },
  button: {
    backgroundColor: '#22B14C',
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default RiwayatStyles;
