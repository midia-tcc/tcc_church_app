import React from "react";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

import HomeScreen from "./screens/HomeScreen";
import EventsScreen from "./screens/EventsScreen";
import EventDetailsScreen from "./screens/EventDetailsScreen";
import SermonsScreen from "./screens/SermonsScreen";
import PrayerScreen from "./screens/PrayerScreen";
import GivingScreen from "./screens/GivingScreen";
import { COLORS } from "./theme";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Stack de eventos
function EventsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="EventsMain"
        component={EventsScreen}
        options={{ title: "Agenda", headerShown: false }}
      />
      <Stack.Screen
        name="EventDetails"
        component={EventDetailsScreen}
        options={{ title: "Detalhes do Evento" }}
      />
    </Stack.Navigator>
  );
}

// Componente wrapper para adicionar padding da safe area no Tab Navigator
function TabNavigatorWrapper() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: COLORS.ACCENT || "#0077ff",
        tabBarInactiveTintColor: "#888",
        tabBarStyle: {
          backgroundColor: COLORS.PRIMARY || "#222",
          borderTopColor: COLORS.PRIMARY || "#222",
          paddingBottom: insets.bottom, // respeita a barra inferior
          height: 60 + insets.bottom,
        },
        tabBarLabelStyle: { fontSize: 12 },
        tabBarIcon: ({ color, size }) => {
          if (route.name === "Home") return <MaterialIcons name="home" size={size} color={color} />;
          if (route.name === "Events") return <MaterialIcons name="event" size={size} color={color} />;
          if (route.name === "Sermons") return <FontAwesome5 name="book" size={size} color={color} />;
          if (route.name === "Prayer") return <MaterialIcons name="favorite" size={size} color={color} />;
          if (route.name === "Giving") return <MaterialIcons name="attach-money" size={size} color={color} />;
          return null;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Events" component={EventsStack} options={{ title: "Agenda" }} />
      <Tab.Screen name="Sermons" component={SermonsScreen} options={{ title: "Sermões" }} />
      <Tab.Screen name="Prayer" component={PrayerScreen} options={{ title: "Pedidos" }} />
      <Tab.Screen name="Giving" component={GivingScreen} options={{ title: "Generosidade" }} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <TabNavigatorWrapper />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
