'use client';

import { useState } from 'react';
import useMatrixEventsComponent from '@/utils/matrixEvents/useMatrixEventsComponent';
import { EventType } from '@/utils/matrixEvents/events.types';
import { TextInput, Button } from '@mantine/core';

const RegisterEventComponent = () => {
    const { registerEvent } = useMatrixEventsComponent();
    const [name, setName] = useState('');
    const [id, setId] = useState('');
    const [options, setOptions] = useState('');
    const [value, setValue] = useState('');

    const handleRegister = () => {
        const event: EventType = { name, id, options: options.split(','), value };
        registerEvent(event);
    };

    return (
        <div>
            <TextInput placeholder="Event Name" value={name} onChange={(e) => setName(e.currentTarget.value)} />
            <TextInput placeholder="Event ID" value={id} onChange={(e) => setId(e.currentTarget.value)} />
            <TextInput placeholder="Initial Value" value={value} onChange={(e) => setValue(e.currentTarget.value)} />
            <Button onClick={handleRegister}>Register Event</Button>
        </div>
    );
};

export default RegisterEventComponent;
