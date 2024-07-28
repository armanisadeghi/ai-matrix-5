import AmeButton from "@/ui/buttons/AmeButton";
import AmeActionTextInput from "@/ui/input/AmeActionTextInput";
import AmeTitle from "@/ui/typography/AmeTitle";
import { Grid, Paper } from "@mantine/core";
import { useForm } from "@mantine/form";
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
            <AmeTitle as="card-header" mb="md">
                Payment method
            </AmeTitle>
            <Grid>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <AmeActionTextInput
                        type="number"
                        label="Card Number"
                        placeholder="card number"
                        key={paymentForm.key("cardNo")}
                        {...paymentForm.getInputProps("cardNo")}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <AmeActionTextInput
                        type="number"
                        label="Expiration date"
                        placeholder="MM/YY"
                        key={paymentForm.key("expires")}
                        {...paymentForm.getInputProps("expires")}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <AmeActionTextInput
                        type="number"
                        label="CVV"
                        placeholder="cvv"
                        key={paymentForm.key("cvv")}
                        {...paymentForm.getInputProps("cvv")}
                    />
                </Grid.Col>
            </Grid>
            <AmeButton
                type="submit"
                mt="md"
                leftSection={<IconDeviceFloppy size={18} />}
                title="Save your payment information"
            >
                Save payment information
            </AmeButton>
        </Paper>
    );
}
