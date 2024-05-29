"use client";

import { BrokerContext } from "@/context/brokerContext";
import { Component, ComponentType } from "@/types/broker";
import { Container, Button, Space, Select, Center, Title, Paper } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useContext, useState } from "react";
import BrokerList from "./BrokerList";
import { BrokerEdit } from "./BrokerEdit";
import { BrokerForm } from "./BrokerForm";

const Brokers: React.FC = () => {
    const { brokers } = useContext(BrokerContext);
    const [showSelect, setShowSelect] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string>('');
    const [isTypeSelected, setTypeSelected] = useState<boolean>(false);
    const [brokerComponents, setBrokerComponents] = useState<Component[]>([]);

    const handleDelete = (id: string) => {
        brokers.filter((broker) => broker.id !== id)
    };

    const handleEdit = (id: string) => {
    };

    const handleTypeSelection = (value: string) => {
        setSelectedOption(value);
        setTypeSelected(true);
    };

    const componentOptions = Object.keys(ComponentType).map((key) => ({
        value: key,
        label: key,
    })) as { value: string; label: string }[];

    return (
        <Container>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button onClick={() => setShowSelect(!showSelect)} variant="outline" leftSection={<IconPlus />}>
                    Add New Broker
                </Button>
            </div>
            <Space h="md" />
            {showSelect &&
                <>
                    <Select data={componentOptions} value={selectedOption} onChange={(option) => handleTypeSelection(option as ComponentType)} />
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
                    <Center>
                        <Title order={3}>Brokers</Title>
                    </Center>
                </>}
            <BrokerList brokers={brokers} onDelete={handleDelete} onEdit={handleEdit} />
        </Container>
    );
};

export default Brokers;