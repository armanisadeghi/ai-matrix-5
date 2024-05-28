import type { NextApiRequest, NextApiResponse } from 'next';

export const corsMiddleware = (handler: (req: NextApiRequest, res: NextApiResponse) => void) => {
    return async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
        // Set CORS headers
        res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version');

        // Handle OPTIONS requests for preflight
        if (req.method === 'OPTIONS') {
            res.status(204).end();
            return;
        }

        // Call the actual handler function
        await handler(req, res);
    };
};