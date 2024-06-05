import React from 'react';

interface MessageProps {
    type: string;
    text: string;
}

const Message: React.FC<MessageProps> = ({ type, text }) => (
    <div className={`message ${type}`}>{text}</div>
);

export default Message;
