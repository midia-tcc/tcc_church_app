import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import EventsScreen from './screens/EventsScreen';
import SermonsScreen from './screens/SermonsScreen';
import PrayerScreen from './screens/PrayerScreen';
import GivingScreen from './screens/GivingScreen';
import { COLORS } from './theme';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: COLORS.ACCENT,
          tabBarStyle: { backgroundColor: COLORS.PRIMARY, borderTopColor: '#222' },
          tabBarLabelStyle: { color: '#fff' }
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Events" component={EventsScreen} options={{ title: 'Agenda' }} />
        <Tab.Screen name="Sermons" component={SermonsScreen} options={{ title: 'Sermões' }} />
        <Tab.Screen name="Prayer" component={PrayerScreen} options={{ title: 'Pedidos' }} />
        <Tab.Screen name="Giving" component={GivingScreen} options={{ title: 'Generosidade' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
