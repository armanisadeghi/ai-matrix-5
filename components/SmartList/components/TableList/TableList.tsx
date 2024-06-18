'use client';

import {useEffect, useState} from "react";
import {Checkbox, Table, Text} from "@mantine/core";
import {useListProvider} from "@/components/SmartList/SmartList";
import Point from "@/components/SmartList/components/ListBasic/Point/Point";
import Collapsebtn from "@/components/SmartList/components/etc/Collapsebtn";
import FolderIco from "@/components/SmartList/components/etc/FolderIco";
import {IconFile} from '@tabler/icons-react';


function TableListNested({arr} : any) {
    const {options}: any = useListProvider();
    const [selectedRows, setSelectedRows] = useState<number[]>([]);
    const [items, setItems] = useState(null)


    useEffect(() => {
        setItems(arr)
    }, [arr])


    if (items !== null) {
        return <Rows data={items}/>
    }

}


function Row({element}: any) {
    const {selectedValue, setSelectedValue}: any = useListProvider();
    const isSelected = selectedValue?.length > 0 && selectedValue.some((i : any) => i.id == element.id);
    const [selectedRows, setSelectedRows] = useState<number[]>([]);
    const [isOpen, setIsOpen] = useState(false)
    useEffect(() => {
        if (isSelected) {
            const findItem = selectedValue.filter((i : any) => i !== element)
            setSelectedValue(findItem);

        } else {
            setSelectedValue([...selectedValue, element]);
        }

    }, [selectedRows]);
    return (
        <>
            <Table.Tr
                key={element.id}
                style={{opacity: element['disabled'] ? 0.6 : 1, pointerEvents: element['disabled'] ? "none" : "all"}}
                bg={selectedRows.includes(element.id) ? 'var(--mantine-color-blue-light)' : undefined}
            >
                <Table.Td>
                    <Checkbox
                        aria-label="Select row"
                        checked={selectedRows.includes(element.id)}
                        disabled={element['disabled']}
                        onChange={(event) =>
                            setSelectedRows(
                                event.currentTarget.checked
                                    ? [...selectedRows, element.id]
                                    : selectedRows.filter((position) => position !== element.id)
                            )
                        }
                    />
                </Table.Td>
                <Table.Td>{element.path}</Table.Td>
                <Table.Td style={{display: "flex", gap: 12, paddingLeft: element.deep * 24}}>
                    {element.children ?
                        <>
                            <div style={{
                                position: 'relative',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 12
                            }}>
                                <Collapsebtn onClick={() => setIsOpen(!isOpen)} onCollapse={isOpen}/>
                                <FolderIco isOpen={isOpen}/>
                                <Text size={'sm'} dangerouslySetInnerHTML={{__html: element.value}}/>
                            </div>

                        </> : <>
                            <
                                div style={{
                                position: 'relative',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 12
                            }}>
                                <IconFile/>
                                <Text size={'sm'} dangerouslySetInnerHTML={{__html: element.value}}/>
                            </div>
                        </>}

                </Table.Td>
                <Table.Td> {element.path.replace(/\./g, '_')}</Table.Td>
            </Table.Tr>
            {element.children && isOpen ? <TableListNested arr={element.children}/> : null}
        </>
    )
}


const Rows = ({data}: any) => {


    if (data) {
        return (
            <>
                {data.map((element : any) => <Row key={element.id} element={element}/>)
                }
            </>
        )
    }
}


export default function TableList({data} : any) {


    return (
        <Table highlightOnHover>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th></Table.Th>
                    <Table.Th>#</Table.Th>
                    <Table.Th>Items</Table.Th>
                    <Table.Th>Key</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                <Rows data={data}/>
            </Table.Tbody>

        </Table>
    )
}