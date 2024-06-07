"use client";
import { Broker, BrokerContextValue, Component } from '@/types/broker';
import React, { ReactNode, useContext, useEffect, useState } from "react";
import { brokersData } from '../app/data/fake-data/fake-brokers';

export const BrokerContext = React.createContext<BrokerContextValue>({
    brokers: [],
    setBrokers: () => { },
    currentBroker: {} as Broker,
    setCurrentBroker: () => { },
    deleteBroker: ({ }: string) => { },
});

const initialValues = {
    id: '',
    name: '',
    description: '',
    defaultValue: '',
    dataType: '',
    component: {} as Component,
}

export const BrokerProvider = ({ children }: { children: ReactNode }) => {
    const [brokers, setBrokers] = useState<Broker[]>(brokersData as Broker[]);
    const [currentBroker, setCurrentBroker] = useState<Broker>(initialValues as Broker);

    const deleteBroker = (id: string) => {
        setBrokers([...brokers.filter((b) => b.id !== id)]);
        if (currentBroker.id === id) {
            setCurrentBroker(initialValues as Broker);
        }
    };

    return (
        <BrokerContext.Provider value={{ brokers, setBrokers, currentBroker, setCurrentBroker, deleteBroker }}>
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