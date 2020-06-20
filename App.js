import * as React from 'react';
import useCachedResources from './src/hooks/useCachedResources';
import Root from './src/Root';

export default function App() {
    const isLoadingComplete = useCachedResources();

    return isLoadingComplete ? <Root /> : null;
}
