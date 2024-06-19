import 'server-only'
import { NextRequest, NextResponse } from 'next/server'
import UserChatManager from '@/services/UserChatManager'

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const user_id = searchParams.get('user_id')
    const chat_id = searchParams.get('chat_id')

    if (!user_id) {
        return NextResponse.json({ error: 'user_id is required' }, { status: 400 })
    }

    const userChatManager = new UserChatManager(user_id)

    if (chat_id) {
        // Handle specific chat retrieval
        await userChatManager.loadChatById(chat_id)
        const chat = userChatManager.getChatById(chat_id)
        if (chat) {
            return NextResponse.json(chat.getMessages(), { status: 200 })
        } else {
            return NextResponse.json({ message: 'Chat not found' }, { status: 404 })
        }
    } else {
        // Handle retrieval of all chats
        await userChatManager.loadChatsFromDb()
        const chats = userChatManager.getAllTitlesAndIds()
        return NextResponse.json(chats, { status: 200 })
    }
}

export async function POST(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const user_id = searchParams.get('user_id')
    const { chat_id, role, text } = await req.json()

    if (!user_id || !chat_id || !role || !text) {
        return NextResponse.json(
            { error: 'user_id, chat_id, role, and text are required' },
            { status: 400 }
        )
    }

    const userChatManager = new UserChatManager(user_id)

    await userChatManager.loadChatById(chat_id)
    const chat = userChatManager.getChatById(chat_id)
    if (chat) {
        await chat.addMessage(role, text)
        return NextResponse.json({ message: 'Message added successfully' }, { status: 201 })
    } else {
        return NextResponse.json({ message: 'Chat not found' }, { status: 404 })
    }
}

export async function OPTIONS(req: NextRequest) {
    const headers = new Headers()
    headers.set('Allow', 'GET, POST')
    return new NextResponse(null, { headers })
}
