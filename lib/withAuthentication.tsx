'use client';
import { useAuth0 } from '@auth0/auth0-react';
import { useRouter } from 'next/navigation';
import React, { ComponentType, useEffect } from 'react';

const withAuthentication = (Component: ComponentType) => {
    return function AuthenticatedComponent(props: any) {
        const { isAuthenticated, isLoading } = useAuth0();
        const router = useRouter();

        useEffect(() => {
            if (!isLoading && !isAuthenticated) {
                router.push('/login');
            }
        }, [isAuthenticated, isLoading, router]);

        if (isLoading || !isAuthenticated) {
            return <div>Loading...</div>;
        }

        return <Component {...props} />;
    };
};

export default withAuthentication;
