"use client";

import { Box, Button, Flex, Group, TextInput, Title } from "@mantine/core";
import { IconPlus, IconTableExport } from "@tabler/icons-react";
import { ClientsTable } from "@/components";
import Link from "next/link";
import clients from "../../../data/clients.json";
import AmeSearchInput from "@/ui/input/AmeSearchInput";
import { PATH_ADMIN } from "@/routes";

const ClientsPage = () => {
    return (
        <>
            <Box>
                <Title order={3} mb="md">
                    Clients
                </Title>
                <Flex justify="space-between" mb="md">
                    <AmeSearchInput placeholder="search" />
                    <Group gap="xs">
                        <Button variant="default" leftSection={<IconTableExport />}>
                            Export
                        </Button>
                        <Button leftSection={<IconPlus />} component={Link} href={PATH_ADMIN.clients.add}>
                            Add client
                        </Button>
                    </Group>
                </Flex>
                <ClientsTable data={clients} />
            </Box>
        </>
    );
};

export default ClientsPage;
