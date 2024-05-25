import { Container, Paper, Input, Button } from '@mantine/core';
import { IconSend } from "@tabler/icons-react";

interface ChatFormInputProps {
    message: string;
    setMessage: (message: string) => void;
    submitHandler: (e: React.FormEvent<HTMLFormElement>) => void;
    isResponseLoading: boolean;
    errorText: string;
    style?: React.CSSProperties;
}

export const ChatFormInput = (
    {
        message,
        setMessage,
        submitHandler,
        isResponseLoading,
        errorText
    }: ChatFormInputProps) => {
    return (
        <Container style={{width: '100%'}}>
            <Paper>
                <form onSubmit={submitHandler}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%'
                    }}>
                        <Input
                            style={{
                                flex: 1,
                                marginRight: '8px'
                            }}
                            placeholder="Send a message"
                            value={isResponseLoading ? "Processing..." : message}
                            onChange={(e) => setMessage(e.target.value)}
                            readOnly={isResponseLoading}
                        />
                        <Button type="submit" radius="sm" style={{
                            height: '32px',
                            borderRadius: '4px'
                        }}>
                            <IconSend size={16}/>
                        </Button>
                    </div>
                </form>
            </Paper>
        </Container>
    );
};

export default ChatFormInput;
