import {useEffect, useRef, useState} from "react";
import {useListProvider} from "../../SmartList.tsx";
import {Text as MantineText} from '@mantine/core'

type TextT = {
    item: object,
    isSelected: boolean,
    onClick: any
}

export default function Text<TextT>({item, isSelected, onClick}) {
    const {options}: any = useListProvider()
    const [editable, setEditable] = useState(false)
    const inputRef = useRef(null);

    const [label, setLabel] = useState(item.value)
    const style = {
        padding: 4,
        userSelect: 'none', // select-none
        border: 'none',
        margin: 0,
        outline: 'none',
        ...(isSelected ? {backgroundColor: '#3b82f6', color: 'white', borderRadius: 4} : {}), // bg-blue-500 text-white
    };


    const handleClick = (event) => {
        if (options['editable'] === true) {
            if (event.shiftKey) {
                setEditable(true)

            } else {
                onClick()
            }
        } else {
            if (onClick) {
                onClick()
            }

        }

    };

    useEffect(() => {
        if (editable && inputRef.current) {
            inputRef.current.focus();
        }
    }, [editable]);

    const handleDoubleClick = (event) => {
        if (options['editable'] === true && !item['disabled']) {
            setEditable(true)
        }
    };

    if (editable) {
        return <input
            ref={inputRef}
            onBlur={() => setEditable(false)}
            value={label} style={style} onBlur={() => setEditable(false)}
            style={{...style, fontSize: 14, background: 'transparent', lineHeight: '145%'}}
            onKeyDown={(e) => e.key === 'Enter' && setEditable(false)}
            onChange={(e) => setLabel(e.target.value)} placeholder={item.label}/>
    }

    return (
        <MantineText size={'sm'} style={style}
            // onClick={(event) => handleClick(event)}
                     onDoubleClick={(event) => handleDoubleClick(event)}
                     dangerouslySetInnerHTML={{__html: label}}


        />
    )
}