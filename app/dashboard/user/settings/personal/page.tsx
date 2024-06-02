"use client";

import { Button, FileButton, Flex, Grid, Group, Image, Paper, rem, Stack, Text, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconDeviceFloppy } from "@tabler/icons-react";
import { useState } from "react";

function PersonalInformation() {
    const [file, setFile] = useState<File | null>(null);

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
        <>
            <Paper p="md" withBorder mb="md">
                <Flex gap="md" align="center">
                    <Image
                        radius="50%"
                        src={null}
                        h={64}
                        w={64}
                        fallbackSrc="https://placehold.co/600x400?text=No+Image"
                    />
                    <Stack gap={2}>
                        <Text fw={600} size="lg">
                            Your avatar
                        </Text>
                        <Text size="sm">PNG or JPG no bigger than 1000px wide and tall.</Text>
                    </Stack>
                    <FileButton onChange={setFile} accept="image/png,image/jpeg">
                        {(props) => (
                            <Button ml="auto" {...props}>
                                Upload image
                            </Button>
                        )}
                    </FileButton>
                </Flex>
            </Paper>
            <Paper component="form" onSubmit={form.onSubmit(console.log)} p="md" withBorder mb="md">
                <Title order={5} mb="md">
                    User details
                </Title>
                <Grid>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                        <TextInput
                            label="First name"
                            placeholder="first name"
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
            <Paper component={Group} justify="space-between" p="md" withBorder>
                <Stack gap={2}>
                    <Text fw={600} size="lg">
                        Delete your account
                    </Text>
                    <Text size="sm">
                        Please note, deleting your account is a permanent action and will no be recoverable once
                        completed.
                    </Text>
                </Stack>
                <Button color="red">Delete</Button>
            </Paper>
        </>
    );
}

export default PersonalInformation;
