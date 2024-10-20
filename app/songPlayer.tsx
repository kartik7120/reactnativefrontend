import { View, StyleSheet, ImageBackground } from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { Avatar, IconButton, MD3Colors, ProgressBar, Text } from 'react-native-paper'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function songPlayer() {

    const navigation = useNavigation()
    const { searchTitle, title, artist, duration } = useLocalSearchParams()

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
            </View>

            <View style={styles.player_button_container}>
                <IconButton
                    icon="replay"
                    size={40}
                    onPress={() => console.log('Pressed')}
                />
                <IconButton
                    icon="play"
                    size={40}
                    onPress={() => console.log('Pressed')}
                />
                <IconButton
                    icon="forward"
                    size={40}
                    onPress={() => console.log('Pressed')}
                    iconColor='black'
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
    }
})