import * as Font from 'expo-font';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Platform, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Settings, Shopping } from './screens';
import { ThemeProvider } from 'react-native-elements';
import { Colors } from './common/colors';
import { StoreProvider } from './Store';

export default class App extends React.Component {
    state = {
        fontsLoaded: false
    };

    async componentDidMount() {
        await Font.loadAsync({
            'Roboto-Light': require('./assets/fonts/Roboto-Light.ttf'),
            'Roboto': require('./assets/fonts/Roboto-Regular.ttf'),
            'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf')
        });

        this.setState({ fontsLoaded: true });
    }

    render() {
        const { fontsLoaded } = this.state;

        return (
            <StoreProvider>
                <ThemeProvider theme={theme}>
                    <SafeAreaView style={{display: 'flex', flex: 1}}>
                        {
                            fontsLoaded
                                ?
                                <NavigationContainer>
                                    <RootTab.Navigator
                                        tabBarOptions={{
                                            activeTintColor: Colors.ScienceBlue,
                                            inactiveTintColor: Colors.NiagaraGray,
                                        }}
                                    >
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
                                :
                                null
                        }
                    </SafeAreaView>
                </ThemeProvider>
            </StoreProvider>
        );
    }
}

const theme = {
    colors: {
        primary: Colors.ScienceBlue,
        success: Colors.GrassGreen,
        warning: Colors.YellowDiamond,
        error: Colors.Amarant
    },
    Button: {
        titleStyle: {
            fontFamily: 'Roboto'
        }
    },
    Card: {
        containerStyle: {
            marginHorizontal: 0,
            marginVertical: 0
        },
    },
    Text: {
        style: {
            fontFamily: 'Roboto',
            color: Colors.MagnetBlack
        }
    },
    Input: {
        containerStyle: {
            paddingHorizontal: 0,
        },
        inputContainerStyle: {
            borderColor: Colors.FogGray
        },
        inputStyle: {
            minHeight: 32,
            fontFamily: 'Roboto',
            color: Colors.MagnetBlack
        },
        placeholderTextColor: Colors.MischkaGray
    }
};

const RootTab = Platform.select({
    ios: createBottomTabNavigator(),
    android: createMaterialBottomTabNavigator()
});
