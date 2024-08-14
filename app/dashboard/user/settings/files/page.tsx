"use client";

import {
    ActionIcon,
    Divider,
    Flex,
    Group,
    SimpleGrid,
    ThemeIcon,
    Tooltip,
    useMantineColorScheme,
    useMantineTheme,
} from "@mantine/core";
import {
    IconEdit,
    IconFileCode,
    IconFileDots,
    IconFileSpreadsheet,
    IconFileTypeDoc,
    IconFileTypePdf,
    IconFileTypePpt,
    IconFileTypeTxt,
    IconMusic,
    IconPhoto,
    IconTrash,
    IconVideo,
} from "@tabler/icons-react";
import { DataTableProps } from "mantine-datatable";
import { useMemo } from "react";

import AmePaper from "@/ui/surfaces/AmePaper";
import { AmeDatatable } from "@/ui/tables";
import AmeText from "@/ui/typography/AmeText";
import AmeTitle from "@/ui/typography/AmeTitle";

const Files = () => {
    const theme = useMantineTheme();
    const { colorScheme } = useMantineColorScheme();

    const colorIndex = colorScheme === "dark" ? 8 : 2;

    console.log({ colorIndex });

    const folders: { icon: React.FC<any>; title: string; color: string }[] = useMemo(() => {
        return [
            { icon: IconFileTypeTxt, title: "Text", color: theme.colors.red[colorIndex] },
            { icon: IconFileTypePdf, title: "PDF", color: theme.colors.lime[colorIndex] },
            { icon: IconFileTypePpt, title: "Slides", color: theme.colors.grape[colorIndex] },
            { icon: IconFileSpreadsheet, title: "Spreadsheets", color: theme.colors.orange[colorIndex] },
            { icon: IconFileTypeDoc, title: "Documents", color: theme.colors.indigo[colorIndex] },
            { icon: IconFileCode, title: "Code", color: theme.colors.blue[colorIndex] },
            { icon: IconPhoto, title: "Images", color: theme.colors.cyan[colorIndex] },
            { icon: IconVideo, title: "Videos", color: theme.colors.teal[colorIndex] },
            { icon: IconMusic, title: "Audio", color: theme.colors.green[colorIndex] },
            { icon: IconFileDots, title: "Other", color: theme.colors.pink[colorIndex] },
        ];
    }, [theme]);

    const folderItems = folders.map(({ icon: Icon, title, color }) => (
        <AmePaper key={title} withBorder p="sm">
            <Flex justify="space-between">
                <Flex direction="column" gap={4} align="flex-start">
                    <AmeText>{title}</AmeText>
                    <AmeText fz="sm" c="dimmed">
                        2 files
                    </AmeText>
                </Flex>
                <ThemeIcon color={color} variant="transparent">
                    <Icon size={24} />
                </ThemeIcon>
            </Flex>
        </AmePaper>
    ));

    const columns: DataTableProps["columns"] = [
        { accessor: "name" },
        { accessor: "file extension" },
        { accessor: "size" },
        { accessor: "last modified" },
        {
            accessor: "",
            title: "Action",
            render: () => (
                <Group wrap="nowrap">
                    <Tooltip label="Edit">
                        <ActionIcon>
                            <IconEdit size={14} />
                        </ActionIcon>
                    </Tooltip>
                    <Tooltip label="Delete">
                        <ActionIcon>
                            <IconTrash size={14} />
                        </ActionIcon>
                    </Tooltip>
                </Group>
            ),
        },
    ];

    return (
        <>
            <AmeTitle mb="md">Quick Access</AmeTitle>
            <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }}>{folderItems}</SimpleGrid>
            <Divider my="md" />
            <AmeTitle mb="md">Files</AmeTitle>
            <AmeDatatable columns={columns} records={[]} />
        </>
    );
};

export default Files;
