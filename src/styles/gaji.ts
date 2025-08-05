import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  dropdownWrapper: {
    backgroundColor: '#f9f9f9',
    margin: 16,
    padding: 16,
    marginTop: 50,          
    borderRadius: 10,
    elevation: 2,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfDropdown: {
    width: '48%',
  },

  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingBottom: 30,
  },
  image: {
    width: 180,
    height: 180,
  },
  noDataText: {
    marginTop: 16,
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
});

export const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: 'white',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: 'white',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});
