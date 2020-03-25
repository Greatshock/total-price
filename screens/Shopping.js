import React from 'react';
import { StyleSheet, View, Button, Text, TextInput } from 'react-native';

export default function Shopping() {
    const [totalPrice, setTotalPrice] = React.useState(0);
    const [inputValue, setInputValue] = React.useState('');

    const handleAddClick = () => {
        const price = parseFloat(inputValue);

        if (isNaN(price)) {
            alert('Only numbers allowed');
        } else {
            setTotalPrice(totalPrice + price);
        }

        setInputValue('')
    };

    return (
        <View style={styles.container}>
            <Text>Total: {totalPrice}</Text>

            <TextInput
                style={styles.input}
                value={inputValue}
                onChangeText={text => setInputValue(text)}
            />
            <Button
                title='Add'
                onPress={() => handleAddClick()}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        paddingLeft: 12,
        paddingRight: 12,
        height: 40,
        width: 120,
        borderColor: 'gray',
        borderWidth: 1
    }
});
