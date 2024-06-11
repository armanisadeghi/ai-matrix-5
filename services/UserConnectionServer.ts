// services/UserConnectionServer.ts
'use server';

import { cookies } from 'next/headers';
import { UserConnection } from './UserConnection';

export async function handler(req, res) {
    // Correctly initialize the cookie store
    const cookieStore = cookies();

    // The UserConnection instance can still be created with req.headers
    const userConnection = new UserConnection(req.headers, cookieStore);

    // Check if a specific cookie exists
    const cookieId = UserConnection.getOrCreateCookieId(cookieStore);

    // Optionally set a new cookie
    UserConnection.setCookie(cookieStore, 'guestUserId', cookieId);

    // Handle response
    res.json({ message: 'User data processed', cookieId });
}
