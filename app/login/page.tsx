/*
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";

export default function LoginForm() {
    const signIn = async () => {
        "use server";

        // 1. Create a Supabase client
        const supabase = createClient();
        const origin = headers().get("origin");
        // 2. Sign in with GitHub
        const { error, data } = await supabase.auth.signInWithOAuth({
            provider: "github",
            options: {
                redirectTo: `${origin}/auth/callback`,
            },
        });

        if (error) {
            console.log(error);
        } else {
            return redirect(data.url);
        }
        // 3. Redirect to landing page
    };

    return (
        <form action={signIn} className="flex-1 flex min-h-screen justify-center items-center">
            <button className="hover:bg-gray-800 p-8 rounded-xl">
                <Image
                    className="mx-auto mb-3"
                    src="/github-mark-white.png"
                    width={100}
                    height={100}
                    alt="GitHub logo"
                />
                Sign in with GitHub
            </button>
        </form>
    );
}
/*

/*
import { login, signup } from '@/app/login/actions';
import MatrixLogo from '@/public/MatrixLogo';
import { createClient } from '@/utils/supabase/server'
import { TextInput, PasswordInput, Paper, Group, Button, Divider, Stack, Container, Title, Space, Checkbox, Box } from '@mantine/core';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import classes from './Authentication.module.css';

export default function AuthenticationForm() {
    const handleSubmit = async (formData: any) => {
        'use server';
        const loginType = formData.get('loginType');


    const googleLogin = async () => {
        const supabase = createClient();
        const origin = headers().get('origin');
        const { error, data } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${origin}/auth/callback`,
            },
        });

        if (error) {
            console.log(error);
            // Handle error (e.g., by returning an error message)
        } else {
            return redirect(data.url);
        }
    };

    const gitHubLogin = async () => {
        const supabase = createClient();
        const origin = headers().get('origin');
        const { error, data } = await supabase.auth.signInWithOAuth({
            provider: 'github',
            options: {
                redirectTo: `${origin}/auth/callback`,
            },
        });

        if (error) {
            console.log(error);
            // Handle error (e.g., by returning an error message)
        } else {
            return redirect(data.url);
        }
    };

        switch (loginType) {
            case 'google':
                return await googleLogin();
            case 'github':
                return await gitHubLogin();
            case 'email-login':
                return await login(formData);
            case 'email-signup':
                return await signup(formData);
            default:
                throw new Error('Invalid login type');
        }
    };

    return (
        <Container size={420} my={85}>
            <Box
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: '10px',
                }}
            >
                <MatrixLogo width="100px" height="100px"/>
            </Box>
            <Paper radius="md" p="md" withBorder>
                <Title ta="center" className={classes.title}>
                    AI Matrix
                </Title>
                <Space h="lg"/>

                <form action={handleSubmit}>
                    <Group grow mb="md">
                        <Button
                            leftSection={<FcGoogle/>}
                            variant="default"
                            color="gray"
                            type="submit"
                            name="loginType"
                            value="google"
                        >
                            Google
                        </Button>
                        <Button
                            leftSection={<FaGithub/>}
                            variant="default"
                            color="gray"
                            type="submit"
                            name="loginType"
                            value="github"
                        >
                            GitHub
                        </Button>
                    </Group>

                    <Divider label="Or continue with email" labelPosition="center" my="lg"/>

                    <Stack>
                        <TextInput
                            name="email"
                            label="Email"
                            placeholder="hello@example.com"
                            radius="md"
                        />

                        <PasswordInput
                            name="password"
                            label="Password"
                            placeholder="Your password"
                            radius="md"
                        />
                    </Stack>

                    <Group justify="space-between" mt="xl">
                        <Checkbox radius="sm" label="Remember me"/>

                        <Button
                            type="submit"
                            fullWidth
                            mt="xs"
                            name="loginType"
                            value="email-login"
                        >
                            Log in
                        </Button>
                        <Button
                            type="submit"
                            fullWidth
                            mt="xs"
                            name="loginType"
                            value="email-signup"
                        >
                            Sign up
                        </Button>
                    </Group>
                </form>
            </Paper>
        </Container>
    );
}
*/

import { login, signup } from "./actions";

export default function LoginPage() {
    return (
        <form>
            <label htmlFor="email">Email:</label>
            <input id="email" name="email" type="email" required />
            <label htmlFor="password">Password:</label>
            <input id="password" name="password" type="password" required />
            <button formAction={login}>Log in</button>
            <button formAction={signup}>Sign up</button>
        </form>
    );
}
