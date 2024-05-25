// app/components/AiChat/ResponseForm/AiResponseForm.tsx
"use client"

import { useState } from "react";
import { Button, Group } from '@mantine/core';
import { Form, useForm } from '@mantine/form';
import {
    SelectInput,
    CheckboxGroupInput,
    RadioGroupInput,
    TextAreaInput,
    SliderInput,
    TextInput
} from './AiFormElements';

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

type RespondData = {
    questions: Question[];
};

type AiResponseFormProps = {
    index: number;
    respondData: RespondData;
    setFormAnswers: Function;
};

const updateFormValues = (formValues: any, question: string, answer: any) => {
    const questionIndex = formValues.questions.findIndex((q: Question) => q.question === question);
    const updatedQuestions = [...formValues.questions];
    if (questionIndex !== -1) {
        updatedQuestions[questionIndex] = {
            ...updatedQuestions[questionIndex],
            answer
        };
    }
    return {
        ...formValues,
        questions: updatedQuestions
    };
};

const AiResponseForm = ({
                            index,
                            respondData,
                            setFormAnswers
                        }: AiResponseFormProps) => {
    const [formValues, setFormValues] = useState<RespondData>(
        {
            ...respondData,
            questions: respondData.questions.map(question => ({
                ...question,
                answer: ''
            }))
        });
    const form = useForm();

    const handleInputChange = (value: any, question: string) => {
        const updatedValues = updateFormValues(formValues, question, value);
        setFormValues(updatedValues);
    };

    const submitForm = (e: any) => {
        e.preventDefault();
        setFormAnswers(formValues.questions);
    };

    return (
        <Form onSubmit={submitForm} form={form}>
            {formValues.questions.map((question: Question) => {
                const InputComponent = {
                    'multiple_choice': SelectInput,
                    'checkboxes': CheckboxGroupInput,
                    'yes_no': RadioGroupInput,
                    'text_area': TextAreaInput,
                    'range_selector': SliderInput,
                    'input': TextInput,
                }[question.type];

                return InputComponent ? <InputComponent key={question.question} question={question}
                                                        handleInputChange={handleInputChange}/> : null;
            })}

            {formValues.questions.length > 0 && (
                <Group mt="md">
                    <Button type="submit">Submit Answers</Button>
                </Group>
            )}
        </Form>
    );
};

export default AiResponseForm;
