import { createClient } from '@supabase/supabase-js';
import { Broker, Component } from "@/types/broker";
import { brokersAtom, componentsAtom} from 'context/atoms/brokerAtoms';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { userCredentialsSelector } from '@/state/userAtoms';
import { useCompleteUserProfile } from '@/hooks/users/useMatrixUser';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,);

export function createBrokerManager() {
    const setBrokersAtom = useSetRecoilState(brokersAtom);
    const setComponents = useSetRecoilState(componentsAtom);
    const { activeUser } = useCompleteUserProfile();

    async function fetchBrokers(): Promise<{brokers: Broker[], dataTypes: string[], components: Component[]}> {
        const { data, error } = await supabase
            .from('broker')
            .select('*');

        if (error) {
            console.error('Error fetching brokers:', error);
            return {brokers: [], dataTypes: [], components: []};
        }

        const brokers = data.map((broker: any) => ({
            ...broker,
            displayName: broker.display_name,
            officialName: broker.official_name,
            dataType: broker.data_type,
            componentType: broker.component_type,
            validationRules: broker.validation_rules,
            sampleEntries: broker.sample_entries,
            tooltip: broker.tooltip,
            userId: broker.user_id,
            matrixId: broker.matrix_id
        }));

        setBrokersAtom(brokers as Broker[]);
        const dataTypes = [...new Set(brokers.map((broker: Broker) => broker.dataType))].filter((dataType: string) => dataType).sort();

        const components = brokers.map((broker: Broker) => {
        const validationRules = JSON.parse(broker.validationRules || '{}');
        return {
            id: broker.id,
            label: broker.displayName,
            type: broker.componentType,
            description: broker.description,
            tooltip: broker.tooltip,
            ...validationRules,
        };
        }) as Component[];
        
        setComponents(components);

        return {brokers, dataTypes, components};
    }

    async function createBroker(broker: Broker) {
        const { data, error } = await supabase
            .from('broker')
            .insert({
                user_id: broker.userId,
                matrix_id: activeUser.matrix_id,
                id: broker.id,
                display_name: broker.displayName,
                official_name: broker.officialName,
                description: broker.description,
                component_type: broker.componentType,
                data_type: broker.dataType,
                validation_rules: broker.validationRules,
                sample_entries: broker.sampleEntries,
                tooltip: broker.tooltip
            });

        if (error) {
            console.error('Error creating broker:', error);
            return broker;
        }
        setBrokersAtom((prevBrokers) => [...prevBrokers, broker]);
        return data;
    }

    async function getBrokerById(id: string): Promise<Broker | null> {
        const { data, error } = await supabase
            .from('broker')
            .select('*')
            .eq('id', id);
        if (error) {
            console.error('Error fetching broker:', error);
            return null;
        }
        setComponents((prev) => prev.map((prevComponent) => (prevComponent.id === id ? { ...prevComponent, ...data[0] } : prevComponent)));
        return data[0];
    }

    async function updateBroker(broker: Broker) {
        const { data, error } = await supabase
            .from('broker')
            .update({
                display_name: broker.displayName,
                official_name: broker.officialName,
                description: broker.description,
                component_type: broker.componentType,
                data_type: broker.dataType,
                validation_rules: broker.validationRules,
                sample_entries: broker.sampleEntries,
                tooltip: broker.tooltip
            })
            .eq('id', broker.id);

        if (error) {
            console.error('Error updating broker:', error);
            return broker;
        }

        setBrokersAtom((prevBrokers) =>
            prevBrokers.map((prevBroker) =>
                prevBroker.id === broker.id ? { ...prevBroker, ...broker } : prevBroker
            )
        );
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
    return { fetchBrokers, createBroker, updateBroker, deleteBroker, getBrokerById };
}
