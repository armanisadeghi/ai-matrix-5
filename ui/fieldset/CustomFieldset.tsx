import { Fieldset, Button, Group, SimpleGrid } from '@mantine/core';
import { ReactNode, Children } from 'react';

interface CustomFieldsetProps {
    children: ReactNode;
    buttonLabel?: string;
    legend?: string;
    layout?: 'single' | 'double' | 'triple' | 'quad';
    showButton?: boolean;
    buttonWidth?: string;
    fieldsetWidth?: string;
}

function CustomFieldset({
                            children,
                            buttonLabel = "Submit",
                            legend = "Information",
                            layout = 'single',
                            showButton = true,
                            buttonWidth = 'auto',
                            fieldsetWidth = '100%'
                        }: CustomFieldsetProps) {
    const cols = layout === 'double' ? 2 : layout === 'triple' ? 3 : layout === 'quad' ? 4 : 1;

    const content = (
        <SimpleGrid cols={cols} spacing="md">
            {Children.toArray(children).map((child, index) => (
                <div key={index} style={{width: '100%'}}>{child}</div>
            ))}
        </SimpleGrid>
    );

    return (
        <Fieldset legend={legend} radius="lg" style={{width: fieldsetWidth}}>
            {content}
            {showButton && (
                <Group justify="flex-end" mt="lg">
                    <Button style={{width: buttonWidth}}>{buttonLabel}</Button>
                </Group>
            )}
        </Fieldset>
    );
}

export default CustomFieldset;
