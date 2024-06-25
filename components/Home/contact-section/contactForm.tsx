import { Box, Title, Text, Container, TextInput, Button, Fieldset, Dialog, Anchor } from "@mantine/core";
import { ChangeEvent, FormEvent, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { useScrollAnimation } from "@/hooks/annimation/useScrollAnimation";

import "@mantine/carousel/styles.css";
import classes from "./contactForm.module.css";

interface FormData {
    firstName: string;
    lastName: string;
    companyName: string;
    email: string;
    country: string;
}

export function ContactForm() {
    const elementsRef = useScrollAnimation(250);
    const elementsRef2 = useScrollAnimation(500);
    const elementsRef3 = useScrollAnimation(750);

    const [opened, { toggle }] = useDisclosure();
    const [formData, setFormData] = useState<FormData>({
        firstName: "",
        lastName: "",
        companyName: "",
        email: "",
        country: "",
    });
    const [errors, setErrors] = useState<Partial<FormData>>({});
    const [touched, setTouched] = useState<Partial<FormData>>({});
    const [showSuccess, setShowSuccess] = useState(false);

    const handleBlur = (name: keyof FormData) => {
        setTouched((prevTouched) => ({
            ...prevTouched,
            [name]: true,
        }));
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        // Clear error for the field being updated
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "", // Clear error for the field being updated
        }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Validate form fields
        const formErrors: Partial<FormData> = {};
        Object.keys(formData).forEach((key) => {
            if (!formData[key as keyof FormData]) {
                // Use keyof FormData to ensure key is valid
                formErrors[key as keyof FormData] = "PLEASE COMPLETE THIS REQUIRED FIELD."; // Use keyof FormData to ensure key is valid
            }
        });
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        console.log("Form submitted:", formData);

        setFormData({
            firstName: "",
            lastName: "",
            companyName: "",
            email: "",
            country: "",
        });

        setShowSuccess(true);
        toggle();
        setTimeout(() => {
            setShowSuccess(false);
            toggle();
        }, 5000);
    };
    return (
        <>
            <section className={classes.sectionTitle}>
                <Container className={classes.myContainer}>
                    {/* <div className={classes.row}>
                        <div className={classes.columnContent}> */}
                    <Box className={classes.titleBox}>
                        <Text
                            className={`${classes.text} animate-on-scroll`}
                            ref={(el: HTMLDivElement | null) => elementsRef.current.push(el)}
                        >
                            Interested?
                        </Text>
                        <div
                            className={`animate-on-scroll`}
                            ref={(el: HTMLDivElement | null) => elementsRef2.current.push(el)}
                        >
                            <Title className={classes.title} order={2} pb="0.4445em">
                                Book your demo today
                            </Title>
                            <div className={classes.borderLine}></div>
                        </div>
                    </Box>
                    <div
                        className={`${classes.formWrapper} animate-on-scroll`}
                        ref={(el: HTMLDivElement | null) => elementsRef3.current.push(el)}
                    >
                        <form onSubmit={handleSubmit} className={classes.contactForm}>
                            <Fieldset variant="unstyled" className={classes.columnTwo}>
                                <TextInput
                                    label="First name"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    onBlur={() => handleBlur("firstName")}
                                    required
                                    error={
                                        touched.firstName && !formData.firstName
                                            ? "PLEASE COMPLETE THIS REQUIRED FIELD."
                                            : undefined
                                    }
                                    className={classes.formField}
                                    classNames={{ input: classes.inputText, error: classes.inputError }}
                                />
                                <TextInput
                                    label="Last name"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    onBlur={() => handleBlur("lastName")}
                                    required
                                    error={
                                        touched.lastName && !formData.lastName
                                            ? "PLEASE COMPLETE THIS REQUIRED FIELD."
                                            : undefined
                                    }
                                    className={classes.formField}
                                    classNames={{ input: classes.inputText, error: classes.inputError }}
                                />
                            </Fieldset>
                            <Fieldset variant="unstyled" className={classes.columnTwo}>
                                <TextInput
                                    label="Company name"
                                    name="companyName"
                                    value={formData.companyName}
                                    onChange={handleChange}
                                    className={classes.formField}
                                    classNames={{ input: classes.inputText, error: classes.inputError }}
                                />
                                <TextInput
                                    label="Business Email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    onBlur={() => handleBlur("email")}
                                    required
                                    error={
                                        touched.email && !formData.email
                                            ? "PLEASE COMPLETE THIS REQUIRED FIELD."
                                            : undefined
                                    }
                                    className={classes.formField}
                                    classNames={{ input: classes.inputText, error: classes.inputError }}
                                />
                            </Fieldset>
                            <Fieldset variant="unstyled" className={classes.columnFirst}>
                                <TextInput
                                    label="Country/Region"
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                    className={classes.formField}
                                    classNames={{ input: classes.inputText }}
                                />
                            </Fieldset>
                            <Fieldset className={classes.columnFirst}></Fieldset>
                            <Fieldset className={classes.columnFirst}></Fieldset>
                            <Fieldset className={classes.columnFirst}></Fieldset>
                            <Fieldset className={classes.columnFirst}></Fieldset>
                            <Fieldset className={classes.columnFirst}></Fieldset>
                            <Fieldset variant="unstyled" className={classes.columnFirst}>
                                <Text className={classes.textConsent}>
                                    We will use your details to book your demo and keep you up to date with AutogenAI
                                    services. For more details, please see our{" "}
                                    <Anchor href="#" rel="noopener">
                                        Privacy Notice
                                    </Anchor>
                                </Text>
                            </Fieldset>

                            {/* <TextInput label="Name" value={value} onChange={(event) => setValue(event.currentTarget.value)} required />
                                    <TextInput label="Email" type="email" required />
                                    <Textarea label="Message" required /> */}
                            <div className={classes.btnWrapper}>
                                <Button type="submit" size="xl" className={classes.submitBtn}>
                                    Submit
                                </Button>
                            </div>

                            {showSuccess && (
                                <Dialog opened={opened} onClose={toggle} size="lg" radius="md">
                                    <Text size="md" mb="xs" color="green">
                                        Form submitted successfully!
                                    </Text>
                                </Dialog>
                            )}
                        </form>
                    </div>
                    {/* </div>
                    </div> */}
                </Container>
            </section>
        </>
    );
}
