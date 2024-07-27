// components/AuthWrapper.tsx

import { activeUserAtom } from '@/state/userAtoms';
import React, { useEffect, useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store'; // Update this line to import AppDispatch
import { setUser, setLoading, setError } from '@/redux/features/user/userSlice';
import { initializeSocket } from '@/redux/features/socket/socketActions';
import { AuthProfile, MatrixUser } from '@/types/user.types';
import { upsertFromAuth0 } from '@/hooks/users/upsertAuth0';
import LoadingPage from '@/app/trials/loading';
import { useSetRecoilState } from 'recoil';

interface AuthWrapperProps {
    children: React.ReactNode;
}

export const AuthWrapper: React.FC<AuthWrapperProps> = React.memo(({ children }) => {
    const { user, error: auth0Error, isLoading: auth0Loading } = useUser();
    const dispatch = useDispatch<AppDispatch>(); // Use the typed dispatch here
    const { currentUser, isLoading, error } = useSelector((state: RootState) => state.user);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const setActiveUser = useSetRecoilState(activeUserAtom);

    useEffect(() => {
        const authenticateUser = async () => {
            if (user && !isAuthenticated) {
                dispatch(setLoading(true));
                try {
                    const matrixUser = await upsertFromAuth0(user as AuthProfile);
                    if (matrixUser) {
                        dispatch(setUser(matrixUser));
                        setIsAuthenticated(true);
                        setActiveUser(matrixUser);
                        dispatch(initializeSocket()); // Make sure initializeSocket returns a proper thunk action
                    } else {
                        dispatch(setError('Failed to upsert user'));
                    }
                } catch (err) {
                    dispatch(setError(err instanceof Error ? err.message : 'An unknown error occurred'));
                } finally {
                    console.log('Redux AuthWrapper Finally block')
                    dispatch(setLoading(false));
                }
            }
        };

        authenticateUser();
    }, [user, dispatch, isAuthenticated]);

    if (auth0Loading || isLoading || !isAuthenticated) {
        return <LoadingPage />;
    }

    if (auth0Error || error) {
        return <div>Authentication error: {(auth0Error || error)?.toString()}</div>;
    }

    return <>{children}</>;
});

AuthWrapper.displayName = 'AuthWrapper';
