// components/NotesCard/NotesCardClient.tsx

'use client';

import React, { useMemo, useCallback } from 'react';
import { Flex, rem } from "@mantine/core";
import { NotesItem } from "@/components/NotesCard/NotesItem";
import { IconPlus } from "@tabler/icons-react";
import AmeTitle from "@/ui/typography/AmeTitle";
import AmeButton from "@/ui/buttons/AmeButton";

interface NotesCardClientProps {
    data: any[];
}

export const NotesCardClient = React.memo(function NotesCardClient({ data }: NotesCardClientProps) {
    const noteItems = useMemo(() => {
        return data.map((d: any) => (
            <NotesItem key={d.id} {...d} mb="sm" />
        ));
    }, [data]);

    const handleAddNote = useCallback(() => {
        // Implement add note functionality
        console.log('Add note clicked');
    }, []);

    return (
        <>
            <Flex justify="space-between" align="center" mb="sm">
                <AmeTitle as="card-header">Notes</AmeTitle>
                <AmeButton
                    leftSection={<IconPlus style={{ height: rem(18), width: rem(18) }} />}
                    title="Add a new note"
                    onClick={handleAddNote}
                >
                    Add Note
                </AmeButton>
            </Flex>
            {noteItems}
        </>
    );
});
