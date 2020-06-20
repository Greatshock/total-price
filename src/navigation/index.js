import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import SettingsNavigator from './navigators/SettingsNavigator';
import ShoppingNavigator from './navigators/ShoppingNavigator';
import { screenNames } from './screen-names';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = screenNames.SHOPPING;

export default function AppNavigation() {
    return (
        <NavigationContainer>
            <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
                <BottomTab.Screen
                    name={screenNames.SHOPPING}
                    component={ShoppingNavigator}
                />
                <BottomTab.Screen
                    name={screenNames.SETTINGS}
                    component={SettingsNavigator}
                />
            </BottomTab.Navigator>
        </NavigationContainer>
    );
}
