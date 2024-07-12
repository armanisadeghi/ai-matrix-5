// app/samples/AmeJsonInput/OptionalStarterPage.tsx
'use client';

import React, { useState } from 'react';
import AmeJsonInput from '@/ui/json/AmeJsonInput';

const Page: React.FC = () => {
    const [jsonValue, setJsonValue] = useState<string>('{"key": "value"}');

    const handleJsonChange = (value: string) => {
        setJsonValue(value);
    };

    return (
        <div style={{ padding: '20px' }}>
            <AmeJsonInput
                label="JSON Input"
                enabled={true}
                value={jsonValue}
                onChange={handleJsonChange}
                showButton={true}
                validateJson={true}
            />
        </div>
    );
};

export default Page;
