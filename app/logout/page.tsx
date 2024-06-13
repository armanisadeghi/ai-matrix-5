'use client';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Logout = () => {
    const { logout } = useAuth0();
    const router = useRouter();

    useEffect(() => {
        logout();
    }, [logout]);

    return <div>Loading...</div>;
};

export default Logout;
