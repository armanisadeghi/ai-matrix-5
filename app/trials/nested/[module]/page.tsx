import React from 'react';
import { Container, Title } from '@mantine/core';

export default function Page({ params }: { params: { module: string } }) {
    return (
        <Container>
            <Title order={1}>Module Page</Title>
            <p>Parent: /trials/nested</p>
            <p>Dynamic segment: {decodeURIComponent(params.module)}</p>
        </Container>
    );
}
