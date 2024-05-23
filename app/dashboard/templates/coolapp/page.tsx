'use client';
import { Checkbox, Group } from '@mantine/core';
import CustomCheckbox from '../../../../ui/checkbox/CustomCheckbox'; // Adjust path as necessary

const RunPage = () => {
    return (
        <div style={{ padding: 20 }}>
            <h1>Run App</h1>
            <p>This is the Cool App Page.</p>
            <Checkbox.Group
                defaultValue={['aimatrix']}
                label="Select your favorite Artificial Intelligence Frameworks"
                description="Choose one or more of the following options:"
                withAsterisk
            >
                <Group mt="xs">
                    <CustomCheckbox value="aimatrix" label="AI Matrix" />
                    <CustomCheckbox value="autogen" label="Microsoft Autogen" />
                    <CustomCheckbox value="langchain" label="Langchain" />
                    <CustomCheckbox value="crewai" label="Crew AI" />
                    <CustomCheckbox value="ollama" label="Ollama" />
                    <CustomCheckbox value="unsloth" label="Unsloth" />
                </Group>
            </Checkbox.Group>
        </div>
    );
};

export default RunPage;
