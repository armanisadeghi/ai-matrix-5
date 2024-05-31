import React, { useState } from 'react';
import BrokerListItem from './BrokerListItem';
import { Stack } from '@mantine/core';
import { Broker } from '@/types/broker';

interface BrokerListProps {
    brokers: Broker[];
    onDelete: (id: string) => void;
    onEdit: (id: string) => void;
    isEditingId: string;
}

const BrokerList = ({ brokers, onDelete, onEdit, isEditingId }: BrokerListProps) => {

    return (
        <Stack>
            {brokers.map((broker) => (
                <BrokerListItem key={broker.id} broker={broker} onDelete={onDelete} onEdit={onEdit} isEditing={isEditingId === broker.id} />
            ))}
        </Stack>
    );
};

export default BrokerList;