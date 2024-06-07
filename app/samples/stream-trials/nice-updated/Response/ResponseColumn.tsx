// ResponseColumn.tsx

import React from 'react';
import ResponseTextArea from './ResponseTextArea';
import UserMessagePaper from './UserMessagePaper';

interface ResponseColumnProps {
    messages: { userMessage: string; response: string }[];
}

const ResponseColumn: React.FC<ResponseColumnProps> = ({ messages }) => {
    return (
        <div>
            {messages.map((entry, index) => (
                <div key={index}>
                    <UserMessagePaper userMessage={entry.userMessage} />
                    <ResponseTextArea response={entry.response} />
                </div>
            ))}
        </div>
    );
};

export default ResponseColumn;
