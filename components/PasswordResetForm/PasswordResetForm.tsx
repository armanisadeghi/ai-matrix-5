import React from "react";
import { useForm } from "@mantine/form";
import { Button, Flex, Grid, Paper, PaperProps, TextInput, Title } from "@mantine/core";
import AmeTitle from "@/ui/typography/AmeTitle";
import AmeActionTextInput from "@/ui/input/AmeActionTextInput";
import AmeButton from "@/ui/buttons/AmeButton";

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
            <AmeTitle as="card-header" mb="md">
                Change password
            </AmeTitle>
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
                    <AmeActionTextInput
                        label="New password"
                        placeholder="e"
                        key={form.key("newPassword")}
                        {...form.getInputProps("newPassword")}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <AmeActionTextInput
                        label="Confirm new password"
                        placeholder=""
                        key={form.key("confirmPassword")}
                        {...form.getInputProps("confirmPassword")}
                    />
                </Grid.Col>
            </Grid>
            <Flex gap="md" mt="md">
                <AmeButton type="submit" primary title="Save your password">
                    Update password
                </AmeButton>
                <AmeButton title="Forgot your password">I forgot my password</AmeButton>
            </Flex>
        </Paper>
    );
}
