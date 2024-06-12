/*
'use client';

import React, { useState } from 'react';
import { UsersDb } from '@/utils/supabase/UsersDb';
import { User } from '@/types/user';


const TestUserFetch = () => {
    const [userData, setUserData] = useState<User | null>(null);
    const [error, setError] = useState<string>('');

    const handleFetchUser = async () => {
        const usersDb = new UsersDb();
        try {
            if (user) {
                setUserData(user);
            } else {
                setError('No user found');
            }
        } catch (err) {
            setError('Failed to fetch user');
            console.error(err);
        }
    };

    return (
        <div>
            <h1>Test Fetch User</h1>
            <button onClick={handleFetchUser}>Fetch User</button>
            {userData && (
                <div>
                    <h2>User Details</h2>
                    <p>ID: {userData.id}</p>
                    <p>Name: {userData.firstName} {userData.lastName}</p>
                    <p>Email: {userData.email}</p>
                    <p>Role: {userData.role}</p>
                    <p>Phone: {userData.phone}</p>
                </div>
            )}
            {error && <p>Error: {error}</p>}
        </div>
    );
};

export default TestUserFetch;
*/
