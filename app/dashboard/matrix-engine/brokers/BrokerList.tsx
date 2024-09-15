"use client";

import Loading from "@/app/dashboard/loading";
import { createBrokerManager } from "@/services/brokerService";
import { Broker } from "@/types/broker";
import { AmeDatatable } from "@/ui/tables";
import { ActionIcon, Group, Table, TableTd, Tooltip } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { DataTableProps } from "mantine-datatable";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const BrokerList = ({ brokers }: { brokers: Broker[] }) => {
    const brokerManager = createBrokerManager();
    const router = useRouter();
    const headers = [
        { id: "name", name: "Broker Name" },
        { id: "dataType", name: "Data Type" },
        { id: "component", name: "Component" },
        { id: "defaultValue", name: "Default Value" },
        { id: "category", name: "Category" },
        { id: "officialName", name: "Official Name" },
        { id: "description", name: "Description" },
        { id: "action", name: "Action" },
    ];

    const handleDelete = async (broker: Broker) => {
        await brokerManager.deleteBroker(broker.id);
        brokers.filter((broker) => broker.id !== broker.id);
        Notifications.show({
            title: "Broker Deleted",
            message: `${broker.displayName} has been deleted.`,
        });
    };

    const handleEdit = (broker: Broker) => {
        router.push(`brokers/edit/${broker.id}`);
    };

    const isTextTruncated = (element: HTMLElement) => {
        return element.scrollWidth > element.clientWidth;
    };

    const TruncatedTooltip = ({ text, maxWidth }: { text: string; maxWidth: number }) => {
        const textRef = useRef<HTMLDivElement>(null);
        const [isTruncated, setIsTruncated] = useState(false);

        useEffect(() => {
            if (textRef.current) {
                setIsTruncated(isTextTruncated(textRef.current));
            }
        }, [textRef.current]);

        return (
            <div ref={textRef} style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth }}>
                {isTruncated ? (
                    <Tooltip withArrow label={text}>
                        <div>{text}</div>
                    </Tooltip>
                ) : (
                    <div>{text}</div>
                )}
            </div>
        );
    };

    const columns: DataTableProps<Broker>["columns"] = [
        { accessor: "name", render: ({ name }) => <TruncatedTooltip text={name ?? ""} maxWidth={200} /> },
        {
            accessor: "data_type",
            title: "Data type",
            render: ({ dataType }) => <TruncatedTooltip text={dataType ?? ""} maxWidth={150} />,
        },
        {
            accessor: "",
            title: "Component",
            render: ({ componentType }) => <TruncatedTooltip text={componentType ?? ""} maxWidth={150} />,
        },
        {
            accessor: "default_value",
            render: ({ defaultValue }) => <TruncatedTooltip text={defaultValue ?? ""} maxWidth={100} />,
        },
        {
            accessor: "category",
            title: "Category",
            render: ({ category }) => <TruncatedTooltip text={category ?? ""} maxWidth={150} />,
        },
        {
            accessor: "official_name",
            title: "Official Name",
            render: ({ officialName }) => <TruncatedTooltip text={officialName ?? ""} maxWidth={200} />,
        },
        {
            accessor: "description",
            title: "Description",
            render: ({ description }) => <TruncatedTooltip text={description ?? ""} maxWidth={300} />,
        },
        {
            accessor: "",
            title: "Action",
            render: (broker) => (
                <Group wrap="nowrap">
                    <Tooltip label="Edit broker">
                        <ActionIcon onClick={() => handleEdit(broker)}>
                            <IconEdit size={14} />
                        </ActionIcon>
                    </Tooltip>
                    <Tooltip label="Delete broker">
                        <ActionIcon onClick={() => handleDelete(broker)}>
                            <IconTrash size={14} />
                        </ActionIcon>
                    </Tooltip>
                </Group>
            ),
        },
    ];

    return (
        <>
            <h3>New table</h3>
            <AmeDatatable
                // @ts-expect-error
                columns={columns}
                records={brokers as any}
            />

            <h3>Old table</h3>
            <Table.ScrollContainer minWidth={500} type="native">
                <Table
                    striped
                    highlightOnHover
                    withRowBorders={false}
                    stickyHeader
                    styles={{
                        th: { fontSize: "12px" },
                        td: { fontSize: "12px" },
                    }}
                >
                    <Table.Thead>
                        <Table.Tr>
                            {headers.map((header) => (
                                <Table.Th key={header.id}>{header.name}</Table.Th>
                            ))}
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        <React.Suspense fallback={<Loading />}>
                            {brokers.map((broker) => (
                                <Table.Tr key={broker.id}>
                                    <TableTd style={{ display: "none" }}>{broker.id}</TableTd>
                                    <TableTd>
                                        <TruncatedTooltip text={broker.name || ""} maxWidth={200} />
                                    </TableTd>
                                    <TableTd>
                                        <TruncatedTooltip text={broker.dataType || ""} maxWidth={150} />
                                    </TableTd>
                                    <TableTd>
                                        <TruncatedTooltip text={broker.componentType || ""} maxWidth={150} />
                                    </TableTd>
                                    <TableTd>
                                        <TruncatedTooltip text={(broker.defaultValue as string) || ""} maxWidth={100} />
                                    </TableTd>
                                    <TableTd>
                                        <TruncatedTooltip text={broker.category || ""} maxWidth={150} />
                                    </TableTd>
                                    <TableTd>
                                        <TruncatedTooltip text={broker.officialName || ""} maxWidth={200} />
                                    </TableTd>
                                    <TableTd>
                                        <TruncatedTooltip text={broker.description || ""} maxWidth={300} />
                                    </TableTd>
                                    <TableTd>
                                        <Group wrap="nowrap">
                                            <Tooltip label="Edit broker">
                                                <ActionIcon onClick={() => handleEdit(broker)}>
                                                    <IconEdit size={14} />
                                                </ActionIcon>
                                            </Tooltip>
                                            <Tooltip label="Delete broker">
                                                <ActionIcon onClick={() => handleDelete(broker)}>
                                                    <IconTrash size={14} />
                                                </ActionIcon>
                                            </Tooltip>
                                        </Group>
                                    </TableTd>
                                </Table.Tr>
                            ))}
                        </React.Suspense>
                    </Table.Tbody>
                </Table>
            </Table.ScrollContainer>
        </>
    );
};

export default BrokerList;
