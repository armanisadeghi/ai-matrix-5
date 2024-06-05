'use client';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';

const Login = () => {
    const { loginWithRedirect } = useAuth0();

    useEffect(() => {
        loginWithRedirect();
    }, [loginWithRedirect]);

    return <div>Loading...</div>;
};

export default Login;
