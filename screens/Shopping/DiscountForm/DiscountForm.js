import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, ButtonGroup, Card, Input } from 'react-native-elements';

const UNITS = [ '%', '₽' ];

export default function DiscountForm(props) {
    const { onSubmit, onCancel, containerStyle } = props;

    const [discount, setDiscount] = React.useState(null);
    const [selectedUnitIndex, setSelectedUnitIndex] = React.useState(0);

    return (
        <View style={containerStyle}>
            <Card containerStyle={styles.discountView}>
                <View style={{ display: 'flex', flex: 1 }}>
                    <Input
                        containerStyle={{ paddingHorizontal: 0 }}
                        label='Discount'
                        keyboardType='numeric'
                        placeholder={`5 ${UNITS[selectedUnitIndex]}`}
                        maxLength={3}
                        value={discount}
                        onChangeText={value => setDiscount(value)}
                    />

                    <ButtonGroup
                        containerStyle={{ marginTop: 16, marginRight: 0, marginLeft: 0, height: 40 }}
                        buttons={UNITS}
                        selectedIndex={selectedUnitIndex}
                        onPress={index => setSelectedUnitIndex(index)}
                    />
                </View>

                <View style={styles.controlsContainer}>
                    <Button
                        title='Cancel'
                        type='outline'
                        onPress={onCancel}
                    />
                    <Button
                        containerStyle={{ marginLeft: 12, width: 120 }}
                        disabled={!discount}
                        title='Apply'
                        onPress={() => onSubmit({ discount, units: UNITS[selectedUnitIndex] })}
                    />
                </View>
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    discountView: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 232,
        borderRadius: 5
    },
    controlsContainer: {
        display: 'flex',
        flexDirection: 'row'
    }
});
