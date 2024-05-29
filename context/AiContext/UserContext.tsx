// /chat-app/AiContext/UserContext.tsx
'use client';
import React, { createContext, useState, ReactNode, useEffect } from 'react';

interface UserData {
    userId: string;
    isAuthenticated: boolean;
    userToken: string;
}

interface UserContextType {
    userData: UserData;
    updateUserData: (info: UserData) => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [userData, setUserData] = useState<UserData>({
        userId: '',
        isAuthenticated: false,
        userToken: ''
    });

    useEffect(() => {
        // Check for a hardcoded flag (e.g., in localStorage or an environment variable)
        const hardcodedFlag = localStorage.getItem('useHardcodedUser');

        if (hardcodedFlag === 'true') {
            // Set hardcoded user data
            setUserData({
                userId: 'armaniuid',
                isAuthenticated: true,
                userToken: 'hardcodedUserToken'
            });
        } else {
            const storedUserData = localStorage.getItem('userData');
            if (storedUserData) {
                const parsedUserData = JSON.parse(storedUserData);
                setUserData({
                    userId: parsedUserData.userId,
                    isAuthenticated: parsedUserData.isAuthenticated,
                    userToken: parsedUserData.userToken
                });
            }
        }
    }, []);

    const updateUserData = (info: UserData) => {
        setUserData(info);
        localStorage.setItem('userData', JSON.stringify(info));
    };

    return (
        <UserContext.Provider value={{ userData, updateUserData }}>
            {children}
        </UserContext.Provider>
    );
};
