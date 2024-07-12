'use client';

import { useState } from 'react';
import useMatrixEventsComponent from '@/utils/matrixEvents/useMatrixEventsComponent';
import { TextInput, Button } from '@mantine/core';

const TriggerEventComponent = () => {
    const { triggerEvent } = useMatrixEventsComponent();
    const [id, setId] = useState('');
    const [value, setValue] = useState('');

    const handleTrigger = () => {
        triggerEvent(id, value);
    };

    return (
        <div>
            <TextInput placeholder="Event ID" value={id} onChange={(e) => setId(e.currentTarget.value)} />
            <TextInput placeholder="Value to Trigger" value={value} onChange={(e) => setValue(e.currentTarget.value)} />
            <Button onClick={handleTrigger}>Trigger Event</Button>
        </div>
    );
};

export default TriggerEventComponent;
