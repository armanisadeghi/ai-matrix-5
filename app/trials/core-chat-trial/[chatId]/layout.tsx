import React from 'react';

const ChatLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="chat-layout">
            {children}
        </div>
    );
};

export default ChatLayout;
