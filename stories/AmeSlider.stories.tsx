import React from 'react';
import { Meta, Story } from '@storybook/react';
import AmeSlider, { AmeSliderProps } from './AmeSlider';

export default {
    title: 'Components/AmeSlider',
    component: AmeSlider,
    argTypes: {
        color: {
            control: {
                type: 'select',
                options: ['blue', 'gray', 'red']
            }
        },
        size: {
            control: {
                type: 'select',
                options: ['sm', 'xs']
            }
        }
    },
} as Meta;

const Template: Story<AmeSliderProps> = (args) => <AmeSlider {...args} />;

export const Default = Template.bind({});
Default.args = {
    name: 'Default Slider',
    min: 0,
    max: 100,
    step: 10,
    tooltip: 'This is a default slider',
    customLabels: ['0', '25', '50', '75', '100'],
    showNumber: true,
    size: 'sm',
    color: 'blue',
};

export const WithCustomLabels = Template.bind({});
WithCustomLabels.args = {
    name: 'Slider with Custom Labels',
    min: 0,
    max: 20,
    step: 2,
    tooltip: 'Slider with custom labels',
    customLabels: ['Start', 'Quarter', 'Half', 'Three-Quarters', 'End'],
    showNumber: true,
    size: 'sm',
    color: 'gray',
};

export const WithoutNumberInput = Template.bind({});
WithoutNumberInput.args = {
    name: 'Slider without Number Input',
    min: 0,
    max: 50,
    step: 5,
    tooltip: 'Slider without number input field',
    showNumber: false,
    size: 'xs',
    color: 'red',
};
