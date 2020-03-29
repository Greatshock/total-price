import * as Font from 'expo-font';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Platform, SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Settings, Shopping, Stats } from './screens';
import { ThemeProvider } from 'react-native-elements';
import { Colors } from './common/colors';

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
            fontFamily: 'Roboto'
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
            fontFamily: 'Roboto'
        }
    }
};

const RootTab = Platform.select({
    ios: createBottomTabNavigator(),
    android: createMaterialBottomTabNavigator()
});

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
            <ThemeProvider theme={theme}>
                <SafeAreaView style={styles.container}>
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
                            :
                            null
                    }
                </SafeAreaView>
            </ThemeProvider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
