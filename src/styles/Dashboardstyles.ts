import { StyleSheet } from 'react-native';

const Dashboardstyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FB',
  },
  headerBox: {
    backgroundColor: '#22B14C',
    borderRadius: 24,
    padding: 30,
    margin: 16,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    backgroundColor: '#ccc',
    borderRadius: 24,
    marginRight: 12,
  },
  welcome: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  role: {
    color: '#fff',
    fontSize: 14,
    marginTop: 2,
  },
  absenCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 16,
    elevation: 3,
  },
  dateText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  clockRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 8,
  },
  clockNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    backgroundColor: '#DAEAE0',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  shift: {
    fontSize: 14,
    color: '#000',
    marginVertical: 8,
  },
  btnMasuk: {
    backgroundColor: '#22B14C',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 8,
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginBottom: 16,
    marginTop: 20, // ✅ tambahkan ini

  },
  infoCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginHorizontal: 4,
    elevation: 2,
  },
  infoTitle: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  messageBox: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    elevation: 2,
    marginHorizontal: 16,
  },
  messageHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  messageText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  version: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 12,
    color: '#888',
  },
  locationCard: {
  backgroundColor: '#fff',
  marginHorizontal: 20,
  marginTop: 10,
  padding: 15,
  borderRadius: 10,
  elevation: 3,
},

locationTitle: {
  fontWeight: 'bold',
  fontSize: 16,
  marginBottom: 2,
},

locationSubtitle: {
  fontSize: 14,
  color: 'gray',
  marginBottom: 10,
},

prayerTimesRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
},

prayerCard: {
  backgroundColor: '#f0f0f0',
  padding: 10,
  borderRadius: 8,
  alignItems: 'center',
  width: 70,
},

prayerCardActive: {
  backgroundColor: '#d0f5d0',
  padding: 10,
  borderRadius: 8,
  alignItems: 'center',
  width: 70,
},

prayerLabel: {
  fontSize: 12,
  color: '#333',
},

prayerTime: {
  fontSize: 14,
  fontWeight: 'bold',
},

internshipCard: {
  backgroundColor: '#fff',
  marginHorizontal: 20,
  marginTop: 15,
  padding: 15,
  borderRadius: 10,
  elevation: 3,
},

badgeRow: {
  flexDirection: 'row',
  marginBottom: 5,
},

badgeMedium: {
  backgroundColor: '#FFD700',
  color: '#000',
  paddingHorizontal: 8,
  paddingVertical: 3,
  borderRadius: 5,
  marginRight: 5,
  fontSize: 12,
  fontWeight: 'bold',
},
prayerCardHorizontal: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    width: 75,
    marginRight: 10, // ✅ SPACING ANTAR CARD
    borderWidth: 1,
    borderColor: '#e9ecef',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },

  // UNTUK OPSI B: Grid Layout (RECOMMENDED)
  prayerContainer: {
    marginTop: 16,
    paddingHorizontal: 4,
  },

  prayerGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between', // ✅ SPACING OTOMATIS
    alignItems: 'flex-start',
  },

  prayerCardGrid: {
    width: '31%', // ✅ 3 cards per row dengan spacing otomatis
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 8,
    marginBottom: 12, // ✅ SPACING VERTIKAL
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e9ecef',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },

  prayerLabelGrid: {
    fontSize: 11,
    fontWeight: '600',
    color: '#495057',
    marginTop: 6,
    textAlign: 'center',
  },

  prayerTimeGrid: {
    fontSize: 13,
    fontWeight: '700',
    color: '#22B14C',
    marginTop: 2,
    textAlign: 'center',
  },

  // Update existing prayerCard dengan spacing
  prayercard: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    width: 70,
    marginRight: 8, // ✅ TAMBAHKAN INI UNTUK SPACING
  },

  prayerlabel: {
    fontSize: 12,
    color: '#333',
    marginTop: 4,
    textAlign: 'center',
  },

  prayetTime: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#22B14C',
  },

});

export default Dashboardstyles;
