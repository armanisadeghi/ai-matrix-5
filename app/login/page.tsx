// 'use client';
// import { useAuth0 } from '@auth0/auth0-react';
// import { useEffect } from 'react';

// const Login = () => {
//     const { loginWithRedirect } = useAuth0();

//     useEffect(() => {
//         loginWithRedirect();
//     }, [loginWithRedirect]);

//     return <div>Loading...</div>;
// };

// export default Login;
import { Container, Title, TextInput, Group, Button, Stack } from '@mantine/core'
import { login, signup } from './actions'

export default function LoginPage() {
    return (
        <Container size="sm" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Title order={2}>Login</Title>
            <Stack>
                <TextInput label="Email" id="email" name="email" type="email" required />
                <TextInput label="Password" id="password" name="password" type="password" required />
                <Group p="center">
                    <Button formAction={login} type="submit">Login</Button>
                    <Button formAction={signup} type="button">Signup</Button>
                </Group>
            </Stack>
        </Container>
    )
}