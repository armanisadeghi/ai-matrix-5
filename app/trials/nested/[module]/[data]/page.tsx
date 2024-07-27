import React from 'react';
import { Container, Title } from '@mantine/core';


export default function Page({params,}: { params: { module: string; data: string }; }) {

    return (
        <Container>
            <Title order={1}>Data Page</Title>
            <p>Parent: /trials/nested/{params.module}</p>
            <p>Dynamic segment: {decodeURIComponent(params.data)}</p>
        </Container>
    );
}
