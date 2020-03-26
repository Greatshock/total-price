import React from 'react';
import { Button, Text, TextInput, View, Platform, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native';
import { Ionicons, MaterialCommunityIcons, Zocial, Entypo } from '@expo/vector-icons';
import { styles } from './styles';

export default function Shopping() {
    // Total price for the current shopping session
    const [totalPrice, setTotalPrice] = React.useState(0);
    // Price for the item
    const [unitPrice, setUnitPrice] = React.useState('0');
    // Number of items with current unitPrice
    const [amount, setAmount] = React.useState('1');
    // Price to be added (unitPrice * amount)
    const [price, setPrice] = React.useState(0);

    const unitPriceInput = React.useRef(null);

    // Whenever total price changes, reset inputs to default values
    React.useEffect(() => {
        setUnitPrice('');
        setAmount('');
    }, [totalPrice]);

    // Whenever unit price or amount changes, recalculate price
    React.useEffect(() => {
        setPrice(parseFloat(unitPrice || 0) * parseFloat(amount || 0));
    }, [unitPrice, amount]);

    const incrementAmount = increment => {
        const newAmount = parseFloat(amount || 0) + increment;
        setAmount(newAmount.toString())
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>

            <Text style={styles.totalPriceTitle}>Total Price</Text>
            <Text style={styles.totalPrice} numberOfLines={1}>{totalPrice}</Text>

            <KeyboardAvoidingView style={styles.column} behavior='padding'>
                <TextInput
                    style={styles.input}
                    ref={unitPriceInput}
                    placeholder='Unit price'
                    keyboardType='numeric'
                    clearTextOnFocus={true}
                    numberOfLines={1}
                    value={unitPrice}
                    onChangeText={newPrice => setUnitPrice(newPrice)}
                />

                <Entypo style={{marginTop: 8}} name='cross' size={20} />

                <TextInput
                    style={styles.input}
                    placeholder='Amount'
                    keyboardType='numeric'
                    clearTextOnFocus={true}
                    numberOfLines={1}
                    value={amount}
                    onChangeText={newAmount => setAmount(newAmount)}
                />

                <View style={[styles.incrementButtonsContainer, styles.row]}>
                    {INCREMENT_AMOUNT_BUTTONS.map(button => (
                        <Button
                            key={button.increment}
                            title={`+${button.increment}`}
                            onPress={() => incrementAmount(button.increment)}
                        />
                    ))}
                </View>
            </KeyboardAvoidingView>

            <View style={{ opacity: unitPrice ? 1 : 0.5 }}>
                <TouchableOpacity
                    style={styles.submitButton}
                    disabled={!unitPrice}
                    onPress={() => {
                        setTotalPrice(totalPrice + price);
                        unitPriceInput.current && unitPriceInput.current.focus();
                    }}
                >
                    <Ionicons size={40} name={Platform.OS === 'ios' ? 'ios-add' : 'md-add'} />
                    <Text style={{ marginLeft: 8, fontSize: 32 }} numberOfLines={1}>
                        {price} {CURRENCY}
                    </Text>
                </TouchableOpacity>
            </View>

            <Button title='I have a discount' onPress={() => {}} />

            <View style={styles.entries}>
                <Text> TODO Entries</Text>
            </View>

            <View style={styles.sessionControls}>
                <MaterialCommunityIcons size={40} name='restart' />
                <Button
                    title='Restart'
                    disabled={!totalPrice}
                    onPress={() => setTotalPrice(0)}
                />

                <Zocial size={30} name='cart' />
                <Button title='Stop Shopping' onPress={() => {}} />
            </View>

        </ScrollView>
    )
}

const CURRENCY = '₽';
const INCREMENT_AMOUNT_BUTTONS = [
    { increment: 1 },
    { increment: 3 },
    { increment: 5 },
];
