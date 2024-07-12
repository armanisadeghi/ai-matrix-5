import { Container, Box } from '@mantine/core';
import React from 'react';
import ClickCounter from './components/ClickCounter';


const title = 'Nested Trials Layout';

export const metadata = {title, openGraph: {title, images: [`/api/og?title=${title}`],},};

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <Container size="xl" >
            <Box style={{ padding: '20px', border: '1px solid #808080', borderRadius: '20px', margin: '20px' }}>
                <div className="space-y-9">
                    <div className="flex justify-between">
                        <h2>{title}</h2>
                        <div className="self-start">
                            <ClickCounter />
                        </div>
                    </div>
                    <div>{children}</div>
                </div>
            </Box>
        </Container>
    );
}
