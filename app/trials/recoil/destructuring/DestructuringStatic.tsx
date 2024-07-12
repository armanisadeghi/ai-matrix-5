'use client';

import AmeJsonInput from '@/ui/json/AmeJsonInput';
import { Grid, Space, TextInput, Button } from '@mantine/core';
import React, { ChangeEvent } from 'react';
import { atom, selectorFamily, useRecoilState, DefaultValue, useSetRecoilState } from 'recoil';

interface FormState {
    field1: string;
    field2: string;
    field3: string;
    field4: string;
    field5: string;
}

const formState = atom<FormState>({
    key: 'formState',
    default: {
        field1: '1',
        field2: '2',
        field3: '3',
        field4: '4',
        field5: '5',
    },
});

const formFieldState = selectorFamily<string, keyof FormState>({
    key: 'FormField',
    get: field => ({ get }) => {
        const state = get(formState);
        return state[field];
    },
    set: field => ({ set }, newValue) => {
        if (newValue instanceof DefaultValue) {
            set(formState, prevState => ({ ...prevState, [field]: '' }));
        } else {
            set(formState, prevState => ({
                ...prevState,
                [field]: newValue ?? prevState[field]
            }));
        }
    }
});

const InputWithClearButton: React.FC<{ fieldKey: keyof FormState }> = ({ fieldKey }) => {
    const [value, setValue] = useRecoilState(formFieldState(fieldKey));
    const onChange = (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value);
    const clearValue = () => setValue('');

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <TextInput style={{ flex: 2 }} type="text" value={value} onChange={onChange} />
            <Button style={{ flex: 1 }} onClick={clearValue}>Clear</Button>
        </div>
    );
};

const Page: React.FC = () => {
    const setFormState = useSetRecoilState(formState);
    const formValues = useRecoilState(formState)[0];

    const clearAllFields = () => {
        setFormState({
            field1: '',
            field2: '',
            field3: '',
            field4: '',
            field5: '',
        });
    };

    return (
        <Grid>
            <Grid.Col span={2}></Grid.Col>
            <Grid.Col span={8}>
                <h4>Recoil Form State Example</h4>
                <InputWithClearButton fieldKey="field1" />
                <Space h="md" />
                <InputWithClearButton fieldKey="field2" />
                <Space h="md" />
                <InputWithClearButton fieldKey="field3" />
                <Space h="md" />
                <InputWithClearButton fieldKey="field4" />
                <Space h="md" />
                <InputWithClearButton fieldKey="field5" />
                <Space h="md" />
                <Button fullWidth onClick={clearAllFields}>Clear All</Button>
                <Space h="xl" />
                <Grid>
                    <Grid.Col span={4}>
                        <AmeJsonInput label={'Current Form Values'} value={JSON.stringify(formValues, null, 2)} />
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <AmeJsonInput label={'Current Form Values'} value={JSON.stringify(formValues, null, 2)} />
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <AmeJsonInput label={'Current Form Values'} value={JSON.stringify(formValues, null, 2)} />
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <AmeJsonInput label={'Current Form Values'} value={JSON.stringify(formValues, null, 2)} />
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <AmeJsonInput label={'Current Form Values'} value={JSON.stringify(formValues, null, 2)} />
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <AmeJsonInput label={'Current Form Values'} value={JSON.stringify(formValues, null, 2)} />
                    </Grid.Col>
                </Grid>
            </Grid.Col>
            <Grid.Col span={2}></Grid.Col>
        </Grid>
    );
};

export default Page;
