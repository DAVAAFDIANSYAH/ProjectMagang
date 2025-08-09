import { StyleSheet } from 'react-native';

const Dashboardstyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FB',
  },
  headerBox: {
    backgroundColor: '#8BC34A',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    paddingVertical: 50,
    paddingHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  avatar: {
    width: 52,
    height: 52,
    backgroundColor: '#ccc',
    borderRadius: 26,
    marginRight: 14,
  },

  nameRoleWrapper: {
    flexDirection: 'column',
    justifyContent: 'center',
  },

  welcome: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
  },

  jabatanText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '400',
    marginTop: 2,
  },

  notifIconWrapper: {
    position: 'relative',
    padding: 4,
  },

  notifBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: 'red',
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  notifBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },


  role: {
    color: '#fff',
    fontSize: 14,
    marginTop: 2,
  },
  absenCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
    width: '85%',
    alignSelf: 'center',
    marginTop: -30,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
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
    marginTop: 20,
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
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 14,
    marginHorizontal: 20,
    marginTop: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  btnKeluar: {
    backgroundColor: '#d9534f',
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginTop: 16,
    alignItems: 'center',
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
    marginRight: 10,
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
  prayerContainer: {
    marginTop: 16,
    paddingHorizontal: 4,
  },

  prayerGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  prayerCardGrid: {
    width: '31%',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 8,
    marginBottom: 12,
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

  prayercard: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    width: 70,
    marginRight: 8,
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
  bottomButtonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },

});
export default Dashboardstyles;
