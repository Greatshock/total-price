import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { History, Shopping } from './screens';

const RootTab = Platform.select({
    ios: createBottomTabNavigator(),
    android: createMaterialBottomTabNavigator()
});

export default function App() {
    return (
        <NavigationContainer>
            <RootTab.Navigator>
                <RootTab.Screen name='Shopping' component={Shopping} />
                <RootTab.Screen name='History' component={History} />
            </RootTab.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
