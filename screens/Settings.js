import React from 'react';
import { View , ScrollView, StyleSheet } from 'react-native';
import { Input, Text } from 'react-native-elements';
import { Colors } from '../common/colors';
import { MSwitch } from '../components';
import RNPickerSelect from 'react-native-picker-select';

const CURRENCIES = [
    { label: 'USD – $', value: '$' },
    { label: 'EUR – €', value: '€' },
    { label: 'RUB – ₽', value: '₽' },
];

const CURRENCY_PLACEHOLDER = { label: 'Select...', value: null, color: Colors.NiagaraGray };

export const Settings = (props) => {
    const [taxIncluded, setTaxIncluded] = React.useState(true);
    const [taxRate, setTaxRate] = React.useState(null);
    const [currency, setCurrency] = React.useState(null);
    const [limit, setLimit] = React.useState(null);

    const handleTaxRateChange = newValue => {
        const numericValue = parseFloat(newValue);

        if (isNaN(numericValue) || numericValue > 100) {
            alert('Invalid tax rate!');
            setTaxRate('');
        } else {
            setTaxRate(newValue);
        }
    };

    return (
        <ScrollView style={styles.container} keyboardShouldPersistTaps='handled'>
            <View style={styles.row}>
                <Text style={styles.label}>VAT</Text>
                <Text style={styles.description}>
                    Value-added tax. Turn off if your local shops do not include it in prices.
                </Text>

                <MSwitch
                    containerStyle={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
                    titleStyle={{ fontSize: 18 }}
                    title='Included'
                    value={taxIncluded}
                    onValueChange={value => setTaxIncluded(value)}
                />

                {
                    !taxIncluded
                    &&
                    <View style={[styles.row, {marginTop: 8}]}>
                        <Text style={styles.description}>
                            Specify VAT rate. App will take it into account during total price calculation.
                        </Text>

                        <View style={styles.inputView}>
                            <Text style={[styles.inputPrefix, !taxRate && {color: 'lightgray'}]}>{currency}</Text>
                            <Input
                                inputContainerStyle={{borderBottomWidth: 0}}
                                placeholderTextColor='lightgray'
                                placeholder='20%'
                                keyboardType='numeric'
                                numberOfLines={1}
                                value={taxRate}
                                onChangeText={handleTaxRateChange}
                            />
                        </View>
                    </View>
                }
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>Currency</Text>
                <Text style={styles.description}>Your local currency symbol. All prices will include it.</Text>

                <RNPickerSelect
                    placeholder = {CURRENCY_PLACEHOLDER}
                    value={currency}
                    onValueChange={value => setCurrency(value)}
                    items={CURRENCIES}
                />
            </View>

            <View style={styles.row}>
                <Text style={styles.label}>Total Price Limit</Text>
                <Text style={styles.description}>
                    App will alert you when you reach the price limit.
                </Text>

                <View style={styles.inputView}>
                    <Text style={[styles.inputPrefix, !taxRate && {color: 'lightgray'}]}>%</Text>
                    <Input
                        inputContainerStyle={{borderBottomWidth: 0}}
                        placeholder='7000'
                        placeholderTextColor='lightgray'
                        keyboardType='numeric'
                        value={limit}
                        onChangeText={newValue => setLimit(parseFloat(newValue))}
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
        display: 'flex',
        flex: 1
    },
    label: {
        marginBottom: 8,
        fontSize: 20,
        color: Colors.MagnetBlack
    },
    description: {
        marginBottom: 8,
        fontSize: 14,
        color: Colors.PigeonGray
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
        color: 'lightgray'
    }
});
