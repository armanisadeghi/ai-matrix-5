import { Checkbox, CheckboxProps, MantineProvider, createTheme, Tooltip } from '@mantine/core';
import { useState } from 'react';

interface CustomCheckboxProps extends Omit<CheckboxProps, 'radius' | 'size'> {
    label: string;
    tooltip?: string;
    pointerCursor?: boolean;
    checked?: boolean;
    disabled?: boolean;
    defaultChecked?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const pointerTheme = createTheme({
    cursorType: 'pointer',
});

function AmeCheckbox({
                         label,
                         tooltip,
                         pointerCursor,
                         checked,
                         disabled,
                         defaultChecked,
                         onChange,
                         ...props
                     }: CustomCheckboxProps) {
    const [internalChecked, setInternalChecked] = useState(defaultChecked || false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newChecked = event.currentTarget.checked;
        if (onChange) {
            onChange(event); // Call external onChange handler with the event
        } else {
            setInternalChecked(newChecked); // Update internal state if no external control
        }
    };

    const checkboxProps = {
        radius: "xs",
        size: "sm",
        checked: checked !== undefined ? checked : internalChecked, // Controlled or internal state
        disabled,
        onChange: handleChange,
        label,
        ...props
    };

    const checkboxElement = <Checkbox {...checkboxProps} />;
    const checkboxWithTooltip = tooltip ? (
        <Tooltip label={tooltip}>{checkboxElement}</Tooltip>
    ) : checkboxElement;

    return pointerCursor ? (
        <MantineProvider theme={pointerTheme}>{checkboxWithTooltip}</MantineProvider>
    ) : checkboxWithTooltip;
}

export default AmeCheckbox;
