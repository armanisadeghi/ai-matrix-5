import React from 'react';

const AssistantMessage: React.FC<{ message: string }> = ({ message }) => {
    return (
        <div className="assistant-message">
            {message}
        </div>
    );
};

export default AssistantMessage;
