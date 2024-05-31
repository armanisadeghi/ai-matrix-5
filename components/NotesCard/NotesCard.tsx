import { Button, Flex, Paper, PaperProps, rem, Title } from "@mantine/core";
import { NotesItem } from "@/components/NotesCard/NotesItem";
import { useState } from "react";
import { IconPlus } from "@tabler/icons-react";
import AmeTitle from "@/ui/typography/AmeTitle";
import AmeButton from "@/ui/buttons/AmeButton";

interface NotesCardProps extends Partial<PaperProps> {
    data: any;
}

export function NotesCard({ data, ...others }: NotesCardProps) {
    const [selectedNote, setSelectedNote] = useState<any>();

    return (
        <Paper p="md" withBorder {...others}>
            <Flex justify="space-between" align="center" mb="sm">
                <AmeTitle as="card-header">Notes</AmeTitle>
                <AmeButton
                    leftSection={<IconPlus style={{ height: rem(18), width: rem(18) }} />}
                    title="Add a new note"
                >
                    Add Note
                </AmeButton>
            </Flex>
            {data.map((d: any) => (
                <NotesItem key={d.id} {...d} mb="sm" />
            ))}
        </Paper>
    );
}
