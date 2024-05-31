"use client"
import {SmartList} from "@/components/SmartList/SmartList";
import {useState} from "react";
import {Kbd} from "@mantine/core";

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
            }
            ,
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
        children: null,

    },
    {
        value: 'Disabled item',
        disabled: true,
        children: null,
    },
    {
        value: 'Disabled Folder',
        disabled: true,
        children: [
            {
                value: 'Disabled item',
                children: null,
            },
        ],
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
            },
        ]
    }


]
const DisableTree = () => {
    const [disable, setDisable] = useState(false)

    return (
        <div className={'p-4 border rounded-lg bg-white'}>
            <div className={'mb-6 flex w-full justify-between'}>
                <p className={'mb-2 '}>List with disabled checkbox</p>
                <div>
                    Disable tree <input type={'checkbox'} onChange={() => {
                    setDisable(!disable)
                }}/>
                </div>
            </div>
            {/*@ts-ignore*/}
            <SmartList option={{type: 'default', select: 'default'}} disable={disable} data={data}
                       onSelectedValueChange={(value) => console.log(value)}/>
        </div>
    )
}

const SelectAll = () => {
    const [selectAll, setSelectAll] = useState(false)
    return (
        <div className={'p-4 border rounded-lg bg-white'}>
            <div className={'mb-6 flex w-full justify-between'}>
                <p className={'mb-2 '}>List with Select all checkbox</p>
                <div>
                    Select all <input type={'checkbox'} onChange={() => {
                    setSelectAll(!selectAll)
                }}/>
                </div>
            </div>
            {/*@ts-ignore*/}
            <SmartList option={{type: 'default', select: 'default'}} selectAll={selectAll} data={data}
                       onSelectedValueChange={(value) => console.log(value)}/>
        </div>
    )
}
const Page = () => {
    return (
        <>
            <div className={'container mx-auto'}>
                <div className={'p-4 m-4 border rounded-lg bg-white'}>
                    <p className={'mb-2 '}>Table list</p>
                    {/*@ts-ignore*/}
                    <SmartList option={{type: 'table'}} data={data}
                               onSelectedValueChange={(value) => console.log(value)}/>
                </div>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                    gap: '1rem',
                    margin: '1rem',
                }}>
                    <div className={'p-4 border rounded-lg bg-white'}>
                        <p className={'mb-2 '}>Drag and Drop list</p>
                        {/*@ts-ignore*/}
                        <SmartList option={{type: 'default', select: 'default', dnd: true}} data={data}
                                   onSelectedValueChange={(value) => console.log(value)}/>
                    </div>


                    <div className={'p-4 border rounded-lg bg-white'}>
                        <p className={'mb-2 '}>Default list</p>
                        {/*@ts-ignore*/}
                        <SmartList option={{type: 'default', select: 'default'}} data={data}
                                   onSelectedValueChange={(value) => console.log(value)}/>
                    </div>
                    <div className={'p-4 border rounded-lg bg-white'}>
                        <p className={'mb-2 '}>Default list with counter</p>
                        {/*@ts-ignore*/}
                        <SmartList option={{type: 'default', select: 'default', counter: true}} data={data}
                                   onSelectedValueChange={(value) => console.log(value)}/>
                    </div>


                    <div className={'p-4 border rounded-lg bg-white'}>
                        <p className={'mb-2 '}>Radio list</p>
                        {/*@ts-ignore*/}
                        <SmartList option={{type: 'default', select: 'radio'}} data={data}
                                   onSelectedValueChange={(value) => console.log(value)}/>
                    </div>
                    <div className={'p-4 border rounded-lg bg-white'}>
                        <p className={'mb-2 '}>Checkbox list</p>
                        {/*@ts-ignore*/}
                        <SmartList option={{type: 'default', select: 'checkbox'}} data={data}
                                   onSelectedValueChange={(value) => console.log(value)}/>
                    </div>

                    <div className={'p-4 border rounded-lg bg-white'}>
                        <p className={'mb-2 '}>Checkbox list | Hierarchical select</p>
                        {/*@ts-ignore*/}
                        <SmartList option={{type: 'default', select: 'checkbox-hierarchical'}} data={data}
                                   onSelectedValueChange={(value) => console.log(value)}/>
                    </div>


                    <div className={'p-4 border rounded-lg bg-white'}>
                        <p className={'mb-2 '}>Checkbox list with disabled elements</p>
                        {/*@ts-ignore*/}
                        <SmartList option={{type: 'default', select: 'checkbox'}} data={data}
                                   onSelectedValueChange={(value) => console.log(value)}/>
                    </div>

                    <div className={'p-4 border rounded-lg bg-white'}>
                        <p className={'mb-2 '}>Checkbox list with disabled elements</p>
                        {/*@ts-ignore*/}
                        <SmartList option={{type: 'default', select: 'checkbox'}} data={data}
                                   onSelectedValueChange={(value) => console.log(value)}/>
                    </div>


                    <DisableTree/>
                    <SelectAll/>

                    <div className={'p-4 border rounded-lg bg-white'}>
                        <p className={'mb-2 '}>Default list with editable node </p>

                        <div dir="ltr">
                            <Kbd>Shift</Kbd> + <Kbd>left click</Kbd> on text
                        </div>
                        {/*@ts-ignore*/}
                        <SmartList option={{type: 'default', select: 'default', editable: true}} data={data}
                                   onSelectedValueChange={(value) => console.log(value)}/>
                    </div>

                    <div className={'p-4 border rounded-lg bg-white'}>
                    <p className={'mb-2 '}>Checkbox list with localStorage mode</p>
                        {/*@ts-ignore*/}
                        <SmartList option={{type: 'default', select: 'checkbox', localStorage: true}} data={data}
                                   onSelectedValueChange={(value) => console.log(value)}/>
                    </div>

                </div>

            </div>

        </>
    )
}

export default Page