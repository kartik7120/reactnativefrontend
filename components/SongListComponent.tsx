import { Pressable, StyleSheet, Touchable, View } from 'react-native'
import React from 'react'
import { List, MD3Colors, Text, TouchableRipple } from 'react-native-paper'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';

interface Props {
    title: string;
    artist: string;
    duration: string;
    searchTitle: string;
}

export default function SongListComponent(props: Props) {

    const router = useRouter()

    return (
        <View>
            <Pressable onPress={() => {
                router.push({
                    pathname: "/songPlayer",
                    params: {
                        searchTitle: props.searchTitle,
                        title: props.title,
                        artist: props.artist,
                        duration: props.duration,
                    }
                })
            }}>
                <View style={styles.container}>
                    <Text variant='headlineMedium'>{props.title}</Text>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text variant='bodyLarge' style={{ fontStyle: "italic" }}>{props.artist}</Text>
                        <Text variant='bodyLarge'>{props.duration}</Text>
                    </View>
                </View>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        gap: 10,
        padding: 20,
    }
})