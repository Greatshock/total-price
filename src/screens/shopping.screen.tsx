import { Box, Button, Heading, HStack, Input, Text, Progress } from 'native-base';
import { memo, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { HomeTabScreenProps } from '../navigation/navigation.model';
import { selectCurrency, selectLimit, selectVat } from '../store/settings/settings.slice';

const buttons = [1, 3, 5];
const cart = [
    { price: 5, amount: 1 },
    { price: 1, amount: 10 },
    { price: 3, amount: 2 },
    { price: 50, amount: 1 },
    { price: 2, amount: 6 },
    { price: 5, amount: 2 },
    { price: 7, amount: 3 },
];

export const ShoppingScreen = memo<HomeTabScreenProps<'Shopping'>>(() => {
    const vat = useSelector(selectVat);
    const limit = useSelector(selectLimit);
    const currency = useSelector(selectCurrency);

    const incrementButtonsGroup = useMemo(
        () => (
            <Button.Group>
                {buttons.map((value) => (
                    <Button key={value}>{'+' + value}</Button>
                ))}
            </Button.Group>
        ),
        []
    );

    return (
        <Box>
            <Heading>Total Price</Heading>
            <Progress />
            <Input keyboardType='numeric' placeholder='Unit Price' />
            <Text>X</Text>
            <Input keyboardType='numeric' placeholder='Number of Units' />
            {incrementButtonsGroup}

            <Button>{`0 ${currency}`}</Button>

            <Heading size='md'>Cart</Heading>
            {cart.map((item, index) => (
                <HStack key={index}>
                    <Text>{item.price} </Text>
                    <Text>{item.amount} </Text>
                    <Button variant='ghost'>❌</Button>
                </HStack>
            ))}

            <Button.Group>
                <Button variant='ghost'>Restart</Button>
                <Button variant='ghost'>Finish</Button>
            </Button.Group>
        </Box>
    );
});
