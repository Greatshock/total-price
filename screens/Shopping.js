import React from 'react';
import { Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, View, StyleSheet } from 'react-native';
import { Button, Icon, Input, Text } from 'react-native-elements';
import { Colors } from '../common/colors';

const PRICE_LIMIT = 8000;
const CURRENCY = '₽';
const INCREMENT_AMOUNT_TYPES = [1, 3, 5];

const getTotalPriceSeverityColor = (price, limit) => {
    const percentage = Math.round(price / limit * 100);
    if (percentage < 30) {
        return Colors.GrassGreen;
    } else if (percentage < 50) {
        return Colors.YellowDiamond;
    } else if (percentage < 75) {
        return Colors.FlushOrange;
    } else {
        return Colors.Amarant;
    }
};

export const Shopping = (props) => {
    const [totalPrice, setTotalPrice] = React.useState(0);
    const [totalPriceSeverityColor, setTotalPriceSeverityColor] = React.useState(getTotalPriceSeverityColor(0, PRICE_LIMIT));
    const [price, setPrice] = React.useState(0);
    const [unitPrice, setUnitPrice] = React.useState('');
    const [amount, setAmount] = React.useState('1');

    // TODO USE REDUCER

    const unitPriceInput = React.useRef(null);

    // Whenever unit price or amount changes, recalculate item price
    React.useEffect(() => {
        setPrice(parseFloat(amount || 0) * parseFloat(unitPrice || 0));
    }, [unitPrice, amount]);

    // Whenever total price changes, reset inputs to default values
    React.useEffect(() => {
        setUnitPrice('');
        setAmount('1');
        setTotalPriceSeverityColor(getTotalPriceSeverityColor(totalPrice, PRICE_LIMIT));

        if (totalPrice >= PRICE_LIMIT) {
            alert(`You have reached your limit of ${PRICE_LIMIT} ${CURRENCY}`)
        }
    }, [totalPrice]);

    const reset = () => {
        setTotalPrice(0);
        setUnitPrice('');
        setAmount('');
    };

    const incrementAmount = increment => {
        const newAmount = parseFloat(amount || 0) + increment;
        setAmount(newAmount.toString())
    };

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <Text h3 h3Style={{ color: totalPriceSeverityColor, textAlign: 'center' }}
                      numberOfLines={2}>
                    Total Price {'\n' + totalPrice}
                </Text>

                <KeyboardAvoidingView style={{display: 'flex', flex: 1, paddingVertical: 32}} behavior='padding'>
                    <Input
                        ref={unitPriceInput}
                        containerStyle={{ minWidth: 200 }}
                        inputStyle={{ textAlign: 'center', fontSize: 24 }}
                        placeholder='Unit price'
                        keyboardType='numeric'
                        numberOfLines={1}
                        value={unitPrice}
                        onChangeText={newPrice => setUnitPrice(newPrice)}
                    />

                    <Icon
                        containerStyle={{ marginTop: 16 }}
                        type='entypo'
                        name='cross'
                        size={30}
                        color={Colors.RoyalBlue}
                    />

                    <Input
                        containerStyle={{ minWidth: 200, marginBottom: 20 }}
                        inputStyle={{ textAlign: 'center', fontSize: 24 }}
                        placeholder='Amount'
                        keyboardType='numeric'
                        numberOfLines={1}
                        value={amount}
                        onChangeText={newAmount => setAmount(newAmount)}
                    />

                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                        {INCREMENT_AMOUNT_TYPES.map(increment => (
                            <Button
                                containerStyle={{ marginHorizontal: 8, width: 50 }}
                                key={increment}
                                type='outline'
                                title={`+${increment}`}
                                onPress={() => incrementAmount(increment)}
                            />
                        ))}
                    </View>

                    <Button
                        containerStyle={{ marginTop: 32, minWidth: 200 }}
                        buttonStyle={{ borderRadius: 20 }}
                        titleStyle={{ fontSize: 30, marginLeft: 8 }}
                        title={`${price} ${CURRENCY}`}
                        titleProps={{ numberOfLines: 1 }}
                        textStyle={{ fontSize: 20 }}
                        icon={<Icon
                            type='material-community'
                            name='cart-plus'
                            color={Colors.White}
                            size={30}
                        />}
                        onPress={() => setTotalPrice(totalPrice + price)}
                    />
                </KeyboardAvoidingView>

                <View style={{ marginTop: 'auto', display: 'flex', flexDirection: 'row', alignSelf: 'center' }}>
                    <Button
                        type='clear'
                        title='Restart'
                        titleStyle={{ color: Colors.ScienceBlue }}
                        icon={<Icon type='material-community' name='restart' size={35} color={Colors.ScienceBlue} />}
                        onPress={reset}
                    />

                    <Button
                        type='clear'
                        containerStyle={{ marginLeft: 20, minWidth: 140}}
                        title='Finish'
                        icon={<Icon
                            type='material-community'
                            name='cart-arrow-right'
                            size={35}
                            color={Colors.ScienceBlue}
                        />}
                        onPress={reset}
                    />
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        paddingVertical: 20,
        paddingHorizontal: 40,
        flex: 1,
        backgroundColor: Colors.White
    }
});
