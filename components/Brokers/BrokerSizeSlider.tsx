import { Slider, Stack, Text } from '@mantine/core';

type BrokerSizeSliderProps = {
    onChange: (size: string) => void,
    label: string,
};

export const BrokerSizeSlider = ({ onChange, label, ...props }: BrokerSizeSliderProps) => {
    const handleChange = (value: number) => {
        const sizeMap: Record<number, string> = {
            0: 'xs',
            25: 'sm',
            50: 'md',
            75: 'lg',
            100: 'xl',
        };
        const size = sizeMap[value];
        onChange(size);
    };

    return (
        <Slider
            mt="xl"
            mb="xl"
            size="md"
            step={25}
            showLabelOnHover
            onChange={handleChange}
            label={label}
            {...props}
            marks={[
                { value: 0, label: 'xs' },
                { value: 25, label: 'sm' },
                { value: 50, label: 'md' },
                { value: 75, label: 'lg' },
                { value: 100, label: 'xl' },
            ]}
        />
    );
};