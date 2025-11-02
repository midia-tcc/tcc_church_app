import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import * as Calendar from 'expo-calendar';
import { COLORS } from '../theme';

const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQBWSFhyaxtN6vCCwM_NYsFHaW-5w-_p94rFKygBn0mEYAPKuFUGY8OHP3WZITujVDSgbspDPpKH-Ji/gviz/tq?tqx=out:json";

export default function EventsScreen(){
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(SHEET_URL);
      const text = await res.text();
      const json = JSON.parse(text.substr(47).slice(0, -2)); // remove prefixo/sufixo do Google
      const rows = json.table.rows.map(r => ({
        id: r.c[0]?.v?.toString() || Math.random().toString(),
        title: r.c[1]?.v || "",
        displayDate: r.c[2]?.v || "",
        start: r.c[3]?.v || "",
        end: r.c[4]?.v || "",
        description: r.c[5]?.v || "",
      }));
      setEvents(rows);
    } catch (e) {
      console.error(e);
      Alert.alert("Erro", "Não foi possível carregar os eventos.");
    } finally {
      setLoading(false);
    }
  };

  const addToCalendar = async (item) => {
    try {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === 'granted') {
        const calendars = await Calendar.getCalendarsAsync();
        const defaultCal = calendars.find(c => c.allowsModifications) || calendars[0];
        await Calendar.createEventAsync(defaultCal.id, {
          title: item.title,
          startDate: new Date(item.start),
          endDate: new Date(item.end),
          notes: item.description,
          timeZone: 'UTC',
        });
        Alert.alert('Adicionado', 'Evento adicionado ao seu calendário.');
      } else {
        Alert.alert('Permissão negada', 'Permissão ao calendário foi negada.');
      }
    } catch (e) {
      console.error(e);
      Alert.alert('Erro', 'Não foi possível adicionar ao calendário.');
    }
  };

  if (loading) return <ActivityIndicator style={{flex:1}} size="large" color={COLORS.ACCENT} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.date}>{item.displayDate}</Text>
            <Text style={styles.desc}>{item.description}</Text>
            <TouchableOpacity style={styles.button} onPress={() => addToCalendar(item)}>
              <Text style={styles.buttonText}>Adicionar ao calendário</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:12, backgroundColor:'#fff' },
  card: { backgroundColor:'#fafafa', padding:12, marginBottom:10, borderRadius:8 },
  title: { fontWeight:'700', fontSize:16, color:COLORS.PRIMARY },
  date: { color:'#666', marginTop:6 },
  desc: { marginTop:8, color:'#444' },
  button: { marginTop:8, backgroundColor:COLORS.ACCENT, padding:8, borderRadius:6, alignSelf:'flex-start' },
  buttonText: { color:'#fff', fontWeight:'700' }
});
