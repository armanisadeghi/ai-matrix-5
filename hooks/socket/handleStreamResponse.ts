import { SetterOrUpdater } from 'recoil';

interface HandleStreamResponseProps {
    setStreamMessage: SetterOrUpdater<string>;
    setMessages: SetterOrUpdater<any[]>;
    setTaskStatus: SetterOrUpdater<string>;
}

export const handleStreamResponse = ({ setStreamMessage, setMessages, setTaskStatus }: HandleStreamResponseProps) => {
    let buffer = '';
    let count = 0;
    let fullText = '';

    const flushBuffer = () => {
        if (buffer.length > 0) {
            setStreamMessage((prevStreamMessage) => prevStreamMessage + buffer);
            console.log(count, '-', buffer);
            buffer = '';
        }
    };

    return (chunk: string) => {
        fullText += chunk;
        buffer += chunk;
        count++;

        if (count % 10 === 0) {
            flushBuffer();
        }

        setTaskStatus('streaming');

        // Check if this is the last chunk (you may need to adjust this condition based on your backend implementation)
        if (chunk.includes('[END_OF_STREAM]')) {
            flushBuffer(); // Flush any remaining buffer

            setMessages((prevMessages) => {
                const updatedMessages = prevMessages.map((message, i) => {
                    if (i === prevMessages.length - 1) {
                        return { ...message, text: fullText.replace('[END_OF_STREAM]', '') };
                    }
                    return message;
                });
                return updatedMessages;
            });

            setTaskStatus('success');
        }
    };
};
