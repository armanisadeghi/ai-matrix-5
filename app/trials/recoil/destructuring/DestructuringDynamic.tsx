import { Button, Grid, Space, TextInput } from '@mantine/core';
import React, { ChangeEvent } from 'react';
import { atom, atomFamily, selector, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

// Dynamic atom family for field values
const formFieldState = atomFamily({
    key: 'formFieldState',
    default: '', // Default value for each new field
});

// Atom to keep track of field keys
const fieldKeysState = atom<string[]>({
    key: 'fieldKeys',
    default: ['field1'],  // Start with one field
});

// Selector to aggregate all field values
const allFieldsValueSelector = selector({
    key: 'allFieldsValue',
    get: ({get}) => {
        const fieldKeys = get(fieldKeysState);
        return fieldKeys.reduce((acc, key) => {
            acc[key] = get(formFieldState(key)); // Get each field's value
            return acc;
        }, {} as Record<string, string>);
    }
});

// Component to render individual text inputs
const DynamicInput: React.FC<{ fieldKey: string }> = ({ fieldKey }) => {
    const [value, setValue] = useRecoilState(formFieldState(fieldKey)); // Correct hook for both get and set
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value); // Update field value
    };

    return (
        <TextInput value={value} onChange={onChange} placeholder={`Enter value for ${fieldKey}`} />
    );
};

// Main page component
const Page: React.FC = () => {
    const fieldKeys = useRecoilState(fieldKeysState)[0];
    const setFieldKeys = useSetRecoilState(fieldKeysState);
    const allValues = useRecoilValue(allFieldsValueSelector);

    // Function to add a new field
    const handleAddField = () => {
        const newFieldKey = `field${fieldKeys.length + 1}`;
        setFieldKeys([...fieldKeys, newFieldKey]);
    };

    return (
        <Grid>
            <Grid.Col span={4}></Grid.Col>
            <Grid.Col span={4}>
                <h1>Dynamic Recoil Form State Example</h1>
                {fieldKeys.map(key => (
                    <React.Fragment key={key}>
                        <DynamicInput fieldKey={key} />
                        <Space h="md" />
                    </React.Fragment>
                ))}
                <Button onClick={handleAddField}>Add Field</Button>
                <Space h="lg" />
                <h2>Current Form Values</h2>
                <pre>{JSON.stringify(allValues, null, 2)}</pre>
            </Grid.Col>
            <Grid.Col span={4}></Grid.Col>
        </Grid>
    );
};

export default Page;
