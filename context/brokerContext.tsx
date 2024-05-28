"use client";
import { BrokerContextValue, ComponentType } from '@/types/broker';
import React, { ReactNode, useContext } from "react";

export const BrokerContext = React.createContext<BrokerContextValue>({
    brokers: [],
});

export const BrokerProvider = ({ children }: { children: ReactNode }) => {
    const brokerContextValue: BrokerContextValue = {
        brokers: [
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
        ],
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