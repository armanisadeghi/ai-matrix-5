'use client';

import RegisterEventComponent from './components/RegisterEventComponent';
import EventListComponent from './components/EventListComponent';
import TriggerEventComponent from './components/TriggerEventComponent';
import { SimpleGrid, Title } from '@mantine/core';


// Sadly, I couldn't get it to work yet. I really have to think it through and figure out how to do it! TODO: Armani

const EventManagementPage = () => {
    return (
        <>
            <Title order={2}>Event Management</Title>
            <SimpleGrid cols={1} spacing="lg">
                <RegisterEventComponent />
                <EventListComponent />
                <TriggerEventComponent />
            </SimpleGrid>
        </>
    );
};

export default EventManagementPage;
