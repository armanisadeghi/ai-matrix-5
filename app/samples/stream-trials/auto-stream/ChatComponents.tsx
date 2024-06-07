'use client';

import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import AutoChat from './AtomStreamer';
import {
    activeChatMessagesArrayAtom,
    assistantTextStreamAtom,
    userTextInputAtom,
} from '../../ai-tests/shared/atoms/chatAtoms';
import AmeJsonInput from "@/ui/json/AmeJsonInput";
import { Space, Textarea } from "@mantine/core";

const AutoStreamPage = () => {
    const [userTextInput, setUserTextInput] = useRecoilState(userTextInputAtom);
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
        if (e.key === 'Enter') {
            console.log('Enter pressed');
            if (!e.shiftKey && !e.ctrlKey && !e.metaKey) { // No modifiers
                e.preventDefault();
                handleSubmit();
            } else {
                // Do nothing when Shift, Ctrl, or Cmd are held with Enter
            }
        }
        // Do nothing if Enter is not pressed
    };

    return (
        <div>
            <div>

                <Textarea
                    value={assistantTextStream}
                    readOnly
                    placeholder="Assistant's message will be streamed here..."
                    rows={10}
                    cols={50}
                />
            </div>
            <Space h={50}/>

            <div>
                <Textarea
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
            <Space h={20}/>
            <div>
                <button onClick={handleSubmit} disabled={isSubmitting}>Submit</button>
            </div>
            <Space h={60}/>
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
