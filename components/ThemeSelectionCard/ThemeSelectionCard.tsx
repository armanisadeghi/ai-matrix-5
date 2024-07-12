// components/ThemeSelection/ThemeSelectionCard.tsx

import React from 'react';
import { PaperProps } from '@mantine/core';
import { IconSun, IconMoon, IconDeviceDesktop } from '@tabler/icons-react';
import { ThemeSelectionCardClient } from './ThemeSelectionCardClient';

const data = [
    { name: 'Light mode', icon: IconSun },
    { name: 'Dark mode', icon: IconMoon },
    { name: 'System default', icon: IconDeviceDesktop },
];

interface ThemeSelectionCardProps extends PaperProps {
    showSaveButton?: boolean;
}

export function ThemeSelectionCard({ showSaveButton, ...others }: ThemeSelectionCardProps) {
    return <ThemeSelectionCardClient data={data} showSaveButton={showSaveButton} {...others} />;
}
