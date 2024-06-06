'use client';

import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import AutoChat from './AutoChatComponent';
import {
    assistantTextStreamAtom,
    userTextInputAtom,
} from '../../ai-tests/shared/atoms/chatAtoms';

const AutoStreamPage = () => {
    const [userTextInput, setUserTextInput] = useRecoilState(userTextInputAtom);
    const [assistantTextStream] = useRecoilState(assistantTextStreamAtom);
    const [startAutoChat, setStartAutoChat] = useState(false);

    const handleSubmit = () => {
        setStartAutoChat(true);
    };

    const handleRequestComplete = () => {
        setStartAutoChat(false);
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
                    value={userTextInput}
                    onChange={(e) => setUserTextInput(e.target.value)}
                    placeholder="Type your message here..."
                    rows={5}
                    cols={50}
                />
            </div>
            <div>
                <button onClick={handleSubmit}>Submit</button>
            </div>
            {startAutoChat && (
                <AutoChat
                    userTextInput={userTextInput}
                    onRequestComplete={handleRequestComplete}
                />
            )}
        </div>
    );
};

export default AutoStreamPage;
