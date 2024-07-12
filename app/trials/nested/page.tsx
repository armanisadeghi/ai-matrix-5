import NavigationInputLight from '@/app/trials/nested/components/NavigationInputLight';
import React from 'react';
import { Container, Title } from '@mantine/core';
import NavigationInput from './components/NavigationInput';

export default function Page() {

    return (
        <Container>
            <Title order={1}>Trials Nested Home Page</Title>
            <p>This is the home page for Trials Nested.</p>
            <NavigationInputLight id="module" label="Module" path="/trials/nested" />
        </Container>
    );
}
