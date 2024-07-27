import { Paper, SimpleGrid, Textarea } from '@mantine/core';
import { Broker } from '@/types/broker';
import BrokerComponent from '@/components/Brokers/BrokerComponent';

export const BrokerTestForm = ({ question, setQuestion, brokerValue, setBrokerValue }: { question: string, setQuestion: any, brokerValue: Broker[], setBrokerValue: Function }) => {

    const handleDefaultValueChange = (value: any, broker: Broker) => {
        setBrokerValue((prev: Broker[]) => [...prev.map((b) => b.id === broker.id ? { ...b, [broker.id]: value } : b)]);
    };

    return (
        <SimpleGrid>
            <Textarea autosize onChange={(e) => setQuestion(e.target.value)} defaultValue={question} />
            {brokerValue.length > 0 && <Paper withBorder p="md">{brokerValue.map((broker) => <Paper key={broker.id} p='md'><BrokerComponent id={broker.id} type={broker.componentType} handleDefaultValueChange={(value: any) => handleDefaultValueChange(value, broker)} /></Paper>)}</Paper>}
        </SimpleGrid>
    )
};