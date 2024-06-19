'use client'
import { SmartList } from '@/components/SmartList/SmartList'
import { useState } from 'react'
import { Checkbox, Container, Kbd, Space, Text, Title } from '@mantine/core'

const data = [
    {
        value: 'Folder with children',
        children: [
            {
                value: 'Sub-folder',
                children: [
                    {
                        value: 'Item',
                        children: [
                            {
                                value: 'Item',
                                children: null
                            },
                            {
                                value: 'Item',
                                children: null
                            },
                            {
                                value: 'Item',
                                disabled: false,
                                children: [
                                    {
                                        value: 'Item',
                                        children: null
                                    },
                                    {
                                        value: 'Item',
                                        children: null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        value: 'Item',
                        children: null
                    }
                ]
            },
            {
                value: `<i>Item HTML support</i>`,
                children: null
            },
            {
                value: 'Item',
                children: null
            }
        ]
    },

    {
        value: `<i>Item <b>HTML</b> support</i>`,
        children: null
    },
    {
        value: 'Disabled item',
        disabled: true,
        children: null
    },
    {
        value: 'Disabled Folder',
        disabled: true,
        children: [
            {
                value: 'Disabled item',
                children: null
            }
        ]
    },
    {
        value: 'Item',
        children: null
    },
    {
        value: 'Item',
        children: null
    },
    {
        value: 'Folder',
        children: [
            {
                value: 'Sub-folder',
                children: [
                    {
                        value: 'Item',
                        children: null
                    }
                ]
            },
            {
                value: 'Item',
                children: null
            }
        ]
    }
]
const DisableTree = () => {
    const [disable, setDisable] = useState(false)

    return (
        <div className={'p-4 border rounded-lg bg-white'}>
            <div className={'mb-6 flex w-full justify-between'}>
                <Title order={4}>List with disabled checkbox</Title>
                <Space h="md" />
                <Checkbox
                    label={'Disable tree'}
                    onChange={() => {
                        setDisable(!disable)
                    }}
                />
            </div>
            {/*@ts-ignore*/}
            <SmartList
                option={{ type: 'default', select: 'default' }}
                disable={disable}
                data={data}
                onSelectedValueChange={(value: any) => console.log(value)}
            />
        </div>
    )
}

const SelectAll = () => {
    const [selectAll, setSelectAll] = useState(false)
    return (
        <div className={'p-4 border rounded-lg bg-white'}>
            <div className={'mb-6 flex w-full justify-between'}>
                <Title order={4}>List with Select all checkbox</Title>
                <Space h="md" />
                <Checkbox
                    label={'Select all '}
                    onChange={() => {
                        setSelectAll(!selectAll)
                    }}
                />
            </div>
            {/*@ts-ignore*/}
            <SmartList
                option={{ type: 'default', select: 'default' }}
                selectAll={selectAll}
                data={data}
                onSelectedValueChange={(value: any) => console.log(value)}
            />
        </div>
    )
}
const Page = () => {
    return (
        <>
            <div className={'container mx-auto'}>
                <div className={'p-4 m-4 border rounded-lg bg-white'}>
                    <Title order={4}>Table list</Title>
                    {/*@ts-ignore*/}
                    <SmartList
                        option={{ type: 'table' }}
                        data={data}
                        onSelectedValueChange={(value: any) => console.log(value)}
                    />
                </div>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                        gap: '1rem',
                        margin: '24px auto'
                    }}
                >
                    <div className={'p-4 border rounded-lg bg-white'}>
                        <Title order={4} className={'mb-2 '}>
                            Drag and Drop list
                        </Title>
                        {/*@ts-ignore*/}
                        <SmartList
                            option={{ type: 'default', select: 'default', dnd: true }}
                            data={data}
                            onSelectedValueChange={(value: any) => console.log(value)}
                        />
                    </div>

                    <div className={'p-4 border rounded-lg bg-white'}>
                        <Title order={4} className={'mb-2 '}>
                            Default list
                        </Title>
                        {/*@ts-ignore*/}
                        <SmartList
                            option={{ type: 'default', select: 'default' }}
                            data={data}
                            onSelectedValueChange={(value: any) => console.log(value)}
                        />
                    </div>
                    <div className={'p-4 border rounded-lg bg-white'}>
                        <Title order={4} className={'mb-2 '}>
                            Default list with counter
                        </Title>
                        {/*@ts-ignore*/}
                        <SmartList
                            option={{ type: 'default', select: 'default', counter: true }}
                            data={data}
                            onSelectedValueChange={(value: any) => console.log(value)}
                        />
                    </div>

                    <div className={'p-4 border rounded-lg bg-white'}>
                        <Title order={4} className={'mb-2 '}>
                            Radio list
                        </Title>
                        {/*@ts-ignore*/}
                        <SmartList
                            option={{ type: 'default', select: 'radio' }}
                            data={data}
                            onSelectedValueChange={(value: any) => console.log(value)}
                        />
                    </div>
                    <div className={'p-4 border rounded-lg bg-white'}>
                        <Title order={4} className={'mb-2 '}>
                            Checkbox list
                        </Title>
                        {/*@ts-ignore*/}
                        <SmartList
                            option={{ type: 'default', select: 'checkbox' }}
                            data={data}
                            onSelectedValueChange={(value: any) => console.log(value)}
                        />
                    </div>

                    <div className={'p-4 border rounded-lg bg-white'}>
                        <Title order={4} className={'mb-2 '}>
                            Checkbox list | Hierarchical select
                        </Title>
                        {/*@ts-ignore*/}
                        <SmartList
                            option={{ type: 'default', select: 'checkbox-hierarchical' }}
                            data={data}
                            onSelectedValueChange={(value: any) => console.log(value)}
                        />
                    </div>

                    <div className={'p-4 border rounded-lg bg-white'}>
                        <Title order={4} className={'mb-2 '}>
                            Checkbox list with disabled elements
                        </Title>
                        {/*@ts-ignore*/}
                        <SmartList
                            option={{ type: 'default', select: 'checkbox' }}
                            data={data}
                            onSelectedValueChange={(value: any) => console.log(value)}
                        />
                    </div>

                    <div className={'p-4 border rounded-lg bg-white'}>
                        <Title order={4} className={'mb-2 '}>
                            Checkbox list with disabled elements
                        </Title>
                        {/*@ts-ignore*/}
                        <SmartList
                            option={{ type: 'default', select: 'checkbox' }}
                            data={data}
                            onSelectedValueChange={(value: any) => console.log(value)}
                        />
                    </div>

                    <DisableTree />
                    <SelectAll />

                    <div className={'p-4 border rounded-lg bg-white'}>
                        <Title order={4} className={'mb-2 '}>
                            Default list with editable node{' '}
                        </Title>

                        <div dir="ltr">
                            <Kbd>Double left click</Kbd> on text
                        </div>
                        {/*@ts-ignore*/}
                        <SmartList
                            option={{ type: 'default', select: 'default', editable: true }}
                            data={data}
                            onSelectedValueChange={(value: any) => console.log(value)}
                        />
                    </div>

                    <div className={'p-4 border rounded-lg bg-white'}>
                        <Title order={4} className={'mb-2 '}>
                            Checkbox list with localStorage mode
                        </Title>
                        {/*@ts-ignore*/}
                        <SmartList
                            option={{ type: 'default', select: 'checkbox', localStorage: true }}
                            data={data}
                            onSelectedValueChange={(value: any) => console.log(value)}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Page
