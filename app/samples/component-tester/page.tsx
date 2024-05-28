// app/samples/component-tester/page.tsx

'use client';
import React from 'react';
import { Group, Stack, Title, Space, Alert, Text, Button } from '@mantine/core';
import VerticalSplitter from '@/ui/split/VerticalSplitter';
import { useTestPage } from './useTestPage';
import ComponentSelector from './ComponentSelector';
import PropsEditor from './PropsEditor';

const Page: React.FC = () => {
    const {
        selectedComponent,
        handleComponentChange,
        props,
        propDefinitions,
        handlePropChange,
        handleRefreshComponent,
        refreshKey,
        error,
        RenderedComponent,
        componentLocation,
    } = useTestPage();

    return (
        <VerticalSplitter initialSizes={[20, 80]}>
            <div>
                <Title order={5}>Test Components</Title>
                <Space h="md" />
                <ComponentSelector selectedComponent={selectedComponent} onSelect={handleComponentChange} />
                <Stack>
                    <PropsEditor props={props} propDefinitions={propDefinitions[selectedComponent || ''] || {}} onChange={handlePropChange} />
                    <Group mt="md">
                        <Button onClick={() => handleComponentChange(selectedComponent)}>
                            Reset
                        </Button>
                        <Button onClick={handleRefreshComponent}>
                            Refresh
                        </Button>
                    </Group>
                </Stack>
            </div>
            <div key={refreshKey}>
                {error ? (
                    <Alert title="Error" color="red">
                        {error}
                    </Alert>
                ) : RenderedComponent ? (
                    <div>
                        <Title order={5}>Component Name: {selectedComponent?.replace(/([a-z0-9])([A-Z])/g, '$1 $2').replace(/^./, str => str.toUpperCase())}</Title>
                        <Text size="sm">From: {componentLocation}</Text>
                        <Space h="md" />
                        <RenderedComponent {...props} />
                    </div>
                ) : (
                    <div>Select a component to display</div>
                )}
            </div>
        </VerticalSplitter>
    );
};

export default Page;
