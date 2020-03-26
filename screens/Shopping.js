import React from 'react';
import { Button, StyleSheet, Text, TextInput, View, Platform, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const CURRENCY = '₽';

export default function Shopping() {
    const [totalPrice, setTotalPrice] = React.useState(0);
    const [unitPrice, setUnitPrice] = React.useState('0');
    const [amount, setAmount] = React.useState('1');
    const [price, setPrice] = React.useState(0);

    // Whenever total price changes, reset inputs to default values
    React.useEffect(() => {
        setUnitPrice('');
        setAmount('1');
    }, [totalPrice]);

    // Whenever unit price or amount changes, recalculate price
    React.useEffect(() => {
        setPrice(parseFloat(unitPrice || 0) * parseFloat(amount));
    }, [unitPrice, amount]);

    const incrementAmount = increment => {
        const newAmount = parseFloat(amount) + increment;
        setAmount(newAmount.toString())
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Total Price</Text>
            <Text style={styles.totalPrice} numberOfLines={1}>{totalPrice}</Text>

            <View style={styles.row}>
                <Text style={styles.inputLabel}>Unit Price</Text>

                <TextInput
                    style={styles.input}
                    value={unitPrice}
                    keyboardType='numeric'
                    autoFocus={true}
                    clearButtonMode='while-editing'
                    clearTextOnFocus={true}
                    onChangeText={newPrice => setUnitPrice(newPrice)}
                />
            </View>

            <View style={styles.row}>
                <Text style={styles.inputLabel}>Amount</Text>

                <TextInput
                    style={styles.input}
                    value={amount}
                    keyboardType='numeric'
                    clearButtonMode='while-editing'
                    clearTextOnFocus={true}
                    onChangeText={newAmount => setAmount(newAmount)}
                />
            </View>

            <View style={styles.row}>
                {INCREMENT_AMOUNT_BUTTONS.map(button => (
                    <Button
                        key={button.increment}
                        title={`+${button.increment}`}
                        onPress={() => incrementAmount(button.increment)}
                    />
                ))}
            </View>

            <View style={{ opacity: unitPrice ? 1 : 0.5 }}>
                <TouchableOpacity
                    style={[styles.priceSubmitButton]}
                    disabled={!unitPrice}
                    onPress={() => setTotalPrice(totalPrice + price)}
                >
                    <Ionicons size={40} name={Platform.OS === 'ios' ? 'ios-add' : 'md-add'} />
                    <Text style={{ marginLeft: 8, fontSize: 32 }} numberOfLines={1}>
                        {price} {CURRENCY}
                    </Text>
                </TouchableOpacity>
            </View>

            <Button title='I have a discount' onPress={() => {}} />

            <View style={styles.row}>
                <MaterialCommunityIcons size={40} name='restart' />
                <Button title='Restart' onPress={() => {}} />

                <MaterialCommunityIcons size={40} name='flag-checkered' />
                <Button title='Finish Shopping' onPress={() => {}} />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 40,
        paddingHorizontal: 20,
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontSize: 40,
    },
    totalPrice: {
        marginBottom: 40,
        fontSize: 40,
    },
    inputLabel: {
        fontSize: 20,
        marginRight: 8,
    },
    input: {
        paddingRight: 4,
        paddingVertical: 2,
        height: 40,
        width: 120,
        borderColor: 'gray',
        borderWidth: 0,
        borderBottomWidth: 1,
        fontSize: 20
    },
    priceSubmitButton: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 7,
        paddingHorizontal: 12,
        minWidth: 200,
        backgroundColor: 'lightgreen',
        borderRadius: 20
    }
});

const INCREMENT_AMOUNT_BUTTONS = [
    { increment: 1 },
    { increment: 3 },
    { increment: 5 },
];
