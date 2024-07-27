import { useRecoilCallback, useRecoilValue } from 'recoil';
import { useCallback } from 'react';
import { EventType } from './events.types';
import { eventStateFamily, eventIdsState, eventSelectorFamily } from './atoms';

const useMatrixEvents = () => {
    const eventIds = useRecoilValue(eventIdsState);

    const registerEvent = useRecoilCallback(({ set }) => (event: EventType) => {
        set(eventIdsState, (prevIds) => {
            if (!prevIds.includes(event.id)) {
                return [...prevIds, event.id];
            }
            return prevIds;
        });
        set(eventStateFamily(event.id), event);
    }, []);

    const triggerEvent = useRecoilCallback(({ set }) => (id: string, value: any) => {
        set(eventStateFamily(id), (prevEvent) => ({ ...prevEvent, value }));
    }, []);

    const getAllEvents = useCallback(() => {
        return eventIds.map(id => useRecoilValue(eventSelectorFamily(id)));
    }, [eventIds]);

    return {
        registerEvent,
        triggerEvent,
        getAllEvents,
        eventIds,
    };
};

export default useMatrixEvents;
