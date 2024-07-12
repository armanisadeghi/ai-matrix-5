'use client';

import { useRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import { TextInput, Button, SimpleGrid } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { eventTriggerFamily } from '@/app/trials/nested/state/atoms';
import { container } from 'webpack';

const NavigationInput = ({id, label, path, queryParams = {}}: { id: string; label: string; path: string; queryParams?: Record<string, string> }) => {
    const [value, setValue] = useState('');
    const [eventTrigger, setEventTrigger] = useRecoilState(eventTriggerFamily(id));
    const router = useRouter();
    const query = new URLSearchParams(queryParams).toString();
    const link = `${path}/${encodeURIComponent(value)}${query ? `?${query}` : ''}`;

    const handleProgrammaticNavigation = () => {
        router.push(link);
    };

    useEffect(() => {
        if (eventTrigger === 'triggerNavigation') {
            handleProgrammaticNavigation();
            setEventTrigger(null);
        }
    }, [eventTrigger, link, router, setEventTrigger]);

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleProgrammaticNavigation();
        }
    };

    return (
        <SimpleGrid
            cols={2}
            type="container"
            spacing="lg"
        >
            <div>
                <TextInput
                    placeholder={`Enter or make up any "${label} Page" name to navigate to that page!`}
                    value={value}
                    onChange={(event) => setValue(event.currentTarget.value)}
                    onKeyPress={handleKeyPress}
                />
            </div>
            <div>
                <Link href={link}>
                    <Button component="a">Go to any {label}</Button>
                </Link>
            </div>
            <div></div>
        </SimpleGrid>
    );
};

export default NavigationInput;
