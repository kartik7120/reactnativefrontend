import { Image, StyleSheet, Platform, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeHeader from '@/components/HomeHeader';
import { Text } from 'react-native-paper';
import HomeCardComponent from '@/components/HomeCardComponent';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';

export interface Song {
  title: string;
  artist: string;
  duration: string;
  searchTitle: string;
}

export interface SongList {
  name: string;
  songs: Song[];
  _id: string;
}


export default function HomeScreen() {

  const [songLists, setSongLists] = useState<SongList[] | null>(null)

  async function fetchSongLists() {
    try {
      const response = await fetch(`https://8c8d-45-252-76-166.ngrok-free.app/songLists`)
      const data = await response.json()
      setSongLists(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchSongLists()
  }, [])

  return (
    <ScrollView>
      <SafeAreaView>
        <View style={styles.container}>
          <HomeHeader />
          <Text variant="headlineMedium">Prarthana Plans</Text>
        </View>
        {(songLists == null || songLists.length == 0) && <Text variant='bodyLarge' style={{ textAlign: "center" }}>No song lists found</Text>}
        <View style={styles.cardContainer}>
          {songLists && songLists.map((songList) => (
            <HomeCardComponent key={songList._id} _id={songList._id} title={songList.name} subtitle={`${Math.floor(Math.random() * (50 - 10) + 10)} days plan`} lock={false} />
          ))}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? 25 : 0,
    paddingLeft: 16,
    marginBottom: 32,
    position: 'relative',
  },
  cardContainer: {
    margin: 16,
    height: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: 16,
    justifyContent:"space-evenly"
  }
});
