import { atom } from 'jotai';
import { FormData } from '@/types/chat';

// Initial default data setup
const defaultFormData: FormData = {
    promptData: [],
    formResponses: [],
    customInputs: []
};

// Define atoms
export const formDataAtom = atom<FormData>(defaultFormData);
export const updateFormDataAtom = atom(
    null,
    (get, set, newData: Partial<FormData>) => {
        const currentFormData = get(formDataAtom);
        set(formDataAtom, { ...currentFormData, ...newData });
    }
);
