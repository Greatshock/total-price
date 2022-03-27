import { Provider } from 'react-redux';
import { NativeBaseProvider, Box, StatusBar, extendTheme } from 'native-base';
import { Navigation } from './src/navigation';
import { store } from './src/store/store';

const colorScheme = 'primary';
const theme = extendTheme({
    components: {
        Button: {
            defaultProps: { colorScheme },
        },
        Input: {
            defaultProps: { colorScheme },
        },
        Switch: {
            defaultProps: { colorScheme },
        },
    },
});

export default function App() {
    return (
        <Provider store={store}>
            <NativeBaseProvider theme={theme}>
                <Box h='100%' bg='white'>
                    <StatusBar />
                    <Navigation />
                </Box>
            </NativeBaseProvider>
        </Provider>
    );
}
