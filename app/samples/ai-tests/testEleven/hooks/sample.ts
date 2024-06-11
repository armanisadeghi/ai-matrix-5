import { useCallback, useEffect, useRef, useState } from 'react';

async function getStreamedResponse(api, chatRequest, mutate, messagesRef, generateId2) {
    const previousMessages = messagesRef.current;
    mutate(chatRequest.messages, false);

    const constructedMessagesPayload = chatRequest.messages.map(({ role, content }) => ({ role, content }));
    const responseMessage = { id: generateId2(), createdAt: new Date(), content: "", role: "assistant" };

    async function readRow(reader) {
        const { done, value } = await reader.read();
        if (done) return;

        const chunk = new TextDecoder().decode(value);
        responseMessage.content += chunk;
        mutate([...chatRequest.messages, { ...responseMessage }], false);
        await readRow(reader);
    }

    try {
        const response = await api({ messages: constructedMessagesPayload, data: chatRequest.data });
        const reader = response.body.getReader();
        await readRow(reader);
    } catch (e) {
        mutate(previousMessages, false);
        throw e;
    }

    return responseMessage;
}

async function processChatStream({ getStreamedResponse: getStreamedResponse2 }) {
    while (true) {
        const streamedResponseMessage = await getStreamedResponse2();
        if (!("messages" in streamedResponseMessage)) {
            break;
        }
    }
}

function useStreamChat({ api, initialMessages, initialInput = "", generateId }) {
    const [messages, setMessages] = useState(initialMessages || []);
    const [input, setInput] = useState(initialInput);
    const messagesRef = useRef(messages);

    useEffect(() => {
        messagesRef.current = messages;
    }, [messages]);

    const mutate = (newMessages, shouldRevalidate = true) => {
        setMessages(newMessages);
        if (shouldRevalidate) {
            messagesRef.current = newMessages;
        }
    };

    const triggerRequest = useCallback(async (chatRequest) => {
        try {
            await processChatStream({
                getStreamedResponse: () => getStreamedResponse(api, chatRequest, mutate, messagesRef, generateId)
            });
        } catch (err) {
            console.error('Error during chat stream:', err);
        }
    }, [api, generateId]);

    const append = useCallback(async (message) => {
        if (!message.id) {
            message.id = generateId();
        }
        const chatRequest = { messages: messagesRef.current.concat(message) };
        return triggerRequest(chatRequest);
    }, [triggerRequest, generateId]);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const newUserMessage = { id: generateId(), role: 'user', content: input, createdAt: new Date() };
        const updatedArray = [...messagesRef.current, newUserMessage];
        mutate(updatedArray, false);
        setInput('');
        append(newUserMessage);
    }, [input, append, mutate, generateId]);

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    return { messages, input, handleInputChange, handleSubmit };
}

export { useStreamChat };
