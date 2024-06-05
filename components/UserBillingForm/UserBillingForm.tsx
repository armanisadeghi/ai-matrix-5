import React from "react";
import { Button, Grid, NumberInput, Paper, PaperProps, rem, Textarea, TextInput, Title } from "@mantine/core";
import AmeSelect from "@/ui/select/AmeSelect";
import { IconDeviceFloppy } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import AmeTitle from "@/ui/typography/AmeTitle";
import AmeActionTextInput from "@/ui/input/AmeActionTextInput";

interface UserBillingFormProps extends PaperProps {}

export function UserBillingForm({ ...others }: UserBillingFormProps) {
    const billingForm = useForm({
        mode: "uncontrolled",
        initialValues: {
            firstName: "",
            lastName: "",
            address1: "",
            address2: "",
            city: "",
            country: "",
            state: "",
            zip: null,
        },

        // functions will be used to validate values at corresponding key
        validate: {
            firstName: (value) => (value.length < 2 ? "Name must have at least 2 letters" : null),
            lastName: (value) => (value.length < 2 ? "Name must have at least 2 letters" : null),
            address1: (value) => (value.length < 2 ? "Name must have at least 2 letters" : null),
            city: (value) => (value.length < 2 ? "Name must have at least 2 letters" : null),
            country: (value) => (value.length < 2 ? "Name must have at least 2 letters" : null),
            state: (value) => (value.length < 2 ? "Name must have at least 2 letters" : null),
        },
    });

    return (
        <Paper component="form" onSubmit={billingForm.onSubmit(console.log)} p="md" withBorder {...others}>
            <AmeTitle as="card-header" mb="md">
                Billing information
            </AmeTitle>
            <Grid>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <AmeActionTextInput
                        label="First name"
                        placeholder="first name"
                        key={billingForm.key("firstName")}
                        {...billingForm.getInputProps("firstName")}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <TextInput
                        label="Last name"
                        placeholder="last name"
                        key={billingForm.key("lastName")}
                        {...billingForm.getInputProps("lastName")}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <Textarea
                        label="Address 1"
                        placeholder="address"
                        key={billingForm.key("address1")}
                        {...billingForm.getInputProps("address1")}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <Textarea
                        label="Address 2"
                        placeholder="address"
                        key={billingForm.key("address2")}
                        {...billingForm.getInputProps("address2")}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <TextInput
                        label="City"
                        placeholder="city"
                        key={billingForm.key("city")}
                        {...billingForm.getInputProps("city")}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <AmeSelect
                        label="Country"
                        placeholder="country"
                        data={[]}
                        key={billingForm.key("country")}
                        {...billingForm.getInputProps("country")}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <TextInput
                        label="State"
                        placeholder="state"
                        key={billingForm.key("state")}
                        {...billingForm.getInputProps("state")}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <NumberInput
                        label="Zip"
                        placeholder="zip code"
                        key={billingForm.key("zip")}
                        {...billingForm.getInputProps("zip")}
                    />
                </Grid.Col>
            </Grid>
            <Button
                type="submit"
                mt="md"
                leftSection={<IconDeviceFloppy style={{ height: rem(18), width: rem(18) }} />}
            >
                Save changes
            </Button>
        </Paper>
    );
}

export default UserBillingForm;
