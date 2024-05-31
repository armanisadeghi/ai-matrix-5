import {useState} from "react";
import {useListProvider} from "../../SmartList.tsx";

type Text = {
    item: object,
    isSelected: boolean,
    onClick: any
}

export default function Text<Text>({item, isSelected, onClick}) {
    const {options}: any = useListProvider()
    const [editable, setEditable] = useState(false)
    const [label, setLabel] = useState(item.value)
    const style = {
        fontSize: '14px', // text-sm
        padding: 6,
        borderRadius: '0.375rem', // rounded
        userSelect: 'none', // select-none
        border: 'none',
        margin: 0,
        outline: 'none',
        ...(isSelected ? { backgroundColor: '#3b82f6', color: 'white' } : {}), // bg-blue-500 text-white
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
        <p style={style} onClick={(event) => handleClick(event)} dangerouslySetInnerHTML={{__html: label}}/>
    )
}