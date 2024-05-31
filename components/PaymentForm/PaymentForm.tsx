import { useForm } from "@mantine/form";
import { Button, Grid, NumberInput, Paper, rem, Textarea, TextInput, Title } from "@mantine/core";
import AmeSelect from "@/ui/select/AmeSelect";
import { IconDeviceFloppy } from "@tabler/icons-react";

export function PaymentForm() {
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
        <Paper component="form" onSubmit={paymentForm.onSubmit(console.log)} p="md" withBorder>
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
    );
}
