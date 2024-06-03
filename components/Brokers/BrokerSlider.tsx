import { Slider, Stack, Text } from '@mantine/core';

type BrokerSizeSliderProps = {
    onChange: (size: number) => void,
    label?: string,
    description?: string,
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
    steps?: number,
    marks?: { value: number; label: string }[],
    min?: number,
    max?: number,
    color?: string
};

export const BrokerSlider = ({ color, description, onChange, label, size, marks, min = 1, max = 10, steps = 1, ...props }: BrokerSizeSliderProps) => {

    return (
        <div>
            <Text style={{ mb: '1px' }}>{label}</Text>
            <Text style={{
                fontSize: '14px',
                fontFamily: 'sans-serif',
                color: 'gray',
                marginBottom: '10px'
            }}>{description}</Text>
            <Slider
                mt="xl"
                mb="sm"
                min={min}
                max={max}
                size={size}
                step={steps}
                showLabelOnHover
                label={value => `${value}`}
                marks={marks}
                color={color}
                onChange={(value) => onChange(value)}
                {...props}
            />
        </div>
    );
};