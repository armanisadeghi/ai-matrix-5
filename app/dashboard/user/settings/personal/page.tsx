"use client";

import { Button, FileButton, Flex, Group, Image, Paper, Stack, Text } from "@mantine/core";
import { useState } from "react";
import { UserDetailsForm } from "@/components";

function PersonalInformation() {
    const [file, setFile] = useState<File | null>(null);

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
                    />{" "}
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
            <UserDetailsForm mb="md" />
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
