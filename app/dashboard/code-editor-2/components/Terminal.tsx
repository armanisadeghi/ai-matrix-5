import React, { useState, useRef, useEffect } from "react";
import { IconTerminal2 } from "@tabler/icons-react";
import {
    executeCommandSocket,
    onExecutionResult,
    onExecutionError,
    connectSocket,
    disconnectSocket,
} from "../utils/socket";
import { startContainer, stopContainer, getContainerStatus } from "../utils/api";

interface Command {
    input: string;
    output: string;
    isError: boolean;
    timestamp?: number;
}

interface Props {
    projectName: string;
}

export const Terminal: React.FC<Props> = ({ projectName }) => {
    const [commands, setCommands] = useState([]);
    const [currentInput, setCurrentInput] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [currentProcess, setCurrentProcess] = useState<string | null>(null);

    const terminalRef = useRef(null);
    const inputRef = useRef(null);
    const socketRef = useRef<any>(null);
    const lastCommandRef = useRef<string | null>(null);

    const addCommandToHistory = (input: string, output: string, isError = false) => {
        setCommands((prev) => {
            // If this is a command input (not output), store it for later reference
            if (input && !output) {
                lastCommandRef.current = input;
                return [...prev, { input, output, isError, timestamp: Date.now() }];
            }

            // If this is command output and matches the last command, update that command
            if (!input && output && lastCommandRef.current) {
                const lastCommand = lastCommandRef.current;
                lastCommandRef.current = null; // Clear the reference

                const lastIndex = prev.findIndex((cmd) => cmd.input === lastCommand);
                if (lastIndex !== -1) {
                    const newCommands = [...prev];
                    newCommands[lastIndex] = {
                        ...newCommands[lastIndex],
                        output,
                        isError,
                    };
                    return newCommands;
                }
            }

            // Otherwise, add as new command output
            return [...prev, { input, output, isError, timestamp: Date.now() }];
        });
    };

    const handleContainerCommand = async (command: string) => {
        setIsProcessing(true);
        setCurrentProcess(command);
        try {
            if (command === "npm run start" || command === "npm run dev") {
                const response = await startContainer(projectName);
                addCommandToHistory("", `Container started successfully on port ${response.port}`);
                socketRef.current = connectSocket();
            } else if (command === "npm run stop") {
                await stopServer();
            }
        } catch (error: any) {
            addCommandToHistory("", `Error: ${error.message}`, true);
        }
        if (command === "npm run stop") {
            setIsProcessing(false);
            setCurrentProcess(null);
        }
    };

    const availableCommands = {
        help: () => ({
            output: `Available commands:
  npm run start/dev - Start the development server
  npm run stop - Stop the development server
  npm install [package] - Install a package
  status - Check container status
  clear - Clear terminal
  help - Show this help message

Keyboard shortcuts:
  Ctrl+C - Interrupt current process`,
            isError: false,
        }),
        clear: () => {
            setCommands([]);
            return null;
        },
        status: async () => {
            try {
                const response = await getContainerStatus(projectName);
                return {
                    output: `Container status: ${response.status}`,
                    isError: false,
                };
            } catch (error: any) {
                return {
                    output: `Error getting status: ${error.message}`,
                    isError: true,
                };
            }
        },
    };

    const stopServer = async () => {
        try {
            await stopContainer(projectName);
            if (socketRef.current) {
                disconnectSocket();
                socketRef.current = null;
            }
            addCommandToHistory("", "Server stopped successfully", false);
        } catch (error: any) {
            addCommandToHistory("", `Error stopping server: ${error.message}`, true);
        }
    };

    const handleCommand = async (input: string) => {
        const trimmedInput = input.trim();
        if (!trimmedInput) return;

        setIsProcessing(true);
        setCurrentProcess(trimmedInput);

        // Add command to history immediately
        addCommandToHistory(trimmedInput, "", false);

        // Handle built-in commands
        if (availableCommands[trimmedInput]) {
            const result = await availableCommands[trimmedInput]();
            if (result) {
                addCommandToHistory("", result.output, result.isError);
            }
            setIsProcessing(false);
            setCurrentProcess(null);
            setCurrentInput("");
            return;
        }

        // Handle npm commands
        if (trimmedInput.startsWith("npm run")) {
            await handleContainerCommand(trimmedInput);
        } else if (trimmedInput.startsWith("npm ")) {
            executeCommandSocket(projectName, trimmedInput);
        } else {
            addCommandToHistory("", `Command not found: ${trimmedInput}. Type 'help' for available commands.`, true);
            setIsProcessing(false);
            setCurrentProcess(null);
        }

        setCurrentInput("");
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && currentInput.trim() && !isProcessing) {
            handleCommand(currentInput);
        }
    };

    const handleInterrupt = async () => {
        if (isProcessing && currentProcess) {
            addCommandToHistory("", "^C", false);

            if (currentProcess === "npm run start" || currentProcess === "npm run dev") {
                await stopServer();
            } else if (currentProcess.startsWith("npm ")) {
                await stopContainer(projectName);
            }

            setIsProcessing(false);
            setCurrentProcess(null);
        }
    };

    const handleKeyboardShortcuts = (e: KeyboardEvent) => {
        if (e.ctrlKey && e.key === "c") {
            e.preventDefault();
            void handleInterrupt();
        }
    };

    const focusInput = () => {
        inputRef.current?.focus();
    };

    useEffect(() => {
        // Initialize socket connection
        socketRef.current = connectSocket();

        // Add initial welcome message
        setCommands([
            {
                input: "",
                output: `Terminal initialized for project: ${projectName}\nType 'help' for available commands.`,
                isError: false,
                timestamp: Date.now(),
            },
        ]);

        // Set up socket listeners
        onExecutionResult((data) => {
            const output = data.stdout + (data.stderr ? `\nstderr: ${data.stderr}` : "");
            addCommandToHistory("", output, !!data.stderr);

            if (currentProcess && !currentProcess.includes("run dev") && !currentProcess.includes("run start")) {
                setCurrentInput("");
                setIsProcessing(false);
                setCurrentProcess(null);
            }
        });

        onExecutionError((data) => {
            addCommandToHistory("", `Error: ${data.error}`, true);
            setCurrentInput("");
            setIsProcessing(false);
            setCurrentProcess(null);
        });

        // Set up keyboard shortcut listener
        window.addEventListener("keydown", handleKeyboardShortcuts);

        return () => {
            window.removeEventListener("keydown", handleKeyboardShortcuts);
            if (socketRef.current) {
                disconnectSocket();
            }
        };
    }, [projectName]);

    // Auto-scroll to bottom when new commands are added
    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [commands]);

    useEffect(() => {
        window.addEventListener("keydown", handleKeyboardShortcuts);
        return () => {
            window.removeEventListener("keydown", handleKeyboardShortcuts);
        };
    }, []);

    return (
        <div
            className="w-full h-full bg-gray-900 rounded-lg shadow-lg overflow-hidden flex flex-col"
            onClick={focusInput}
        >
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-gray-800">
                <div className="flex items-center">
                    <IconTerminal2 className="w-5 h-5 text-gray-400 mr-2" />
                    <span className="text-gray-300 text-sm font-medium">Terminal</span>
                </div>
                {isProcessing && (
                    <div className="flex items-center">
                        <span className="text-yellow-400 text-xs mr-2">
                            {currentProcess?.includes("run dev") || currentProcess?.includes("run start")
                                ? "Server running"
                                : `Running: ${currentProcess}`}
                        </span>
                        <span className="text-gray-400 text-xs">(Ctrl+C to stop)</span>
                    </div>
                )}
            </div>

            {/* Terminal Content */}
            <div ref={terminalRef} className="flex-1 overflow-y-auto p-4 font-mono text-sm bg-gray-900">
                {commands.map((cmd, i) => (
                    <div key={`${cmd.timestamp}-${i}`} className="mb-2">
                        {cmd.input && (
                            <div className="flex">
                                <span className="text-blue-400">$ </span>
                                <span className="text-gray-300 ml-2">{cmd.input}</span>
                            </div>
                        )}
                        {cmd.output && (
                            <div
                                className={`ml-4 whitespace-pre-wrap ${cmd.isError ? "text-red-400" : "text-green-400"}`}
                            >
                                {cmd.output}
                            </div>
                        )}
                    </div>
                ))}

                {/* Current Input */}
                <div className="flex items-center">
                    <span className="text-blue-400">$ </span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={currentInput}
                        onChange={(e) => setCurrentInput(e.target.value)}
                        onKeyDown={handleKeyPress}
                        className="flex-1 ml-2 bg-transparent text-gray-300 focus:outline-none"
                        disabled={isProcessing}
                        placeholder={isProcessing ? "Processing..." : "Type a command..."}
                        autoFocus
                    />
                </div>
            </div>
        </div>
    );
};
