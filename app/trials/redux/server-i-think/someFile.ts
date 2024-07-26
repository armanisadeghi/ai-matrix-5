// Frontend (React/Redux)
import { configureStore } from '@reduxjs/toolkit';
import chatReducer, { addAssistantMessage, addUserMessage, updateAssistantMessage } from './chatSlice';
import userReducer from './userSlice';

export const store = configureStore({
    reducer: {
        chat: chatReducer,
        user: userReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// WebSocket connection
const socket = new WebSocket('ws://aimatrixengine.com/ws');

socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    const { chatId, message, messageId, text } = data;

    if (message) {
        if (message.role === 'user') {
            store.dispatch(addUserMessage({ chatId, message }));
        } else if (message.role === 'assistant') {
            store.dispatch(addAssistantMessage({ chatId, message }));
        }
    } else if (messageId && text) {
        store.dispatch(updateAssistantMessage({ chatId, messageId, text }));
    }
};

/*
// Backend (Python/FastAPI)

from fastapi import FastAPI, WebSocket
import json

app = FastAPI()
connected_clients = set()

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    connected_clients.add(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            # Process data, update backend state
            # Broadcast to all clients
            for client in connected_clients:
                await client.send_text(json.dumps(data))
    finally:
        connected_clients.remove(websocket)
*/
