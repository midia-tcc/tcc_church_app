import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ToastAndroid, Platform, Alert, ScrollView } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Clipboard from 'expo-clipboard';
import { COLORS, APP_NAME } from '../theme';

const BANK_INFO = {
  bank: "Placeholder Bank",
  accountName: "TCC Church",
  accountNumber: "00012345",
  sortCode: "00-00-00",
  IBAN: "GB00TCC00000000000000",
  PIX: "pix_key_placeholder"
};

export default function GivingScreen() {
  const insets = useSafeAreaInsets();

  const copy = async () => {
    const text = Object.entries(BANK_INFO).map(([k, v]) => `${k}: ${v}`).join('\n');
    await Clipboard.setStringAsync(text);
    if (Platform.OS === 'android') {
      ToastAndroid.show('Dados copiados', ToastAndroid.SHORT);
    } else {
      Alert.alert('Copiado', 'Dados bancários copiados para área de transferência.');
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Generosidade</Text>

        {Object.entries(BANK_INFO).map(([k, v]) => (
          <Text key={k} style={styles.label}>{`${k}: ${v}`}</Text>
        ))}

        <TouchableOpacity style={styles.button} onPress={copy}>
          <Text style={styles.buttonText}>Copiar Dados</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.BG, // fundo preto
  },
  container: {
    flexGrow: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.PRIMARY, // branco
    marginBottom: 16,
  },
  label: {
    marginTop: 8,
    fontSize: 16,
    color: COLORS.PRIMARY, // branco
  },
  button: {
    marginTop: 20,
    backgroundColor: COLORS.ACCENT, // laranja
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffffff',
    fontWeight: '700',
    fontSize: 16,
  },
});
