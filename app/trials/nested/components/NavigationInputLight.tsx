'use client';

import { useState } from 'react';
import { TextInput, Button, SimpleGrid } from '@mantine/core';
import Link from 'next/link';

const NavigationInputLight = ({id='', label, path, queryParams = {}}: { id: string; label: string; path: string; queryParams?: Record<string, string> }) => {
    const [value, setValue] = useState('');
    const query = new URLSearchParams(queryParams).toString();
    const link = `${path}/${encodeURIComponent(value)}${query ? `?${query}` : ''}`;

    return (
        <SimpleGrid cols={2} spacing="lg">
            <div>
                <TextInput
                    placeholder={`Enter or make up any "${label} Page" name to navigate to that page!`}
                    value={value}
                    onChange={(event) => setValue(event.currentTarget.value)}
                />
            </div>
            <div>
                <Link href={link}>
                    <Button component="a">Go to any {label}</Button>
                </Link>
            </div>
        </SimpleGrid>
    );
};

export default NavigationInputLight;
