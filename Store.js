import React from 'react';
import { AppState } from 'react-native';

export const ACTION_TYPES = {
    LIMIT_CHANGE: 'limitChange',
    VAT_INCLUDED_CHANGE: 'vatIncludedChange',
    VAT_VALUE_CHANGE: 'vatValueChange',
    CURRENCY_CHANGE: 'currencyChange'
};

const INITIAL_STATE = {
    initialized: false,
    currency: null,
    limit: null,
    vatIncluded: true,
    vatValue: null
};

const STATE_STORAGE_TOKEN = `@TotalPrice:state`;

export const StoreContext = React.createContext(INITIAL_STATE);

export class StoreProvider extends React.Component {
    constructor(props) {
        super(props);

        this.state = JSON.parse(JSON.stringify(INITIAL_STATE));
    }

    alertError = (errorMessage) => {
        alert(errorMessage || 'Something went wrong... Unable to initialize app...')
    };

    getStateFromAsyncStorage = async () => {
        try {
            const state = await AsyncStorage.getItem(STATE_STORAGE_TOKEN);
            return state || JSON.parse(JSON.stringify(INITIAL_STATE));
        } catch (error) {
            return JSON.parse(JSON.stringify(INITIAL_STATE));
        }
    };

    saveStateToAsyncStorage = async () => {
        try {
            await AsyncStorage.setItem(
                STATE_STORAGE_TOKEN,
                JSON.stringify(this.state),
                () => this.alertError('Unable to save data!')
            );
        } catch (error) {
        }
    };

    dispatch = ({ type, payload }) => {
        switch (type) {
            case ACTION_TYPES.LIMIT_CHANGE:
                this.setState(state => ({...state, limit: payload}));
                break;

            case ACTION_TYPES.VAT_INCLUDED_CHANGE:
                this.setState(state => ({...state, vatIncluded: payload}));
                break;

            case ACTION_TYPES.VAT_VALUE_CHANGE:
                let result = '';
                const numericValue = parseFloat(payload);

                if (!isNaN(numericValue) && numericValue < 99) {
                    result = payload;
                }

                this.setState(state => ({...state, vatValue: result}));
                break;

            case ACTION_TYPES.CURRENCY_CHANGE:
                this.setState(state => ({...state, currency: payload}));
                break;
        }

        return this.state;
    };

    handleAppStateChange = async nextAppState => {
        if (nextAppState.match(/inactive|background/)) {
            await this.saveStateToAsyncStorage();
        }
    };

    componentDidMount() {
        AppState.addEventListener('change', this.handleAppStateChange);

        this.getStateFromAsyncStorage().then(state => {
            this.setState((prevState) => ({
                ...prevState,
                ...state,
                initialized: true
            }));
        });
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this.handleAppStateChange);
    }

    render() {
        return (
            <StoreContext.Provider
                value={{ state: this.state, dispatch: this.dispatch }}
            >
                {this.state.initialized
                    ?
                    this.props.children
                    :
                    null
                }
            </StoreContext.Provider>
        );
    }
}
