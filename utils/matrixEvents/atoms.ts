import { atomFamily, atom, selectorFamily } from 'recoil';
import { EventType } from './events.types';

export const eventIdsState = atom<string[]>({
    key: 'eventIdsState',
    default: [],
});

export const eventStateFamily = atomFamily<EventType, string>({
    key: 'eventStateFamily',
    default: {
        name: '',
        id: '',
        options: [],
        value: null,
    },
});

export const eventSelectorFamily = selectorFamily<EventType, string>({
    key: 'eventSelectorFamily',
    get: (id) => ({ get }) => {
        const event = get(eventStateFamily(id));
        return event;
    },
});
