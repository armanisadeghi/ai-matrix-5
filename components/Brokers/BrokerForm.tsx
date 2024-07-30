"use client";

import {
    brokerByIdSelector,
    brokersAtom,
    componentAtom,
    componentSelector,
    componentsAtom,
    selectedBroker,
} from "@/context/atoms/brokerAtoms";
import { createBrokerManager } from "@/services/brokerService";
import { activeUserAtom } from "@/state/userAtoms";
import { Broker, Component, ComponentType, ComponentTypeInfo } from "@/types/broker";
import {
    Button,
    Combobox,
    Fieldset,
    Grid,
    Group,
    Input,
    InputBase,
    Select,
    Space,
    Text,
    TextInput,
    Textarea,
    useCombobox
} from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import BrokerComponent from "./BrokerComponent";

interface Item {
    value: string;
    label: string;
    description: string;
}

const dataTypeOptions: Item[] = [
    {
        value: "str",
        label: "Text",
        description: "Simple words, sentences and paragraphs of any type of text (Very Flexible).",
    },
    { value: "int", label: "Whole Number", description: "Numbers without decimals, like 1, 2, 3." },
    { value: "float", label: "Number with decimals", description: "Numbers with fractions, like 1.5, 2.75." },
    { value: "bool", label: "Yes/No", description: "A simple choice between Yes or No." },
    {
        value: "json",
        label: "Dictionary/JSON",
        description:
            "Structured data with keys and values, like an address book where each contact has a name, address, and phone number.",
    },
    {
        value: "list",
        label: "Comma Separated List or Array",
        description: "A collection of items, like a shopping list separated by commas.",
    },
    { value: "url", label: "URL Link", description: "A web address, like https://example.com." },
];

interface BrokerFormProps {
    id: string;
    newBroker?: boolean;
}

