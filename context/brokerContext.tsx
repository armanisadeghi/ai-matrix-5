"use client";
import { BrokerContextValue } from '@/types/broker';
import React, { ReactNode, useContext } from "react";

export const BrokerContext = React.createContext<BrokerContextValue>({
    brokers: [],
});

export const BrokerProvider = ({ children }: { children: ReactNode }) => {
    const brokerContextValue: BrokerContextValue = {
        brokers: [],
    };
    return (
        <BrokerContext.Provider value={brokerContextValue}>
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