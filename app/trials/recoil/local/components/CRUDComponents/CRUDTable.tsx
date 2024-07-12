'use client';

import LoadingPage from '@/app/trials/crud/components/LoadingOverlay';
import CRUDModalWithModes from '@/app/trials/recoil/local/components/CRUDComponents/CRUDModalWithModes';
import { CRUDDataItem, CRUDTableProps, CRUDAction } from '@/app/trials/recoil/local/components/CRUDComponents/types';
import React, { useRef, useState, useEffect } from 'react';
import { ActionIcon, Group, TableTd, Tooltip, Pagination, Button } from '@mantine/core';
import { Table } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import styles from '@/app/trials/recoil/local/components/CRUDComponents/crud.module.css';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { currentCRUDItemAtom, modalModeAtom } from './CRUDAtoms';


const CRUDTable: React.FC<CRUDTableProps> = (
    {
        headers = [],
        data = [],
        onDelete,
        onEdit,
        onAdd,
        onView,
        loading = false,
        handleAction
    }) => {
    const [activePage, setPage] = useState(1);
    const itemsPerPage = 10;
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const [modalOpened, setModalOpened] = useState(false);
    const [currentItem, setCurrentItem] = useRecoilState(currentCRUDItemAtom);
    const setModalMode = useSetRecoilState(modalModeAtom);

    const paginatedData = data.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage);

    const isTextTruncated = (element: HTMLElement) => {
        return element.scrollWidth > element.clientWidth;
    };

    const TruncatedTooltip: React.FC<{ text: string; maxWidth: number }> = ({text, maxWidth}) => {
        const textRef = useRef<HTMLDivElement>(null);
        const [isTruncated, setIsTruncated] = useState(false);

        useEffect(() => {
            if (textRef.current) {
                setIsTruncated(isTextTruncated(textRef.current));
            }
        }, [textRef.current]);

        return (
            <div ref={textRef} style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth}}>
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

    const renderCellContent = (content: any) => {
        if (typeof content === 'object') {
            return JSON.stringify(content);
        }
        return content?.toString() || '';
    };

    const handleCRUDAction = async (action: CRUDAction, item?: CRUDDataItem) => {
        if (handleAction) {
            const result = await handleAction(action, item);
            if (result === false) {
                // If handleAction returns false, we stop here and don't proceed with the default behavior
                return;
            }
        }

        // Default behavior
        switch (action) {
            case 'add':
                setCurrentItem(null);
                setModalMode('add');
                setModalOpened(true);
                break;
            case 'edit':
                if (item) {
                    setCurrentItem(item);
                    setModalMode('edit');
                    setModalOpened(true);
                }
                break;
            case 'view':
                if (item) {
                    setCurrentItem(item);
                    setModalMode('view');
                    setModalOpened(true);
                }
                break;
            case 'delete':
                if (item) {
                    setCurrentItem(item);
                    setModalMode('delete');
                    setModalOpened(true);
                }
                break;
        }
    };

    const handleModalSubmit = (values: Record<string, string>) => {
        const mode = currentItem ? 'edit' : 'add';
        if (mode === 'add') {
            console.log('Add item:', values);
            onAdd && onAdd(values as CRUDDataItem);
        } else if (mode === 'edit') {
            console.log('Edit item:', values);
            onEdit && onEdit(values as CRUDDataItem);
        }
        setCurrentItem(null);
        setModalOpened(false);
    };

    const handleModalDelete = () => {
        if (currentItem) {
            console.log('Delete item:', currentItem.id);
            onDelete && onDelete(currentItem.id);
            setModalOpened(false);
            setCurrentItem(null);
        }
    };

    const renderEmptyRows = () => {
        const emptyRows = [];
        for (let i = paginatedData.length; i < itemsPerPage; i++) {
            emptyRows.push(
                <Table.Tr key={`empty-${i}`} className={styles['ame-crud-emptyRow']}>
                    {headers.map((header) => (
                        <TableTd key={header.id}></TableTd>
                    ))}
                    <TableTd>
                        <Group wrap="nowrap">
                            <ActionIcon><IconEdit size={14}/></ActionIcon>
                            <ActionIcon><IconTrash size={14}/></ActionIcon>
                        </Group>
                    </TableTd>
                </Table.Tr>
            );
        }
        return emptyRows;
    };

    return (
        <>
            <div className={styles['ame-crud-mainContainer']}>
                <div className={styles['ame-crud-tableContainer']}>
                    {loading && <LoadingPage className={styles['ame-crud-loadingOverlay']} />}
                    <Table striped highlightOnHover withColumnBorders withRowBorders={false} stickyHeader verticalSpacing="sm" className={styles['ame-crud-table']}>
                        <Table.Thead>
                            <Table.Tr>{headers.map((header) => (<Table.Th key={header.id}>{header.name}</Table.Th>))}</Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {paginatedData.map((item) => (
                                <Table.Tr key={item.id} className={styles['ame-crud-tableRow']} onClick={() => handleCRUDAction('view', item)}>
                                    <TableTd style={{ display: 'none' }}>{item.id}</TableTd>
                                    {headers.map((header) => (
                                        <TableTd key={header.id}>
                                            <TruncatedTooltip text={renderCellContent(item[header.id])} maxWidth={200} />
                                        </TableTd>
                                    ))}
                                    <TableTd>
                                        <Group wrap="nowrap">
                                            <Tooltip label="Edit item">
                                                <ActionIcon onClick={(e) => { e.stopPropagation(); handleCRUDAction('edit', item); }}>
                                                    <IconEdit size={14} />
                                                </ActionIcon>
                                            </Tooltip>
                                            <Tooltip label="Delete item">
                                                <ActionIcon onClick={(e) => { e.stopPropagation(); handleCRUDAction('delete', item); }}>
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
                <Button onClick={() => handleCRUDAction('add')} mt="sm">Add New Item</Button>
            </div>
            <CRUDModalWithModes
                opened={modalOpened}
                setOpened={setModalOpened}
                headers={headers}
                onSubmit={handleModalSubmit}
                onDelete={handleModalDelete}
            />
        </>
    );
};

export default CRUDTable;

