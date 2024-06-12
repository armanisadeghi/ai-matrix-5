'use client';

import { Auth0Provider, Auth0ProviderOptions, useAuth0 } from '@auth0/auth0-react';
import { useRouter } from 'next/navigation';
import React, { ReactNode, useEffect, useState } from 'react';

const Auth0ProviderWithRouter = ({ children }: { children: ReactNode }) => {
    const router = useRouter();

    const { isAuthenticated } = useAuth0();

    const onRedirectCallback = (appState?: any) => {
        const redirectPath = localStorage.getItem('redirect_path');
        if (redirectPath) {
            localStorage.removeItem('redirect_path');
            router.push(redirectPath);
        } else {
            router.push('/');
        }
    };

    useEffect(() => {
        // Redirect to the original page after successful authentication
        if (!isAuthenticated) {
            if (window.location.pathname === '/' || window.location.pathname === '/callback') return;
            localStorage.setItem('redirect_path', window.location.pathname);
            router.push('/login');
        }
    }, [isAuthenticated]);

    return (
        <Auth0Provider
            domain={process.env.AUTH0_ISSUER_BASE_URL!}
            clientId={process.env.AUTH0_CLIENT_ID!}
            authorizationParams={{
                redirect_uri: process.env.REDIRECT_URI,
                scope: process.env.AUTH0_SCOPE,
            }}
            onRedirectCallback={onRedirectCallback}
        >
            {children}
        </Auth0Provider>
    );
};

export default Auth0ProviderWithRouter;
