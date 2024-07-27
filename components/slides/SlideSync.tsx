// components/slides/SlideSync.tsx

'use client';

import React, { useState } from 'react';
import { Button, Group, Text, Progress } from '@mantine/core';
import { IconCloudUpload, IconCloudDownload } from '@tabler/icons-react';

export default function SlideSync() {
    const [syncProgress, setSyncProgress] = useState(0);
    const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'completed'>('idle');

    const handleSync = async () => {
        setSyncStatus('syncing');
        // Simulating sync progress
        for (let i = 0; i <= 100; i += 10) {
            setSyncProgress(i);
            await new Promise(resolve => setTimeout(resolve, 200));
        }
        setSyncStatus('completed');
        setTimeout(() => {
            setSyncStatus('idle');
            setSyncProgress(0);
        }, 2000);
    };

    return (
        <Group>
            <Button onClick={handleSync} leftSection={<IconCloudUpload size={14} />} loading={syncStatus === 'syncing'}>
                Sync Slides
            </Button>
            {syncStatus !== 'idle' && (
                <>
                    <Progress value={syncProgress} size="sm" w={100} />
                    <Text size="sm" color={syncStatus === 'completed' ? 'green' : 'blue'}>
                        {syncStatus === 'completed' ? 'Sync Completed' : 'Syncing...'}
                    </Text>
                </>
            )}
        </Group>
    );
}
