import { configureStore } from '@reduxjs/toolkit';
import React from 'react';
import { Provider } from 'react-redux';
import AppNavigation from './navigation';
import rootReducer from './reducers';

const store = configureStore({
    reducer: rootReducer
});

export default function Root() {
    return (
        <Provider store={store}>
            <AppNavigation />
        </Provider>
    );
}
