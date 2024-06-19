import { PillsInput, Pill } from '@mantine/core'
import { useState, useRef } from 'react'

export interface AmePillsInputProps<T> {
    initialPills?: T[]
    placeholder: string
    label: string
    description?: string
    renderPillContent: (item: T) => React.ReactNode
    onPillsChange?: (pills: T[]) => void
    maxWidth?: string
    justify?:
        | 'flex-start'
        | 'flex-end'
        | 'center'
        | 'space-between'
        | 'space-around'
        | 'space-evenly'
}

function AmePillsInput<T>({
    initialPills = [],
    placeholder,
    label,
    description = ' ',
    renderPillContent,
    onPillsChange,
    maxWidth = '100%',
    justify = 'flex-start'
}: AmePillsInputProps<T>) {
    const [pills, setPills] = useState<T[]>(initialPills)
    const inputRef = useRef<HTMLInputElement>(null)

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' || event.key === 'Tab') {
            event.preventDefault()
            convertInputToPill()
        } else if (event.key === 'Backspace' && (event.target as HTMLInputElement).value === '') {
            if (pills.length > 0) {
                removePill(pills.length - 1)
            }
        }
    }

    const handleBlur = () => {
        convertInputToPill()
    }

    const convertInputToPill = () => {
        const newPillContent = inputRef.current?.value.trim()
        if (newPillContent) {
            const updatedPills = [...pills, newPillContent as unknown as T]
            setPills(updatedPills)
            if (onPillsChange) {
                onPillsChange(updatedPills)
            }
            if (inputRef.current) {
                inputRef.current.value = ''
            }
        }
    }

    const removePill = (index: number) => {
        const updatedPills = pills.filter((_, i) => i !== index)
        setPills(updatedPills)
        if (onPillsChange) {
            onPillsChange(updatedPills)
        }
    }

    return (
        <PillsInput size="sm" label={label} description={description} style={{ maxWidth }}>
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: justify, width: '100%' }}>
                    <Pill.Group>
                        {pills.map((pill, index) => (
                            <Pill key={index} onRemove={() => removePill(index)} withRemoveButton>
                                {renderPillContent(pill)}
                            </Pill>
                        ))}
                        <PillsInput.Field
                            placeholder={placeholder}
                            onKeyDown={handleKeyDown}
                            onBlur={handleBlur}
                            ref={inputRef}
                        />
                    </Pill.Group>
                </div>
            </div>
        </PillsInput>
    )
}

export default AmePillsInput
