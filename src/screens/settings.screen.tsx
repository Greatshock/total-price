import { Box, Text, FormControl, Switch, HStack, Input, VStack, Divider } from 'native-base';
import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HomeTabScreenProps } from '../navigation/navigation.model';
import {
    selectCurrency,
    selectLimit,
    selectVat,
    setVatRate,
} from '../store/settings/settings.slice';

export const SettingsScreen = memo<HomeTabScreenProps<'Settings'>>(() => {
    const dispatch = useDispatch();
    const vat = useSelector(selectVat);
    const limit = useSelector(selectLimit);
    const currency = useSelector(selectCurrency);

    return (
        <Box>
            <VStack space={2}>
                <FormControl>
                    <FormControl.Label>VAT</FormControl.Label>
                    <HStack alignItems='center' space={2}>
                        <Text>Included</Text>
                        <Switch
                            value={vat.included}
                            onValueChange={(value) => {
                                dispatch(setVatRate(value ? null : 0));
                            }}
                        />
                    </HStack>
                    <FormControl.HelperText>
                        Value-added tax. Turn off if your local shops do not include it in prices.
                    </FormControl.HelperText>
                </FormControl>

                {!vat.included && (
                    <FormControl isRequired>
                        <FormControl.Label>Rate</FormControl.Label>
                        <Input
                            maxWidth={120}
                            type='number'
                            keyboardType='numeric'
                            value={vat.rate.toString()}
                            clearTextOnFocus={vat.rate === 0}
                            onChangeText={(value) => {
                                const numberValue = +value;

                                if (
                                    Number.isInteger(numberValue) &&
                                    numberValue < 100 &&
                                    numberValue >= 0
                                ) {
                                    dispatch(
                                        setVatRate(
                                            Number.isNaN(+value) || value === '' ? 0 : +value
                                        )
                                    );
                                }
                            }}
                        />
                        <FormControl.HelperText>
                            Tax rate. Must be positive number between 1 and 99.
                        </FormControl.HelperText>
                    </FormControl>
                )}

                <Divider />

                <FormControl>
                    <FormControl.Label>Currency</FormControl.Label>
                    <Input maxWidth={120} placeholder='$' value={currency} />
                    <FormControl.HelperText>
                        Your local currency symbol. All prices will include it.
                    </FormControl.HelperText>
                </FormControl>

                <FormControl>
                    <FormControl.Label>Price Limit</FormControl.Label>
                    <Input
                        maxWidth={120}
                        keyboardType='number-pad'
                        placeholder='5000'
                        value={limit?.toString()}
                    />
                    <FormControl.HelperText>
                        App will send alerts when you reach the limit.
                    </FormControl.HelperText>
                </FormControl>
            </VStack>
        </Box>
    );
});
