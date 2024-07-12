'use client';

import JsonManipulator from '@/app/samples/json-utils/JsonManipulator';
import { Select, Space } from '@mantine/core';
import React, { useState } from 'react';


const Page: React.FC = () => {
    const [selectedComponent, setSelectedComponent] = useState<string | null>(null);

    const handleSelectChange = (value: string | null) => {
        setSelectedComponent(value);
    };

    return (

        <JsonManipulator/>

    );
};

export default Page;
