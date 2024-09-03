"use client";

import React, { useMemo, useCallback, useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import textareaStyles from "@/components/AiChat/UserInput/DynamicTextarea.module.css";
import useDynamicLayout from "@/hooks/ai/useDynamicChatLayout";
import {
    activeChatIdAtom,
    chatMessagesSelectorFamily,
    focusInputAtom,
    hasSubmittedMessageAtom,
    isNewChatAtom,
    submitChatIdAtom,
    userTextInputAtom,
} from "@/state/aiAtoms/aiChatAtoms";
import { simpleChatSettingsList } from "@/state/aiAtoms/settingsAtoms";
import AmeTextWithSlider from "@/ui/textarea/AmeTextWithSlider";

const UserInputArea: React.FC = React.memo(() => {
    const { textareaContainerRef } = useDynamicLayout();
    const [focusInput, setFocusInput] = useRecoilState(focusInputAtom);
    const activeChatId = useRecoilValue(activeChatIdAtom);
    const [isNewChat] = useRecoilState(isNewChatAtom);
    const [useHasSubmitted, setHasSubmittedMessage] = useRecoilState(hasSubmittedMessageAtom);
    const [userTextInput, setUserTextInput] = useRecoilState(userTextInputAtom);
    const { addFirstUserMessage, addUserMessage } = useRecoilValue(chatMessagesSelectorFamily(activeChatId));
    const [, setSubmitChatId] = useRecoilState(submitChatIdAtom);
    const [submitFirstMessage, setSubmitFirstMessage] = useState(false);
    const [submitCurrentChat, setSubmitCurrentChat] = useState(false);
    const [clearInput, setClearInput] = useState(false);

    const handleSubmit = useCallback(
        (text: string) => {
            console.log("UserInputArea::handleSubmit::text: ", text);

            if (text.length === 0 || useHasSubmitted) return;

            setHasSubmittedMessage(true);
            setUserTextInput(text);
            setSubmitChatId(activeChatId);
            if (isNewChat) {
                setSubmitFirstMessage(true);
            } else {
                setSubmitCurrentChat(true);
            }
        },
        [isNewChat, activeChatId, setSubmitChatId, setHasSubmittedMessage, setUserTextInput, useHasSubmitted],
    );

    useEffect(() => {
        if (!submitFirstMessage) return;
        addFirstUserMessage(userTextInput);
        setClearInput(true);
    }, [submitFirstMessage, activeChatId]);

    useEffect(() => {
        if (!submitCurrentChat) return;
        addUserMessage(userTextInput);
        setClearInput(true);
    }, [submitCurrentChat, activeChatId]);

    useEffect(() => {
        if (focusInput) {
            textareaContainerRef.current?.focus();
            setFocusInput(false); // Reset the focus state
        }
    }, [focusInput, textareaContainerRef, setFocusInput]);

    const handleInputCleared = useCallback(() => {
        setClearInput(false);
        setSubmitFirstMessage(false);
        setSubmitCurrentChat(false);
    }, []);

    const memoizedSettings = useMemo(() => simpleChatSettingsList, []);

    const memoizedProps = useMemo(
        () => ({
            className: textareaStyles.dynamicTextareaContainer,
            /*
        label: 'Let\'s get started...',

        placeholder: 'Enter your request or question here...',
 */
            modalType: "default" as const,
            settingAtomNames: memoizedSettings,
        }),
        [memoizedSettings],
    );

    return (
        <AmeTextWithSlider
            {...memoizedProps}
            ref={textareaContainerRef}
            onSubmit={handleSubmit}
            clearInput={clearInput}
            onInputCleared={handleInputCleared}
        />
    );
});

UserInputArea.displayName = "UserInputArea";

export default UserInputArea;
