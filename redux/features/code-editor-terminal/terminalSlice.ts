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

            // If this is a command input with no output
            if (action.payload.input && !action.payload.output) {
                state.commandHistory[projectName].push({
                    ...action.payload,
                    timestamp: Date.now(),
                });
            } else {
                // If this is command output, update the last matching command
                const commands = state.commandHistory[projectName];
                const lastIndex = commands.findIndex((cmd) => cmd.input === action.payload.input);

                if (lastIndex !== -1) {
                    commands[lastIndex] = {
                        ...commands[lastIndex],
                        output: action.payload.output,
                        isError: action.payload.isError,
                    };
                } else {
                    commands.push({
                        ...action.payload,
                        timestamp: Date.now(),
                    });
                }
            }

            // Limit the number of commands stored
            if (state.commandHistory[projectName].length > state.commandLimit) {
                state.commandHistory[projectName] = state.commandHistory[projectName].slice(-state.commandLimit);
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

export const { addCommand, clearHistory, clearAllHistory, setCommandLimit } = terminalSlice.actions;

// Selectors
export const selectProjectCommands = (state: RootState, projectName: string) =>
    state.terminal.commandHistory[projectName] || [];

export default terminalSlice.reducer;
