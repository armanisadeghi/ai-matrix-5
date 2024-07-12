import React, { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useSetRecoilState } from 'recoil';
import { activeUserAtom } from '@/state/userAtoms';
import { AuthProfile } from '@/types/user.types';
import { upsertFromAuth0 } from '@/hooks/users/upsertAuth0';
import LoadingPage from '@/app/trials/loading';

interface AuthWrapperProps {
    children: React.ReactNode;
}

export const AuthWrapper: React.FC<AuthWrapperProps> = React.memo(({ children }) => {
    const { user, error, isLoading } = useUser();
    const setActiveUser = useSetRecoilState(activeUserAtom);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const authenticateUser = async () => {
            if (user && !isAuthenticated) {
                try {
                    const matrixUser = await upsertFromAuth0(user as AuthProfile);
                    if (matrixUser) {
                        setActiveUser(matrixUser);
                        setIsAuthenticated(true);
                    } else {
                        console.error('Failed to upsert user');
                    }
                } catch (err) {
                    console.error('Error in authenticateUser:', err);
                }
            }
        };

        authenticateUser();
    }, [user, setActiveUser, isAuthenticated]);

    if (isLoading || !isAuthenticated) {
        return <LoadingPage />;
    }

    if (error) {
        return <div>Authentication error: {error.message}</div>;
    }

    return <>{children}</>;
});

AuthWrapper.displayName = 'AuthWrapper';
