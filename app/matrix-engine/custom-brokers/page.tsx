"use client";

import { Component, ComponentType, Broker } from "@/types/broker";
import { Container, Button, Space, Select, Center, Title, Paper, Transition, Stack } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import BrokerList from "./BrokerList";
import { BrokerEdit } from "./BrokerEdit";
import { BrokerForm } from "./BrokerForm";
import { useAtom } from "jotai";
import { useBroker } from "@/context/brokerContext";

const Brokers: React.FC = () => {
    const [showSelect, setShowSelect] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string>('');
    const [isTypeSelected, setTypeSelected] = useState<boolean>(false);
    const [brokerComponents, setBrokerComponents] = useState<Component[]>([]);
    const [brokerId, setBrokerId] = useState<string>('');
    const [isEditingId, setEditingId] = useState('');


    const { brokers, setBrokers } = useBroker();

    const handleDelete = (id: string) => {
        setBrokers((prevBrokers: Broker[]) => prevBrokers.filter((broker) => broker.id !== id));
    };

    const handleEdit = (id: string) => {
        const selectedBroker = brokers.find((broker) => broker.id === id);
        if (selectedBroker) {
            setBrokerComponents(selectedBroker.components);
            setShowSelect(true);
            setTypeSelected(false);
            setBrokerId(id);
            setEditingId(id);
        }
    };

    const handleTypeSelection = (value: string) => {
        setSelectedOption(value);
        setTypeSelected(true);
    };

    const handleNewBroker = () => {
        setShowSelect(true);
        setTypeSelected(false);
        setSelectedOption('');
        setBrokerComponents([]);
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
                                            {isTypeSelected && <BrokerEdit type={selectedOption} setBrokerComponents={setBrokerComponents} />}
                                        </div>)}
                                </Transition>

                                <Space h="md" />
                                <Center>
                                    <Title order={3}>Broker</Title>
                                </Center>

                                <Transition transition="slide-down" duration={200} mounted={showSelect}>
                                    {(styles) => (
                                        <Paper withBorder radius="xs" p="xl" style={styles}>
                                            <BrokerForm components={brokerComponents} setBrokerComponents={setBrokerComponents} id={brokerId} setEditingId={setEditingId} /> </Paper>
                                    )}
                                </Transition>
                                <Space h="md" />
                            </Stack>}
                    </Stack>
                )}
            </Transition>

            <Transition transition="slide-down" duration={200} mounted={brokers.length > 0}>
                {(styles) => (
                    <div style={styles}>
                        <BrokerList brokers={brokers} onDelete={handleDelete} onEdit={handleEdit} isEditingId={isEditingId} />
                    </div>
                )}
            </Transition>

        </Container>
    );
};

export default Brokers;