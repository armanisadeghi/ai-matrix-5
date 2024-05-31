import React from "react";
import { useForm } from "@mantine/form";
import { Button, Flex, Grid, Paper, PaperProps, TextInput, Title } from "@mantine/core";

interface PasswordResetFormProps extends PaperProps {}

export function PasswordResetForm({ ...others }: PasswordResetFormProps) {
    const form = useForm({
        mode: "uncontrolled",
        initialValues: { oldPassword: "", newPassword: "", confirmPassword: "" },

        // functions will be used to validate values at corresponding key
        validate: {
            oldPassword: (value) => (value.length < 2 ? "Name must have at least 2 letters" : null),
            newPassword: (value) => (value.length < 2 ? "Name must have at least 2 letters" : null),
            confirmPassword: (value) => (value.length < 2 ? "Name must have at least 2 letters" : null),
        },
    });

    return (
        <Paper component="form" onSubmit={form.onSubmit(console.log)} p="md" withBorder {...others}>
            <Title order={5} mb="md">
                Change password
            </Title>
            <Grid>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <TextInput
                        label="Old password"
                        placeholder=""
                        key={form.key("oldPassword")}
                        {...form.getInputProps("oldPassword")}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <TextInput
                        label="New password"
                        placeholder="e"
                        key={form.key("newPassword")}
                        {...form.getInputProps("newPassword")}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <TextInput
                        label="Confirm new password"
                        placeholder=""
                        key={form.key("confirmPassword")}
                        {...form.getInputProps("confirmPassword")}
                    />
                </Grid.Col>
            </Grid>
            <Flex gap="md" mt="md">
                <Button type="submit">Update password</Button>
                <Button variant="subtle">I forgot my password</Button>
            </Flex>
        </Paper>
    );
}
