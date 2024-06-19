// services/UserConnection.ts
'use client'

import { v4 as uuidv4 } from 'uuid'

// Simplified UserConnection class for server-side context
export class UserConnection {
    ipAddress: string
    userAgent: string
    referrer: string
    language: string
    screenResolution: string

    constructor(headers: any, cookies: any) {
        this.ipAddress = headers['x-forwarded-for'] || '' // Example, need accurate way to fetch IP
        this.userAgent = headers['user-agent'] || ''
        this.referrer = headers['referer'] || '' // Note the HTTP header misspelling 'referer'
        this.language = headers['accept-language'] || ''
        this.screenResolution = '' // Should be fetched client-side and passed to server if needed
    }

    // Server-side example of getting a cookie
    static getOrCreateCookieId(cookies: any): string {
        let cookieId = cookies.get('guestUserId')
        if (!cookieId) {
            cookieId = uuidv4()
            // Note: Setting cookie should be done in server action or handler
        }
        return cookieId
    }

    // Example of setting a cookie server-side
    static setCookie(cookies: any, name: string, value: string): void {
        cookies.set({
            name: name,
            value: value,
            path: '/',
            httpOnly: true,
            secure: true,
            maxAge: 31536000 // One year in seconds
        })
    }

    // Example of deleting a cookie server-side
    static deleteCookie(cookies: any, name: string): void {
        cookies.delete(name)
    }
}
