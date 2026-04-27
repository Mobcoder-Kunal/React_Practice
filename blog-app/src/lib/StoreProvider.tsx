'use client';
import { useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from './store';

function StoreProvider({ children }: { children: React.ReactNode }) {
    const storeRef = useRef<AppStore | null>(null);
    if(!storeRef.current) {
        // create store instance for first time render
        storeRef.current = makeStore();
        storeRef.current.dispatch({ type: '@@APP/INITIALIZED' });
    }

    return <Provider store={storeRef.current}>{ children }</Provider>
}

export default StoreProvider;