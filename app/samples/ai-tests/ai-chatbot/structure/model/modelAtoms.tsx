import React from 'react';

interface ControlProps {
    id: string;
    componentType: string;
    label: string;
    helpText: string;
    type: string;
    value: number | boolean;
    min?: number;
    max?: number;
    step?: number;
    choices?: { id: string; label: string; value: boolean }[];
}

const Control: React.FC<ControlProps> = ({
                                             id, componentType, label, helpText, type, value, min, max, step, choices
                                         }) => (
    <div className="control">
        <label htmlFor={id}>{label}</label>
        {componentType === 'slider' && (
            <input type="range" id={id} min={min} max={max} step={step} defaultValue={value as number} />
        )}
        {componentType === 'switchGroup' && choices && choices.map(choice => (
            <div key={choice.id}>
                <input type="checkbox" id={choice.id} checked={choice.value} />
                <label htmlFor={choice.id}>{choice.label}</label>
            </div>
        ))}
        <p>{helpText}</p>
    </div>
);

export default Control;
