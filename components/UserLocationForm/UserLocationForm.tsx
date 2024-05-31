import React from "react";
import { useForm } from "@mantine/form";
import { Button, Grid, Paper, PaperProps, rem, TextInput, Title } from "@mantine/core";
import AmeSelect from "@/ui/select/AmeSelect";
import { IconDeviceFloppy } from "@tabler/icons-react";
import AmeTitle from "@/ui/typography/AmeTitle";
import AmeActionTextInput from "@/ui/input/AmeActionTextInput";
import AmeButton from "@/ui/buttons/AmeButton";

interface UserLocationFormProps extends PaperProps {}

export function UserLocationForm({ ...others }: UserLocationFormProps) {
    const locationForm = useForm({
        mode: "uncontrolled",
        initialValues: { location: "", timezone: "" },

        // functions will be used to validate values at corresponding key
        validate: {
            location: (value) => (value.length < 2 ? "Name must have at least 2 letters" : null),
            timezone: (value) => (value.length < 2 ? "Name must have at least 2 letters" : null),
        },
    });

    return (
        <Paper component="form" onSubmit={locationForm.onSubmit(console.log)} p="md" withBorder {...others}>
            <AmeTitle as="card-header" order={5} mb="md">
                Location info
            </AmeTitle>
            <Grid>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <AmeActionTextInput
                        label="Location"
                        placeholder="location"
                        key={locationForm.key("location")}
                        {...locationForm.getInputProps("location")}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <AmeSelect
                        label="Time zone"
                        placeholder="Time zone"
                        data={[]}
                        key={locationForm.key("timezone")}
                        {...locationForm.getInputProps("timezone")}
                    />
                </Grid.Col>
            </Grid>
            <AmeButton type="submit" mt="md" leftSection={<IconDeviceFloppy size={18} />} title="Save your information">
                Save changes
            </AmeButton>
        </Paper>
    );
}
