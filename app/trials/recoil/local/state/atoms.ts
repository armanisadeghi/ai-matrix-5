import { useState } from "react";
const useStartNewChat = () => {
    // const [chatDetails, setChatDetails] = useRecoilState(chatStartSelector);
    const [userTextInput, setUserTextInput] = useState("");

    const initiateNewChat = (userMessage: string) => {
        // Set user message
        setUserTextInput(userMessage);

        // Trigger chat start
        // startChat({} as ChatDetailsType); // Type assertion to satisfy TS, actual value doesn't matter
    };

    return { chatDetails: "", initiateNewChat };
};
