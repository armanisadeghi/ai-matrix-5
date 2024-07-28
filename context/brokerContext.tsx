"use client";
import { Broker, Component } from "@/types/broker";
import React, { ReactNode, useContext, useState } from "react";
import { customBrokers, systemBrokers } from "../app/data/fake-data/fake-brokers";

interface BrokerContextValue {
    brokers: Broker[];
    setBrokers: React.Dispatch<React.SetStateAction<Broker[]>>;
    currentBroker: Broker;
    setCurrentBroker: React.Dispatch<React.SetStateAction<Broker>>;
    deleteBroker: (id: string) => void;
    system: Broker[];
    setSystem: React.Dispatch<React.SetStateAction<Broker[]>>;
}

export const BrokerContext = React.createContext<BrokerContextValue>({
    brokers: [],
    setBrokers: () => {},
    currentBroker: {} as Broker,
    setCurrentBroker: () => {},
    deleteBroker: ({}: string) => {},
    system: [],
    setSystem: () => {},
});

const initialValues = {
    id: "",
    name: "",
    description: "",
    defaultValue: "",
    dataType: "",
    component: {} as Component,
};

export const BrokerProvider = ({ children }: { children: ReactNode }) => {
    const [brokers, setBrokers] = useState<Broker[]>(customBrokers as Broker[]);
    const [system, setSystem] = useState<Broker[]>(systemBrokers as Broker[]);
    const [currentBroker, setCurrentBroker] = useState<Broker>(initialValues as unknown as Broker);

    const deleteBroker = (id: string) => {
        setBrokers([...brokers.filter((b) => b.id !== id)]);
        if (currentBroker.id === id) {
            setCurrentBroker(initialValues as unknown as Broker);
        }
    };

    return (
        <BrokerContext.Provider
            value={{ brokers, setBrokers, currentBroker, setCurrentBroker, deleteBroker, system, setSystem }}
        >
            {children}
        </BrokerContext.Provider>
    );
};

export const useBroker = () => {
    const context = useContext(BrokerContext);
    if (context === undefined) {
        throw new Error("useBroker must be used within a BrokerProvider");
    }
    return context;
};
