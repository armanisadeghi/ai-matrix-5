"use client";

import { Component, ComponentType } from "@/types/broker";
import { Container, Button, Space, Select, Center, Title, Paper } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import BrokerList from "./BrokerList";
import { BrokerEdit } from "./BrokerEdit";
import { BrokerForm } from "./BrokerForm";
import { useAtom } from "jotai";
import { useBroker } from "@/context/brokerContext";
import { Broker } from '../../../types/broker';

const Brokers: React.FC = () => {
    const [showSelect, setShowSelect] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string>('');
    const [isTypeSelected, setTypeSelected] = useState<boolean>(false);
    const [brokerComponents, setBrokerComponents] = useState<Component[]>([]);

    const { brokers, setBrokers } = useBroker();

    const handleDelete = (id: string) => {
        setBrokers((prevBrokers: Broker[]) => prevBrokers.filter((broker) => broker.id !== id));
    };

    const handleEdit = (id: string) => {
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
            {showSelect &&
                <>
                    <Select label="Type" description="Choose the type of component" placeholder="Choose the type of component" data={componentOptions} value={selectedOption} onChange={(option) => handleTypeSelection(option as ComponentType)} />
                    <Space h="md" />
                    {isTypeSelected && <BrokerEdit type={selectedOption} setBrokerComponents={setBrokerComponents} />}
                    <Space h="md" />
                    <Center>
                        <Title order={3}>Broker</Title>
                    </Center>
                    <Paper withBorder radius="xs" p="xl">
                        <BrokerForm components={brokerComponents} />
                    </Paper>
                    <Space h="md" />
                </>}
            <BrokerList brokers={brokers} onDelete={handleDelete} onEdit={handleEdit} />
        </Container>
    );
};

export default Brokers;