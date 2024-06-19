// chat-app/hooks/useForm.ts

import { useState } from 'react'
import { FormData, FormResponse, CustomInput } from '@/types/chat'

export const useForm = (initialValues: FormData) => {
    const [values, setValues] = useState<FormData>(initialValues)

    const handleChange = (question: string, response: string) => {
        setValues((prev: FormData) => {
            const updatedResponses = prev.formResponses.map((formResponse) =>
                formResponse.question === question ? { ...formResponse, response } : formResponse
            )
            return { ...prev, formResponses: updatedResponses }
        })
    }

    const updateCustomInputs = (name: string, value: string) => {
        setValues((prev: FormData) => {
            const updatedCustomInputs = prev.customInputs.map((input) =>
                input.name === name ? { ...input, value } : input
            )
            return { ...prev, customInputs: updatedCustomInputs }
        })
    }

    return {
        values,
        handleChange,
        updateCustomInputs
    }
}
