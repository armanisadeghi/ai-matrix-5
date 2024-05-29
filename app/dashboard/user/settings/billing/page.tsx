"use client";

import { useForm } from "@mantine/form";
import { Button, Grid, NumberInput, Paper, rem, Tabs, Textarea, TextInput, Title } from "@mantine/core";
import { IconDeviceFloppy } from "@tabler/icons-react";
import AmeSelect from "@/ui/select/AmeSelect";

function Billing() {
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

    const paymentForm = useForm({
        mode: "uncontrolled",
        initialValues: {
            cardNo: "",
            expires: "",
            cvv: "",
        },

        // functions will be used to validate values at corresponding key
        validate: {
            cardNo: (value) => (value.length < 2 ? "Name must have at least 2 letters" : null),
            expires: (value) => (value.length < 2 ? "Name must have at least 2 letters" : null),
            cvv: (value) => (value.length < 2 ? "Name must have at least 2 letters" : null),
        },
    });

    return (
        <>
            <Paper component="form" onSubmit={billingForm.onSubmit(console.log)} p="md" withBorder mb="md">
                <Title order={5} mb="md">
                    Billing information
                </Title>
                <Grid>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                        <TextInput
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
            <Paper component="form" onSubmit={paymentForm.onSubmit(console.log)} p="md" withBorder mb="md">
                <Title order={5} mb="md">
                    Payment method
                </Title>
                <Grid>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                        <TextInput
                            type="number"
                            label="Card Number"
                            placeholder="card number"
                            key={paymentForm.key("cardNo")}
                            {...paymentForm.getInputProps("cardNo")}
                        />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                        <TextInput
                            type="number"
                            label="Expiration date"
                            placeholder="MM/YY"
                            key={paymentForm.key("expires")}
                            {...paymentForm.getInputProps("expires")}
                        />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                        <TextInput
                            type="number"
                            label="CVV"
                            placeholder="cvv"
                            key={paymentForm.key("cvv")}
                            {...paymentForm.getInputProps("cvv")}
                        />
                    </Grid.Col>
                </Grid>
                <Button
                    type="submit"
                    mt="md"
                    leftSection={<IconDeviceFloppy style={{ height: rem(18), width: rem(18) }} />}
                >
                    Save payment information
                </Button>
            </Paper>
        </>
    );
}

export default Billing;
