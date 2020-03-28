import React from 'react';
import { Button as DefaultButton, KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import { Icon, Button, Input, Overlay } from 'react-native-elements';
import { styles } from './styles';
import DiscountForm from './DiscountForm/DiscountForm';

const PRICE_LIMIT = 8000;
const CURRENCY = '₽';
const INCREMENT_AMOUNT_BUTTONS = [
    {increment: 1},
    {increment: 3},
    {increment: 5},
];

const getTotalPriceSeverityColor = (price, limit) => {
   const percentage = (price / limit * 100).toPrecision(1);
   if (percentage < 30) {
       return 'lightgreen';
   } else if (percentage < 50) {
       return 'yellow';
   } else if (percentage < 75) {
       return 'orange';
   } else {
       return 'red';
   }
};

export default function Shopping() {
    const [totalPrice, setTotalPrice] = React.useState(0);
    const [totalPriceSeverityColor, setTotalPriceSeverityColor] = React.useState(getTotalPriceSeverityColor(0, PRICE_LIMIT));
    const [unitPrice, setUnitPrice] = React.useState('0');
    const [amount, setAmount] = React.useState('1');
    const [price, setPrice] = React.useState(0);
    const [discountPopoverVisible, setDiscountPopoverVisible] = React.useState(false);

    const unitPriceInput = React.useRef(null);

    // Whenever total price changes, reset inputs to default values
    React.useEffect(() => {
        setUnitPrice('');
        setAmount('');
        setTotalPriceSeverityColor(getTotalPriceSeverityColor(totalPrice, PRICE_LIMIT));
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
        <ScrollView style={styles.container}
                    contentContainerStyle={styles.content}
                    keyboardShouldPersistTaps='handled'>

            <Text style={styles.totalPriceTitle}>Total Price</Text>
            <Text style={[styles.totalPrice, { color: totalPriceSeverityColor }]} numberOfLines={1}>{totalPrice}</Text>

            <KeyboardAvoidingView style={styles.column} behavior='padding'>
                <Input
                    ref={unitPriceInput}
                    containerStyle={{ minWidth: 100 }}
                    inputStyle={{ textAlign: 'center' }}
                    placeholder='Unit price'
                    keyboardType='numeric'
                    clearTextOnFocus={true}
                    numberOfLines={1}
                    value={unitPrice}
                    onChangeText={newPrice => setUnitPrice(newPrice)}
                />

                <Icon containerStyle={{ marginTop: 16 }} type='entypo' name='cross' size={25} color='#1990ff' />

                <Input
                    containerStyle={{ minWidth: 100, marginBottom: 20 }}
                    inputStyle={{ textAlign: 'center' }}
                    placeholder='Amount'
                    keyboardType='numeric'
                    clearTextOnFocus={true}
                    numberOfLines={1}
                    value={amount}
                    onChangeText={newAmount => setAmount(newAmount)}
                />

                <View style={styles.row}>
                    {INCREMENT_AMOUNT_BUTTONS.map(button => (
                        <Button
                            containerStyle={{ marginHorizontal: 8 }}
                            key={button.increment}
                            type='outline'
                            title={`+${button.increment}`}
                            onPress={() => incrementAmount(button.increment)}
                        />
                    ))}
                </View>

                <Button
                    containerStyle={{ marginTop: 20, width: 200 }}
                    buttonStyle={{ borderRadius: 40 }}
                    titleStyle={{ fontSize: 30, marginLeft: 8 }}
                    title={`${price} ${CURRENCY}`}
                    textStyle={{ fontSize: 20 }}
                    disabled={price + totalPrice >= PRICE_LIMIT}
                    icon={<Icon
                        containerStyle={{ height: 40 }}
                        type='ionicon'
                        name={Platform.OS === 'ios' ? 'ios-add' : 'md-add'}
                        color='#fff'
                        size={40}
                    />}
                    onPress={() => {
                        setTotalPrice(totalPrice + price);
                        unitPriceInput.current && unitPriceInput.current.focus();
                    }}
                />
            </KeyboardAvoidingView>

            <DefaultButton title='I have a discount' onPress={() => setDiscountPopoverVisible(true)} />
            <Overlay
                isVisible={discountPopoverVisible}
                windowBackgroundColor="rgba(255, 255, 255, .7)"
                width="auto"
                height="auto"
            >
                <DiscountForm
                    onCancel={() => setDiscountPopoverVisible(false)}
                    onSubmit={({ discount, units }) => {
                        if (units === '%') {
                            setTotalPrice(totalPrice * discount / 100)
                        } else { // User-specified currency
                            setTotalPrice(totalPrice - discount)
                        }

                        setDiscountPopoverVisible(false);
                    }}
                />
            </Overlay>

            {/*<View style={styles.entries}>*/}
            {/*    <Text> TODO Entries</Text>*/}
            {/*</View>*/}

            <View style={styles.sessionControls}>
                <Button
                    title='Restart'
                    type='outline'
                    disabled={!totalPrice}
                    icon={<Icon type='material-community' name='restart' size={40} />}
                    onPress={() => setTotalPrice(0)}
                />

                <Button
                    containerStyle={{marginLeft: 20}}
                    title='Stop Shopping'
                    icon={<Icon type='zocial' name='cart' size={30} />}
                    onPress={() => {

                    }}
                />
            </View>

        </ScrollView>
    )
}
