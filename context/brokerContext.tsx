"use client";
import { Broker, BrokerContextValue } from '@/types/broker';
import React, { ReactNode, useContext, useState } from "react";

export const BrokerContext = React.createContext<BrokerContextValue>({
    brokers: [],
    setBrokers: () => { },
});

export const BrokerProvider = ({ children }: { children: ReactNode }) => {
    const [brokers, setBrokers] = useState<Broker[]>([]);
    return (
        <BrokerContext.Provider value={{ brokers, setBrokers }}>
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