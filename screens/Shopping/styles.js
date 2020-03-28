import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        padding: 20,
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    column: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    row: {
        marginBottom: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    totalPriceTitle: {
        fontSize: 30
    },
    totalPrice: {
        marginBottom: 40,
        fontSize: 30
    },
    entries: {
        display: 'flex',
        flex: 1,
        marginVertical: 24
    },
    sessionControls: {
        marginTop: 'auto',
        display: 'flex',
        flexDirection: 'row'
    },
    discountPopover: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightgray'
    }
});
