"use client";

import { Component, ComponentType } from "@/types/broker";
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
    const { currentBroker, setCurrentBroker } = useBroker();
    const [currentComponent, setCurrentComponent] = useState<Component>({
        componentId: '',
        type: '',
        label: 'new label',
        tooltip: 'new tooltip',
        description: 'description',
        maxLength: 200,
        placeholderText: 'placeholder',
        defaultValue: undefined,
        displayOrder: undefined,
        validation: '',
        dependencies: [],
        required: false,
        options: [],
        groupOptions: [],
        size: 'md',
        color: '',
        exampleInputs: [],
        group: '',
        min: 1,
        max: 10,
        step: 1,
        value: '',
        onChange: () => { },
        tableData: undefined,
        src: '',
        alt: '',
        radius: 'md',
        h: 'auto',
        w: 'auto',
        fit: 'fill',
        marks: [],
    } as Component);
    const handleTypeSelection = (value: string) => {
        setSelectedOption(value);
        setTypeSelected(true);
    };

    const handleNewBroker = () => {
        setShowSelect(true);
        setTypeSelected(false);
        setSelectedOption('');
        setCurrentBroker({
            id: '',
            name: '',
            dataType: [],
            components: [],
        });
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

            <Stack>
                {showSelect &&
                    <Transition transition="slide-down" duration={200} mounted={showSelect}>
                        {(styles) => (
                            <Stack style={styles}>
                                <Select label="Type" description="Choose the type of component" placeholder="Choose the type of component" data={componentOptions} value={selectedOption} onChange={(option) => handleTypeSelection(option as ComponentType)} />
                                <Space h="md" />
                                <Transition transition="slide-down" duration={200} mounted={isTypeSelected}>
                                    {(styles) => (
                                        <div style={styles}>
                                            {isTypeSelected && <BrokerEdit type={selectedOption} setCurrentComponent={setCurrentComponent} currentComponent={currentComponent} />}
                                        </div>)}
                                </Transition>
                                <Space h="md" />

                            </Stack>
                        )}
                    </Transition>}
                {currentBroker.components.length > 0 &&
                    <Transition transition="slide-down" duration={200} mounted={currentBroker.components.length > 0}>
                        {(styles) => (
                            <Paper withBorder radius="xs" p="xl" style={styles}>
                                <BrokerForm />
                            </Paper>
                        )}
                    </Transition>}
                <Space h="md" />
            </Stack>
            <BrokerList />

        </Container>
    );
};

export default Brokers;