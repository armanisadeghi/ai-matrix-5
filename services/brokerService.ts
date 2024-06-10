import { createClient } from '@supabase/supabase-js';
import { Broker, Component } from "@/types/broker";
import { brokersAtom, currentBrokerAtom } from 'context/atoms/brokerAtoms';
import { useSetRecoilState } from 'recoil';
import { systemBrokers, customBrokers } from '../app/data/fake-data/fake-brokers';
import { uuid } from 'uuidv4';

const supabase = createClient('https://ame-matrix-5.supabase.co', '111');

export function createBrokerManager() {
    const setBrokersAtom = useSetRecoilState(brokersAtom);
    const setCurrentBrokerAtom = useSetRecoilState(currentBrokerAtom);

    async function fetchBrokers(): Promise<Broker[]> {
        const { data, error } = await supabase
            .from('brokers')
            .select('*');

        if (error) {
            console.log('fetching fake data');
            const data = [...systemBrokers, ...customBrokers];
            setBrokersAtom(data);
            return data;
        }

        setBrokersAtom(data);
        return data;
    }

    async function setCurrentBroker(broker: Broker | undefined) {
        setCurrentBrokerAtom(broker);
        return broker;
    };

    async function createBroker(broker: Broker): Promise<Broker> {
        const { data, error } = await supabase
            .from('brokers')
            .insert(broker);

        if (error) {
            console.log('fetching fake data');
            const id = uuid();
            const data = { ...broker, id: id, dataType: typeof broker.component.defaultValue };
            setBrokersAtom([...systemBrokers, ...customBrokers, data]);
            setCurrentBrokerAtom({
                id: id,
                name: broker.name,
                description: broker.description,
                dataType: typeof broker.component.defaultValue,
                component: broker.component,
            });
            return broker;
        }
        const id = uuid();
        setBrokersAtom((prevBrokers: Broker[]) => [...prevBrokers, { ...broker, id: id, dataType: typeof broker.component.defaultValue }]);
        setCurrentBrokerAtom({
            id: id,
            name: broker.name,
            description: broker.description,
            dataType: typeof broker.component.defaultValue,
            component: broker.component,
        });
        return data;
    }

    async function updateBroker(broker: Broker): Promise<Broker> {
        const { data, error } = await supabase
            .from('brokers')
            .update(broker)
            .eq('id', broker.id);

        if (error) {
            console.log('fetching fake data');
            setBrokersAtom(prevBrokers => [...prevBrokers.filter((prevBroker) => prevBroker.id !== broker.id), broker]);
            setCurrentBrokerAtom(broker);
            return broker;
        }

        setBrokersAtom((prevBrokers) =>
            prevBrokers.map((prevBroker) =>
                prevBroker.id === broker.id ? data : prevBroker
            )
        );
        setCurrentBrokerAtom(data);
        return data;
    }

    async function deleteBroker(brokerId: string): Promise<void> {
        await supabase
            .from('brokers')
            .delete()
            .eq('id', brokerId);

        setBrokersAtom((prevBrokers) =>
            prevBrokers.filter((prevBroker) => prevBroker.id !== brokerId)
        );
    }
    return { fetchBrokers, createBroker, updateBroker, deleteBroker, setCurrentBroker };
}
