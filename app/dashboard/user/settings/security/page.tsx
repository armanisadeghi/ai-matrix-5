"use client";

import { Button, Divider, Flex, Paper, Select, Stack, Text, Title } from "@mantine/core";
import { useState } from "react";
import { IconCircleKey, IconDeviceMobile, IconMessage } from "@tabler/icons-react";
import { PasswordResetForm } from "@/components";

const twoFactorAuths = [
    {
        title: "Authenticator app",
        description:
            "Use an authentication app or browser extension to get two-factor authentication codes when prompted.",
        icon: IconDeviceMobile,
    },
    {
        title: "SMS/Text message",
        description: "Get one-time codes sent to your phone via SMS to complete authentication requests.",
        icon: IconMessage,
    },
    {
        title: "Security keys",
        description:
            "Security keys are webauthn credentials that can only be used as a second factor of authentication.",
        icon: IconCircleKey,
    },
];

function Security() {
    const [preferredAuth, setPreferredAuth] = useState<string | null>("Authenticator App");

    return (
        <>
            <PasswordResetForm mb="md" />
            <Paper withBorder p="md">
                <Title order={5} mb="sm">
                    Two-factor authentication
                </Title>
                <Text size="sm">
                    Two-factor authentication adds an additional layer of security to your account by requiring more
                    than just a password to sign in. <a href="#">Learn more about two-factor authentication.</a>
                </Text>
                <Divider my="md" />
                <Stack gap={4}>
                    <Text size="md" fw={600}>
                        Preferred 2FA method
                    </Text>
                    <Flex align="center" gap="md">
                        <Text size="sm">
                            Set your preferred method to use for two-factor authentication when signing into GitHub.
                        </Text>
                        <Select
                            label=""
                            data={["Authenticator App", "Passkeys", "SMS", "Security keys"]}
                            value={preferredAuth}
                            onChange={setPreferredAuth}
                        />
                    </Flex>
                </Stack>
                <Divider my="md" />
                <Text fw={600} mb="xs">
                    Two-factor methods
                </Text>
                {twoFactorAuths.map((item) => (
                    <>
                        <Flex key={item.title} gap="md" p="sm" align="flex-start">
                            <item.icon />
                            <Stack gap={4}>
                                <Text>{item.title}</Text>
                                <Text size="sm">{item.description}</Text>
                            </Stack>
                            <Button size="xs" variant="default" ml="auto">
                                Add
                            </Button>
                        </Flex>
                        <Divider />
                    </>
                ))}
            </Paper>
        </>
    );
}

export default Security;
