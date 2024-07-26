import { Divider, Space } from '@mantine/core';
import React from 'react';
import { FileManagerBase } from '@/components/FileManager/FileManagerBase';
import { FileManagerButton } from '@/components/FileManager/FileManagerButton';



function Page() {
    return (
        <>
            <h3>Files Suite</h3>
            <Space h="lg"/>
            <Divider my="xs" label="File Manager" labelPosition="center" />
            <Space h="lg"/>
            <FileManagerBase/>
            <Space h="lg"/>
            <Divider my="xs" label="File Manager Button" labelPosition="center" />
            <Space h="lg"/>
            <FileManagerButton/>

        </>
    );
}

export default Page;
