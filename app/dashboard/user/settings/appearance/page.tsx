"use client";

import { ColorSelectionForm, IconSizeSelectionForm, TableSelectionForm, ThemeSelectionCard } from "@/components";
import { Divider } from "@mantine/core";
import React from "react";

function AppearancePage() {
    return (
        <div>
            <ThemeSelectionCard p={0} py="md" />
            <Divider />
            <ColorSelectionForm p={0} py="md" />
            <Divider />
            <TableSelectionForm p={0} py="md" />
            <Divider />
            <IconSizeSelectionForm p={0} py="md" />
        </div>
    );
}

export default AppearancePage;
