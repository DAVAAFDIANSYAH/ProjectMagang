import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Dashboard from './dashboard';
import Profile from './profile';
import Riwayat from './riwayat';
import { Text } from 'react-native';
import gaji from './gaji';

const Tab = createBottomTabNavigator();

export default function BottomNav() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#22B14C',
        tabBarInactiveTintColor: '#ccc',
        tabBarStyle: {
          backgroundColor: '#fff',
          height: 80,
          paddingBottom: 10,
          paddingTop: 10,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          elevation: 10,
          shadowColor: '#000',
          shadowOpacity: 0.05,
          shadowRadius: 5,
        },
        tabBarLabel: ({ color }) => {
          let label = '';
          switch (route.name) {
            case 'Dashboard':
              label = 'Beranda';
              break;
            case 'Riwayat':
              label = 'Riwayat';
              break;
            // case 'Gaji':
            //   label = 'Gaji';
            //   break;
            case 'Profile':
              label = 'Profil';
              break;
          }
          return <Text style={{ color, fontSize: 12 }}>{label}</Text>;
        },
        tabBarIcon: ({ color, focused }) => {
          let iconName = '';
          switch (route.name) {
            case 'Dashboard':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Riwayat':
              iconName = focused ? 'calendar' : 'calendar-outline';
              break;
            // case 'Gaji':
            //   iconName = focused ? 'wallet' : 'wallet-outline';
            //   break;
            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
          }
          return <Ionicons name={iconName} size={22} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Riwayat" component={Riwayat} />
      {/* <Tab.Screen name="Gaji" component={gaji} /> */}
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
