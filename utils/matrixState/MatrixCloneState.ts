import { RecoilState, atomFamily, atom } from 'recoil';
import { getRecoil, setRecoil, resetRecoil } from './RecoilMatrixState';

interface CloneState<T> {
    originalAtom: RecoilState<T>;
    cloneAtom: RecoilState<T>;
}

const cloneStates: Record<string, CloneState<any>> = {};

export function cloneState<T>(stateName: string, originalAtom: RecoilState<T>, atomFamilyFn: (param: any) => RecoilState<T>, param: any): void {
    const familyAtom = atomFamilyFn(param);
    const cloneAtom = atom<T>({
        key: `${stateName}_clone`,
        default: getRecoil(familyAtom),
    });
    cloneStates[stateName] = { originalAtom: familyAtom, cloneAtom };
    setRecoil(cloneAtom, getRecoil(familyAtom));
}

export function getCloneState<T>(stateName: string): T {
    if (!cloneStates[stateName]) throw new Error(`Clone state "${stateName}" not initialized`);
    return getRecoil(cloneStates[stateName].cloneAtom);
}

export function setCloneState<T>(stateName: string, valOrUpdater: T | ((currVal: T) => T)): void {
    if (!cloneStates[stateName]) throw new Error(`Clone state "${stateName}" not initialized`);
    setRecoil(cloneStates[stateName].cloneAtom, valOrUpdater);
}

export async function pushAsyncUpdates(stateName: string): Promise<void> {
    if (!cloneStates[stateName]) throw new Error(`Clone state "${stateName}" not initialized`);
    const { originalAtom, cloneAtom } = cloneStates[stateName];
    const cloneValue = getRecoil(cloneAtom);
    await setRecoil(originalAtom, cloneValue);
}

export async function replaceAsyncState(stateName: string): Promise<void> {
    if (!cloneStates[stateName]) throw new Error(`Clone state "${stateName}" not initialized`);

    const { originalAtom, cloneAtom } = cloneStates[stateName];
    const originalValue = getRecoil(originalAtom);
    setRecoil(cloneAtom, originalValue);
}

export function resetClone(stateName: string): void {
    if (!cloneStates[stateName]) throw new Error(`Clone state "${stateName}" not initialized`);
    resetRecoil(cloneStates[stateName].cloneAtom);
}
