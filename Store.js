import React from 'react';

export const StoreTokens = {
    Settings: '@TotalPrice:settings'
};

const DEFAULT_STORE_STATE = {
    settings: {
        currency: null,
        limit: null,
        vatIncluded: true,
        vatValue: null
    }
};

export const StoreContext = React.createContext(DEFAULT_STORE_STATE);

export class StoreProvider extends React.Component {
    constructor(props) {
        super(props);

        this.state = JSON.parse(JSON.stringify(DEFAULT_STORE_STATE));
    }

    getItem = async (token, onSuccess, onError) => {
        try {
            await AsyncStorage.getItem(`@TotalPrice:${token}`, (error, result) => {
                error ? onError(error) : onSuccess(JSON.parse(result));
            });
        } catch (error) {
            onError(error);
        }
    };

    setItem = async (token, value, onError) => {
        try {
            await AsyncStorage.setItem(`@TotalPrice:${token}`, JSON.stringify(value), onError);
        } catch (error) {
            onError(error);
        }
    };

    mergeItem = async (token, value, onError) => {
        try {
            await AsyncStorage.mergeItem(`@TotalPrice:${token}`, JSON.stringify(value), onError);
        } catch (error) {
            onError(error);
        }
    };

    render() {
        return (
            <StoreContext.Provider
                value={{
                    store: this.state,
                    getItem: this.getItem,
                    setItem: this.setItem,
                    mergeItem: this.mergeItem
                }}
            >
                {this.props.children}
            </StoreContext.Provider>
        );
    }
}
