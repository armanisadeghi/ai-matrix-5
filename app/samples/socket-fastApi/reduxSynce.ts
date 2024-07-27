// Frontend (React/Redux)

import { createSlice, configureStore } from '@reduxjs/toolkit';

const dataSlice = createSlice({
    name: 'data',
    initialState: { value: [] },
    reducers: {
        updateData: (state, action) => {
            state.value = action.payload;
        },
    },
});

const store = configureStore({
    reducer: {
        data: dataSlice.reducer,
    },
});

// WebSocket connection
const socket = new WebSocket('ws://localhost:8000/ws');

socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    store.dispatch(dataSlice.actions.updateData(data));
};


/* Python FastAPI backend

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
                await client.send_text(json.dumps({"newData": data}))
    finally:
        connected_clients.remove(websocket)



 */
