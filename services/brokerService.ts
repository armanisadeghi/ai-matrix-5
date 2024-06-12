import { createClient } from '@supabase/supabase-js';
import { Broker } from "@/types/broker";
import { brokersAtom, currentBrokerAtom } from 'context/atoms/brokerAtoms';
import { useSetRecoilState } from 'recoil';
import { uuid } from 'uuidv4';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,);

export function createBrokerManager() {
    const setBrokersAtom = useSetRecoilState(brokersAtom);
    const setCurrentBrokerAtom = useSetRecoilState(currentBrokerAtom);

    async function fetchBrokers(): Promise<Broker[]> {
        const { data, error } = await supabase
            .from('broker')
            .select('*');

        if (error) {
            console.error('Error fetching brokers:', error);
            return [];
        }

        setBrokersAtom(data.map((broker) => ({ ...broker, dataType: broker.data_type })));
        return data.map((broker) => ({ ...broker, dataType: broker.data_type }));
    }

    async function setCurrentBroker(broker: Broker | undefined) {
        setCurrentBrokerAtom(broker);
        return broker;
    };

    async function createBroker(broker: Broker): Promise<Broker> {
        const brokerId = uuid();
        const { data, error } = await supabase
            .from('broker')
            .insert({
                name: broker.name,
                description: broker.description,
                id: brokerId,
                component: broker.component,
                data_type: broker.dataType,
            });

        if (error) {
            console.error('Error creating broker:', error);
            return broker;
        }
        setBrokersAtom((prevBrokers) => [...prevBrokers, { ...broker, id: brokerId }]);
        setCurrentBrokerAtom(data);
        return data;
    }

    async function updateBroker(broker: Broker): Promise<Broker> {
        const { data, error } = await supabase
            .from('broker')
            .update(broker)
            .eq('id', broker.id);

        if (error) {
            console.error('Error updating broker:', error);
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
            .from('broker')
            .delete()
            .eq('id', brokerId);

        setBrokersAtom((prevBrokers) =>
            prevBrokers.filter((prevBroker) => prevBroker.id !== brokerId)
        );
    }
    return { fetchBrokers, createBroker, updateBroker, deleteBroker, setCurrentBroker };
}
