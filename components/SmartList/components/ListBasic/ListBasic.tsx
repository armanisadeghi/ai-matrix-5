import Point from './Point/Point.tsx'

import { useListProvider } from '../../SmartList.tsx'
import { useEffect, useState } from 'react'

import DragAndDropWrapper from '../DragAndDropWrapper/DragAndDropWrapper.tsx'
import TableList from '@/components/SmartList/components/TableList/TableList'

function flattenArray(arr: any[]) {
    let result: any = []

    function flatten(item: any) {
        if (!item.disabled) {
            result.push({
                ...item,
                children: null
            })
        }

        if (item.children && Array.isArray(item.children)) {
            item.children.forEach((child: any) => flatten(child))
        }
    }

    arr.forEach((item) => flatten(item))
    return result
}

function addIdsToNestedArray(arr: any) {
    let currentId = 1

    function assignId(item: any, parentId = null, depth = 1) {
        item.id = currentId++
        item.parent_id = parentId
        item.deep = depth
        if (item.children && Array.isArray(item.children)) {
            item.children.forEach((child: any) => assignId(child, item.id, depth + 1))
        }
    }

    arr.forEach((item: any) => assignId(item))
    return arr
}

function addIdsToNestedArrayTable(arr: any) {
    function assignId(item: any, parentId = null, depth = 1, path = '', index = 0) {
        item.id = index + 1 // Use index + 1 as the ID
        item.parent_id = parentId
        item.deep = depth
        item.path = path ? `${path}.${item.id}` : `${item.id}`
        if (item.children && Array.isArray(item.children)) {
            item.children.forEach((child: any, childIndex: any) =>
                assignId(child, item.id, depth + 1, item.path, childIndex)
            )
        }
    }

    arr.forEach((item: any, index: any) => assignId(item, null, 1, '', index))
    return arr
}

const ListBasic = ({ disable, selectAll }: any) => {
    const { list, setList, selectedValue, setSelectedValue, options }: any = useListProvider()

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (disable === true) {
            const newArr = list.map((item: any) => ({
                ...item,
                disabled: true
            }))
            setList(newArr)
        } else if (disable === false) {
            const newArr = list.map((item: any) => ({
                ...item,
                disabled: false
            }))
            setList(newArr)
        }
    }, [disable])

    useEffect(() => {
        const arr = flattenArray(list)
        if (selectAll === true) {
            const newArr = arr.map((item: any) => item)
            setSelectedValue(newArr)
        } else {
            setSelectedValue([])
        }
    }, [selectAll])

    useEffect(() => {
        if (options.type === 'table') {
            setList(addIdsToNestedArrayTable(list))
        } else {
            setList(addIdsToNestedArray(list))
        }
        setLoading(true)
    }, [])

    useEffect(() => {
        if (options['localStorage'] === true) {
            const items = JSON.parse(localStorage.getItem('list'))
            if (items && items.length !== 0) {
                setSelectedValue(items)
            }
        }
    }, [])

    useEffect(() => {
        const localStorageList = JSON.parse(localStorage.getItem('list'))

        if (options['localStorage'] === true && localStorageList === null) {
            localStorage.setItem('list', JSON.stringify(selectedValue))
        }
    }, [selectedValue])

    if (!list) return null
    if (!loading) return <p>Process...</p>

    if (options['dnd'] === true) {
        return (
            <>
                <DragAndDropWrapper>
                    {list.map((item: any) => (
                        <Point key={item.id} item={item} />
                    ))}
                </DragAndDropWrapper>
            </>
        )
    } else if (options.type === 'table') {
        return <TableList data={list} />
    } else {
        return (
            <>
                {list.map((item: any) => (
                    <Point key={item.id} item={item} />
                ))}
            </>
        )
    }
}

export default ListBasic
