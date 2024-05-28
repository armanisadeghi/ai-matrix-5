'use client';

import { Auth0Provider, Auth0ProviderOptions } from '@auth0/auth0-react';
import { useRouter } from 'next/navigation';
import React, { ReactNode } from 'react';

const Auth0ProviderWithRouter = ({ children }: { children: ReactNode }) => {
    const router = useRouter();

    const onRedirectCallback = (appState?: any) => {
        console.log('appState', appState)
        router.push(appState?.returnTo || '/');
    };

    return (
        <Auth0Provider
            domain='https://dev-o2yp8ppjqv8zsol1.us.auth0.com'
            clientId='axa0VzFd03KMz1zO2UjD622rkHL2gAYt'
            authorizationParams={{
                redirect_uri: typeof window !== 'undefined' ? window.location.origin : '',
                scope: "openid profile email",
            }}
            onRedirectCallback={onRedirectCallback}
        >
            {children}
        </Auth0Provider>
    );
};

export default Auth0ProviderWithRouter;
