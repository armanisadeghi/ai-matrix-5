import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;
const listenerQueue: Array<[string, (...args: any[]) => void]> = [];

const initSocket = () => {
    const url = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

    socket = io(url, {
        transports: ["websocket"],
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
    });

    console.log("Connecting to socket server:", url);

    socket.on("connect", () => {
        console.log("Socket connected");
        listenerQueue.forEach(([event, callback]) => {
            socket?.on(event, callback);
            console.log(`Listener added for event: ${event}`);
        });
        listenerQueue.length = 0; // Clear the queue
    });

    socket.on("disconnect", () => {
        console.log("Socket disconnected");
    });

    socket.on("connect_error", (error) => {
        console.error("Socket connection error:", error);
    });

    return socket;
};

// Initialize socket immediately
initSocket();

export const connectSocket = () => {
    if (!socket) {
        return initSocket();
    }
    return socket;
};

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
};

export const executeCommandSocket = (projectName: string, command: string) => {
    if (socket?.connected) {
        socket.emit("execute", { projectName, command });
    } else {
        console.warn("Socket not connected. Command not sent.");
    }
};

const addListener = (event: string, callback: (...args: any[]) => void) => {
    if (socket?.connected) {
        socket.on(event, callback);
        console.log(`Listener added for event: ${event}`);
    } else {
        listenerQueue.push([event, callback]);
        console.log(`Listener queued for event: ${event}`);
    }
};

export const onExecutionResult = (callback: (data: { stdout: string; stderr: string }) => void) => {
    addListener("executionResult", callback);
};

export const onExecutionError = (callback: (data: { error: string }) => void) => {
    addListener("executionError", callback);
};

export const onProjectCreationProgress = (callback: (data: { message: string }) => void) => {
    addListener("projectCreationProgress", callback);
};

export const onProjectCreationComplete = (callback: (data: { message: string }) => void) => {
    addListener("projectCreationComplete", callback);
};

export const onProjectCreationError = (callback: (data: { message: string }) => void) => {
    addListener("projectCreationError", callback);
};
