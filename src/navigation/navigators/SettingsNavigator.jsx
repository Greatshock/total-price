import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SettingsScreen } from '../../features/settings/SettingsScreen';

const SettingsStack = createStackNavigator();

export default function SettingsNavigator({ navigation, route }) {
    return (
        <SettingsStack.Navigator>
            <SettingsStack.Screen
                name='Settings'
                component={SettingsScreen}
            />
        </SettingsStack.Navigator>
    );
}
