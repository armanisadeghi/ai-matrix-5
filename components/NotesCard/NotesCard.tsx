import { Button, Flex, Paper, PaperProps, rem, Title } from "@mantine/core";
import { NotesItem } from "@/components/NotesCard/NotesItem";
import { useState } from "react";
import { IconPlus } from "@tabler/icons-react";

interface NotesCardProps extends Partial<PaperProps> {
  data: any;
}

export function NotesCard({ data, ...others }: NotesCardProps) {
  const [selectedNote, setSelectedNote] = useState<any>();

  return (
    <Paper p="md" withBorder {...others}>
      <Flex justify="space-between" align="center" mb="sm">
        <Title order={5}>Notes</Title>
        <Button
          variant="default"
          size="sm"
          leftSection={<IconPlus style={{ height: rem(18), width: rem(18) }} />}
        >
          Add Note
        </Button>
      </Flex>
      {data.map((d: any) => (
        <NotesItem key={d.id} {...d} mb="sm" />
      ))}
    </Paper>
  );
}
