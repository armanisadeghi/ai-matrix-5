"use client";

import LoadingPage from '@/app/trials/crud/components/LoadingOverlay';
import { useRouter } from 'next/navigation';
import React, { useRef, useState, useEffect } from 'react';
import { ActionIcon, Group, TableTd, Tooltip, Pagination } from '@mantine/core';
import { Table } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { DataItem, Header } from './types';
import styles from '../styles/crud.module.css';
import { useRecoilState } from 'recoil';

interface CRUDTableProps {
    headers?: Header[];
    data?: DataItem[];
    onDelete?: (id: string) => void;
    onEdit?: (item: DataItem) => void;
    loading?: boolean;
}

const CRUDTable: React.FC<CRUDTableProps> = ({ headers = [], data = [], onDelete, onEdit, loading = false }) => {
    const [activePage, setPage] = useState(1);
    const itemsPerPage = 10;
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const router = useRouter();

    const paginatedData = data.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage);

    const isTextTruncated = (element: HTMLElement) => {
        return element.scrollWidth > element.clientWidth;
    };

    const TruncatedTooltip: React.FC<{ text: string; maxWidth: number }> = ({ text, maxWidth }) => {
        const textRef = useRef<HTMLDivElement>(null);
        const [isTruncated, setIsTruncated] = useState(false);

        useEffect(() => {
            if (textRef.current) {
                setIsTruncated(isTextTruncated(textRef.current));
            }
        }, [textRef.current]);

        return (
            <div ref={textRef} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth }}>
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

    const handleRowClick = (id: string) => {
        router.push(`/trials/crud/${id}`);
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
                            <ActionIcon><IconEdit size={14} /></ActionIcon>
                            <ActionIcon><IconTrash size={14} /></ActionIcon>
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
                    {loading && <LoadingPage className={styles['ame-crud-loadingOverlay']} />}  {/* Show loading overlay if loading is true */}
                    <Table striped highlightOnHover withColumnBorders withRowBorders={false} stickyHeader verticalSpacing="sm" className={styles['ame-crud-table']}>
                        <Table.Thead>
                            <Table.Tr>{headers.map((header) => (<Table.Th key={header.id}>{header.name}</Table.Th>))}</Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {paginatedData.map((item) => (
                                <Table.Tr key={item.id} onClick={() => handleRowClick(item.id)} className={styles['ame-crud-tableRow']}>
                                    <TableTd style={{ display: 'none' }}>{item.id}</TableTd>
                                    {headers.map((header) => (
                                        <TableTd key={header.id}>
                                            <TruncatedTooltip text={renderCellContent(item[header.id])} maxWidth={200} />
                                        </TableTd>
                                    ))}
                                    <TableTd>
                                        <Group wrap="nowrap">
                                            <Tooltip label="Edit item"><ActionIcon onClick={() => onEdit && onEdit(item)}><IconEdit size={14} /></ActionIcon></Tooltip>
                                            <Tooltip label="Delete item"><ActionIcon onClick={() => onDelete && onDelete(item.id)}><IconTrash size={14} /></ActionIcon></Tooltip>
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
