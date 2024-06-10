"use client";

import { Box, Grid } from "@mantine/core";
import { ClientsForm, NotesCard } from "@/components";
import notes from "@/app/data/notes.json";
import AmeTitle from "@/ui/typography/AmeTitle";

const ViewClientsPage = ({ params }: { params: { id: string } }) => {
    return (
        <>
            <Box>
                <AmeTitle as="page-header" mb="md">
                    Client #{params?.id.slice(0, 5)}
                </AmeTitle>
                <Grid>
                    <Grid.Col span={{ base: 12, md: 6, lg: 8 }}>
                        <ClientsForm showAgency />
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
