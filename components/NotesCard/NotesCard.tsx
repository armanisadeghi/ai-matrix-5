// components/NotesCard/NotesCard.tsx

import { Paper, PaperProps } from "@mantine/core";
import { NotesCardClient } from './NotesCardClient';

interface NotesCardProps extends Partial<PaperProps> {
    data: any[];
}

export function NotesCard({ data, ...others }: NotesCardProps) {
    return (
        <Paper p="md" withBorder {...others}>
            <NotesCardClient data={data} />
        </Paper>
    );
}
