import { Grid, Space, TextInput } from '@mantine/core';
import React, { ChangeEvent } from 'react';
import { atom, selectorFamily, useRecoilState, DefaultValue } from 'recoil';


interface FormState {
    field1: string;
    field2: string;
    field3: string;
}

const formState = atom<FormState>({
    key: 'formState',
    default: {
        field1: '1',
        field2: '2',
        field3: '3',
    },
});

// Properly handling the DefaultValue in the selector family
const formFieldState = selectorFamily<string, keyof FormState>({
    key: 'FormField',
    get: field => ({get}) => {
        const state = get(formState);
        return state[field];
    },
    set: field => ({set}, newValue) => {
        if (newValue instanceof DefaultValue) {
            // Handle reset cases correctly
            set(formState, prevState => ({...prevState, [field]: ''}));
        } else {
            // Normal set operation
            set(formState, prevState => ({
                ...prevState,
                [field]: newValue ?? prevState[field] // Handle potential null values
            }));
        }
    }
});

const Component1: React.FC = () => {
    const [value, setValue] = useRecoilState(formFieldState('field1'));
    const onChange = (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value);

    return (
        <>
            <TextInput type="text" value={value} onChange={onChange}/>
        </>
    );
}

const Component2: React.FC = () => {
    const [value, setValue] = useRecoilState(formFieldState('field2'));
    const onChange = (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value);

    return (
        <TextInput type="text" value={value} onChange={onChange}/>
    );
}

const Page: React.FC = () => {
    const formValues = useRecoilState(formState)[0];

    return (
        <Grid>
            <Grid.Col span={4}></Grid.Col>
            <Grid.Col span={4}>

                <h2>Multi Dynamic Example</h2>
                <Component1/>
                <Space h="md"/>
                <Component2/>
                <h3>Current Form Values</h3>
                <pre>{JSON.stringify(formValues, null, 2)}</pre>
            </Grid.Col>
            <Grid.Col span={4}></Grid.Col>
        </Grid>

    );
}

export default Page;
