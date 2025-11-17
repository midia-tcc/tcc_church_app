import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, StyleSheet, ActivityIndicator, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Papa from "papaparse";
import { MaterialIcons } from "@expo/vector-icons";

export default function EventsScreen({ navigation }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

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
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color="#0077ff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
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
    backgroundColor: "#f9f9f9",
  },
  container: {
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 14,
    borderLeftWidth: 6,
    borderLeftColor: "#0077ff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
  },
  date: {
    fontSize: 16,
    color: "#333",
    marginBottom: 6,
  },
  meta: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4,
  },
  desc: {
    marginTop: 8,
    fontSize: 15,
    color: "#444",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0077ff",
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
