"use client";

import React, { useRef, useState, useEffect } from "react";
import { ActionIcon, Group, TableTd, Tooltip, Pagination, Table, Button } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import LoadingPage from "@/app/trials/crud/components/LoadingOverlay";
import { AddItemModal, EditItemModal } from "@/app/trials/crud-trials/CRUDModals";
import styles from "app/trials/crud/styles/crud.module.css";
import useCRUDTable from "./useCRUDTable";

interface CRUDTableProps {
    moduleName?: string;
    headers?: any;
    data?: any;
    onDelete?: any;
    onEdit?: any;
}

const TruncatedTooltip: React.FC<{ text: string; maxWidth: number }> = ({ text, maxWidth }) => {
    const textRef = useRef<HTMLDivElement>(null);
    const [isTruncated, setIsTruncated] = useState(false);

    useEffect(() => {
        if (textRef.current) {
            setIsTruncated(textRef.current.scrollWidth > textRef.current.clientWidth);
        }
    }, [textRef]);

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

const CRUDTable: React.FC<CRUDTableProps> = ({ moduleName }) => {
    const {
        headers,
        data,
        loading,
        activePage,
        setPage,
        currentItem,
        setCurrentItem,
        addItemModalOpened,
        setAddItemModalOpened,
        editItemModalState,
        setEditItemModalState,
        totalPages,
        paginatedData,
        addNewItem,
        updateItem,
        deleteItem,
        handleRowClick,
    } = useCRUDTable(moduleName);

    const renderCellContent = (content: any) => {
        if (typeof content === "object") {
            return JSON.stringify(content);
        }
        return content?.toString() || "";
    };

    const renderEmptyRows = () => {
        const emptyRows = [];
        for (let i = paginatedData.length; i < 10; i++) {
            emptyRows.push(
                <Table.Tr key={`empty-${i}`} className={styles["ame-crud-emptyRow"]}>
                    {headers.map((header) => (
                        <TableTd key={header.id}></TableTd>
                    ))}
                    <TableTd>
                        <Group wrap="nowrap">
                            <ActionIcon>
                                <IconEdit size={14} />
                            </ActionIcon>
                            <ActionIcon>
                                <IconTrash size={14} />
                            </ActionIcon>
                        </Group>
                    </TableTd>
                </Table.Tr>,
            );
        }
        return emptyRows;
    };

    return (
        <>
            <Button onClick={() => setAddItemModalOpened(true)}>Add New Item</Button>
            <AddItemModal opened={addItemModalOpened} setOpened={setAddItemModalOpened} addNewItem={addNewItem} />
            {editItemModalState.currentItem && (
                <EditItemModal
                    opened={editItemModalState.opened}
                    setOpened={(open) => setEditItemModalState({ ...editItemModalState, opened: open })}
                    currentItem={editItemModalState.currentItem}
                    updateItem={updateItem}
                />
            )}

            <div className={styles["ame-crud-mainContainer"]}>
                <div className={styles["ame-crud-tableContainer"]}>
                    {loading && <LoadingPage className={styles["ame-crud-loadingOverlay"]} />}
                    <Table
                        striped
                        highlightOnHover
                        withColumnBorders
                        withRowBorders={false}
                        stickyHeader
                        verticalSpacing="sm"
                        className={styles["ame-crud-table"]}
                    >
                        <Table.Thead>
                            <Table.Tr>
                                {headers.map((header) => (
                                    <Table.Th key={header.id}>{header.name}</Table.Th>
                                ))}
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {paginatedData.map((item) => (
                                <Table.Tr
                                    key={item.id}
                                    onClick={() => handleRowClick(item.id)}
                                    className={styles["ame-crud-tableRow"]}
                                >
                                    <TableTd style={{ display: "none" }}>{item.id}</TableTd>
                                    {headers.map((header) => (
                                        <TableTd key={header.id}>
                                            <TruncatedTooltip
                                                text={renderCellContent(item[header.id])}
                                                maxWidth={200}
                                            />
                                        </TableTd>
                                    ))}
                                    <TableTd>
                                        <Group wrap="nowrap">
                                            <Tooltip label="Edit item">
                                                <ActionIcon
                                                    onClick={() => {
                                                        setCurrentItem(item);
                                                        setEditItemModalState({ ...editItemModalState, opened: true });
                                                    }}
                                                >
                                                    <IconEdit size={14} />
                                                </ActionIcon>
                                            </Tooltip>
                                            <Tooltip label="Delete item">
                                                <ActionIcon onClick={() => deleteItem(item.id)}>
                                                    <IconTrash size={14} />
                                                </ActionIcon>
                                            </Tooltip>
                                        </Group>
                                    </TableTd>
                                </Table.Tr>
                            ))}
                            {renderEmptyRows()}
                        </Table.Tbody>
                    </Table>
                </div>
                <Pagination total={totalPages} value={activePage} onChange={setPage} mt="sm" />
            </div>
        </>
    );
};

export default CRUDTable;
