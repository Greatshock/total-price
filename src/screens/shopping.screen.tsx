import { Text } from 'native-base';
import { memo } from 'react';
import { HomeTabScreenProps } from '../navigation/navigation.model';

export const ShoppingScreen = memo<HomeTabScreenProps<'Shopping'>>(() => {
    return <Text>Shopping</Text>;
});
