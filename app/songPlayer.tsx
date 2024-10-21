import { View, StyleSheet, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { Avatar, IconButton, MD3Colors, ProgressBar, Text } from 'react-native-paper'
import { storage } from '@/firebase'
import { getDownloadURL, ref } from 'firebase/storage'
import { Audio } from 'expo-av'

export default function songPlayer() {

    const [sound, setSound] = useState<string | null>(null)
    const [isSoundPlaying, setIsSoundPlaying] = useState(false)
    const [soundExpo, setSoundExpo] = useState<Audio.Sound | null>(null)
    const navigation = useNavigation()
    const { searchTitle, title, artist, duration } = useLocalSearchParams()
    const songRef = ref(storage, searchTitle as string + ".mp3")

    async function playSound() {
        if (sound === null) {
            return
        }

        const { sound: s } = await Audio.Sound.createAsync({ uri: sound })
        setSoundExpo(s)
        await s.playAsync()

        setIsSoundPlaying(true)
    }

    async function pauseSound() {
        if (soundExpo === null) {
            return
        }

        await soundExpo.pauseAsync()
        setIsSoundPlaying(false)
    }

    async function replaySound() {
        if (soundExpo === null) {
            return
        }

        await soundExpo.replayAsync()
        setIsSoundPlaying(true)
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

        getDownloadURL(songRef).then((url) => {
            setSound(url)
        }).catch((error) => {
            console.log("Error getting document:", error)
        })
    }, [title])

    return (
        <View>
            <View style={styles.text_container}>
                <Text variant='headlineMedium'>{title}</Text>
                <Text variant='titleMedium'>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</Text>
            </View>
            <View style={styles.image_container}>
                <ImageBackground source={{ uri: 'https://picsum.photos/700' }} style={{ width: '100%', height: 300 }} />
            </View>

            <View style={styles.music_player_title_container}>
                <View style={styles.song_player_heading}>
                    <Text variant='headlineMedium'>{title}</Text>
                    <View style={styles.share_icon_container}>
                        <Avatar.Icon color="white" size={32} icon="share-variant-outline" />
                        <Avatar.Icon color="white" size={32} icon="cards-heart-outline" />
                    </View>
                </View>
                <Text variant='titleMedium'>{artist}</Text>
            </View>

            <View style={styles.audio_progress_container}>
                <ProgressBar progress={0.5} color={MD3Colors.error50} />
                <View style={styles.audio_progress}>
                    <Text variant='bodySmall'>0:00</Text>
                    <Text variant='bodySmall'>{duration}</Text>
                </View>
            </View>

            <View style={styles.player_button_container}>
                <IconButton
                    icon="pause"
                    size={40}
                    onPress={pauseSound}
                    disabled={!isSoundPlaying}
                />
                <IconButton
                    icon="play"
                    size={40}
                    onPress={playSound}
                    disabled={isSoundPlaying}
                />
                <IconButton
                    icon="replay"
                    size={40}
                    onPress={replaySound}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    text_container: {
        padding: 20,
        alignItems: 'center',
        gap: 10,
        marginTop: 40
    },
    image_container: {
        width: 300,
        height: 300,
        borderRadius: 10,
        overflow: 'hidden',
        alignSelf: 'center',
        marginTop: 20
    },
    share_icon_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        gap: 10
    },
    song_player_heading: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    music_player_title_container: {
        padding: 20,
        marginLeft: 40,
        marginRight: 20
    },
    player_button_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        gap: 10
    },
    audio_progress_container: {
        padding: 20
    },
    audio_progress: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 10,
        marginTop: 10
    }
})