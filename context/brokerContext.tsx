"use client";
import { Broker, BrokerContextValue, ComponentType } from '@/types/broker';
import React, { ReactNode, useContext, useState } from "react";

export const BrokerContext = React.createContext<BrokerContextValue>({
    brokers: [],
    setBrokers: () => { },
});

export const BrokerProvider = ({ children }: { children: ReactNode }) => {
    const [brokers, setBrokers] = useState<Broker[]>([
        {
            id: "broker1",
            name: "John Doe",
            dataType: ["string", "string"],
            components: [
                {
                    type: ComponentType.Input,
                },
                {
                    type: ComponentType.Textarea,
                },
            ],
        },
        {
            id: "broker2",
            name: "Jane Smith",
            dataType: ["number", "number"],
            components: [
                {
                    type: ComponentType.Slider,
                },
            ],
        },
    ]);
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