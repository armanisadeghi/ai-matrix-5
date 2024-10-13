"use client";

import React, { useState, useEffect } from "react";
import {
    connectSocket,
    disconnectSocket,
    executeCommandSocket,
    onExecutionResult,
    onExecutionError,
} from "../utils/socket";

interface Props {
    projectName: string;
}

export const Terminal: React.FC<Props> = ({ projectName }) => {
    const [command, setCommand] = useState("");
    const [output, setOutput] = useState<string[]>([]);

    useEffect(() => {
        const socket = connectSocket();

        onExecutionResult((data) => {
            setOutput((prev) => [...prev, `> ${command}`, data.stdout, data.stderr]);
        });

        onExecutionError((data) => {
            setOutput((prev) => [...prev, `> ${command}`, `Error: ${data.error}`]);
        });

        return () => {
            disconnectSocket();
        };
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        executeCommandSocket(projectName, command);
        setCommand("");
    };

    return (
        <div>
            <div
                style={{
                    height: "300px",
                    overflowY: "scroll",
                    backgroundColor: "black",
                    color: "white",
                    padding: "10px",
                }}
            >
                {output.map((line, index) => (
                    <div key={index}>{line}</div>
                ))}
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={command}
                    onChange={(e) => setCommand(e.target.value)}
                    placeholder="Enter command"
                />
                <button type="submit">Execute</button>
            </form>
        </div>
    );
};
