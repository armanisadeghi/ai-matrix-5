import React, { useEffect, useRef, useState } from "react";
import { IconExclamationCircle, IconTerminal2 } from "@tabler/icons-react";
import {
    connectSocket,
    disconnectSocket,
    executeCommandSocket,
    onExecutionError,
    onExecutionResult,
} from "../../utils/socket";
import { getContainerStatus, startContainer, stopContainer } from "../../utils/api";
import { useDispatch, useSelector } from "react-redux";
import {
    addCommand,
    clearHistory,
    selectProjectCommands,
    updateCommandOutput,
} from "@/redux/features/code-editor-terminal/terminalSlice";

import "./style.css";

interface ProcessingTimeout {
    timerId: NodeJS.Timeout | null;
    startTime: number;
    duration: number;
}

interface Props {
    projectName: string;
    onServerStart: (url: string) => void;
    onServerStop: () => void;
}

export const Terminal: React.FC<Props> = ({ projectName, onServerStart, onServerStop }) => {
    const dispatch = useDispatch();
    const commands = useSelector((state: any) => selectProjectCommands(state, projectName));

    const [currentInput, setCurrentInput] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [currentProcess, setCurrentProcess] = useState<string | null>(null);
    const [processingTimeout, setProcessingTimeout] = useState<ProcessingTimeout>({
        timerId: null,
        startTime: 0,
        duration: 0,
    });
    const [showTimeoutWarning, setShowTimeoutWarning] = useState(false);
    const [historyIndex, setHistoryIndex] = useState(-1);

    const terminalRef = useRef(null);
    const inputRef = useRef(null);
    const socketRef = useRef<any>(null);
    const isInitialMount = useRef(true);

    const TIMEOUT_WARNING = 10000; // 10 seconds
    const TIMEOUT_CHECK_INTERVAL = 1000; // Check every second

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
            dispatch(clearHistory(projectName));
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

    const addCommandToHistory = (input: string, output: string, isError = false) => {
        dispatch(
            addCommand({
                input,
                output,
                isError,
                projectName,
                timestamp: Date.now(),
            }),
        );
    };

    const handleCommand = async (input: string) => {
        const trimmedInput = input.trim();
        if (!trimmedInput) return;

        setIsProcessing(true);
        setCurrentProcess(trimmedInput);
        startProcessingTimer();

        const commandTimestamp = Date.now();

        // Add command to history immediately WITHOUT output
        dispatch(
            addCommand({
                input: trimmedInput,
                output: "",
                isError: false,
                projectName,
                timestamp: commandTimestamp,
            }),
        );

        try {
            // Handle built-in commands
            if (availableCommands[trimmedInput]) {
                const result = await availableCommands[trimmedInput]();
                if (result) {
                    // Update the command with output
                    dispatch(
                        updateCommandOutput({
                            projectName,
                            timestamp: commandTimestamp,
                            output: result.output,
                            isError: result.isError,
                        }),
                    );
                }
                setIsProcessing(false);
                setCurrentProcess(null);
                clearProcessingTimer();
                setCurrentInput("");
                return;
            }

            // Handle npm commands
            if (trimmedInput.startsWith("npm run")) {
                await handleContainerCommand(trimmedInput, commandTimestamp);
            } else if (trimmedInput.startsWith("npm ")) {
                executeCommandSocket(projectName, trimmedInput);
            } else {
                dispatch(
                    updateCommandOutput({
                        projectName,
                        timestamp: commandTimestamp,
                        output: `Command not found: ${trimmedInput}. Type 'help' for available commands.`,
                        isError: true,
                    }),
                );
                setIsProcessing(false);
                setCurrentProcess(null);
                clearProcessingTimer();
            }
        } catch (error) {
            clearProcessingTimer();
            setIsProcessing(false);
            setCurrentProcess(null);
        }

        setCurrentInput("");
    };

    const handleContainerCommand = async (command: string, timestamp: number) => {
        try {
            if (command === "npm run start" || command === "npm run dev") {
                const { status, port } = await getContainerStatus(projectName);
                if (status === "running") {
                    dispatch(
                        updateCommandOutput({
                            projectName,
                            timestamp,
                            output: "Server is already running. Port: " + port,
                            isError: true,
                        }),
                    );
                    onServerStart(`http://localhost:${port}`);
                    return;
                }

                const response = await startContainer(projectName);
                dispatch(
                    updateCommandOutput({
                        projectName,
                        timestamp,
                        output: `Container started successfully on port ${response.port}`,
                        isError: false,
                    }),
                );
                socketRef.current = connectSocket();
                onServerStart(`http://localhost:${response.port}`);
            } else if (command === "npm run stop") {
                const status = await getContainerStatus(projectName);
                if (status.status !== "running") {
                    dispatch(
                        updateCommandOutput({
                            projectName,
                            timestamp,
                            output: "No server is currently running",
                            isError: true,
                        }),
                    );
                } else {
                    await stopServer(timestamp);
                }
            }
        } catch (error: any) {
            dispatch(
                updateCommandOutput({
                    projectName,
                    timestamp,
                    output: `Error: ${error.message}`,
                    isError: true,
                }),
            );
        } finally {
            setIsProcessing(false);
            setCurrentProcess(null);
        }
    };

    const stopServer = async (timestamp: number) => {
        try {
            await stopContainer(projectName);
            if (socketRef.current) {
                disconnectSocket();
                socketRef.current = null;
            }
            dispatch(
                updateCommandOutput({
                    projectName,
                    timestamp,
                    output: "Server stopped successfully",
                    isError: false,
                }),
            );
            onServerStop();
        } catch (error: any) {
            dispatch(
                updateCommandOutput({
                    projectName,
                    timestamp,
                    output: `Error stopping server: ${error.message}`,
                    isError: true,
                }),
            );
        }
    };

    const startProcessingTimer = () => {
        const startTime = Date.now();
        const timerId = setInterval(() => {
            const duration = Date.now() - startTime;
            setProcessingTimeout((prev) => ({ ...prev, duration }));

            if (duration >= TIMEOUT_WARNING && !showTimeoutWarning) {
                setShowTimeoutWarning(true);
            }
        }, TIMEOUT_CHECK_INTERVAL);

        setProcessingTimeout({
            timerId,
            startTime,
            duration: 0,
        });
        setShowTimeoutWarning(false);
    };

    const clearProcessingTimer = () => {
        if (processingTimeout.timerId) {
            clearInterval(processingTimeout.timerId);
        }
        setProcessingTimeout({
            timerId: null,
            startTime: 0,
            duration: 0,
        });
        setShowTimeoutWarning(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && currentInput.trim() && !isProcessing) {
            handleCommand(currentInput);
            setHistoryIndex(-1);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            // Filter only commands with input (not outputs or system messages)
            const commandsWithInput = commands.filter((cmd) => cmd.input);
            if (historyIndex < commandsWithInput.length - 1) {
                const newIndex = historyIndex + 1;
                setHistoryIndex(newIndex);
                setCurrentInput(commandsWithInput[commandsWithInput.length - 1 - newIndex].input);
            }
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            if (historyIndex > 0) {
                const newIndex = historyIndex - 1;
                setHistoryIndex(newIndex);
                const commandsWithInput = commands.filter((cmd) => cmd.input);
                setCurrentInput(commandsWithInput[commandsWithInput.length - 1 - newIndex].input);
            } else if (historyIndex === 0) {
                setHistoryIndex(-1);
                setCurrentInput("");
            }
        }
    };

    const handleInterrupt = async () => {
        if (isProcessing && currentProcess) {
            const interruptTimestamp = Date.now();

            // Add the ^C to the command history
            dispatch(
                addCommand({
                    input: "",
                    output: "^C",
                    isError: false,
                    projectName,
                    timestamp: interruptTimestamp,
                }),
            );

            if (currentProcess === "npm run start" || currentProcess === "npm run dev") {
                await stopServer(interruptTimestamp);
            } else if (currentProcess.startsWith("npm ")) {
                // For other npm commands, just stop the container
                await stopContainer(projectName);
                dispatch(
                    updateCommandOutput({
                        projectName,
                        timestamp: interruptTimestamp,
                        output: "Process terminated.",
                        isError: false,
                    }),
                );
            }

            setIsProcessing(false);
            setCurrentProcess(null);
            clearProcessingTimer();
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

    // Make sure commands are rendered in the correct order
    const renderCommands = () => {
        // Sort commands by timestamp to ensure chronological order
        const sortedCommands = [...commands].sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0));

        return sortedCommands.map((cmd, i) => (
            <div key={`${cmd.timestamp}-${i}`} className="mb-2 select-text">
                {cmd.input && (
                    <div className="flex">
                        <span className="text-blue-400 select-text">$ </span>
                        <span className="text-gray-300 ml-2 select-text">{cmd.input}</span>
                    </div>
                )}
                {cmd.output && (
                    <div
                        className={`ml-4 whitespace-pre-wrap select-text ${
                            cmd.isError ? "text-red-400" : "text-green-400"
                        }`}
                    >
                        {cmd.output}
                    </div>
                )}
            </div>
        ));
    };

    // Format the duration for display
    const formatDuration = (ms: number) => {
        const seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        return minutes > 0 ? `${minutes}m ${seconds % 60}s` : `${seconds}s`;
    };

    useEffect(() => {
        // Only run on initial mount
        if (isInitialMount.current) {
            isInitialMount.current = false;
            addCommandToHistory(
                "",
                `Terminal initialized for project: ${projectName}\nType 'help' for available commands.`,
                false,
            );
        }
    }, []);

    useEffect(() => {
        socketRef.current = connectSocket();

        onExecutionResult((data) => {
            const output = data.stdout + (data.stderr ? `\nstderr: ${data.stderr}` : "");

            // Find the most recent matching command without output
            const commandsWithoutOutput = commands.filter(
                (cmd) => cmd.input && !cmd.output && cmd.input === currentProcess,
            );
            const lastCommand = commandsWithoutOutput[commandsWithoutOutput.length - 1];

            if (lastCommand) {
                dispatch(
                    addCommand({
                        input: lastCommand.input,
                        output,
                        isError: !!data.stderr,
                        projectName,
                        timestamp: lastCommand.timestamp,
                    }),
                );
            } else {
                // If no matching command found, add as new output
                addCommandToHistory(currentProcess || "", output, !!data.stderr);
            }

            if (currentProcess && !currentProcess.includes("run dev") && !currentProcess.includes("run start")) {
                setCurrentInput("");
                setIsProcessing(false);
                setCurrentProcess(null);
                clearProcessingTimer();
            }
        });

        onExecutionError((data) => {
            const commandsWithoutOutput = commands.filter(
                (cmd) => cmd.input && !cmd.output && cmd.input === currentProcess,
            );
            const lastCommand = commandsWithoutOutput[commandsWithoutOutput.length - 1];

            if (lastCommand) {
                dispatch(
                    addCommand({
                        input: lastCommand.input,
                        output: `Error: ${data.error}`,
                        isError: true,
                        projectName,
                        timestamp: lastCommand.timestamp,
                    }),
                );
            } else {
                addCommandToHistory(currentProcess || "", `Error: ${data.error}`, true);
            }
            clearProcessingTimer();
            setCurrentInput("");
            setIsProcessing(false);
            setCurrentProcess(null);
        });

        window.addEventListener("keydown", handleKeyboardShortcuts);

        return () => {
            clearProcessingTimer();

            window.removeEventListener("keydown", handleKeyboardShortcuts);
            if (socketRef.current) {
                disconnectSocket();
            }
        };
    }, [projectName, commands, currentProcess]);

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
                    <span className="text-gray-300 text-sm font-medium select-text">Terminal</span>
                </div>
                {isProcessing && (
                    <div className="flex items-center">
                        <span className="text-yellow-400 text-xs mr-2 select-text">
                            {currentProcess?.includes("run dev") || currentProcess?.includes("run start")
                                ? "Server running"
                                : `Running: ${currentProcess}`}
                            {showTimeoutWarning && ` (${formatDuration(processingTimeout.duration)})`}
                        </span>
                        <span className="text-gray-400 text-xs select-text">(Ctrl+C to stop)</span>
                        {showTimeoutWarning && (
                            <div className="flex items-center ml-2 text-yellow-400">
                                <IconExclamationCircle size={16} className="mr-1" />
                                <span className="text-xs">Long running process</span>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Terminal Content */}
            <div
                ref={terminalRef}
                className="flex-1 overflow-y-auto p-4 font-mono text-sm bg-gray-900 select-text"
                onMouseDown={(e) => {
                    // Prevent focus loss when selecting text
                    if (e.detail > 1) {
                        // double or triple click
                        e.preventDefault();
                    }
                }}
            >
                {renderCommands()}

                {/* Current Input */}
                <div className="flex items-center">
                    <span className="text-blue-400 select-text">$ </span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={currentInput}
                        onChange={(e) => setCurrentInput(e.target.value)}
                        onKeyDown={handleKeyDown}
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
