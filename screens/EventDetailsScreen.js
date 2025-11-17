import React from "react";
import { SafeAreaView, ScrollView, View, Text, StyleSheet, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "../theme";

export default function EventDetailsScreen({ route }) {
  const { event } = route.params;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{event.title || "Sem título"}</Text>

        {event.displayDate ? (
          <Text style={styles.date}>📅 {event.displayDate}</Text>
        ) : null}

        {event.start ? (
          <Text style={styles.meta}>Início: {event.start}</Text>
        ) : null}

        {event.end ? (
          <Text style={styles.meta}>Fim: {event.end}</Text>
        ) : null}

        {event.description ? (
          <Text style={styles.description}>{event.description}</Text>
        ) : null}

        <Pressable
          style={({ pressed }) => [styles.button, pressed && { opacity: 0.7 }]}
          onPress={() => alert("Presença confirmada!")}
        >
          <MaterialIcons
            name="check-circle"
            size={20}
            color="#fff"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.buttonText}>Confirmar Presença</Text>
        </Pressable>
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
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 12,
  },
  date: {
    fontSize: 16,
    color: "#555",
    marginBottom: 8,
  },
  meta: {
    fontSize: 14,
    color: "#555",
    marginBottom: 6,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS?.ACCENT || "#0077ff",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
