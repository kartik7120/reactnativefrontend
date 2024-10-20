import { Pressable, StyleSheet, View } from 'react-native'
import React from 'react'
import { Avatar, Text, TouchableRipple } from 'react-native-paper'

export default function HomeHeader() {
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Avatar.Icon size={32} icon="circle" />
                <Text variant="headlineMedium">InnerBhakti</Text>
            </View>
            <View style={styles.iconsContainer}>
                <TouchableRipple
                    rippleColor="rgba(0, 0, 0, .32)">
                    <Avatar.Icon size={32} style={{ backgroundColor: "white" }} icon="circle-double" />
                </TouchableRipple>
                <TouchableRipple rippleColor="rgba(0, 0, 0, .32)">
                    <Avatar.Icon size={32} style={{ backgroundColor: "white" }} icon="plus" />
                </TouchableRipple>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    iconsContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    }
});
