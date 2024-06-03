"use client";
import { Broker, BrokerContextValue, Component } from '@/types/broker';
import React, { ReactNode, useContext, useEffect, useState } from "react";

export const BrokerContext = React.createContext<BrokerContextValue>({
    brokers: [],
    setBrokers: () => { },
    currentBroker: {} as Broker,
    setCurrentBroker: () => { },
    editBroker: ({ }: Broker) => { },
    deleteBroker: ({ }: string) => { },
});

export const BrokerProvider = ({ children }: { children: ReactNode }) => {
    const [brokers, setBrokers] = useState<Broker[]>([]);

    const [currentBroker, setCurrentBroker] = useState<Broker>({
        id: '',
        name: '',
        dataType: [],
        components: [],
    } as Broker);

    useEffect(() => {
        setBrokers([currentBroker]);
    }, [currentBroker.id]);

    const editBroker = (broker: Broker) => {
        setCurrentBroker(broker);
    };
    const deleteBroker = (id: string) => {
        setBrokers([...brokers.filter((b) => b.id !== id)]);
    };

    return (
        <BrokerContext.Provider value={{ brokers, setBrokers, currentBroker, setCurrentBroker, editBroker, deleteBroker }}>
            {children}
        </BrokerContext.Provider>
    );
}

export const useBroker = () => {
    const context = useContext(BrokerContext);
    if (context === undefined) {
        throw new Error("useBroker must be used within a BrokerProvider");
    }
    return context;
};