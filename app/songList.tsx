import { View, ImageBackground, ScrollView, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { Text } from 'react-native-paper'
import SongListComponent from '@/components/SongListComponent'
import { SongList } from './(tabs)'
import { SafeAreaView } from 'react-native-safe-area-context'

function generateRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min)
}

export default function songList() {

    const { id, title, subtitle } = useLocalSearchParams()
    const [songList, setSongList] = useState<SongList | null>(null)
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation()

    async function fetchSongList(id: string) {
        try {
            setLoading(true)
            const response = await fetch(`https://8c8d-45-252-76-166.ngrok-free.app/songLists/${id}`)
            const data = await response.json()
            setSongList(data)
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        navigation.setOptions({
            title: title,
            headerShown: true,
            headerBackTitle: 'Back',
            headerBackTitleVisible: true,
            headerBackTitleStyle: {
                color: 'black'
            }
        })
        fetchSongList(id as string)
    }, [id])

    return (
        <SafeAreaView>
            <ScrollView>
                <ImageBackground source={{ uri: 'https://picsum.photos/' + generateRandomNumber(100, 800) }} style={{ width: '100%', height: 300 }}>
                    <View style={styles.textContainer}>
                        <Text variant='displayMedium'>{songList?.name}</Text>
                    </View>
                </ImageBackground>
                <View style={styles.paper}>
                    <Text variant='bodyMedium' style={styles.text}>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui similique soluta necessitatibus ad excepturi et sit facere cum voluptatibus, voluptatem expedita distinctio odio velit aliquid maxime laboriosam nemo rem ipsum!
                    </Text>
                </View>
                {loading && <Text variant='displaySmall'>Loading...</Text>}
                {loading === false && songList === null && <Text variant='displaySmall'>No data found</Text>}
                {songList && songList.songs.map((song, index) => (
                    <SongListComponent key={index} title={song.title} artist={song.artist} duration={song.duration} searchTitle={song.searchTitle} />
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white'
    },
    textContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 10
    },
    paper: {
        padding: 10,
        margin: 10,
        borderRadius: 10,
        elevation: 5,
        backgroundColor: '#2f3e46',
        paddingTop: 0
    }
})