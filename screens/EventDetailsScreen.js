import React from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS, APP_NAME } from '../theme';

export default function EventDetailsScreen({ route }) {
  const { event } = route.params;
  const insets = useSafeAreaInsets();

  const confirmAttendance = () => {
    Alert.alert('Confirmado', 'Sua presença foi registrada!');
  };

  return (
    <SafeAreaView style={[styles.safeArea, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <View style={styles.container}>
        <Text style={styles.title}>{event.title || 'Sem título'}</Text>

        {event.displayDate && <Text style={styles.date}>📅 {event.displayDate}</Text>}
        {event.start && <Text style={styles.meta}>Início: {event.start}</Text>}
        {event.end && <Text style={styles.meta}>Fim: {event.end}</Text>}
        {event.description && <Text style={styles.desc}>{event.description}</Text>}

        <Pressable style={styles.button} onPress={confirmAttendance}>
          <MaterialIcons name="check-circle" size={20} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.buttonText}>Confirmar Presença</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.BG, // ✅ fundo do tema
  },
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.PRIMARY,
    marginBottom: 12,
  },
  date: {
    fontSize: 16,
    color: COLORS.PRIMARY,
    marginBottom: 8,
  },
  meta: {
    fontSize: 14,
    color: COLORS.PRIMARY,
    marginBottom: 6,
  },
  desc: {
    fontSize: 16,
    color: COLORS.PRIMARY,
    lineHeight: 24,
    marginBottom: 24,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.ACCENT,
    padding: 14,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
