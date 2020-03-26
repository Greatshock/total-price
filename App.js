import React from 'react';
import { Platform, SafeAreaView, StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Settings, Shopping, Stats } from './screens';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const RootTab = Platform.select({
    ios: createBottomTabNavigator(),
    android: createMaterialBottomTabNavigator()
});

export default function App() {
    return (
        <SafeAreaView style={styles.container}>
            <NavigationContainer>
                <RootTab.Navigator>
                    <RootTab.Screen
                        name='Shopping'
                        component={Shopping}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                Platform.OS === 'ios'
                                    ? <Ionicons name='ios-basket' color={color} size={size} />
                                    : <MaterialIcons name={'shopping-cart'} color={color} size={size} />
                            )
                        }}
                    />
                    <RootTab.Screen
                        name='Stats'
                        component={Stats}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                Platform.OS === 'ios'
                                    ? <Ionicons name='ios-stats' color={color} size={size} />
                                    : <MaterialIcons name={'shopping-cart'} color={color} size={size} />
                            )
                        }}
                    />
                    <RootTab.Screen
                        name='Settings'
                        component={Settings}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <Ionicons
                                    name={Platform.OS === 'ios' ? 'ios-settings' : 'md-settings'}
                                    color={color}
                                    size={size}
                                />
                            )
                        }}
                    />
                </RootTab.Navigator>
            </NavigationContainer>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
