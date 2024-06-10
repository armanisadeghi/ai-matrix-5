"use client";

import { Component, ComponentType } from "@/types/broker";
import { Container, Button, Space, Select, Paper, Transition, Stack, Flex } from "@mantine/core";
import { IconArrowLeft, IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import BrokerList from "./BrokerList";
import { BrokerForm } from "./BrokerForm";
import { BrokerEdit } from "./BrokerEdit";
import Link from "next/link";
import { createBrokerManager } from "@/services/brokerService";

const Brokers: React.FC = () => {
    const [showSelect, setShowSelect] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string>('');
    const [isTypeSelected, setTypeSelected] = useState<boolean>(false);
    const [currentComponent, setCurrentComponent] = useState<Component>({} as Component);
    const brokerManager = createBrokerManager();
    const handleTypeSelection = (value: string) => {
        setSelectedOption(value);
        setTypeSelected(true);
    };

    const handleNewBroker = () => {
        setShowSelect(true);
        setTypeSelected(false);
        setSelectedOption('');
        brokerManager.setCurrentBroker({
            id: '',
            name: '',
            dataType: '',
            component: {} as Component,
        });
    };

    const componentOptions = Object.keys(ComponentType).map((key) => ({
        value: key,
        label: key,
    })) as { value: string; label: string }[];

    return (
        <Container>
            <Flex justify="space-between">
                <Link href="/dashboard/matrix-engine/custom-brokers/example"><Button
                    variant="light"
                    leftSection={<IconArrowLeft size={14} />}
                >
                    Sample Brokers
                </Button></Link>
            </Flex>
            <Space h="md" />

            <Stack>
                <Transition transition="slide-down" duration={200} mounted={showSelect}>
                    {(styles) => (
                        <Stack style={styles}>
                            <Select label="Type" description="Choose the type of component" placeholder="Choose the type of component" data={componentOptions} value={selectedOption} onChange={(option) => handleTypeSelection(option as ComponentType)} />
                            <Space h="md" />
                            <BrokerEdit />
                            <Space h="md" />

                        </Stack>
                    )}
                </Transition>
                <Transition transition="slide-down" duration={200} mounted>
                    {(styles) => (
                        <Paper withBorder radius="xs" p="xl" style={styles}>
                            <BrokerForm />
                        </Paper>
                    )}
                </Transition>
                <Space h="md" />
            </Stack>
            <BrokerList user={true} />
        </Container>
    );
};

export default Brokers;