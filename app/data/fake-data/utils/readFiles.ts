// pages/api/read-files.ts
'use server'

import { NextRequest, NextResponse } from 'next/server'
import corsMiddleware from '@/middleware/corsMiddleware'

async function handler(req: NextRequest) {
    const { readMultipleFiles } = await import('@/app/data/fake-data/utils/serverUtils')
    console.log('Incoming request:', req.method)
    if (req.method === 'POST') {
        const { fileNames } = await req.json()
        try {
            const fileContents = await readMultipleFiles(fileNames)
            return NextResponse.json(fileContents)
        } catch (error) {
            console.error('Error reading files:', error)
            return NextResponse.json({ error: 'Failed to read files' }, { status: 500 })
        }
    } else {
        return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
    }
}

export default async function (req: NextRequest) {
    try {
        await corsMiddleware(req)
        return await handler(req)
    } catch (error) {
        console.error('CORS middleware error:', error)
        return NextResponse.json({ error: 'CORS middleware error' }, { status: 500 })
    }
}
