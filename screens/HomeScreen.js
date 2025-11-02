import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Image } from 'react-native';
import config from '../config';
import { COLORS } from '../theme';

export default function HomeScreen(){
  const openChannel = () => {
    const url = 'https://youtube.com/' + config.YOUTUBE_CHANNEL_ID;
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Bem-vindo à {config.APP_NAME}</Text>
      <Text style={styles.subtitle}>Tempo da Colheita Church</Text>
      <TouchableOpacity style={styles.button} onPress={openChannel}>
        <Text style={styles.buttonText}>Assistir culto ao vivo</Text>
      </TouchableOpacity>
      <Text style={styles.verse}>“Bem-vindo à TCC Church — Um lugar para viver o propósito de Deus.”</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, alignItems:'center', justifyContent:'center', backgroundColor: COLORS.BG, padding:20 },
  logo:{ width:140, height:140, marginBottom:20, resizeMode:'contain' },
  title:{ fontSize:22, fontWeight:'700', color:COLORS.PRIMARY },
  subtitle:{ fontSize:16, color:'#666', marginBottom:20 },
  button:{ backgroundColor: COLORS.ACCENT, paddingHorizontal:20, paddingVertical:12, borderRadius:8, marginTop:10 },
  buttonText:{ color:'#fff', fontWeight:'700' },
  verse:{ marginTop:30, color:'#333', textAlign:'center' }
});
