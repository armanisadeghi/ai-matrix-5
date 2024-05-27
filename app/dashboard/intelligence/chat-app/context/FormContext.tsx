'use client';
import React, { createContext, useContext, useState } from 'react';
import { FormData, FormContextProps, FormProviderProps } from '@/types/chat';

// Initial default data setup
const defaultFormData: FormData = {
    promptData: [],
    formResponses: [],
    customInputs: []
};

// Creating the FormContext with the correct initial structure
const FormContext = createContext<FormContextProps>({
    formData: defaultFormData,
    updateFormData: () => {}  // Function to update the form data
});

export const FormProvider: React.FC<FormProviderProps> = ({ children }) => {
    const [formData, setFormData] = useState<FormData>(defaultFormData);

    // Function to update form data state with new partial data
    const updateFormData = (data: Partial<FormData>) => {
        setFormData(prev => ({ ...prev, ...data }));
    };

    return (
        <FormContext.Provider value={{ formData, updateFormData }}>
            {children}
        </FormContext.Provider>
    );
};

// Hook to use form data context in components
export const useForm = () => useContext(FormContext);
