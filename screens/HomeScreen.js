import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Image } from 'react-native';
import { Video } from 'expo-av';
import config from '../config';
import { COLORS } from '../theme';

export default function HomeScreen(){
  const openChannel = () => {
    const url = 'https://youtube.com/' + config.YOUTUBE_CHANNEL_ID;
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      {/* Vídeo de fundo */}
      <Video
        source={require('../assets/VideoAbertura.mp4')}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
        shouldPlay
        isLooping
        muted
      />

      {/* Overlay */}
      <View style={styles.overlay} />

      {/* Conteúdo */}
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Bem-vindo à {config.APP_NAME}</Text>
      <Text style={styles.subtitle}>Tempo da Colheita Church</Text>

      <TouchableOpacity style={styles.button} onPress={openChannel}>
        <Text style={styles.buttonText}>Assistir culto ao vivo</Text>
      </TouchableOpacity>

      <Text style={styles.verse}>
        “Bem-vindo à TCC Church — Um lugar para viver o propósito de Deus.”
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    padding:20,
    backgroundColor:'#000', // evita flashes brancos
  },
  overlay:{
    ...StyleSheet.absoluteFillObject,
    backgroundColor:'rgba(0,0,0,0.3)',
  },
  logo:{
    width:140,
    height:140,
    marginBottom:20,
    resizeMode:'contain'
  },
  title:{ fontSize:22, fontWeight:'700', color:'#fff' },
  subtitle:{ fontSize:16, color:'#fff', marginBottom:20 },
  button:{
    backgroundColor: COLORS.ACCENT,
    paddingHorizontal:20,
    paddingVertical:12,
    borderRadius:8,
    marginTop:10
  },
  buttonText:{ color:'#fff', fontWeight:'700' },
  verse:{ marginTop:30, color:'#fff', textAlign:'center' }
});
