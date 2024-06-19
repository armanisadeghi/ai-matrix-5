import {
    ActionIcon,
    Flex,
    Paper,
    PaperProps,
    rem,
    Text,
    Tooltip,
    useMantineColorScheme
} from '@mantine/core'
import { IconTrash } from '@tabler/icons-react'

interface NotesItemProps extends PaperProps {
    created: Date | string
    note: string
    noteColor: string
}

export function NotesItem({ created, noteColor, note, ...others }: NotesItemProps) {
    const { colorScheme } = useMantineColorScheme()

    return (
        <>
            <Paper p="sm" bg={colorScheme === 'light' ? 'gray.1' : 'dark.6'} {...others}>
                <Text lineClamp={1}>{note}</Text>
                <Flex align="center" justify="space-between">
                    <Text size="sm">{created.toString()}</Text>
                    <Tooltip label="Delete note">
                        <ActionIcon color={colorScheme === 'light' ? 'dark' : 'gray'}>
                            <IconTrash style={{ height: rem(16), width: rem(16) }} />
                        </ActionIcon>
                    </Tooltip>
                </Flex>
            </Paper>
        </>
    )
}
