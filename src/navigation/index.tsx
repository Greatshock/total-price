/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { DefaultTheme, NavigationContainer, Theme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList, RootStackScreenProps } from './navigation.model';
import LinkingConfiguration from './linking-configuration';
import { memo } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ShoppingScreen } from '../screens/shopping.screen';
import { SettingsScreen } from '../screens/settings.screen';
import { Ionicons } from '@native-base/icons';
import { Icon, View } from 'native-base';

const theme: Theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: '#f3f4f6',
    },
};

export const Navigation = memo(() => (
    <NavigationContainer linking={LinkingConfiguration} theme={theme}>
        <RootNavigator />
    </NavigationContainer>
));

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const screenOptions = { headerShown: false };

const RootNavigator = memo(() => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Home' component={HomeNavigator} options={screenOptions} />
            {/* <Stack.Group screenOptions={{ presentation: 'modal' }}> */}
            {/* <Stack.Screen name='Modal' component={ModalScreen} /> */}
            {/* </Stack.Group> */}
        </Stack.Navigator>
    );
});

const HomeNavigator = memo<RootStackScreenProps<'Home'>>(() => {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name='Shopping'
                component={ShoppingScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <Icon color={color} as={Ionicons} name='cart-outline' />
                    ),
                }}
            />
            <Tab.Screen
                name='Settings'
                component={SettingsScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <Icon color={color} as={Ionicons} name='settings-outline' />
                    ),
                }}
            />
        </Tab.Navigator>
    );
});
