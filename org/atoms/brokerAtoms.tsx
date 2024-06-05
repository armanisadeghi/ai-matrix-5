// /atoms/brokersAtoms.tsx

import { atom } from 'jotai';
import { atomFamily } from 'jotai/utils';

// Primitive atoms for the properties of `brokers`
export const brokerNameAtom = atom<string>('');
export const brokerTypeAtom = atom<string>('placeholder'); // or 'section'
export const brokerRequiredAtom = atom<boolean>(true);
export const brokerDefaultValueAtom = atom<any>(null);
export const brokerComponentAtom = atom<any>(null);

// Atom family for `brokers`
export const brokerFamily = atomFamily((id: number) => atom({
    name: '',
    type: 'placeholder',
    required: true,
    default_value: null,
    component: null,
}));

// Atom family for `brokers`
export const brokersAtomFamily = atomFamily((id: number) => atom({
    name: '',
    type: 'placeholder',
    required: true,
    default_value: null,
    component: null,
}));

// Derived atom for the `brokers` array
export const brokersAtom = atom((get) => {
    const brokers: {
        name: string;
        type: string;
        required: boolean;
        default_value: any;
        component: any;
    }[] = [];
    // Assuming we have a way to get the number of brokers
    const brokerCount = 1; // This should be dynamic based on your application logic
    for (let i = 0; i < brokerCount; i++) {
        brokers.push(get(brokersAtomFamily(i)));
    }
    return brokers;
});

