// app/dashboard/intelligence/chat-app/utils/socket.ts
import { io, Socket } from 'socket.io-client'

const URL = 'https://aimatrix.ngrok.app/'
let socket: Socket | null = null

export const initializeSocket = (userToken: string) => {
    if (!socket) {
        socket = io(URL, { autoConnect: false })

        socket.on('connect', () => {
            console.log('Connected to socket server')
            socket?.emit('authenticate', { token: userToken })
        })

        socket.on('disconnect', () => {
            console.log('Disconnected from socket server')
        })

        socket.on('error', (error: any) => {
            console.error('Socket.IO error:', error)
        })

        socket.connect()
    }
}

export const emitEvent = (
    eventName:
        | 'matrix_chat'
        | 'playground_stream'
        | 'run_recipe'
        | 'validation'
        | 'workflow' = 'matrix_chat',
    data: any,
    callback?: (response: any) => void
) => {
    if (!socket) return
    socket.emit(eventName, data, (response: any) => {
        if (callback) callback(response)
    })
}

export const waitForEvent = (eventName: string, callback: (data: any) => void) => {
    if (!socket) return
    socket.on(eventName, (data: any) => {
        callback(data)
    })
}

export const closeSocket = () => {
    if (socket && socket.connected) {
        socket.disconnect()
    }
}

export default socket
