"use client";
import { FormProviderProps } from "@mantine/form/lib/FormProvider/FormProvider";
import React, { createContext, useContext, useState } from "react";

// Initial default data setup
const defaultFormData: FormData | any = {
    promptData: [],
    formResponses: [],
    customInputs: [],
};

interface FormContextProps {
    formData: FormData;
    updateFormData: (data: Partial<FormData>) => void;
}

// Creating the FormContext with the correct initial structure
const FormContext = createContext<FormContextProps>({
    formData: defaultFormData,
    updateFormData: () => {}, // Function to update the form data
});

export const FormProvider: React.FC<FormProviderProps<FormData>> = ({ children }) => {
    const [formData, setFormData] = useState<FormData>(defaultFormData);

    // Function to update form data state with new partial data
    const updateFormData = (data: Partial<FormData>) => {
        setFormData((prev) => ({ ...prev, ...data }));
    };

    return <FormContext.Provider value={{ formData, updateFormData }}>{children}</FormContext.Provider>;
};

// Hook to use form data AiContext in nice-working
export const useForm = () => useContext(FormContext);
