import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Linking, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import config from '../config';
import { COLORS } from '../theme';


export default function SermonsScreen() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const API_KEY = config.YOUTUBE_API_KEY;
      const channel = config.YOUTUBE_CHANNEL_ID.replace('@','');
      const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channel}&maxResults=25&order=date&type=video&key=${API_KEY}`;
      const res = await axios.get(url);
      const items = res.data.items.map(i => ({
        id: i.id.videoId,
        title: i.snippet.title,
        thumbnail: i.snippet.thumbnails?.medium?.url,
        publishedAt: i.snippet.publishedAt
      }));
      setVideos(items);
    } catch (e) {
      console.warn('Erro ao carregar vídeos. Verifique a API key e o channelId.', e);
    } finally {
      setLoading(false);
    }
  };

  const openVideo = (videoId) => {
    const url = `https://www.youtube.com/watch?v=${videoId}`;
    Linking.openURL(url);
  };

  if (loading) return (
    <View style={styles.center}>
      <ActivityIndicator size="large" color={COLORS.ACCENT} />
    </View>
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => openVideo(item.id)} activeOpacity={0.7}>
      <Image source={{ uri: item.thumbnail }} style={styles.thumb} />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.date}>{new Date(item.publishedAt).toLocaleDateString()}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={videos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.BG },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  item: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 10, padding: 10, elevation: 2, shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: { width: 0, height: 2 }, shadowRadius: 4 },
  thumb: { width: 120, height: 70, borderRadius: 6 },
  info: { flex: 1, marginLeft: 10, justifyContent: 'center' },
  title: { fontWeight: '700', color: COLORS.PRIMARY, fontSize: 16 },
  date: { color: '#666', marginTop: 4, fontSize: 12 },
});
