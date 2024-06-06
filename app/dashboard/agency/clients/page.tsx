"use client";

import { Box, Button, Flex, Group, TextInput, Title } from "@mantine/core";
import { IconPlus, IconTableExport } from "@tabler/icons-react";
import clients from "../../../data/clients.json";
import { ClientsTable } from "@/components";
import Link from "next/link";
import AmeTitle from "@/ui/typography/AmeTitle";
import AmeButton from "@/ui/buttons/AmeButton";
import { PATH_AGENCY } from "@/routes";

const ClientsPage = () => {
    return (
        <>
            <Box>
                <AmeTitle as="page-header" mb="md">
                    Clients
                </AmeTitle>
                <Flex justify="space-between" mb="md">
                    <TextInput placeholder="search" />
                    <Group gap="xs">
                        <AmeButton title="Export clients" leftSection={<IconTableExport size={18} />}>
                            Export
                        </AmeButton>
                        <Link href={PATH_AGENCY.clients.add}>
                            <AmeButton title="Add a new client" primary leftSection={<IconPlus />}>
                                Add client
                            </AmeButton>
                        </Link>
                    </Group>
                </Flex>
                <ClientsTable data={clients} />
            </Box>
        </>
    );
};

export default ClientsPage;
