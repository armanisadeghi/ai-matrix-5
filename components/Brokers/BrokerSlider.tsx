import AmeSlider from '@/ui/slider/AmeSlider';
import { useState } from 'react';

type BrokerSizeSliderProps = {
    onChange: (size: number) => void,
    label?: string,
    description?: string,
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
    steps?: number,
    marks?: { value: number; label: string }[],
    min?: number,
    max?: number,
    color?: string,
    defaultValue?: number,
};

export const BrokerSlider = ({ defaultValue, color, description, onChange, label, size, marks, min = 1, max = 10, steps = 1, ...props }: BrokerSizeSliderProps) => {
    const [value, setValue] = useState(defaultValue);

    return (
        <AmeSlider
            name={label || ''}
            min={min}
            max={max}
            size={size as any}
            step={steps}
            value={value}
            color={color as any}
            onChange={(value) => { setValue(value); onChange(value); }}
            {...props}
        />
    );
};