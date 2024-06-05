// app/dashboard/intelligence/chat-app/components/dynamic-inputs/AiFormElements.tsx

import { Checkbox, CheckboxGroup, Group, Input, Radio, RadioGroup, Select, Slider, Textarea } from "@mantine/core";

type Question = {
    question: string;
    type: string;
    answer: string | number | string[];
    options?: string[];
    range?: {
        min?: number;
        max?: number;
        value?: number;
        label?: string;
    };
    step?: number;
};

export const SelectInput = (
    {
        question,
        handleInputChange
    }: { question: Question, handleInputChange: Function }) => (
    <Group mb="md">
        <Select
            name={question.question}
            data={question.options!}
            onChange={(value) => handleInputChange(value, question.question)}
            label={question.question}
        />
    </Group>
);

export const CheckboxGroupInput = (
    {
        question,
        handleInputChange
    }: { question: Question, handleInputChange: Function }) => (
    <Group mb="md">
        <CheckboxGroup value={question.answer as string[]}
                       onChange={(value) => handleInputChange(value, question.question)}>
            {question.options!.map((option: string) => (
                <Checkbox key={option} label={option} value={option}/>
            ))}
        </CheckboxGroup>
    </Group>
);

export const RadioGroupInput = (
    {
        question,
        handleInputChange
    }: { question: Question, handleInputChange: Function }) => (
    <Group mb="md">
        <RadioGroup name={question.question} value={question.answer as string}
                    onChange={(value) => handleInputChange(value, question.question)}>
            <Radio label="Yes" value="Yes"/>
            <Radio label="No" value="No"/>
        </RadioGroup>
    </Group>
);

export const TextAreaInput = (
    {
        question,
        handleInputChange
    }: { question: Question, handleInputChange: Function }) => (
    <Group mb="md">
        <Textarea name={question.question} onChange={(value) => handleInputChange(value, question.question)}
                  placeholder="Enter your answer" rows={3}/>
    </Group>
);

export const SliderInput = (
    {
        question,
        handleInputChange
    }: { question: Question, handleInputChange: Function }) => (
    <Group mb="md">
        <Slider
            name={question.question}
            label={question.range?.label || ''}
            value={question.answer as number}
            min={question.range?.min || 0}
            max={question.range?.max || 10}
            step={question.step || 1}
            onChange={(value: number) => handleInputChange(value, question.question)}
        />
    </Group>
);

export const TextInput = (
    {
        question,
        handleInputChange
    }: { question: Question, handleInputChange: Function }) => (
    <Group mb="md">
        <Input name={question.question} onChange={(value) => handleInputChange(value, question.question)}/>
    </Group>
);
