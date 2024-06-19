'use client'

import { useState } from 'react'
import {
    Textarea,
    Input,
    RadioGroup,
    Button,
    Group,
    Slider,
    CheckboxGroup,
    Select,
    Radio,
    Checkbox
} from '@mantine/core'
import { Form, useForm } from '@mantine/form'

const ChatbotForm = ({
    index,
    respondData,
    setFormAnswers
}: {
    index: number
    respondData: any
    setFormAnswers: Function
}) => {
    const [formValues, setFormValues] = useState<any>({
        ...respondData,
        questions: respondData.questions.map((question: any) => ({ ...question, answer: '' }))
    })

    const form = useForm()
    const handleInputChange = (value: any, question: string) => {
        const questionIndex = formValues.questions.findIndex((q: any) => q.question === question)
        if (questionIndex !== -1) {
            const updatedQuestions = [...formValues.questions]
            if (updatedQuestions[questionIndex].type === 'yes_no') {
                updatedQuestions[questionIndex] = {
                    question,
                    answer: value
                }
            } else if (updatedQuestions[questionIndex].type === 'checkboxes') {
                let answer: string[] = []
                if (typeof updatedQuestions[questionIndex].answer === 'string') {
                    answer = (updatedQuestions[questionIndex].answer as string).split(', ')
                }
                if (answer.includes(value)) {
                    answer = answer.filter((item) => item !== value)
                } else {
                    answer.push(value)
                }
                updatedQuestions[questionIndex] = {
                    question,
                    answer: answer.length > 1 ? answer.join(', ') : answer[0]
                }
            } else {
                updatedQuestions[questionIndex] = {
                    question,
                    answer: value
                }
            }
            setFormValues({
                ...formValues,
                questions: updatedQuestions
            })
        }
    }

    const submitForm = (e: any) => {
        e.preventDefault()
        setFormAnswers(formValues.questions)
        console.log(formValues.questions)
    }

    return (
        <Form onSubmit={submitForm} form={form}>
            {formValues.questions.map((question: any) => {
                const key = question.question

                if (question.type === 'multiple_choice') {
                    return (
                        <Group key={key} mb="md">
                            <Select
                                name={key}
                                data={question.options}
                                onChange={(value) => handleInputChange(value, key)}
                                label={key}
                            />
                        </Group>
                    )
                }

                if (question.type === 'checkboxes') {
                    return (
                        <Group key={key} mb="md">
                            <CheckboxGroup
                                value={question.answer}
                                onChange={(value) => handleInputChange(value, key)}
                            >
                                {question.options.map((option: any) => (
                                    <Checkbox key={option} label={option} value={option} />
                                ))}
                            </CheckboxGroup>
                        </Group>
                    )
                }

                if (question.type === 'yes_no') {
                    return (
                        <Group key={key} mb="md">
                            <RadioGroup
                                name={key}
                                value={question.answer}
                                onChange={(value) => handleInputChange(value, key)}
                            >
                                <Radio label="Yes" value="Yes" />
                                <Radio label="No" value="No" />
                            </RadioGroup>
                        </Group>
                    )
                }

                if (question.type === 'text_area') {
                    return (
                        <Group key={key} mb="md">
                            <Textarea
                                name={key}
                                onChange={(value) => handleInputChange(value, key)}
                                placeholder="Enter your answer"
                                rows={3}
                            />
                        </Group>
                    )
                }
                if (question.type === 'range_selector') {
                    const min = question?.range?.min || 0
                    const max = question?.range?.max || 10
                    const step = question?.step || 1
                    const value = question?.range?.value || 0
                    const label = question?.range?.label || ''

                    return (
                        <Group key={key} mb="md">
                            <Slider
                                name={key}
                                label={label}
                                value={value}
                                min={min}
                                max={max}
                                step={step}
                                onChange={(value: number) => handleInputChange(value, key)}
                            />
                        </Group>
                    )
                }

                if (question.type === 'input') {
                    return (
                        <Group key={key} mb="md">
                            <Input name={key} onChange={(value) => handleInputChange(value, key)} />
                        </Group>
                    )
                }

                return null
            })}

            {formValues.questions.length > 0 && (
                <Group mt="md">
                    <Button type="submit">Answer Without Questions</Button>
                </Group>
            )}
        </Form>
    )
}

export default ChatbotForm
