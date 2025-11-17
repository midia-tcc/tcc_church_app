import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ToastAndroid, Platform, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Clipboard from 'expo-clipboard';

export default function ClipboardTestScreen() {
  const copyText = async () => {
    await Clipboard.setStringAsync("Teste do Clipboard funcionando!");
    if (Platform.OS === 'android') {
      ToastAndroid.show("Texto copiado!", ToastAndroid.SHORT);
    } else {
      Alert.alert("Copiado", "Texto copiado para a área de transferência!");
    }
  };

  const readText = async () => {
    const text = await Clipboard.getStringAsync();
    if (Platform.OS === 'android') {
      ToastAndroid.show(`Conteúdo: ${text}`, ToastAndroid.SHORT);
    } else {
      Alert.alert("Conteúdo da Área de Transferência", text);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Teste Clipboard</Text>
        <TouchableOpacity style={styles.button} onPress={copyText}>
          <Text style={styles.buttonText}>Copiar Texto</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={readText}>
          <Text style={styles.buttonText}>Ler Texto</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: { 
    flexGrow: 1,
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20 
  },
  title: { 
    fontSize: 22, 
    fontWeight: '700', 
    marginBottom: 20 
  },
  button: { 
    marginTop: 10, 
    backgroundColor: '#4CAF50', 
    padding: 12, 
    borderRadius: 8, 
    width: 200,
    alignItems: 'center'
  },
  buttonText: { 
    color: '#fff', 
    fontWeight: '700',
    textAlign: 'center'
  }
});
