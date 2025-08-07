import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  dropdownWrapper: {
    backgroundColor: '#f9f9f9',
    margin: 16,
    padding: 10,
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
  reportContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginHorizontal: 16,
  },
  reportTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  totalGaji: {
    fontWeight: 'bold',
    marginTop: 10,
    color: 'green',
  },
});

export const pickerSelectStyles = {
  inputIOS: {
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
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 12,
    paddingVertical: 1,
    backgroundColor: 'white',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    
  },
    
};
