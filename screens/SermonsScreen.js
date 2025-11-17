import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Linking, ActivityIndicator } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import axios from 'axios';
import config from '../config';
import { COLORS, APP_NAME } from '../theme';


export default function SermonsScreen() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const insets = useSafeAreaInsets();

  useEffect(() => { fetchVideos(); }, []);

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
    } catch (e) { console.warn('Erro ao carregar vídeos.', e); }
    finally { setLoading(false); }
  };

  const openVideo = (videoId) => {
    Linking.openURL(`https://www.youtube.com/watch?v=${videoId}`);
  };

  if (loading) return (
    <SafeAreaView style={[styles.center, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <ActivityIndicator size="large" color={COLORS.ACCENT} />
    </SafeAreaView>
  );

  return (
    <SafeAreaView style={[styles.safeArea, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <FlatList
        data={videos}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, paddingBottom: insets.bottom + 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => openVideo(item.id)}>
            <Image source={{ uri: item.thumbnail }} style={styles.thumb} />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.date}>{new Date(item.publishedAt).toLocaleDateString()}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.BG },
  item: { flexDirection: 'row', padding: 10, borderBottomWidth: 1, borderBottomColor: '#eee' },
  thumb: { width: 120, height: 70, borderRadius: 6 },
  title: { fontWeight: '700', color: COLORS.PRIMARY },
  date: { color: '#666', marginTop: 6, fontSize: 12 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
