// components/ColorSelectionForm/ColorSelectionFormClient.tsx

"use client";

import React, { useState, useCallback } from "react";
import AmePaper from "@/ui/surfaces/AmePaper";
import { ColorInput, Grid, PaperProps } from "@mantine/core";
import AmeTitle from "@/ui/typography/AmeTitle";
import AmeText from "@/ui/typography/AmeText";

interface ColorSelectionFormProps extends PaperProps {}

export const ColorSelectionFormClient = React.memo(function ColorSelectionFormClient({
    ...others
}: ColorSelectionFormProps) {
    const [value, setValue] = useState("#fff");

    const handleColorChange = useCallback((newValue: string) => {
        setValue(newValue);
    }, []);

    return (
        <AmePaper component="form" p="md" {...others}>
            <Grid align="flex-start" mb="md">
                <Grid.Col span={{ base: 12, md: 6, lg: 4, xl: 3 }}>
                    <AmeTitle as="card-header" mb="md">
                        Choose your accent color
                    </AmeTitle>
                    <AmeText size="sm" c="dimmed">
                        Tailor the look of your interface to suit your unique style.
                    </AmeText>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6, lg: 8, xl: 9 }}>
                    <ColorInput
                        aria-label="Input label"
                        placeholder="select your color"
                        value={value}
                        onChange={handleColorChange}
                    />
                </Grid.Col>
            </Grid>
        </AmePaper>
    );
});
