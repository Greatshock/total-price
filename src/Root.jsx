import { configureStore } from '@reduxjs/toolkit';
import React from 'react';
import { SafeAreaView } from 'react-native';
import { Provider } from 'react-redux';
import AppNavigation from './navigation';
import rootReducer from './reducers';

const store = configureStore({
    reducer: rootReducer
});

export default function Root() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Provider store={store}>
                <AppNavigation />
            </Provider>
        </SafeAreaView>
    );
}
