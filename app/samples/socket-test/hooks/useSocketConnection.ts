import { useEffect, useRef, useCallback } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { activeUserAtom } from '@/state/userAtoms';
import { combinedSettingsState } from '@/state/aiAtoms/settingsAtoms';
import { taskStatusAtom } from '@/state/aiAtoms/aiChatAtoms';
import { MatrixUser } from '@/types';
import { io, Socket } from 'socket.io-client';

const URL = 'http://localhost:8000/';

export const useSocketConnection = () => {
    const activeUser = useRecoilValue(activeUserAtom);
    const combinedSettings = useRecoilValue(combinedSettingsState);
    const setTaskStatus = useSetRecoilState(taskStatusAtom);

    const socketRef = useRef<Socket | null>(null);
    const isConnectedRef = useRef(false);

    const initializeSocket = useCallback(() => {
        if (socketRef.current) {
            console.log('Socket already initialized, disconnecting');
            socketRef.current.disconnect();
        }

        console.log('Initializing socket for user:', activeUser?.auth0Sid);

        socketRef.current = io(`${URL}/authenticated`, {
            autoConnect: false,
            transports: ['websocket', 'polling'],
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
        });

        socketRef.current.on('connect', () => {
            console.log('Connected to authenticated namespace');
            isConnectedRef.current = true;
            setTaskStatus('connected');
            socketRef.current?.emit('authenticate', { user: activeUser });
        });

        socketRef.current.on('disconnect', () => {
            console.log('Socket disconnected');
            isConnectedRef.current = false;
            setTaskStatus('disconnected');
        });

        socketRef.current.on('authenticated', (data) => {
            console.log('Authentication successful:', data);
            setTaskStatus('authenticated');
        });

        socketRef.current.on('authentication_failed', (error) => {
            console.error('Authentication failed:', error);
            setTaskStatus('error');
        });

        socketRef.current.on('connect_error', (error) => {
            console.error('Connection error:', error);
            setTaskStatus('error');
        });

        socketRef.current.connect();
    }, [activeUser, setTaskStatus]);

    const closeSocket = useCallback(() => {
        if (socketRef.current) {
            socketRef.current.disconnect();
            socketRef.current = null;
            isConnectedRef.current = false;
            console.log('Socket disconnected and reset');
        }
    }, []);

    useEffect(() => {
        if (activeUser) {
            initializeSocket();
        }

        return () => {
            closeSocket();
        };
    }, [activeUser, initializeSocket, closeSocket]);

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden) {
                console.log('Page hidden, closing socket');
                closeSocket();
            } else {
                console.log('Page visible, reinitializing socket');
                if (activeUser) {
                    initializeSocket();
                }
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [activeUser, initializeSocket, closeSocket]);

    return {
        socket: socketRef.current,
        isConnected: isConnectedRef.current,
    };
};
