// nice-working/FormStepper.tsx

'use client'

import React from 'react'
import { Stepper, Button, Group } from '@mantine/core'

interface Step {
    label: string
    description: string
    content: React.ReactNode
}

interface FormStepperProps {
    steps: Step[]
    onFormSubmit: () => void
}

const FormStepper: React.FC<FormStepperProps> = ({ steps, onFormSubmit }) => {
    const [activeStep, setActiveStep] = React.useState(0)

    const handleNext = () => {
        if (activeStep < steps.length - 1) {
            setActiveStep(activeStep + 1)
        } else {
            onFormSubmit()
        }
    }

    const handleBack = () => {
        if (activeStep > 0) setActiveStep(activeStep - 1)
    }

    return (
        <>
            <Stepper active={activeStep}>
                {steps.map((step, index) => (
                    <Stepper.Step key={index} label={step.label} description={step.description}>
                        {step.content}
                    </Stepper.Step>
                ))}
            </Stepper>
            <Group justify="flex-end" mt="xl">
                {activeStep !== 0 && <Button onClick={handleBack}>Back</Button>}
                <Button onClick={handleNext}>
                    {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                </Button>
            </Group>
        </>
    )
}

export default FormStepper
