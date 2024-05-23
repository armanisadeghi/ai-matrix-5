import { PillsInput, Pill } from '@mantine/core';
import { useState, useRef } from 'react';

interface CustomPillsInputProps<T> {
    initialPills: T[];
    placeholder: string;
    label: string;
    description: string;
    renderPillContent: (item: T) => React.ReactNode;
    onPillsChange?: (pills: T[]) => void;
}

function CustomPillsInput<T>({ initialPills, placeholder, label, description, renderPillContent, onPillsChange }: CustomPillsInputProps<T>) {
    const [pills, setPills] = useState<T[]>(initialPills);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            const newPillContent = (event.target as HTMLInputElement).value.trim();
            if (newPillContent) {
                const updatedPills = [...pills, newPillContent as unknown as T];
                setPills(updatedPills);
                if (onPillsChange) {
                    onPillsChange(updatedPills);
                }
                (event.target as HTMLInputElement).value = '';
                event.preventDefault();
            }
        } else if (event.key === 'Backspace' && (event.target as HTMLInputElement).value === '') {
            // Check if input is empty and backspace is pressed
            if (pills.length > 0) {
                removePill(pills.length - 1);
            }
        }
    };

    const removePill = (index: number) => {
        const updatedPills = pills.filter((_, i) => i !== index);
        setPills(updatedPills);
        if (onPillsChange) {
            onPillsChange(updatedPills);
        }
    };

    return (
        <PillsInput
            size="md"
            label={label}
            description={description}
        >
            <Pill.Group>
                {pills.map((pill, index) => (
                    <Pill
                        key={index}
                        onRemove={() => removePill(index)}
                        withRemoveButton
                    >
                        {renderPillContent(pill)}
                    </Pill>
                ))}
                <PillsInput.Field
                    placeholder={placeholder}
                    onKeyDown={handleKeyDown}
                    ref={inputRef}
                />
            </Pill.Group>
        </PillsInput>
    );
}

export default CustomPillsInput;
