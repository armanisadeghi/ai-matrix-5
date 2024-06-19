import { NextRequest, NextResponse } from 'next/server'
import { GET as getText, POST as postText } from './text/route'
import { GET as getData, POST as postData } from './data/route'

export const GET = async (req: NextRequest) => {
    const { searchParams } = new URL(req.url)
    const type = searchParams.get('type') || 'text'

    if (type === 'text') {
        return getText(req)
    } else if (type === 'data') {
        return getData(req)
    } else {
        return new Response('Bad Request: Invalid type', { status: 400 })
    }
}

export const POST = async (req: NextRequest) => {
    const { searchParams } = new URL(req.url)
    const type = searchParams.get('type') || 'text'

    if (type === 'text') {
        return postText(req)
    } else if (type === 'data') {
        return postData(req)
    } else {
        return new Response('Bad Request: Invalid type', { status: 400 })
    }
}
