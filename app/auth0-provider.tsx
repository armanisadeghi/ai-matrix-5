'use client';

import { Auth0Provider, Auth0ProviderOptions } from '@auth0/auth0-react';
import { useRouter } from 'next/navigation';
import React, { ReactNode } from 'react';

const Auth0ProviderWithRouter = ({ children }: { children: ReactNode }) => {
    const router = useRouter();

    const onRedirectCallback = (appState?: any) => {
        router.push(appState?.returnTo || '/');
    };

    return (
        <Auth0Provider
            domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN!}
            clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID!}
            authorizationParams={{
                redirect_uri: typeof window !== 'undefined' ? window.location.origin : '',
            }}
            onRedirectCallback={onRedirectCallback}
        >
            {children}
        </Auth0Provider>
    );
};

export default Auth0ProviderWithRouter;
