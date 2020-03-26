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
    input: {
        minWidth: 100,
        textAlign: 'center',
        fontSize: 20
    },
    incrementButtonsContainer: {
    },
    submitButton: {
        marginTop: 16,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 7,
        paddingHorizontal: 12,
        minWidth: 200,
        backgroundColor: 'lightgreen',
        borderRadius: 20
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
    }
});
