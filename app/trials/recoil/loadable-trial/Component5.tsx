'use client';

import React, { useState } from 'react';
import { useRecoilState, useRecoilValueLoadable, RecoilState, RecoilValue } from 'recoil';
import { SimpleGrid, Button, Modal } from '@mantine/core';

// Constants for the indexes of 'id' and 'name'
const ID_INDEX = 0; // Adjust this index as needed
const NAME_INDEX = 1; // Adjust this index as needed

// Modal Component
const GenericModal: React.FC<{ showPopup: boolean, onClose: () => void, item: any }> = ({ showPopup, onClose, item }) => (
    <Modal opened={showPopup} onClose={onClose} title="Details">
        {Object.keys(item).map((key, index) => (
            <p key={index}><strong>{key}:</strong> {item[key]}</p>
        ))}
    </Modal>
);

// Item Component
const GenericItem: React.FC<{ item: any, handleButtonClick: (item: any) => void }> = ({ item, handleButtonClick }) => (
    <>
        <SimpleGrid cols={2} spacing="sm" verticalSpacing="sm">
            <div>
                <h2>{item[Object.keys(item)[NAME_INDEX]]}</h2>
                <ul>
                    {Object.keys(item).map((key, index) => {
                        if (index !== NAME_INDEX && index !== ID_INDEX) {
                            return <li key={index}>{`${key}: ${item[key]}`}</li>;
                        }
                        return null;
                    })}
                </ul>
            </div>
            <Button onClick={() => handleButtonClick(item)}>{item[Object.keys(item)[NAME_INDEX]]}</Button>
        </SimpleGrid>
    </>
);

interface GenericComponentProps {
    activeItemIdAtom: RecoilState<any>;
    itemSummariesSelector: RecoilValue<any>;
}

function GenericComponent({ activeItemIdAtom, itemSummariesSelector }: GenericComponentProps) {
    const [activeItemId, setActiveItemId] = useRecoilState(activeItemIdAtom);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any | null>(null);
    const itemSummariesLoadable = useRecoilValueLoadable(itemSummariesSelector);

    const handleButtonClick = (item: any) => {
        const itemId = item[Object.keys(item)[ID_INDEX]];
        if (itemId) {
            setSelectedItem(item);
            setActiveItemId(itemId);
            setShowPopup(true);
        } else {
            console.error('Error: id is undefined');
        }
    };

    switch (itemSummariesLoadable.state) {
        case 'hasValue':
            return (
                <>
                    {itemSummariesLoadable.contents.map((item: any, index: number) => (
                        <GenericItem key={index} item={item} handleButtonClick={handleButtonClick} />
                    ))}
                    {showPopup && selectedItem && (
                        <GenericModal showPopup={showPopup} onClose={() => setShowPopup(false)} item={selectedItem} />
                    )}
                </>
            );
        case 'loading':
            return <div>Loading...</div>;
        case 'hasError':
            throw itemSummariesLoadable.contents;
        default:
            return null;
    }
}

export default GenericComponent;
