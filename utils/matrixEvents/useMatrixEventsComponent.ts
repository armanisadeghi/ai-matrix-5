import { useRecoilValue } from 'recoil';
import { eventSelectorFamily } from './atoms';
import useMatrixEvents from './useMatrixEvents';

const useMatrixEventsComponent = () => {
    const { registerEvent, triggerEvent, getAllEvents, eventIds } = useMatrixEvents();

    const subscribeEvent = (id: string) => useRecoilValue(eventSelectorFamily(id));

    return {
        registerEvent,
        subscribeEvent,
        triggerEvent,
        getAllEvents: () => eventIds.map(id => subscribeEvent(id)),
    };
};

export default useMatrixEventsComponent;
