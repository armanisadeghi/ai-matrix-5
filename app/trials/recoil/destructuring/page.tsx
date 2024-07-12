'use client';

import DestructuringMulti from './DestructuringMulti';
import DestructuringDynamic from './DestructuringDynamic';
import DestructuringStatic from './DestructuringStatic';
import { Select, Space } from '@mantine/core';
import React, { useState } from 'react';
import { RecoilRoot } from 'recoil';

const Page: React.FC = () => {
    const [selectedComponent, setSelectedComponent] = useState<string | null>(null);

    const handleSelectChange = (value: string | null) => {
        setSelectedComponent(value);
    };

    return (
        <RecoilRoot>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Select
                    style={{ width: 300 }}
                    label="Select a component to test"
                    placeholder="Pick value"
                    data={[
                        { value: 'DestructuringStatic', label: 'Destructuring Static' },
                        { value: 'DestructuringDynamic', label: 'Destructuring Dynamic' },
                        { value: 'DestructuringMulti', label: 'Destructuring Multi-Dynamic' },
                    ]}
                    onChange={(value) => handleSelectChange(value)}
                />
            </div>
            <Space h="xl" />
            {selectedComponent === 'DestructuringStatic' && <DestructuringStatic />}
            {selectedComponent === 'DestructuringDynamic' && <DestructuringDynamic />}
            {selectedComponent === 'DestructuringMulti' && <DestructuringMulti />}
        </RecoilRoot>
    );
};

export default Page;
