"use client";

import { Box, Grid, Title } from "@mantine/core";
import { ClientsForm, NotesCard } from "@/components";
import notes from "@/app/data/notes.json";

const ViewClientsPage = ({ params }: { params: { id: string } }) => {
  return (
    <>
      <Box>
        <Title order={3} mb="md">
          Client #{params?.id.slice(0, 5)}
        </Title>
        <Grid>
          <Grid.Col span={{ base: 12, md: 6, lg: 8 }}>
            <ClientsForm />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
            <NotesCard data={notes} />
          </Grid.Col>
        </Grid>
      </Box>
    </>
  );
};

export default ViewClientsPage;
