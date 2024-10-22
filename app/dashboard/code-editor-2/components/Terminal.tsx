import React, { useState, useRef, useEffect } from "react";
import { connectSocket } from "@/app/dashboard/code-editor-2/utils";

interface Props {
    projectName: string;
}

export const Terminal: React.FC<Props> = ({ projectName }) => {
    const [history, setHistory] = useState([
        { content: `Welcome to the terminal. Project: ${projectName}`, type: "system" },
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isExecuting, setIsExecuting] = useState(false);
    const terminalRef = useRef(null);
    const inputRef = useRef(null);
    const socketRef = useRef(null);

    useEffect(() => {
        // Initialize socket connection
        socketRef.current = connectSocket();

        // Set up socket event listeners
        const handleExecutionResult = ({ stdout, stderr }) => {
            setHistory((prev) => [
                ...prev,
                ...(stdout ? [{ content: stdout, type: "output" }] : []),
                ...(stderr ? [{ content: stderr, type: "error" }] : []),
            ]);
            setIsExecuting(false);
        };

        const handleExecutionError = ({ error }) => {
            setHistory((prev) => [...prev, { content: `Error: ${error}`, type: "error" }]);
            setIsExecuting(false);
        };

        // Add listeners using the socket reference
        socketRef.current.on("executionResult", handleExecutionResult);
        socketRef.current.on("executionError", handleExecutionError);

        return () => {
            if (socketRef.current) {
                socketRef.current.off("executionResult", handleExecutionResult);
                socketRef.current.off("executionError", handleExecutionError);
            }
        };
    }, []);

    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [history]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!inputValue.trim() || isExecuting) return;

        const command = inputValue.trim();
        setHistory((prev) => [...prev, { content: `$ ${command}`, type: "command" }]);
        setInputValue("");
        setIsExecuting(true);

        // Emit the command using the socket reference
        if (socketRef.current) {
            socketRef.current.emit("execute", {
                projectName,
                command,
            });
        } else {
            setHistory((prev) => [
                ...prev,
                {
                    content: "Error: Socket connection not available",
                    type: "error",
                },
            ]);
            setIsExecuting(false);
        }
    };

    const handleTerminalClick = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    return (
        <div
            className="bg-black text-green-500 p-4 font-mono text-sm rounded-lg h-64 flex flex-col"
            onClick={handleTerminalClick}
        >
            <div ref={terminalRef} className="flex-1 overflow-auto">
                {history.map((entry, index) => (
                    <div
                        key={index}
                        className={`mb-1 break-all whitespace-pre-wrap ${
                            entry.type === "system"
                                ? "text-blue-400"
                                : entry.type === "error"
                                  ? "text-red-400"
                                  : entry.type === "command"
                                    ? "text-yellow-400"
                                    : "text-green-400"
                        }`}
                    >
                        {entry.content}
                    </div>
                ))}
                {isExecuting && <div className="text-yellow-400">Executing command...</div>}
            </div>
            <form onSubmit={handleSubmit} className="flex items-center mt-2">
                <span className="text-yellow-400 mr-2">$</span>
                <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="flex-1 bg-transparent border-none outline-none text-green-500"
                    placeholder={isExecuting ? "Waiting for command to complete..." : ""}
                    disabled={isExecuting}
                    autoFocus
                />
            </form>
        </div>
    );
};
