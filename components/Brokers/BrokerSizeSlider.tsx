import { Slider } from '@mantine/core';

type BrokerSizeSliderProps = {
    onChange: (value: any) => void;
};

export const SizeSlider = ({ onChange }: BrokerSizeSliderProps) => {
    return (
        <Slider
            mt="xl"
            mb="xl"
            size="md"
            step={25}
            showLabelOnHover
            onChange={onChange}
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