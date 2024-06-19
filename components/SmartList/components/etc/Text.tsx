import { useEffect, useRef, useState, CSSProperties } from 'react'
import { useListProvider } from '../../SmartList'
import { Text as MantineText } from '@mantine/core'

// I made a TON of changes to this file that I didn't test because I just need to build the code so make sure you go through this in detail.

type TextT = {
    item: any // Use the appropriate type for item
    isSelected: boolean
    onClick: any
}

export default function Text({ item, isSelected, onClick }: TextT) {
    const { options }: any = useListProvider()
    const [editable, setEditable] = useState(false)
    const inputRef = useRef<HTMLInputElement | null>(null)
    const [label, setLabel] = useState(item.value)

    const style: CSSProperties = {
        padding: 4,
        userSelect: 'none' as const, // Use 'none' as const to match the type
        border: 'none',
        margin: 0,
        outline: 'none',
        ...(isSelected ? { backgroundColor: '#3b82f6', color: 'white', borderRadius: 4 } : {})
    }

    const handleClick = (event: React.MouseEvent) => {
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
    }

    useEffect(() => {
        if (editable && inputRef.current) {
            inputRef.current.focus()
        }
    }, [editable])

    const handleDoubleClick = (event: React.MouseEvent) => {
        if (options['editable'] === true && !item['disabled']) {
            setEditable(true)
        }
    }

    if (editable) {
        return (
            <input
                ref={inputRef}
                onBlur={() => setEditable(false)}
                value={label}
                style={{ ...style, fontSize: 14, background: 'transparent', lineHeight: '145%' }}
                onKeyDown={(e) => e.key === 'Enter' && setEditable(false)}
                onChange={(e) => setLabel(e.target.value)}
                placeholder={item.label}
            />
        )
    }

    return (
        <MantineText
            size="sm"
            style={style}
            onDoubleClick={(event) => handleDoubleClick(event)}
            dangerouslySetInnerHTML={{ __html: label }}
        />
    )
}
