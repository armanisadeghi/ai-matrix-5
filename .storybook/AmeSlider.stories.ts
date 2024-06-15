import type { Meta, StoryObj } from '@storybook/react';
import AmeSlider, { AmeSliderProps } from './AmeSlider';
import { fn } from '@storybook/addon-actions';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<AmeSliderProps> = {
    title: 'Components/AmeSlider',
    component: AmeSlider,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        color: {
            control: 'select',
            options: ['blue', 'gray', 'red'],
        },
        size: {
            control: 'select',
            options: ['sm', 'xs'],
        },
    },
    // Use `fn` to spy on the onChange arg, which will appear in the actions panel once invoked
    args: {
        onChange: fn('onChange'),
    },
} satisfies Meta<AmeSliderProps>;

export default meta;
type Story = StoryObj<AmeSliderProps>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
    args: {
        name: 'Default Slider',
        min: 0,
        max: 100,
        step: 10,
        tooltip: 'This is a default slider',
        customLabels: ['0', '25', '50', '75', '100'],
        showNumber: true,
        size: 'sm',
        color: 'blue',
    },
};

export const WithCustomLabels: Story = {
    args: {
        name: 'Slider with Custom Labels',
        min: 0,
        max: 20,
        step: 2,
        tooltip: 'Slider with custom labels',
        customLabels: ['Start', 'Quarter', 'Half', 'Three-Quarters', 'End'],
        showNumber: true,
        size: 'sm',
        color: 'gray',
    },
};

export const WithoutNumberInput: Story = {
    args: {
        name: 'Slider without Number Input',
        min: 0,
        max: 50,
        step: 5,
        tooltip: 'Slider without number input field',
        showNumber: false,
        size: 'xs',
        color: 'red',
    },
};