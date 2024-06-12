// ui/fieldset/AmeFieldset.tsx
import { Fieldset, Button, Group, SimpleGrid } from '@mantine/core';
import { ReactNode, Children, cloneElement } from 'react';

interface AmeFieldsetProps {
    children: ReactNode;
    buttonLabel?: string;
    legend?: string;
    layout?: 'single' | 'double' | 'triple' | 'quad';
    showButton?: boolean;
    buttonWidth?: string;
    fieldsetWidth?: string;
    justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around';
    alignSelf?: 'flex-start' | 'center' | 'flex-end' | 'stretch';
    onButtonClick?: () => void; // New prop for button click event handler
}

function AmeFieldset(
    {
        children,
        buttonLabel = "Submit",
        legend = "Information",
        layout = 'single',
        showButton = true,
        buttonWidth = 'auto',
        fieldsetWidth = '100%',
        justifyContent = 'flex-end',
        alignSelf = 'stretch',
        onButtonClick
    }: AmeFieldsetProps) {
    const cols = layout === 'double' ? 2 : layout === 'triple' ? 3 : layout === 'quad' ? 4 : 1;

    const content = (
        <SimpleGrid cols={cols} spacing="md">
            {Children.toArray(children).map((child: any, index) => (
                <div key={index} style={{ width: child.props.width || '100%' }}>
                    {cloneElement(child, { ...child.props })}
                </div>
            ))}
        </SimpleGrid>
    );

    return (
        <div style={{
            alignSelf: alignSelf,
            width: '100%',
            display: 'flex',
            justifyContent: 'center'
        }}>
            <Fieldset legend={legend} radius="lg" style={{ width: fieldsetWidth }}>
                {content}
                {showButton && (
                    <Group justify={justifyContent} mt="lg">
                        <Button style={{ width: buttonWidth }} onClick={onButtonClick}>
                            {buttonLabel}
                        </Button>
                    </Group>
                )}
            </Fieldset>
        </div>
    );
}

export default AmeFieldset;
