import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function History() {
    return (
        <View styles={styles.container}>
            <Text>History</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
