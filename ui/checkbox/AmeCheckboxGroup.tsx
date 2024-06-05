// ui/checkbox/AmeCheckboxGroup.tsx
import AmeCheckbox from './AmeCheckbox';
import AmeFieldset from '../fieldset/AmeFieldset';
import { ReactNode } from 'react';

interface AmeCheckboxGroupProps {
    checkboxes: {
        label: string;
        value: string;
        tooltip?: string;
        checked?: boolean;
        disabled?: boolean;
        onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    }[];
    legend?: string;
    layout?: 'single' | 'double' | 'triple' | 'quad';
    buttonLabel?: string;
    showButton?: boolean;
    buttonWidth?: string;
    fieldsetWidth?: string;
}

function AmeCheckboxGroup({
                              checkboxes,
                              legend,
                              layout = 'single',
                              buttonLabel,
                              showButton = true,
                              buttonWidth,
                              fieldsetWidth = '100%',
                          }: AmeCheckboxGroupProps) {
    const renderCheckboxes = (): ReactNode => {
        return checkboxes.map((checkbox, index) => (
            <AmeCheckbox
                key={index}
                label={checkbox.label}
                value={checkbox.value}
                tooltip={checkbox.tooltip}
                pointerCursor={true}
                checked={checkbox.checked}
                disabled={checkbox.disabled}
                onChange={checkbox.onChange}
            />
        ));
    };

    return (
        <AmeFieldset
            legend={legend}
            layout={layout}
            buttonLabel={buttonLabel}
            showButton={showButton}
            buttonWidth={buttonWidth}
            fieldsetWidth={fieldsetWidth}
        >
            {renderCheckboxes()}
        </AmeFieldset>
    );
}

export default AmeCheckboxGroup;
