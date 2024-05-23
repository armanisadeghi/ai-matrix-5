// ui/checkbox/CustomCheckboxGroup.tsx
import CustomCheckbox from './CustomCheckbox';
import CustomFieldset from '../fieldset/CustomFieldset';
import { ReactNode } from 'react';

interface CustomCheckboxGroupProps {
    checkboxes: {
        label: string;
        value: string;
        tooltip?: string;
    }[];
    legend?: string;
    layout?: 'single' | 'double' | 'triple' | 'quad';
    buttonLabel?: string;
    showButton?: boolean;
    buttonWidth?: string;
    fieldsetWidth?: string;
}

function CustomCheckboxGroup({
                                 checkboxes,
                                 legend,
                                 layout = 'single',
                                 buttonLabel,
                                 showButton = true,
                                 buttonWidth,
                                 fieldsetWidth = '100%'
                             }: CustomCheckboxGroupProps) {
    const renderCheckboxes = (): ReactNode => {
        return checkboxes.map((checkbox, index) => (
            <CustomCheckbox
                key={index}
                label={checkbox.label}
                value={checkbox.value}
                tooltip={checkbox.tooltip}
                pointerCursor={true}
            />
        ));
    };

    return (
        <CustomFieldset
            legend={legend}
            layout={layout}
            buttonLabel={buttonLabel}
            showButton={showButton}
            buttonWidth={buttonWidth}
            fieldsetWidth={fieldsetWidth}
        >
            {renderCheckboxes()}
        </CustomFieldset>
    );
}

export default CustomCheckboxGroup;
