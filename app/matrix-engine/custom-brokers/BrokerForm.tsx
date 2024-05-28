"use client";

import BrokerComponent from '@/app/matrix-engine/system-brokers/BrokerComponent';
import { Component } from '@/types/broker';

export const BrokerForm = ({ component }: { component: Component }) => {

    return (
        <BrokerComponent
            component={component} />
    );
};