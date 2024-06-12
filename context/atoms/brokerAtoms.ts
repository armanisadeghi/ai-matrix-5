import { Component, Broker } from '@/types/broker';
import { atom } from 'recoil';

export const brokersAtom = atom<Broker[]>({
    key: 'brokersAtom',
    default: [],
});

export const currentBrokerAtom = atom<Broker | undefined>({
    key: 'currentBrokerAtom',
    default: {
        id: '',
        name: '',
        description: '',
        dataType: '',
        component: {} as Component,
    },
});
