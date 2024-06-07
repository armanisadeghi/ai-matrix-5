// UserInputArea.tsx

import React from 'react';
import { Button, Grid, Slider, Space, Textarea } from "@mantine/core";

interface UserInputAreaProps {
    userTextInput: string;
    setUserTextInput: (value: string) => void;
    handleSubmit: (event: React.FormEvent) => void;
}

const UserInputArea: React.FC<UserInputAreaProps> = ({ userTextInput, setUserTextInput, handleSubmit }) => {
    return (
        <form onSubmit={handleSubmit} style={{ marginTop: 'auto' }}>
            <Space h={8} />
            <Textarea value={userTextInput} onChange={(e) => setUserTextInput(e.target.value)} />
            <Space h={8} />
            <Grid>
                <Grid.Col span={9} style={{ display: 'flex', alignItems: 'center' }}>
                    <Slider color="gray" size="xs" min={0} max={10} style={{ width: '100%' }} />
                </Grid.Col>
                <Grid.Col span={3} style={{ display: 'flex', alignItems: 'center', minWidth: '100px' }}>
                    <Button type="submit" style={{ flex: 1 }}>Submit</Button>
                </Grid.Col>
            </Grid>
        </form>
    );
};

export default UserInputArea;
