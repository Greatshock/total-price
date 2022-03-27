import { Provider } from 'react-redux';
import { NativeBaseProvider, Box, StatusBar, extendTheme } from 'native-base';
import { Navigation } from './src/navigation';
import { store } from './src/store/store';

const theme = extendTheme({
    components: {},
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
