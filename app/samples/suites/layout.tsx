import React from 'react';
import { Container } from '@mantine/core';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <Container size="sm" px="xs"
                   style={{ padding: '20px', marginTop: '50px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 180, 0.8)' }}

        >
            {children}
        </Container>
    );
};

export default Layout;
