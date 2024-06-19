// app/api/chat-history/route.ts

import { NextRequest, NextResponse } from 'next/server'
import loadChatHistory from '@/app/data/fake-data/fake-chat-history/fake-chat-history'
import { MongoClient } from 'mongodb'
import handleCorsMiddleware from '@/middleware/corsMiddleware'

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get('userId')
    const authToken = req.headers.get('authorization') // Placeholder for token extraction

    // Run the CORS middleware
    try {
        await handleCorsMiddleware(req)
    } catch (error) {
        console.error('CORS error:', error)
        return NextResponse.json({ error: 'CORS error' }, { status: 500 })
    }

    if (!userId) {
        console.error('User ID is required')
        return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    // Authentication and authorization logic can be added here
    // For example, validate authToken...

    const knownUserIds = ['armaniuid', 'natalieuid']
    let client: MongoClient | null = null

    try {
        if (knownUserIds.includes(userId)) {
            const chatHistories = await loadChatHistory()
            const userHistory = chatHistories.find((history) => history.userId === userId)
            if (userHistory) {
                return NextResponse.json(userHistory)
            } else {
                return NextResponse.json({ error: 'User not found' }, { status: 404 })
            }
        } else {
            client = new MongoClient('your-mongodb-connection-string-here')
            await client.connect()
            const db = client.db('your-db-name')
            const collection = db.collection('chatHistories')
            const userHistory = await collection.findOne({ userId: userId })

            if (userHistory) {
                return NextResponse.json(userHistory)
            } else {
                return NextResponse.json({ error: 'User not found in database' }, { status: 404 })
            }
        }
    } catch (error) {
        console.error('Error loading chat history:', error)
        return NextResponse.json({ error: 'Failed to load chat history' }, { status: 500 })
    } finally {
        if (client) {
            await client.close()
        }
    }
}
