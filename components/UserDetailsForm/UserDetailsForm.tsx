import React from "react";
import { Button, Grid, Paper, PaperProps, rem, TextInput, Title } from "@mantine/core";
import AmeActionTextInput from "@/ui/input/AmeActionTextInput";
import { IconDeviceFloppy } from "@tabler/icons-react";
import { useForm } from "@mantine/form";

interface UserDetailsFormProps extends PaperProps {}

export function UserDetailsForm({ ...others }: UserDetailsFormProps) {
    const form = useForm({
        mode: "uncontrolled",
        initialValues: { firstName: "", lastName: "", email: "", phone: "" },

        // functions will be used to validate values at corresponding key
        validate: {
            firstName: (value) => (value.length < 2 ? "Name must have at least 2 letters" : null),
            lastName: (value) => (value.length < 2 ? "Name must have at least 2 letters" : null),
            email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
            phone: (value) => (value.length < 10 ? "Phone must have at least 10 letters" : null),
        },
    });

    return (
        <Paper component="form" onSubmit={form.onSubmit(console.log)} p="md" withBorder {...others}>
            <Title order={5} mb="md">
                User details
            </Title>
            <Grid>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <AmeActionTextInput
                        label="First name"
                        placeholder="first name"
                        initialValue=""
                        key={form.key("firstName")}
                        {...form.getInputProps("firstName")}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <TextInput
                        label="Last name"
                        placeholder="last name"
                        key={form.key("lastName")}
                        {...form.getInputProps("lastName")}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <TextInput
                        label="Email"
                        placeholder="email"
                        key={form.key("email")}
                        {...form.getInputProps("email")}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <TextInput
                        label="Phone"
                        placeholder="phone"
                        key={form.key("phone")}
                        {...form.getInputProps("phone")}
                    />
                </Grid.Col>
            </Grid>
            <Button
                type="submit"
                mt="md"
                leftSection={<IconDeviceFloppy style={{ height: rem(18), width: rem(18) }} />}
            >
                Save changes
            </Button>
        </Paper>
    );
}
