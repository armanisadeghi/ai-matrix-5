import React from 'react';

const UserMessage: React.FC<{ message: string }> = ({ message }) => {
    return (
        <div className="user-message">
            {message}
        </div>
    );
};

export default UserMessage;
