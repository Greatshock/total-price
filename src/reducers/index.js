import { combineReducers } from 'redux';
import settingsReducer from '../features/settings/settingsSlice';
import shoppingReducer from '../features/shopping/shoppingSlice';

export default combineReducers({
    settingsReducer,
    shoppingReducer,
})
