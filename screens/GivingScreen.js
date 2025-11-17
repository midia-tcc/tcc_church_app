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

export default function GivingScreen() {

    const copy = async () => {
        const text = Object.entries(BANK_INFO)
            .map(([key, value]) => `${key}: ${value}`)
            .join('\n');

        await Clipboard.setStringAsync(text);

        if (Platform.OS === 'android') {
            ToastAndroid.show('Dados copiados', ToastAndroid.SHORT);
        } else {
            Alert.alert('Copiado', 'Dados bancários copiados para área de transferência.');
        }
    };

    const testClipboard = async () => {
        await Clipboard.setStringAsync("Teste Clipboard!");
        const copiedText = await Clipboard.getStringAsync();

        if (Platform.OS === "android") {
            ToastAndroid.show(`Clipboard: ${copiedText}`, ToastAndroid.SHORT);
        } else {
            Alert.alert("Clipboard", copiedText);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Generosidade</Text>

            {Object.entries(BANK_INFO).map(([key, value]) => (
                <Text key={key} style={styles.label}>{`${key}: ${value}`}</Text>
            ))}

            <TouchableOpacity style={styles.button} onPress={copy}>
                <Text style={styles.buttonText}>Copiar Dados</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, { backgroundColor: '#555' }]} onPress={testClipboard}>
                <Text style={styles.buttonText}>Testar Clipboard</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    title: { fontSize: 20, fontWeight: '700', color: COLORS.PRIMARY, marginBottom: 16 },
    label: { marginTop: 8, color: '#333' },
    button: { marginTop: 16, backgroundColor: COLORS.ACCENT, padding: 12, borderRadius: 8, alignItems: 'center' },
    buttonText: { color: '#fff', fontWeight: '700' }
});
