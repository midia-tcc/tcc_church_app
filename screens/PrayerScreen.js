import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Linking } from 'react-native';
import config from '../config';
import { COLORS } from '../theme';

export default function PrayerScreen(){
  const [name, setName] = useState('');
  const [request, setRequest] = useState('');

  const sendPrayer = () => {
    if(!request.trim()){
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
    <View style={styles.container}>
      <Text style={styles.label}>Nome (opcional)</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Seu nome" />
      <Text style={styles.label}>Pedido de Oração</Text>
      <TextInput style={[styles.input, {height:120}]} value={request} onChangeText={setRequest} placeholder="Escreva seu pedido" multiline/>
      <TouchableOpacity style={styles.button} onPress={sendPrayer}>
        <Text style={styles.buttonText}>Enviar Pedido</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, padding:16, backgroundColor:'#fff' },
  label:{ marginTop:8, color:'#333', fontWeight:'700' },
  input:{ marginTop:6, borderWidth:1, borderColor:'#ddd', borderRadius:8, padding:10 },
  button:{ marginTop:16, backgroundColor:COLORS.ACCENT, padding:12, borderRadius:8, alignItems:'center' },
  buttonText:{ color:'#fff', fontWeight:'700' }
});
