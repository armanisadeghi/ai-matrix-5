import React, { createContext, useContext } from 'react';
import { RecoilState, RecoilValue, useRecoilCallback } from 'recoil';

// This implementation uses a global state so it could potentially be used outside of React components, but I'm not sure if I've done it correctly.


interface MatrixState {
    get: <T>(atom: RecoilValue<T>) => T;
    getPromise: <T>(atom: RecoilValue<T>) => Promise<T>;
    set: <T>(atom: RecoilState<T>, valOrUpdater: T | ((currVal: T) => T)) => void;
    reset: <T>(atom: RecoilState<T>) => void;
    setAsync: <T>(atom: RecoilState<T>, asyncUpdater: (currVal: T) => Promise<T>) => Promise<void>;
}

const MatrixStateContext = createContext<MatrixState | null>(null);

export function RecoilMatrixState({ children }: { children: React.ReactNode }) {
    const get = useRecoilCallback<[RecoilValue<any>], any>(
        ({ snapshot }) => (atom) => snapshot.getLoadable(atom).contents,
        []
    );

    const getPromise = useRecoilCallback<[RecoilValue<any>], Promise<any>>(
        ({ snapshot }) => (atom) => snapshot.getPromise(atom),
        []
    );

    const set = useRecoilCallback<[RecoilState<any>, any | ((currVal: any) => any)], void>(
        ({ set }) => (atom, valOrUpdater) => set(atom, valOrUpdater),
        []
    );

    const reset = useRecoilCallback<[RecoilState<any>], void>(
        ({ reset }) => (atom) => reset(atom),
        []
    );

    const setAsync = useRecoilCallback<[RecoilState<any>, (currVal: any) => Promise<any>], Promise<void>>(
        ({ snapshot, set }) => async (atom, asyncUpdater) => {
            try {
                const currVal = snapshot.getLoadable(atom).contents;
                const newVal = await asyncUpdater(currVal);
                set(atom, newVal);
            } catch (error) {
                console.error('Error in setAsync:', error);
                throw error;
            }
        },
        []
    );

    const value = { get, getPromise, set, reset, setAsync };

    return (
        <MatrixStateContext.Provider value={value}>
            {children}
        </MatrixStateContext.Provider>
    );
}

export function useMatrixState(): MatrixState {
    const context = useContext(MatrixStateContext);
    if (!context) {
        throw new Error('useMatrixState must be used within a RecoilMatrixState');
    }
    return context;
}

// Global reference to MatrixState
let globalMatrixState: MatrixState | null = null;

// Function to set the global reference
export function setGlobalMatrixState(state: MatrixState) {
    globalMatrixState = state;
}

// Utility functions that can be used anywhere
export function getRecoil<T>(atom: RecoilValue<T>): T {
    if (!globalMatrixState) throw new Error('MatrixState not initialized');
    return globalMatrixState.get(atom);
}

export function getRecoilPromise<T>(atom: RecoilValue<T>): Promise<T> {
    if (!globalMatrixState) throw new Error('MatrixState not initialized');
    return globalMatrixState.getPromise(atom);
}

export function setRecoil<T>(atom: RecoilState<T>, valOrUpdater: T | ((currVal: T) => T)): void {
    if (!globalMatrixState) throw new Error('MatrixState not initialized');
    globalMatrixState.set(atom, valOrUpdater);
}

export function resetRecoil<T>(atom: RecoilState<T>): void {
    if (!globalMatrixState) throw new Error('MatrixState not initialized');
    globalMatrixState.reset(atom);
}

export function setRecoilAsync<T>(atom: RecoilState<T>, asyncUpdater: (currVal: T) => Promise<T>): Promise<void> {
    if (!globalMatrixState) throw new Error('MatrixState not initialized');
    return globalMatrixState.setAsync(atom, asyncUpdater);
}



/*
function App() {
    return (
        <RecoilRoot>
            <RecoilMatrixState>
                {(state) => {
                    setGlobalMatrixState(state);
                    return (
                        // Your application components
                    );
                }}
            </RecoilMatrixState>
        </RecoilRoot>
    );
}
*/
