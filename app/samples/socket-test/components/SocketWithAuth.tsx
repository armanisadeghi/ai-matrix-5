// SocketWithAuth.tsx

"use client";

import { socketStatusAtom } from "@/state/aiAtoms/aiChatAtoms";
import {
    isAuthenticatedAtom,
    socketNamespaceAtom,
    socketSessionUrlAtom,
    socketSessionUrlSelector,
    socketSidAtom,
} from "@/state/aiAtoms/recipeAtoms";
import { activeUserAtom } from "@/state/userAtoms";
import { SocketManager } from "@/utils/socketio/SocketManager";
import { SocketStatus } from "@/utils/socketio/types";
import { SimpleGrid } from "@mantine/core";
import React, { createContext, useContext, useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

interface SocketWithAuthProps {
    children: React.ReactNode;
}

interface SocketContextValue {
    socketManager: SocketManager;
    socketStatus: SocketStatus;
    isAuthenticated: boolean;
    matrixId: string | null;
    socketNamespace: string;
    socketSid: string | null;
    socket: any;
}

export const SocketContext = createContext<SocketContextValue | null>(null);

export const useSocket = () => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error("useSocket must be used within a SocketWithAuth provider");
    }
    return context;
};

const SocketWithAuth: React.FC<SocketWithAuthProps> = ({children}) => {
    const activeUser = useRecoilValue(activeUserAtom);
    const [socketStatus, setSocketStatus] = useRecoilState(socketStatusAtom);
    const socketNamespace = useRecoilValue(socketNamespaceAtom);
    const matrixId = activeUser?.matrixId;
    const [socketSid, setSocketSid] = useRecoilState(socketSidAtom);
    const [isAuthenticated, setIsAuthenticated] = useRecoilState(isAuthenticatedAtom);
    const sessionUrl = useRecoilValue(socketSessionUrlSelector);
    const setSessionUrl = useSetRecoilState(socketSessionUrlAtom);

    useEffect(() => {
        setSessionUrl(sessionUrl);
    }, [sessionUrl, setSessionUrl]);

    const socketManager = SocketManager.getInstance(matrixId, sessionUrl, socketNamespace);

    useEffect(() => {
        const handleSocketStatusChange = (status: SocketStatus) => {
            setSocketStatus(status);
            if (status === "connected") {
            }
        };

        socketManager.initialize(handleSocketStatusChange, setIsAuthenticated,setSocketSid);
        socketManager.setupSocket();

        return () => {
            socketManager.disconnect();
        };
    }, [socketManager, isAuthenticated, setSocketStatus, setIsAuthenticated]);

    useEffect(() => {
        if (socketStatus === "connected" && activeUser && !isAuthenticated) {
            socketManager.authenticateUser(activeUser);
            setSocketSid(socketManager.getSocketSid());
        }
    }, [socketStatus, activeUser, isAuthenticated]);

    const contextValue: SocketContextValue = {
        socketManager,
        socketStatus,
        isAuthenticated,
        matrixId,
        socketNamespace,
        socketSid,
        socket: socketManager.getSocket(),
    };

    return (
        <SocketContext.Provider value={contextValue}>
            <div style={{ padding: "10px", border: "1px solid gray", marginBottom: "10px" }}>
                <SimpleGrid cols={4}>
                    <div>User Session Status</div>
                    <div>Socket SID:</div>
                    <div>Socket Namespace:</div>
                    <div>Authentication Status</div>
                    <div>{socketStatus}</div>
                    <div>{socketSid}</div>
                    <div>{socketNamespace}</div>
                    <div>{isAuthenticated.toString()}</div>
                </SimpleGrid>
            </div>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketWithAuth;
