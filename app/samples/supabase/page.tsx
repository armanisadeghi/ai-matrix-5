'use client';

import React, { useState } from "react";
import { JsonInput, Select, TextInput, Button, Group, Space } from "@mantine/core";
import supabase from "@/utils/supabase/client";
import AmeFieldset from "@/ui/fieldset/AmeFieldset";

export default function Page() {
    const [tableName, setTableName] = useState<string>('chats');
    const [field, setField] = useState<string>('OverrideUserId');
    const [value, setValue] = useState<string>('a048d457-c058-481b-a9a1-7d821b6435d5');
    const [data, setData] = useState<any[]>([]);

    const handleSubmit = async () => {
        if (tableName && field) {
            const {data} = await supabase
                .from(tableName as 'messages' | 'broker' | 'category' | 'chats' | 'chats_copy' | 'component' | 'file_sharing' | 'organization' | 'user')
                .select()
                .ilike(field, `%${value}%`);
            setData(data || []);
        }
    };
    return (
        <>
            <AmeFieldset
                buttonLabel="Fetch DB Data"
                showButton={true}
                alignSelf="center"
                justifyContent="center"
                legend="Search Supabase Database to Test Fetching Data">
                <Group align="start" gap="sm">
                    <Select
                        label="Table Name"
                        placeholder="Select a table"
                        data={["chats", "users", "messages"]} // Replace with your table names
                        value={tableName}
                        onChange={(value) => setTableName(value || '')}
                    />
                    <Select
                        label="Field"
                        placeholder="Select a field"
                        data={["OverrideUserId", "field2", "field3"]} // Replace with your field names
                        value={field}
                        onChange={(value) => setField(value || '')}
                    />
                    <TextInput
                        label="Value"
                        placeholder="Enter value"
                        value={value}
                        onChange={(event) => setValue(event.currentTarget.value)}
                    />
                    <Button onClick={handleSubmit}>Submit</Button>
                </Group>
            </AmeFieldset>
            <Space h={70}/>
            <JsonInput
                label="Message Array"
                placeholder="Textarea will autosize to fit the content"
                validationError="Invalid JSON"
                value={JSON.stringify(data, null, 2)}
                formatOnBlur
                autosize
                minRows={12}
            />
        </>
    );
}
