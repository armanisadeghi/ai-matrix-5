// app/api/redis/central/dataHandler.ts

import { NextRequest } from 'next/server'
import { getRedisClient } from '../client'

export const handleDataRequest = async (req: NextRequest) => {
    try {
        const client = await getRedisClient()
        const { channel, data } = await req.json()

        if (!channel || !data) {
            console.log('Bad Request: Missing channel or data')
            return new Response('Bad Request', { status: 400 })
        }

        const payload = JSON.stringify(data)
        console.log(`Publishing payload to channel ${channel}: ${payload}`)
        await client.publish(channel, payload)
        console.log(`Payload published to channel ${channel}: ${payload}`)

        return new Response('Payload sent', { status: 200 })
    } catch (error) {
        console.error('Error in POST handler:', error)
        return new Response('Internal Server Error', { status: 500 })
    }
}

export const handleDataSubscription = (
    payload: string,
    controller: ReadableStreamDefaultController
) => {
    try {
        console.log('Payload received:', payload)
        const data = JSON.stringify({ data: JSON.parse(payload) })
        controller.enqueue(new TextEncoder().encode(data))
    } catch (error) {
        console.error('Error in subscription handler:', error)
        controller.error(error)
    }
}
