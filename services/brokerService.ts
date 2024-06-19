import { createClient } from '@supabase/supabase-js'
import { Broker } from '@/types/broker'
import { brokersAtom, categoryAtom, brokerAtom } from 'context/atoms/brokerAtoms'
import { useSetRecoilState } from 'recoil'
import { uuid } from 'uuidv4'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export function createBrokerManager() {
    const setBrokersAtom = useSetRecoilState(brokersAtom)
    const setCategoriesAtom = useSetRecoilState(categoryAtom)
    const setBrokerAtom = (id: string) => useSetRecoilState(brokerAtom(id))

    async function fetchBrokers(): Promise<Broker[]> {
        const { data, error } = await supabase.from('broker').select('*')

        if (error) {
            console.error('Error fetching brokers:', error)
            return []
        }

        setBrokersAtom(
            data.map((broker) => ({
                ...broker,
                dataType: broker.data_type,
                defaultValue: broker.component.default_value
            }))
        )
        return data.map((broker) => ({
            ...broker,
            dataType: broker.data_type,
            defaultValue: broker.component.default_value
        }))
    }

    async function fetchCategories(): Promise<string[]> {
        const { data, error } = await supabase.from('category').select('*')

        if (error) {
            console.error('Error fetching categories:', error)
            return []
        }
        setCategoriesAtom(data.map((category) => category.name))

        return data.map((category) => category.name)
    }

    async function createBroker(broker: Broker) {
        const brokerId = uuid()
        const { data, error } = await supabase.from('broker').insert({
            user_id: '3dba9e59-fcb6-4242-b584-a4e7370df940',
            id: brokerId,
            name: broker.name,
            official_name: broker.officialName,
            description: broker.description,
            default_value: broker.component.defaultValue,
            component: broker.component,
            data_type: broker.dataType,
            category: 'custom'
        })

        if (error) {
            console.error('Error creating broker:', error)
            return broker
        }
        setBrokersAtom((prevBrokers) => [...prevBrokers, { ...broker, id: brokerId }])
        return data
    }

    async function getBrokerById(id: string): Promise<Broker | null> {
        const { data, error } = await supabase.from('broker').select('*').eq('id', id)
        if (error) {
            console.error('Error fetching broker:', error)
            return null
        }
        setBrokerAtom(data[0].id)(data[0])
        return data[0]
    }

    async function updateBroker(broker: Broker) {
        const { data, error } = await supabase
            .from('broker')
            .update({
                name: broker.name,
                official_name: broker.officialName,
                description: broker.description,
                default_value: broker.component.defaultValue,
                component: broker.component,
                data_type: broker.dataType,
                category: 'custom'
            })
            .eq('id', broker.id)

        if (error) {
            console.error('Error updating broker:', error)
            return broker
        }

        setBrokersAtom((prevBrokers) =>
            prevBrokers.map((prevBroker) =>
                prevBroker.id === broker.id ? { ...prevBroker, ...broker } : prevBroker
            )
        )
        return data
    }

    async function deleteBroker(brokerId: string): Promise<void> {
        await supabase.from('broker').delete().eq('id', brokerId)

        setBrokersAtom((prevBrokers) =>
            prevBrokers.filter((prevBroker) => prevBroker.id !== brokerId)
        )
    }
    return {
        fetchBrokers,
        createBroker,
        updateBroker,
        deleteBroker,
        fetchCategories,
        getBrokerById
    }
}
