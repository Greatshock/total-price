import React from 'react';
import { Button as DefaultButton, KeyboardAvoidingView, Keyboard, Platform, TouchableWithoutFeedback, View } from 'react-native';
import { Icon, Button, Input, Overlay, Text, Card } from 'react-native-elements';
import { Colors} from '../../common/colors';
import DiscountForm from './DiscountForm/DiscountForm';

const PRICE_LIMIT = 8000;
const CURRENCY = '₽';
const INCREMENT_AMOUNT_TYPES = [1, 3, 5];

const getTotalPriceSeverityColor = (price, limit) => {
   const percentage = (price / limit * 100).toPrecision(1);
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

export default class Shopping extends React.Component {
//     // Whenever total price changes, reset inputs to default values
//     React.useEffect(() => {
//     setUnitPrice('');
//     setAmount('1');
//     setTotalPriceSeverityColor(getTotalPriceSeverityColor(totalPrice, PRICE_LIMIT));
// }, [totalPrice]);
//
// // Whenever unit price or amount changes, recalculate price
// React.useEffect(() => {
//     setPrice(parseFloat(unitPrice || 0) * parseFloat(amount || 0));
// }, [unitPrice, amount]);

    state = {
        totalPrice: 0,
        totalPriceSeverityColor: getTotalPriceSeverityColor(0, PRICE_LIMIT),

        price: 0,
        unitPrice: '',
        amount: '',

        discountPopoverVisible: false
    };

    unitPriceInputRef = React.createRef();

    render() {
        const {
            totalPrice,
            totalPriceSeverityColor,
            unitPrice,
            price,
            amount,
            discountPopoverVisible
        } = this.state;

        return (
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={{ paddingVertical: 20, paddingHorizontal: 40, flex: 1, backgroundColor: Colors.White }}>
                    <Text h3 h3Style={{ color: totalPriceSeverityColor, textAlign: 'center', fontWeight: '600' }}
                          numberOfLines={2}>
                        Total Price {'\n' + totalPrice}
                    </Text>

                    <KeyboardAvoidingView style={{flex: 1, paddingVertical: 32}} behavior='padding'>
                        <Input
                            ref={this.unitPriceInputRef}
                            containerStyle={{ minWidth: 200 }}
                            inputStyle={{ textAlign: 'center', fontSize: 24 }}
                            placeholder='Unit price'
                            keyboardType='numeric'
                            numberOfLines={1}
                            value={unitPrice}
                            onChangeText={newPrice => {
                                this.setState(({ amount }) => {
                                    return  {
                                        unitPrice: newPrice,
                                        price: amount * newPrice
                                    }
                                });
                            }}
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
                            onChangeText={newAmount => {
                                this.setState(({ unitPrice }) => {
                                    return {
                                        amount: newAmount,
                                        price: unitPrice * newAmount
                                    }
                                })
                            }}
                        />

                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                            {INCREMENT_AMOUNT_TYPES.map(increment => (
                                <Button
                                    containerStyle={{ marginHorizontal: 8, width: 50 }}
                                    key={increment}
                                    type='outline'
                                    title={`+${increment}`}
                                    onPress={() => {
                                        const newAmount = parseFloat(amount || 0) + increment;
                                        this.setState({amount: newAmount.toString()})
                                    }}
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
                            onPress={() => {
                                this.setState({
                                    totalPrice: totalPrice + price,
                                    price: 0
                                });
                                this.unitPriceInputRef.current && this.unitPriceInputRef.current.focus();
                            }}
                        />

                        <Button type='clear'
                                title='I have a discount'
                                onPress={() => this.setState({discountPopoverVisible: true})}
                        />
                    </KeyboardAvoidingView>

                    <Overlay
                        isVisible={discountPopoverVisible}
                        windowBackgroundColor="rgba(255, 255, 255, .7)"
                        width="auto"
                        height="auto"
                    >
                        <DiscountForm
                            onCancel={() => this.setState({discountPopoverVisible: false})}
                            onSubmit={({ discount, units }) => {
                                let newTotalPrice;
                                if (units === '%') {
                                    newTotalPrice = totalPrice * discount / 100;
                                } else { // User-specified currency
                                    newTotalPrice = totalPrice - discount;
                                }

                                this.setState({
                                    discountPopoverVisible: false,
                                    totalPrice: newTotalPrice
                                });
                            }}
                        />
                    </Overlay>

                    <View style={{ marginTop: 'auto', display: 'flex', flexDirection: 'row', alignSelf: 'center' }}>
                        <Button
                            type='clear'
                            title='Restart'
                            titleStyle={{ color: Colors.ScienceBlue }}
                            icon={<Icon type='material-community' name='restart' size={35} color={Colors.ScienceBlue} />}
                            onPress={() => this.setState({totalPrice: 0})}
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
                            onPress={() => {

                            }}
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}
