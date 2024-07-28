// /chat-app/nice-working/SpecialChatForm.tsx

import React from 'react';
import { useForm } from "@/app/samples/ai-tests/chat-app/components/dynamic-forms/useForm";

interface FormData {
    promptData: Array<{
        role: string;
        message: string;
        formResponses: Array<{ question: string; response: string }>;
        customInputs: Array<any>;
    }>;
    formResponses: Array<{ question: string; response: string }>;
    customInputs: Array<any>;
}

const initialFormData: FormData = {
    promptData: [
        {
            role: 'user',
            message: '',
            formResponses: [
                { question: 'field1', response: '' },
                { question: 'field2', response: '' },
            ],
            customInputs: [],
        }
    ],
    formResponses: [
        { question: 'field1', response: '' },
        { question: 'field2', response: '' },
    ],
    customInputs: [],
};

const SpecialChatForm = () => {
    const { values, handleChange } = useForm(initialFormData);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Submit Special Form:', values);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                name="field1"
                value={values.formResponses.find(fr => fr.question === 'field1')?.response || ''}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
            <input
                name="field2"
                value={values.formResponses.find(fr => fr.question === 'field2')?.response || ''}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
            />
            <button type="submit">Submit</button>
        </form>
    );
};

export default SpecialChatForm;