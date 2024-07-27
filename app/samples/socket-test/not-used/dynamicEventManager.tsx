/*
import React, { useEffect } from 'react';
import { atom, atomFamily, selector, useRecoilState, useSetRecoilState, useRecoilValue, RecoilRoot, DefaultValue } from 'recoil';
import io from 'socket.io-client';

interface Event {
    eventName: string;
    namespace: string;
    sid: string;
    status: 'assigned' | 'streaming' | 'completed' | 'ongoing' | 'active' | 'inactive';
}

// Atom to store the list of events
const eventsState = atom<Event[]>({
    key: 'eventsState',
    default: [],
});

// Atom family to store text streams for each event
const dynamicEventTextStreamFamily = atomFamily<string[], string>({
    key: 'EventTextStream',
    default: [],
});

type EventAction =
    | { type: 'add', event: Event }
    | { type: 'remove', eventName: string }
    | { type: 'updateStatus', eventName: string, status: 'assigned' | 'streaming' | 'completed' | 'ongoing' | 'active' | 'inactive' };

// Selector to add/remove events and update their statuses
const eventsSelector = selector<Event[]>({
    key: 'eventsSelector',
    get: ({ get }) => {
        return get(eventsState);
    },
    set: ({ get, set }, newValue) => {
        if (!(newValue instanceof DefaultValue)) {
            const currentEvents = get(eventsState);
            const action = newValue as EventAction;

            switch (action.type) {
                case 'add':
                    set(eventsState, [...currentEvents, action.event]);
                    break;
                case 'remove':
                    set(eventsState, currentEvents.filter(e => e.eventName !== action.eventName));
                    break;
                case 'updateStatus':
                    set(eventsState, currentEvents.map(e => e.eventName === action.eventName ? { ...e, status: action.status } : e));
                    break;
                default:
                    break;
            }
        }
    },
});

// Component to display and manage events
function EventManager() {
    const events = useRecoilValue(eventsSelector);
    const setEvents = useSetRecoilState(eventsSelector);

    // Function to add a new event
    const addEvent = (eventName: string, namespace: string, sid: string) => {
        setEvents({
            type: 'add',
            event: { eventName, namespace, sid, status: 'active' },
        });
    };

    // Function to remove an event
    const removeEvent = (eventName: string) => {
        setEvents({
            type: 'remove',
            eventName,
        });
    };

    // Function to update the status of an event
    const updateEventStatus = (eventName: string, status: 'assigned' | 'streaming' | 'completed' | 'ongoing' | 'active' | 'inactive') => {
        setEvents({
            type: 'updateStatus',
            eventName,
            status,
        });
    };

    // Example of how to use these functions
    useEffect(() => {
        addEvent('event1', '/namespace1', 'sid1');
        addEvent('event2', '/namespace2', 'sid2');

        setTimeout(() => {
            updateEventStatus('event1', 'inactive');
            removeEvent('event2');
        }, 5000);
    }, []);

    return (
        <div>
            {events.map((event) => (
                <div key={event.eventName}>
                    <h2>Event: {event.eventName}</h2>
                    <p>Namespace: {event.namespace}</p>
                    <p>SID: {event.sid}</p>
                    <p>Status: {event.status}</p>
                </div>
            ))}
        </div>
    );
}

// Component to display text stream for each event
function EventTextStream({ eventName }: { eventName: string }) {
    const [textStream, setTextStream] = useRecoilState(dynamicEventTextStreamFamily(eventName));

    useEffect(() => {
        const socket = io('http://localhost:8000'); // Replace with your backend URL

        socket.on(eventName, (newTextChunk: string) => {
            setTextStream((prevStream) => [...prevStream, newTextChunk]);
        });

        return () => {
            socket.off(eventName);
        };
    }, [eventName, setTextStream]);

    return (
        <div>
            <h2>Event: {eventName}</h2>
            <div>{textStream.join('\n')}</div>
        </div>
    );
}

// Example usage of the EventManager and EventTextStream components
function App() {
    const events = useRecoilValue(eventsState);

    return (
        <RecoilRoot>
            <div>
                <EventManager />
                {events.map((event) => (
                    <EventTextStream key={event.eventName} eventName={event.eventName} />
                ))}
            </div>
        </RecoilRoot>
    );
}

export default App;
*/
