'use client';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';

const Login = () => {
    const { loginWithRedirect, user } = useAuth0();

    console.log('user', user);

    useEffect(() => {
        loginWithRedirect();
    }, [loginWithRedirect]);

    return <div>Loading...</div>;
};

export default Login;
