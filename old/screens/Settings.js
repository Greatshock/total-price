import React from 'react';
import { View , ScrollView, StyleSheet } from 'react-native';
import { Input, Text } from 'react-native-elements';
import { Colors } from '../common/colors';
import { MSwitch } from '../components';
import RNPickerSelect from 'react-native-picker-select';
import { StoreContext, ACTION_TYPES } from '../Store';

const CURRENCIES = [
    { label: 'USD – $', value: '$' },
    { label: 'EUR – €', value: '€' },
    { label: 'RUB – ₽', value: '₽' },
];

const CURRENCY_PLACEHOLDER = { label: 'Select...', value: null, color: Colors.NiagaraGray };

export const Settings = (props) => {
    const { state, dispatch } = React.useContext(StoreContext);
    const { limit, currency, vatIncluded, vatValue } = state;

    return (
        <ScrollView style={styles.container} keyboardShouldPersistTaps='handled'>
            <View style={styles.row}>
                <Text style={styles.label}>VAT</Text>
                <Text style={[styles.description, {marginBottom: 8}]}>
                    Value-added tax. Turn off if your local shops do not include it in prices.
                </Text>

                <MSwitch
                    containerStyle={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
                    titleStyle={{ fontSize: 18 }}
                    title='Included'
                    value={vatIncluded}
                    onValueChange={value => dispatch({ type: ACTION_TYPES.VAT_INCLUDED_CHANGE, payload: value })}
                />

                {
                    !vatIncluded
                    &&
                    <View style={{marginTop: 16}}>
                        <Text style={styles.description}>
                            Specify VAT rate. App will take it into account during total price calculation.
                        </Text>

                        <View style={styles.inputView}>
                            <Text style={[styles.inputPrefix, !vatValue && {color: Colors.MischkaGray}]}>%</Text>
                            <Input
                                inputContainerStyle={{borderBottomWidth: 0, padding: 0}}
                                placeholderTextColor='lightgray'
                                placeholder='20'
                                keyboardType='numeric'
                                numberOfLines={1}
                                value={vatValue}
                                onChangeText={value => dispatch({ type: ACTION_TYPES.VAT_VALUE_CHANGE, payload: value })}
                            />
                        </View>
                    </View>
                }
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>Currency</Text>
                <Text style={styles.description}>Your local currency symbol. All prices will include it.</Text>

                <RNPickerSelect
                    style={pickerSelectStyles}
                    placeholder = {CURRENCY_PLACEHOLDER}
                    items={CURRENCIES}
                    value={currency}
                    onValueChange={value => dispatch({ type: ACTION_TYPES.CURRENCY_CHANGE, payload: value })}
                />
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>Total Price Limit</Text>
                <Text style={styles.description}>
                    App will alert you when you are close or reach the price limit.
                </Text>

                <View style={styles.inputView}>
                    {
                        currency
                        &&
                        <Text style={[styles.inputPrefix, !limit && { color: Colors.MischkaGray }]}>
                            {currency}
                        </Text>
                    }
                    <Input
                        inputContainerStyle={{borderBottomWidth: 0}}
                        placeholder='7000'
                        placeholderTextColor='lightgray'
                        keyboardType='numeric'
                        value={limit}
                        onChangeText={newValue => dispatch({type: ACTION_TYPES.LIMIT_CHANGE, payload: newValue})}
                    />
                </View>
            </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        paddingHorizontal: 40,
        display: 'flex',
        flex: 1,
        backgroundColor: Colors.White
    },
    row: {
        marginBottom: 32,
        display: 'flex'
    },
    label: {
        marginBottom: 8,
        fontSize: 20,
        color: Colors.MagnetBlack
    },
    description: {
        marginBottom: 4,
        fontSize: 14,
        color: Colors.NiagaraGray
    },
    inputView: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: Colors.FogGray
    },
    inputPrefix: {
        paddingRight: 4,
        fontSize: 18,
        color: Colors.MagnetBlack
    }
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontFamily: 'Roboto',
        fontSize: 18,
        minHeight: 32,
        borderBottomWidth: 1,
        borderBottomColor: Colors.FogGray,
        color: Colors.MagnetBlack
    },
    inputAndroid: {
        fontFamily: 'Roboto',
        fontSize: 18,
        minHeight: 32,
        borderBottomWidth: 1,
        borderBottomColor: Colors.FogGray,
        color: Colors.MagnetBlack
    }
});
