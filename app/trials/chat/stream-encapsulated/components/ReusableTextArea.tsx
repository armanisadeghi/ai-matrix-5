// ReusableTextArea.tsx
import { userInputAtomFamily } from '@/state/aiAtoms/aiChatAtoms';
import React from 'react';
import { Textarea, Button, TextareaProps } from '@mantine/core';
import { useRecoilState } from 'recoil';

interface ReusableTextAreaProps extends Omit<TextareaProps, 'value' | 'onChange' | 'onSubmit'> {
    id: string;
    onCustomSubmit?: (value: string) => void;
}

const ReusableTextArea: React.FC<ReusableTextAreaProps> = ({ id, onCustomSubmit, ...props }) => {
    const [userTextInput, setUserTextInput] = useRecoilState(userInputAtomFamily(id));

    const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSubmit();
        }
    };

    const handleSubmit = () => {
        if (onCustomSubmit) {
            onCustomSubmit(userTextInput);
        }
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <Textarea
                placeholder="Type your message..."
                minRows={2}
                maxRows={8}
                autosize
                value={userTextInput}
                onChange={(event) => setUserTextInput(event.currentTarget.value)}
                onKeyPress={handleKeyPress}
                style={{ flex: 1, marginRight: '0.5rem' }}
                {...props}
            />
            <Button onClick={handleSubmit}>Submit</Button>
        </div>
    );
};

export default ReusableTextArea;
