import React from 'react';
import { Container, Title } from '@mantine/core';


export default function Page({params,}: { params: { module: string; data: string; item: string }; }) {
    return (
        <Container>
            <Title order={1}>Item Page</Title>
            <p>Parent: /trials/nested/{params.module}/{params.data}</p>
            <p>Dynamic segment: {decodeURIComponent(params.item)}</p>
        </Container>
    );
}
