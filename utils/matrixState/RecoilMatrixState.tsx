import { RecoilState, RecoilValue, useRecoilCallback } from 'recoil';


interface MatrixState {
    get: <T>(state: RecoilValue<T>) => T;
    getPromise: <T>(state: RecoilValue<T>) => Promise<T>;
    set: <T>(state: RecoilState<T>, valOrUpdater: T | ((currVal: T) => T)) => void;
    reset: <T>(state: RecoilState<T>) => void;
    setAsync: <T>(state: RecoilState<T>, asyncUpdater: (currVal: T) => Promise<T>) => Promise<void>;
}

let matrixState: MatrixState | null = null;

export default function RecoilMatrixState() {
    const get = useRecoilCallback<[RecoilValue<any>], any>(
        ({snapshot}) => (state) => snapshot.getLoadable(state).contents,
        []
    );

    const getPromise = useRecoilCallback<[RecoilValue<any>], Promise<any>>(
        ({snapshot}) => (state) => snapshot.getPromise(state),
        []
    );

    const set = useRecoilCallback<[RecoilState<any>, any | ((currVal: any) => any)], void>(
        ({set}) => (state, valOrUpdater) => set(state, valOrUpdater),
        []
    );

    const reset = useRecoilCallback<[RecoilState<any>], void>(
        ({reset}) => (state) => reset(state),
        []
    );

    const setAsync = useRecoilCallback<[RecoilState<any>, (currVal: any) => Promise<any>], Promise<void>>(
        ({snapshot, set}) => async (state, asyncUpdater) => {
            try {
                const currVal = snapshot.getLoadable(state).contents;
                const newVal = await asyncUpdater(currVal);
                set(state, newVal);
            } catch (error) {
                console.error(`Error in setRecoilAsync for state:`, state, error);
                throw error;
            }
        },
        []
    );

    matrixState = {get, getPromise, set, reset, setAsync};

    return null;
}

function ensureInitialized() {
    if (!matrixState) {
        throw new Error('RecoilMatrixState not initialized. Ensure RecoilMatrixState component is rendered within RecoilRoot.');
    }
}

export function getRecoil<T>(state: RecoilValue<T>): T {
    ensureInitialized();
    return matrixState!.get(state);
}

export function getRecoilPromise<T>(state: RecoilValue<T>): Promise<T> {
    ensureInitialized();
    return matrixState!.getPromise(state);
}

export function setRecoil<T>(state: RecoilState<T>, valOrUpdater: T | ((currVal: T) => T)) {
    ensureInitialized();
    matrixState!.set(state, valOrUpdater);
}

export function resetRecoil(state: RecoilState<any>) {
    ensureInitialized();
    matrixState!.reset(state);
}

export function setRecoilAsync<T>(state: RecoilState<T>, asyncUpdater: (currVal: T) => Promise<T>): Promise<void> {
    ensureInitialized();
    return matrixState!.setAsync(state, asyncUpdater);
}
