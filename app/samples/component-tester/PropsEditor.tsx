// app/samples/component-tester/PropsEditor.tsx

import React from 'react';
import { Textarea, Title } from '@mantine/core';
import AmeJsonInput from '@/ui/json/AmeJsonInput';;

interface PropsEditorProps {
    props: { [key: string]: any };
    propDefinitions: { [key: string]: any };
    onChange: (propPath: string, value: any) => void;
}

const PropsEditor: React.FC<PropsEditorProps> = ({ props, propDefinitions, onChange }) => {
    const renderPropFields = (propObject: any, parentKey = ''): React.ReactNode => {
        return Object.keys(propObject).map((key) => {
            const propPath = parentKey ? `${parentKey}.${key}` : key;

            if (Array.isArray(propObject[key]) || (typeof propObject[key] === 'object' && propObject[key] !== null)) {
                return (
                    <AmeJsonInput
                        key={propPath}
                        label={propPath}
                        value={JSON.stringify(props[propPath] || propObject[key], null, 2)}
                        onChange={(value) => {
                            try {
                                const parsedValue = JSON.parse(value);
                                onChange(propPath, parsedValue);
                            } catch (error) {
                                console.error('Invalid JSON:', error);
                            }
                        }}
                        validateJson={true}
                        formatOnBlur={true}
                    />
                );
            } else {
                return (
                    <Textarea
                        key={propPath}
                        label={propPath}
                        value={props[propPath] || ''}
                        onChange={(event) => onChange(propPath, event.currentTarget.value)}
                        autosize
                        minRows={2}
                        maxRows={10}
                    />
                );
            }
        });
    };

    return (
        <div>
            <Title order={6}>Update Props For Live Results</Title>
            {renderPropFields(propDefinitions)}
        </div>
    );
};

export default PropsEditor;
