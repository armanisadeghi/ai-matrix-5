import { Component, Broker } from '@/types/broker'
import { atom } from 'recoil'

export const brokersAtom = atom<Broker[]>({
    key: 'brokersAtom',
    default: []
})

export const brokerAtom = (id: string) =>
    atom<Broker>({
        key: `brokerAtom-${id}`,
        default: {
            id: '',
            name: '',
            description: '',
            officialName: '',
            defaultValue: '',
            dataType: '',
            component: {} as Component
        }
    })

export const categoryAtom = atom<string[]>({
    key: 'categoryAtom',
    default: []
})
