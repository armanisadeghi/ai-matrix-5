import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";
import type { RootState } from "../../store";

interface Command {
    input: string;
    output: string;
    isError: boolean;
    timestamp?: number;
    projectName: string;
}

interface TerminalState {
    commandHistory: {
        [projectName: string]: Command[];
    };
    commandLimit: number;
}

const initialState: TerminalState = {
    commandHistory: {},
    commandLimit: 100,
};

const terminalSlice = createSlice({
    name: "terminal",
    initialState,
    reducers: {
        addCommand: (state, action: PayloadAction<Command>) => {
            const { projectName } = action.payload;
            if (!state.commandHistory[projectName]) {
                state.commandHistory[projectName] = [];
            }

            // Always append new commands to maintain chronological order
            state.commandHistory[projectName].push({
                ...action.payload,
                timestamp: action.payload.timestamp || Date.now(),
            });

            // Limit the number of commands stored
            if (state.commandHistory[projectName].length > state.commandLimit) {
                state.commandHistory[projectName] = state.commandHistory[projectName].slice(-state.commandLimit);
            }
        },
        updateCommandOutput: (
            state,
            action: PayloadAction<{
                projectName: string;
                timestamp: number;
                output: string;
                isError: boolean;
            }>,
        ) => {
            const { projectName, timestamp, output, isError } = action.payload;
            const commands = state.commandHistory[projectName];
            if (commands) {
                const commandIndex = commands.findIndex((cmd) => cmd.timestamp === timestamp);
                if (commandIndex !== -1) {
                    commands[commandIndex] = {
                        ...commands[commandIndex],
                        output,
                        isError,
                    };
                }
            }
        },
        clearHistory: (state, action: PayloadAction<string>) => {
            state.commandHistory[action.payload] = [];
        },
        clearAllHistory: (state) => {
            state.commandHistory = {};
        },
        setCommandLimit: (state, action: PayloadAction<number>) => {
            state.commandLimit = action.payload;
        },
    },
    extraReducers: (builder) => {
        // Handle redux-persist purge action
        builder.addCase(PURGE, () => initialState);
    },
});

export const { addCommand, clearHistory, clearAllHistory, setCommandLimit, updateCommandOutput } =
    terminalSlice.actions;

// Selectors
export const selectProjectCommands = (state: RootState, projectName: string) =>
    state.terminal.commandHistory[projectName] || [];

export default terminalSlice.reducer;
