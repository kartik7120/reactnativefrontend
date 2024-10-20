import { ImageBackground, StyleSheet, View } from 'react-native'
import React from 'react'
import { Avatar, Button, Card, Text, TouchableRipple } from 'react-native-paper'
import { TouchableOpacity } from 'react-native';
import { Link, useRouter } from 'expo-router';

const RightContent = () => <Avatar.Icon color="white" size={32} icon="lock" />

interface Props {
    title: string;
    subtitle: string;
    lock: boolean;
    _id: string;
}

export default function HomeCardComponent(props: Props) {
    const router = useRouter()

    return (
        <Link push href={{
            pathname:"/songList",
            params: {
                id: props._id,
                title: props.title,
                subtitle: props.subtitle,
            }
        }} asChild>
        <TouchableOpacity activeOpacity={0.8} >
            <View style={{ position: 'relative' }}>
                <View style={styles.container}>
                    <ImageBackground source={{ uri: 'https://picsum.photos/700' }} style={{ width: '100%', height: 200 }}>
                        {props.lock && <Avatar.Icon color="white" size={32} icon="lock" style={{ position: 'absolute', top: 10, right: 10 }} />}
                        <View style={styles.textContainer}>
                            <Text variant='headlineMedium'>{props.title}</Text>
                            <Text variant='titleMedium'>{props.subtitle}</Text>
                        </View>
                    </ImageBackground>
                </View>
            </View>
        </TouchableOpacity>
        </Link>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        overflow: 'hidden',
        maxHeight: 200,
        maxWidth: 200,
        alignSelf: "stretch",
    },
    textContainer: {
        // position: 'absolute', // absolute positioning is making component dissapear
        // What to do now ?
        bottom: 0,
        left: 0,
        right: 0,
        padding: 10,
    }
})