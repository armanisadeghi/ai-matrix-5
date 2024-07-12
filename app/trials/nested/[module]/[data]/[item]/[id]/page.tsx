import React from 'react';
import { Container, Title } from '@mantine/core';


export default function Page({params,}: { params: { module: string; data: string; item: string; id: string }; }) {

    return (
        <Container>
            <Title order={1}>ID Page</Title>
            <p>Parent: /trials/nested/{params.module}/{params.data}/{params.item}</p>
            <p>Dynamic segment: {decodeURIComponent(params.id)}</p>
        </Container>
    );
}
