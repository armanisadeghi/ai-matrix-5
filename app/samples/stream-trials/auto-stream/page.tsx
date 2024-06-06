'use client';

import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import AutoChat from './AutoChatComponent';
import {
    activeChatMessagesArrayAtom,
    assistantTextStreamAtom,
    userTextInputAtom,
} from '../../ai-tests/shared/atoms/chatAtoms';
import {Textarea} from "@mantine/core";
import AmeJsonInput from "@/ui/json/AmeJsonInput";

const AutoStreamPage = () => {
    const [, setUserTextInput] = useRecoilState(userTextInputAtom);
    const [assistantTextStream] = useRecoilState(assistantTextStreamAtom);
    const [activeChatMessagesArray, setActiveChatMessagesArray] = useRecoilState(activeChatMessagesArrayAtom);
    const [userInput, setUserInput] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [shouldStartRequest, setShouldStartRequest] = useState(false);

    const handleSubmit = () => {
        setIsSubmitting(true);
        setUserTextInput(userInput);
        setShouldStartRequest(true);
        setUserInput('');
    };

    const handleRequestComplete = () => {
        setIsSubmitting(false);
        setShouldStartRequest(false);
    };

    const handleChangeValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setUserInput(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    return (
        <div>
            <div>

                <textarea
                    value={assistantTextStream}
                    readOnly
                    placeholder="Assistant's message will be streamed here..."
                    rows={10}
                    cols={50}
                />
            </div>
            <div>
                <textarea
                    value={userInput}
                    onChange={handleChangeValue}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message here..."
                    rows={5}
                    cols={50}
                    disabled={isSubmitting}
                />
                {isSubmitting && <div className="spinner">Loading...</div>}
            </div>
            <div>
                <button onClick={handleSubmit} disabled={isSubmitting}>Submit</button>
            </div>
            <AmeJsonInput
                label="Active Chat Messages Array"
                value={JSON.stringify(activeChatMessagesArray, null, 2)}
            />
            <AutoChat
                shouldStartRequest={shouldStartRequest}
                onRequestComplete={handleRequestComplete}
            />
        </div>
    );
};

export default AutoStreamPage;
