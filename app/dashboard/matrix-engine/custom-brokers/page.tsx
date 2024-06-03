"use client";

import { ComponentType } from "@/types/broker";
import { Container, Button, Space, Select, Paper, Transition, Stack } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import BrokerList from "./BrokerList";
import { BrokerForm } from "./BrokerForm";
import { useBroker } from "@/context/brokerContext";
import { BrokerEdit } from "./BrokerEdit";

const Brokers: React.FC = () => {
    const [showSelect, setShowSelect] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string>('');
    const [isTypeSelected, setTypeSelected] = useState<boolean>(false);
    const [isEditingId, setEditingId] = useState('');
    const { brokers, currentBroker } = useBroker();

    const handleTypeSelection = (value: string) => {
        setSelectedOption(value);
        setTypeSelected(true);
    };

    const handleNewBroker = () => {
        setShowSelect(true);
        setTypeSelected(false);
        setSelectedOption('');
        setEditingId('');
    };

    const componentOptions = Object.keys(ComponentType).map((key) => ({
        value: key,
        label: key,
    })) as { value: string; label: string }[];

    return (
        <Container>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button onClick={() => handleNewBroker()} variant="outline" leftSection={<IconPlus />}>
                    Add New Broker
                </Button>
            </div>
            <Space h="md" />
            <Transition transition="slide-down" duration={200} mounted={showSelect}>
                {(styles) => (
                    <Stack style={styles}>
                        {showSelect &&
                            <Stack>
                                <Select label="Type" description="Choose the type of component" placeholder="Choose the type of component" data={componentOptions} value={selectedOption} onChange={(option) => handleTypeSelection(option as ComponentType)} />
                                <Space h="md" />
                                <Transition transition="slide-down" duration={200} mounted={isTypeSelected}>
                                    {(styles) => (
                                        <div style={styles}>
                                            {isTypeSelected && <BrokerEdit type={selectedOption} />}
                                        </div>)}
                                </Transition>
                                <Space h="md" />
                                {currentBroker &&
                                    <Transition transition="slide-down" duration={200} mounted={showSelect}>
                                        {(styles) => (
                                            <Paper withBorder radius="xs" p="xl" style={styles}>
                                                <BrokerForm setEditingId={setEditingId} />
                                            </Paper>
                                        )}
                                    </Transition>}
                                <Space h="md" />
                            </Stack>}
                    </Stack>
                )}
            </Transition>

            <Transition transition="slide-down" duration={200} mounted={brokers.length > 0}>
                {(styles) => (
                    <div style={styles}>
                        <BrokerList isEditingId={isEditingId} />
                    </div>
                )}
            </Transition>

        </Container>
    );
};

export default Brokers;