/*
import { SocketManager, SocketStatus } from '@/utils/socketio/SocketManager';
import React, { createContext, useContext, useState } from 'react';

const SocketContext = createContext<SocketManager | null>(null);

export const SocketProvider: React.FC = ({ children }) => {
    const [socketStatus, setSocketStatus] = useState<SocketStatus>('not-connected');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);

    const socketManager = SocketManager.getInstance(
        setSocketStatus,
        setIsAuthenticated,
        setUserId
    );

    return (
        <SocketContext.Provider value={socketManager}>
            {children}
            </SocketContext.Provider>
    );
};

export const useSocket = () => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error('useSocket must be used within a SocketProvider');
    }
    return context;
};
*/
