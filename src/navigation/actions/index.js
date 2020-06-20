import { CommonActions } from '@react-navigation/native';
import { screenNames } from '../screen-names';

export const navigateToShopping = () => CommonActions.navigate(screenNames.SHOPPING);

export const navigateToSettings = () => CommonActions.navigate(screenNames.SETTINGS);
