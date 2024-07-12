// layout/Primary/Navbar/NavbarLinksGroup.tsx

import React from 'react';
import { Box } from '@mantine/core';
import { IconCalendarStats } from '@tabler/icons-react';
import { NavbarLinksGroupClient } from './NavbarLinksGroupClient';

const mockdata = {
    label: "Releases",
    icon: IconCalendarStats,
    links: [
        { label: "Upcoming releases", link: "/" },
        { label: "Previous releases", link: "/" },
        { label: "Releases schedule", link: "/" },
    ],
};

export function NavbarLinksGroup() {
    return (
        <Box mih={220} p="md">
            <NavbarLinksGroupClient {...mockdata} />
        </Box>
    );
}
