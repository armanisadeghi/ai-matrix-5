import {useState} from "react";
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
    const [label, setLabel] = useState(item.value)
    const style = {
        padding: 4,
        userSelect: 'none', // select-none
        border: 'none',
        margin: 0,
        outline: 'none',
        ...(isSelected ? { backgroundColor: '#3b82f6', color: 'white', borderRadius: 4 } : {}), // bg-blue-500 text-white
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
    if (editable) {
        return <input value={label} style={style} onBlur={() => setEditable(false)}
                      onKeyDown={(e) => e.key === 'Enter' && setEditable(false)}
                      onChange={(e) => setLabel(e.target.value)} placeholder={item.label}/>
    }

    return (
        <MantineText size={'sm'} style={style} onClick={(event) => handleClick(event)} dangerouslySetInnerHTML={{__html: label}}/>
    )
}