// Redux store
import { Middleware } from "@reduxjs/toolkit";

/* const clientStore = configureStore({
    reducer: {
        visibleState: visibleStateReducer,
        stateReferences: stateReferencesReducer,
    },
    middleware: [websocketMiddleware]
}); */

// WebSocket middleware
const websocketMiddleware: Middleware = (store) => {
    let socket: WebSocket | null = null;

    return (next) => (action: any) => {
        switch (action.type) {
            case "CONNECT_WEBSOCKET":
                socket = new WebSocket("ws://your-server.com/state-sync");
                socket.onmessage = (event) => {
                    const { type, payload } = JSON.parse(event.data);
                    store.dispatch({ type, payload });
                };
                break;
            case "UPDATE_SERVER_STATE":
                if (socket) {
                    socket.send(JSON.stringify(action));
                }
                break;
            // ... other cases
        }
        return next(action);
    };
};

// Example of a state reference
interface StateReference {
    id: string;
    type: "sensitive_data" | "public_data";
}

// Action to request sensitive operation
const requestSensitiveOperation = (referenceId: string) => ({
    type: "REQUEST_SENSITIVE_OPERATION",
    payload: { referenceId },
});

/*

import asyncio
import websockets
import redis

# Server-side state store
redis_client = redis.Redis(host='localhost', port=6379, db=0)

async def state_sync(websocket, path):
    while True:
        message = await websocket.recv()
        data = json.loads(message)

        if data['type'] == 'REQUEST_SENSITIVE_OPERATION':
            # Fetch sensitive data using the reference
            sensitive_data = redis_client.get(data['payload']['referenceId'])

            # Perform sensitive operation
            result = perform_sensitive_operation(sensitive_data)

            # Send back only the result, not the sensitive data
            await websocket.send(json.dumps({
                'type': 'SENSITIVE_OPERATION_RESULT',
                'payload': result
            }))

# WebSocket server
start_server = websockets.serve(state_sync, "localhost", 8765)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()

*/
