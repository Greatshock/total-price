import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ShoppingScreen } from '../../features/shopping/ShoppingScreen';

const ShoppingStack = createStackNavigator();

export default function ShoppingNavigator({ navigation, route }) {
    return (
        <ShoppingStack.Navigator>
            <ShoppingStack.Screen
                name='Shopping'
                component={ShoppingScreen}
            />
        </ShoppingStack.Navigator>
    );
}
