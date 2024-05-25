import { Button, Flex, Grid, Paper, Radio, rem, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconDeviceDesktop, IconDeviceFloppy, IconMoon, IconSun } from "@tabler/icons-react";
import AmeSelect from "@/ui/select/AmeSelect";
import { useState } from "react";
import AmeRadioCard from "@/ui/radio/AmeRadioCard";

const data = [
    {
        name: "Light mode",
        icon: IconSun,
    },
    {
        name: "Dark mode",
        icon: IconMoon,
    },
    {
        name: "System default",
        icon: IconDeviceDesktop,
    },
];

function Preferences() {
    const [colorMode, setColorMode] = useState<string | null>(null);
    const locationForm = useForm({
        mode: "uncontrolled",
        initialValues: { location: "", timezone: "" },

        // functions will be used to validate values at corresponding key
        validate: {
            location: (value) => (value.length < 2 ? "Name must have at least 2 letters" : null),
            timezone: (value) => (value.length < 2 ? "Name must have at least 2 letters" : null),
        },
    });

    const cards = data.map((item) => <AmeRadioCard value={item.name} key={item.name} {...item} />);

    return (
        <>
            <Paper component="form" onSubmit={locationForm.onSubmit(console.log)} p="md" withBorder mb="md">
                <Title order={5} mb="md">
                    Location info
                </Title>
                <Grid>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                        <TextInput
                            label="Location"
                            placeholder="location"
                            key={locationForm.key("location")}
                            {...locationForm.getInputProps("location")}
                        />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                        <AmeSelect
                            label="Time zone"
                            placeholder="Time zone"
                            data={[]}
                            key={locationForm.key("timezone")}
                            {...locationForm.getInputProps("timezone")}
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
            <Paper component="form" onSubmit={locationForm.onSubmit(console.log)} p="md" withBorder mb="md">
                <Title order={5} mb="md">
                    Color Mode
                </Title>
                <Radio.Group
                    value={colorMode}
                    onChange={setColorMode}
                    label="Choose if app's appearance should be light or dark, or follow your computer's settings."
                >
                    <Flex gap="xs" mt="md">
                        {cards}
                    </Flex>
                </Radio.Group>
                <Button
                    type="submit"
                    mt="md"
                    leftSection={<IconDeviceFloppy style={{ height: rem(18), width: rem(18) }} />}
                >
                    Save changes
                </Button>
            </Paper>
        </>
    );
}

export default Preferences;
