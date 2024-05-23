// ui/checkbox/CustomCheckbox.tsx
import { Checkbox, CheckboxProps, MantineProvider, createTheme, Tooltip } from '@mantine/core';

interface CustomCheckboxProps extends Omit<CheckboxProps, 'radius' | 'size'> {
    tooltip?: string;
    pointerCursor?: boolean;
}

const pointerTheme = createTheme({
    cursorType: 'pointer',
});

function CustomCheckbox({ tooltip, pointerCursor, ...props }: CustomCheckboxProps) {
    const fixedProps = { radius: "xs", size: "sm" };
    const allProps = { ...props, ...fixedProps };
    const checkboxElement = <Checkbox {...allProps} />;
    const checkboxWithTooltip = tooltip ? (
        <Tooltip label={tooltip}>
            {checkboxElement}
        </Tooltip>
    ) : (
        checkboxElement
    );

    return pointerCursor ? (
        <MantineProvider theme={pointerTheme}>
            {checkboxWithTooltip}
        </MantineProvider>
    ) : (
        checkboxWithTooltip
    );
}

export default CustomCheckbox;
