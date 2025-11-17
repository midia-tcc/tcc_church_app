import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, StyleSheet, ActivityIndicator, Pressable } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import Papa from "papaparse";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS, APP_NAME } from '../theme';

export default function EventsScreen({ navigation }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const insets = useSafeAreaInsets();

  const CSV_URL =
    "https://docs.google.com/spreadsheets/d/1QCp0dvxLyhwWC5Xs2mlU5UmFQFi4ixD62EDc-2kIpdI/export?format=csv&gid=0";

  async function fetchEvents() {
    try {
      const response = await fetch(CSV_URL);
      const csv = await response.text();

      Papa.parse(csv, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          const rows = result.data.filter(
            (row) => row.title || row.displayDate || row.start
          );
          setEvents(rows);
          setLoading(false);
        },
      });
    } catch (error) {
      console.log("Error loading events:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchEvents();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={[styles.center, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
        <ActivityIndicator size="large" color={COLORS.ACCENT} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.safeArea, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <ScrollView contentContainerStyle={styles.container}>
        {events.map((event, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.title}>{event.title || "Sem título"}</Text>

            {event.displayDate && <Text style={styles.date}>📅 {event.displayDate}</Text>}
            {event.start && <Text style={styles.meta}>Início: {event.start}</Text>}
            {event.end && <Text style={styles.meta}>Fim: {event.end}</Text>}
            {event.description && <Text style={styles.desc}>{event.description}</Text>}

            <Pressable
              style={({ pressed }) => [styles.button, pressed && { opacity: 0.7 }]}
              onPress={() => navigation.navigate("EventDetails", { event })}
            >
              <MaterialIcons name="arrow-forward" size={20} color="#fff" />
              <Text style={styles.buttonText}>Ver Detalhes</Text>
            </Pressable>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.BG, // ✅ fundo preto do tema
  },
  container: {
    padding: 16,
  },
  card: {
    backgroundColor: '#222', // fundo escuro para os cards
    padding: 16,
    borderRadius: 12,
    marginBottom: 14,
    borderLeftWidth: 6,
    borderLeftColor: COLORS.ACCENT,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
    color: COLORS.PRIMARY,
  },
  date: {
    fontSize: 16,
    color: COLORS.PRIMARY,
    marginBottom: 6,
  },
  meta: {
    fontSize: 14,
    color: '#aaa',
    marginBottom: 4,
  },
  desc: {
    marginTop: 8,
    fontSize: 15,
    color: '#ccc',
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.ACCENT,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    marginTop: 12,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 6,
    fontSize: 16,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
