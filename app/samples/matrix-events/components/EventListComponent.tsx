'use client';

import useMatrixEventsComponent from '@/utils/matrixEvents/useMatrixEventsComponent';

const EventListComponent = () => {
    const { getAllEvents } = useMatrixEventsComponent();
    const events = getAllEvents();

    return (
        <div>
            <h3>Registered Events</h3>
            <ul>
                {events.map((event) => (
                    <li key={event.id}>{event.name} (ID: {event.id}, Value: {event.value})</li>
                ))}
            </ul>
        </div>
    );
};

export default EventListComponent;
