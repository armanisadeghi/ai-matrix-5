import { v4 as uuidv4 } from 'uuid';

// TODO Armani Set this up properly to get the data in the earliest layout and do some checks and create settings
// In the early stages, let it just run in the background and collect data without doing anything with it yet.
// Put things in there to address localhost so we don't get strange things happening.
// Remember to log counts of everything so we know how many times they've logged in, etc.

export class UserConnection {
    ipAddress: string;
    userAgent: string;
    referrer: string;
    language: string;
    screenResolution: string;
    localStorageId: string;
    cookieId: string;

    constructor() {
        if (typeof window !== 'undefined' && typeof navigator !== 'undefined' && typeof document !== 'undefined') {
            this.ipAddress = "unknown"; // Placeholder: Use server-side method to get the actual IP
            this.userAgent = navigator.userAgent;
            this.referrer = document.referrer;
            this.language = navigator.language;
            this.screenResolution = `${window.screen.width}x${window.screen.height}`;
            this.localStorageId = this.getOrCreateLocalStorageId();
            this.cookieId = this.getOrCreateCookieId();
        } else {
            // Set default values for server-side rendering
            this.ipAddress = '';
            this.userAgent = '';
            this.referrer = '';
            this.language = '';
            this.screenResolution = '';
            this.localStorageId = '';
            this.cookieId = '';
        }
    }

    private getOrCreateLocalStorageId(): string {
        if (typeof localStorage !== 'undefined') {
            let ids = JSON.parse(localStorage.getItem('guestUserIds') || '[]');
            let id = ids[0]; // Get the first ID, or create a new one if none exist
            if (!id) {
                id = uuidv4();
                ids.push(id);
                localStorage.setItem('guestUserIds', JSON.stringify(ids));
            }
            return id;
        }
        return '';
    }

    public addLocalStorageId(id: string): void {
        if (typeof localStorage !== 'undefined') {
            let ids = JSON.parse(localStorage.getItem('guestUserIds') || '[]');
            if (!ids.includes(id)) {
                ids.push(id);
                localStorage.setItem('guestUserIds', JSON.stringify(ids));
            }
        }
    }

    private getOrCreateCookieId(): string {
        if (typeof document !== 'undefined') {
            let id = this.getCookie('guestUserId');
            if (!id) {
                id = uuidv4();
                this.setCookie('guestUserId', id, 365);
            }
            return id;
        }
        return '';
    }

    private getCookie(name: string): string | null {
        if (typeof document !== 'undefined') {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
        }
        return null;
    }

    private setCookie(name: string, value: string, days: number) {
        if (typeof document !== 'undefined') {
            const expires = new Date(Date.now() + days * 86400000).toUTCString();
            document.cookie = `${name}=${value}; expires=${expires}; path=/`;
        }
    }
}
