type WebSocketStatus = 'acknowledged' | 'error' | 'response';

interface User {
    id: string;
    token: string;
}

interface TaskSpecs {
    class: string;
    module: string;
    function: string;
}

interface Metadata {
    event: string;
    task: string;
    index: string;
    taskSpecs: TaskSpecs;
    requestId: string;
    timestamp: string;
    source: string;
    user: User;
}

interface Request {
    channel: 'webSocket' | 'socketIO' | 'dbTask' | 'restAPI' | 'other';
    metadata: Metadata;
    data: Record<string, any>;
    settings: Record<string, any>;
}

interface WebSocketMessage {
    index: string;
    status: WebSocketStatus;
    result?: any;
    message?: string;
}

const socket = new WebSocket('ws://your_backend_websocket_url/');

socket.onopen = function () {
    console.log('WebSocket is open now.');
};

socket.onmessage = function (event: MessageEvent) {
    const message: WebSocketMessage = JSON.parse(event.data);
    const index = message.index;
    const status = message.status;
    const result = message.result;
    const error = message.message;

    if (status === 'acknowledged') {
        console.log(`Task ${index} acknowledged: ${error}`);
    } else if (status === 'error') {
        console.error(`Error for task ${index}: ${error}`);
    } else {
        handleResponse(index, result);
    }
};

socket.onclose = function () {
    console.log('WebSocket is closed now.');
};

socket.onerror = function (error: Event) {
    console.error('WebSocket error observed:', error);
};

function sendRequest(request: Request) {
    const message = JSON.stringify(request);
    socket.send(message);
}

function handleResponse(index: string, result: any) {
    console.log(`Response for task ${index}:`, result);
    // Update UI with the received result
}

export { sendRequest };
