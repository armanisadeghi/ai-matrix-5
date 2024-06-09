import React, { useState } from "react";
import AmePaper from "@/ui/surfaces/AmePaper";
import { ColorInput, Grid, PaperProps } from "@mantine/core";
import AmeTitle from "@/ui/typography/AmeTitle";
import AmeText from "@/ui/typography/AmeText";

interface ColorSelectionFormProps extends PaperProps {}

export function ColorSelectionForm({ ...others }: ColorSelectionFormProps) {
    const [value, setValue] = useState("#fff");

    return (
        <AmePaper component="form" p="md" {...others}>
            <Grid align="flex-start" mb="md">
                <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                    <AmeTitle as="card-header" mb="md">
                        Choose your accent color
                    </AmeTitle>
                    <AmeText size="sm" c="dimmed">
                        Tailor the look of your interface to suit your unique style.
                    </AmeText>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                    <ColorInput
                        aria-label="Input label"
                        placeholder="select your color"
                        value={value}
                        onChange={setValue}
                    />
                </Grid.Col>
            </Grid>
        </AmePaper>
    );
}
