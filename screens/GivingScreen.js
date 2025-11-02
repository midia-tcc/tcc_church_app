import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ToastAndroid, Platform, Alert } from 'react-native';
import { COLORS } from '../theme';
import * as Clipboard from 'expo-clipboard';

const BANK_INFO = {
  bank: "Placeholder Bank",
  accountName: "TCC Church",
  accountNumber: "00012345",
  sortCode: "00-00-00",
  IBAN: "GB00TCC00000000000000",
  PIX: "pix_key_placeholder"
};

export default function GivingScreen(){
  const copy = async () => {
    const text = `Bank: ${BANK_INFO.bank}\nAccount: ${BANK_INFO.accountName}\nNumber: ${BANK_INFO.accountNumber}\nSortCode: ${BANK_INFO.sortCode}\nIBAN: ${BANK_INFO.IBAN}`;
    await Clipboard.setStringAsync(text);
    if(Platform.OS === 'android'){
      ToastAndroid.show('Dados copiados', ToastAndroid.SHORT);
    } else {
      Alert.alert('Copiado', 'Dados bancários copiados para área de transferência.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Generosidade</Text>
      <Text style={styles.label}>Banco: {BANK_INFO.bank}</Text>
      <Text style={styles.label}>Conta: {BANK_INFO.accountName}</Text>
      <Text style={styles.label}>Número: {BANK_INFO.accountNumber}</Text>
      <Text style={styles.label}>Sort Code: {BANK_INFO.sortCode}</Text>
      <Text style={styles.label}>IBAN: {BANK_INFO.IBAN}</Text>
      <TouchableOpacity style={styles.button} onPress={copy}>
        <Text style={styles.buttonText}>Copiar Dados</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, padding:20, backgroundColor:'#fff' },
  title:{ fontSize:20, fontWeight:'700', color:COLORS.PRIMARY, marginBottom:16 },
  label:{ marginTop:8, color:'#333' },
  button:{ marginTop:16, backgroundColor: COLORS.ACCENT, padding:12, borderRadius:8, alignItems:'center' },
  buttonText:{ color:'#fff', fontWeight:'700' }
});
