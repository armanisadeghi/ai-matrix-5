"use client";

import { BrokerContext } from "@/context/brokerContext";
import { ComponentType } from "@/types/broker";
import { Container, Button, Space, Select, Center, Title, Paper } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useContext, useState } from "react";
import BrokerList from "./BrokerList";
import { BrokerEdit } from "./BrokerEdit";

const Brokers: React.FC = () => {
    const { brokers } = useContext(BrokerContext);
    const [showSelect, setShowSelect] = useState(false);
    const [selectedOption, setSelectedOption] = useState<ComponentType>(ComponentType.Input);
    const handleDelete = (id: string) => {
        brokers.filter((broker) => broker.id !== id)
    };

    const handleEdit = (id: string) => {
    };

    const componentOptions = Object.keys(ComponentType).map((key) => ({
        value: key,
        label: key,
    })) as { value: string; label: ComponentType }[];

    return (
        <Container>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button onClick={() => setShowSelect(!showSelect)} variant="outline" leftSection={<IconPlus />}>
                    Add New Broker
                </Button>
            </div>
            <Space h="md" />
            {showSelect && <Select data={componentOptions} value={selectedOption} onChange={(option) => setSelectedOption(option as ComponentType)} />}
            <Space h="md" />
            {selectedOption && <><BrokerEdit type={selectedOption || ''} />
                <Space h="md" />
                <Center>
                    <Title order={3}>My Broker</Title>
                </Center>
                <Paper withBorder radius="xs" p="xl"></Paper>
                <Space h="md" />
                <Center>
                    <Title order={3}>My Brokers</Title>
                </Center></>}
            <BrokerList brokers={brokers} onDelete={handleDelete} onEdit={handleEdit} />
        </Container>
    );
};

export default Brokers;