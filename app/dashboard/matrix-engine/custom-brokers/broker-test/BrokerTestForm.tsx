"use client";

import { Paper, SimpleGrid, Space, Stack, Textarea } from '@mantine/core';
import BrokerComponent from '../BrokerComponent';
import { Component } from '@/types/broker';

export const BrokerTestForm = ({ question, setQuestion, brokerValue, setBrokerValue }: { question: string, setQuestion: any, brokerValue: Component[], setBrokerValue: Function }) => {

    const handleDefaultValueChange = (value: any, component: Component) => {
        setBrokerValue((prev: Component[]) => prev.map(c => c.componentId === component.componentId ? { ...c, defaultValue: value } : c));
    };

    return (
        <SimpleGrid>
            <Textarea autosize onChange={(e) => setQuestion(e.target.value)} defaultValue={question} />
            {brokerValue.length > 0 && <Paper withBorder p="md">{brokerValue.map((component) => <Paper key={component.componentId} p='md'><BrokerComponent currentComponent={component} type={component.type} handleDefaultValueChange={(value: any) => handleDefaultValueChange(value, component)} /></Paper>)}</Paper>}
        </SimpleGrid>
    )
};