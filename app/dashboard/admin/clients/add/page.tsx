"use client";

import { Box } from "@mantine/core";
import { ClientsForm } from "@/components";
import AmeTitle from "@/ui/typography/AmeTitle";

const NewClientsPage = () => {
    return (
        <>
            <Box>
                <AmeTitle as="page-header" mb="lg">
                    Add new client
                </AmeTitle>
                <ClientsForm showAgency />
            </Box>
        </>
    );
};

export default NewClientsPage;
