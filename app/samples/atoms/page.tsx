'use client';
import React from 'react';
import { atom, useAtom } from 'jotai';
import AmeJsonInput from "@/app/samples/json-sample/AmeJsonInput";

// Define the Dictionary type
type Dictionary = {
    id: number;
    name: string;
};

// Define the atom
const dictionaryListAtom = atom<Dictionary[]>([]);

function MyComponent() {
    const [dictionaryList, setDictionaryList] = useAtom(dictionaryListAtom);

    const addDictionary = (newDictionary: Dictionary) => {
        setDictionaryList(oldList => [...oldList, newDictionary]);
    };

    const handleJsonChange = (newValue: string) => {
        try {
            // Parse the new JSON string back into an array
            const newList = JSON.parse(newValue);
            setDictionaryList(newList);  // Update the atom directly
        } catch (error) {
            console.error("Failed to parse JSON", error);
            // Optionally handle errors, e.g., invalid JSON syntax
        }
    };

    return (
        <div>
            <button onClick={() => addDictionary({ id: dictionaryList.length + 1, name: "New Entry" })}>
                Add Entry
            </button>
            {dictionaryList.map((item: Dictionary) => (
                <div key={item.id}>{item.name}</div>
            ))}
            <AmeJsonInput
                label="Dictionary List Atom"
                value={JSON.stringify(dictionaryList, null, 2)}
                onChange={handleJsonChange}
                showButton={true}
                validateJson={true}
            />
        </div>
    );
}

export default MyComponent;
