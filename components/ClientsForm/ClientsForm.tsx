"use client";

import React, { useEffect } from "react";
import { Grid, Paper, PaperProps } from "@mantine/core";
import AmeSelect from "@/ui/select/AmeSelect/AmeSelect";
import { IconDeviceFloppy } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import AmeActionTextInput from "@/ui/input/AmeActionTextInput";
import AmeTextarea from "@/ui/input/AmeTextarea";
import AmeNumberInput from "@/ui/input/AmeNumberInput";
import AmeButton from "@/ui/buttons/AmeButton";

interface ClientsFormProps extends Partial<PaperProps> {
    asView?: boolean; // is form used to view data
    selectedClient?: any;
    showAgency?: boolean;
}

export function ClientsForm({ asView, selectedClient, showAgency, ...others }: ClientsFormProps) {
    const form = useForm({
        mode: "uncontrolled",
        initialValues: {
            companyName: "",
            agency: "",
            addressLine1: "",
            addressLine12: "",
            city: "",
            state: "",
            zip: "",
            country: "",
            primaryContact: "",
            secondaryContact: "",
        },

        // functions will be used to validate values at corresponding key
        validate: {
            companyName: (value) => (value.length < 2 ? "Name must have at least 2 letters" : null),
            addressLine1: (value) => (value.length < 2 ? "Name must have at least 2 letters" : null),
            city: (value) => (value.length < 2 ? "Name must have at least 2 letters" : null),
            state: (value) => (value.length < 2 ? "Name must have at least 2 letters" : null),
            zip: (value) => (value.length < 2 ? "Name must have at least 2 letters" : null),
            country: (value) => (value.length < 2 ? "Name must have at least 2 letters" : null),
            primaryContact: (value) => (value.length < 2 ? "Name must have at least 2 letters" : null),
        },
    });

    useEffect(() => {}, []);

    return (
        <Paper component="form" withBorder p="md" onSubmit={form.onSubmit(console.log)} {...others}>
            <Grid>
                <Grid.Col span={{ base: 12, md: showAgency ? 6 : 12 }}>
                    <AmeActionTextInput
                        label="Company Name"
                        placeholder="company name"
                        key={form.key("companyName")}
                        {...form.getInputProps("companyName")}
                    />
                </Grid.Col>
                {showAgency && (
                    <Grid.Col span={{ base: 12, md: 6 }}>
                        <AmeSelect
                            label="Agency"
                            placeholder="agency"
                            data={[]}
                            key={form.key("agency")}
                            {...form.getInputProps("agency")}
                        />
                    </Grid.Col>
                )}
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <AmeTextarea
                        label="Address Line 1"
                        placeholder="address"
                        key={form.key("addressLine1")}
                        {...form.getInputProps("addressLine1")}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <AmeTextarea
                        label="Address Line 2"
                        placeholder="address"
                        key={form.key("addressLine2")}
                        {...form.getInputProps("addressLine2")}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                    <AmeSelect
                        label="Country"
                        placeholder="country"
                        data={[]}
                        key={form.key("country")}
                        {...form.getInputProps("country")}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                    <AmeActionTextInput
                        label="State"
                        placeholder="state"
                        key={form.key("state")}
                        {...form.getInputProps("state")}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                    <AmeActionTextInput
                        label="City"
                        placeholder="city"
                        key={form.key("city")}
                        {...form.getInputProps("city")}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                    <AmeNumberInput
                        label="Zip"
                        placeholder="zip"
                        key={form.key("zip")}
                        {...form.getInputProps("zip")}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <AmeSelect
                        label="Primary contact"
                        placeholder="primary contact"
                        data={[]}
                        key={form.key("primaryContact")}
                        {...form.getInputProps("primaryContact")}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <AmeSelect
                        label="Secondary contact"
                        placeholder="secondary contact"
                        data={[]}
                        key={form.key("secondaryContact")}
                        {...form.getInputProps("secondaryContact")}
                    />
                </Grid.Col>
            </Grid>

            <AmeButton
                primary
                type="submit"
                mt="md"
                leftSection={<IconDeviceFloppy size={18} />}
                title="save new client"
            >
                Submit
            </AmeButton>
        </Paper>
    );
}
