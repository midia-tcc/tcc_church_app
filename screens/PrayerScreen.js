import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Linking, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import config from '../config';
import { COLORS } from '../theme';

export default function PrayerScreen() {
  const [name, setName] = useState('');
  const [request, setRequest] = useState('');

  const sendPrayer = () => {
    if (!request.trim()) {
      Alert.alert('Atenção', 'Por favor, escreva seu pedido de oração.');
      return;
    }

    const subject = encodeURIComponent('Pedido de Oração - App TCC Church');
    const body = encodeURIComponent(`Nome: ${name || 'Anônimo'}\n\nPedido:\n${request}`);
    const mailto = `mailto:${config.PRAYER_EMAIL}?subject=${subject}&body=${body}`;

    Linking.openURL(mailto);
    setName('');
    setRequest('');
    Alert.alert('Enviado', 'Seu pedido foi preparado no app de email. Envie para concluir.');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <Text style={styles.label}>Nome (opcional)</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Seu nome"
          />

          <Text style={styles.label}>Pedido de Oração</Text>
          <TextInput
            style={[styles.input, { height: 120 }]}
            value={request}
            onChangeText={setRequest}
            placeholder="Escreva seu pedido"
            multiline
          />

          <TouchableOpacity style={styles.button} onPress={sendPrayer}>
            <Text style={styles.buttonText}>Enviar Pedido</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 16,
  },
  label: {
    marginTop: 8,
    color: '#333',
    fontWeight: '700',
  },
  input: {
    marginTop: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
  },
  button: {
    marginTop: 16,
    backgroundColor: COLORS.ACCENT,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
  },
});