export const BrokerForm = ({ id, newBroker }: BrokerFormProps) => {
    const brokerManager = createBrokerManager();
    const [brokers, setBrokers] = useRecoilState(brokersAtom);
    const [components, setComponents] = useRecoilState(componentsAtom);
    const currentBroker = useRecoilValue(brokerByIdSelector(id));
    const selectedComponent = useRecoilValue(componentSelector(id));
    const [currentComponent, setCurrentComponent] = useRecoilState(componentAtom);
    const [currentData, setCurrentData] = useRecoilState(selectedBroker);
    const [componentOptions, setComponentOptions] = useState(
        Object.entries(ComponentType).map(([key, value]) => ({
            value: key,
            label: value.label,
        })),
    );
    const activeUser = useRecoilValue(activeUserAtom);

    useEffect(() => {
        if (!currentBroker) {
            const newBroker: Broker = {
                id: id,
                displayName: "",
                officialName: "",
                description: "",
                componentType: "Input",
                dataType: "str",
                tooltip: "",
                userId: "",
                matrixId: activeUser.matrixId || "",
                validationRules: "{}",
            };

            setCurrentData(newBroker);
            setCurrentComponent({ id: id, type: "Input", label: "", description: "", tooltip: "" });
            setBrokers(() => [...brokers, newBroker]);
            setComponents(() => [
                ...components,
                { id: id, type: "Input", label: "Add a name", description: "", tooltip: "" },
            ]);
            return () => {
                setBrokers((prev: Broker[]) => prev.filter((broker) => broker.id !== newBroker.id));
                setComponents((prev: Component[]) => prev.filter((component: any) => component?.id !== newBroker.id));
            };
        } else {
            if (selectedComponent) {
                setCurrentComponent(selectedComponent);
            }
            setCurrentData(currentBroker);
        }
    }, []);

    function SelectOption({ value, label, description }: Item) {
        return (
            <Group>
                <div>
                    <Text fz="sm" fw={500}>
                        {label}
                    </Text>
                    <Text fz="xs" opacity={0.6}>
                        {description}
                    </Text>
                </div>
            </Group>
        );
    }

    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    });

    const handleEditBroker = () => {
        try {
            const broker = {
                ...currentData,
                displayName: currentData?.displayName,
                description: currentData?.description,
                dataType: currentData?.dataType,
                officialName: `${currentData?.displayName.toUpperCase().replace(/\s/g, "_")}_1001`,
                componentType: currentData?.componentType,
                tooltip: currentData?.tooltip,
                sampleEntries: currentData?.sampleEntries,
                validationRules: JSON.stringify(currentComponent),
            };
            !newBroker ? brokerManager.updateBroker(broker as Broker) : brokerManager.createBroker(broker as Broker);
            setBrokers([...brokers.filter((broker) => broker.id !== currentData?.id), broker as Broker]);
            setComponents([
                ...components.filter((component: any) => component?.id !== currentComponent.id),
                currentComponent,
            ]);
            Notifications.show({
                title: `${currentData ? "Broker updated" : "Broker created"}`,
                message: `${currentData ? "Broker updated" : "Broker created"} successfully`,
                autoClose: true,
                color: "teal",
            });
        } catch (error) {
            Notifications.show({
                title: `Broker ${currentData ? "update" : "creation"} failed`,
                message: `Broker ${currentData ? "update" : "creation"} failed`,
                autoClose: true,
                color: "red",
            });
        }
    };

    const handleValueChange = (data: string, value: string | number | boolean) => {
        currentData && setCurrentData({ ...currentData, [data]: value });
        const updatedComponent = { ...currentComponent };
        if (data === "displayName") {
            updatedComponent.label = value as string;
        } else if (data === "description") {
            updatedComponent.description = value as string;
        } else if (data === "tooltip") {
            updatedComponent.tooltip = value as string;
        } else if (data === "componentType") {
            updatedComponent.type = value as ComponentTypeInfo["type"];
        }
        setCurrentComponent(updatedComponent);
        setComponents([...components.filter((component: any) => component?.id !== currentComponent.id), updatedComponent]);
    };

    const selectedOption = dataTypeOptions.find((item) => item.value === currentData.dataType);

    const handleDataTypeChange = (value: string | null) => {
        const filteredType = Object.entries(ComponentType).filter(([key, item]) => item.type === value);
        setCurrentData({
            ...currentData,
            dataType: value as (typeof currentData)["dataType"],
            componentType: filteredType[0][0],
        });
    };

    const options = dataTypeOptions.map((item) => (
        <Combobox.Option value={item.value} key={item.value}>
            <SelectOption {...item} />
        </Combobox.Option>
    ));

    useEffect(() => {
        if (currentData.componentType) {
            const inputType = Object.entries(ComponentType).filter(
                ([key, value]) => key === currentData.componentType,
            )[0][1].type;
            setComponentOptions(
                Object.entries(ComponentType)
                    .filter(([key, value]) => value.type === inputType)
                    .map(([key, value]) => ({
                        value: key,
                        label: value.label,
                    })),
            );
        }
    }, [currentData.dataType]);

    return (
        <Grid>
            <Grid.Col span={{ base: 12, md: 6 }}>
                <Fieldset legend="Add properties">
                    <TextInput
                        label="Name"
                        onChange={(value) => handleValueChange("displayName", value.target.value)}
                        value={currentData.displayName || currentComponent.label || ""}
                        placeholder="Enter a name"
                    />
                    <Space h="sm" />
                    <Combobox
                        store={combobox}
                        withinPortal={false}
                        onOptionSubmit={(value) => {
                            handleDataTypeChange(value);
                            combobox.closeDropdown();
                        }}
                    >
                        <Combobox.Target>
                            <InputBase
                                label="Data Type"
                                component="button"
                                type="button"
                                pointer
                                defaultValue={currentData.dataType || currentComponent.type}
                                rightSection={<Combobox.Chevron />}
                                onClick={() => combobox.toggleDropdown()}
                                rightSectionPointerEvents="none"
                                multiline
                            >
                                {selectedOption ? (
                                    <SelectOption {...selectedOption} />
                                ) : (
                                    <Input.Placeholder>Pick value</Input.Placeholder>
                                )}
                            </InputBase>
                        </Combobox.Target>

                        <Combobox.Dropdown>
                            <Combobox.Options>{options}</Combobox.Options>
                        </Combobox.Dropdown>
                    </Combobox>
                    <Space h="sm" />
                    <Textarea
                        resize="both"
                        label="Description"
                        value={currentData.description || currentComponent.description}
                        onChange={(value) => handleValueChange("description", value.target.value)}
                        placeholder="Enter a description"
                    />
                    <Space h="sm" />
                    <Select
                        label="Component"
                        description="Choose the type of component"
                        placeholder="Choose the type of component"
                        data={componentOptions}
                        value={currentData.componentType || currentComponent.type}
                        onChange={(value) => handleValueChange("componentType", value as string)}
                    />
                </Fieldset>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
                <Fieldset legend="Preview" radius="md">
                    <BrokerComponent
                        id={currentData.id}
                        type={currentData.componentType || currentComponent.type}
                        handleDefaultValueChange={(value: any) =>
                            setCurrentComponent({ ...currentComponent, defaultValue: value })
                        }
                    />
                </Fieldset>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 12 }}>
                {/* <BrokerEdit id={id} /> */}
                <Space h="sm" />
                <Button onClick={handleEditBroker}>Save Broker</Button>
            </Grid.Col>
        </Grid>
    );
};
