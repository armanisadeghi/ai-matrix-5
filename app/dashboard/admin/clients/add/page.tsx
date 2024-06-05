"use client";

import { Box, Title } from "@mantine/core";
import { ClientsForm } from "@/components";

const NewClientsPage = () => {
  return (
    <>
      <Box>
        <Title order={3} mb="md">
          Add a new client
        </Title>
        <ClientsForm showAgency />
      </Box>
    </>
  );
};

export default NewClientsPage;
