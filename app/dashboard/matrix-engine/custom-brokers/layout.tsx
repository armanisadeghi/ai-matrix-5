'use client'
import { createBrokerManager } from '@/services/brokerService'
import { ReactNode, useEffect } from 'react'

type Props = {
    children: ReactNode
}

export default function BrokersLayout({ children }: Props): JSX.Element {
    const brokerManager = createBrokerManager()

    useEffect(() => {
        const fetchData = async () => {
            try {
                await brokerManager.fetchBrokers()
            } catch (error) {
                console.error('Error fetching brokers:', error)
            }
        }

        fetchData()
    }, [brokerManager])

    return <>{children}</>
}
