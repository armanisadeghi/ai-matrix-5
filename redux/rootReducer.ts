// redux/rootReducer.ts

import { combineReducers } from "@reduxjs/toolkit";
import chatReducer from "./features/aiChats/chatSlice";
import messageReducer from "./features/aiChats/messageSlice";
import uiReducer from "./features/aiChats/uiSlice";
import functionsReducer from "./features/functions/functionsSlice";
import userReducer from "./features/user/userSlice";
import settingsReducer from "./features/settings/settingsSlice";
import recipeReducer from "./features/recipes/recipeSlice";
import brokerReducer from "./features/broker/brokerSlice";
import socketReducer from "./features/socket/socketSlice";
import dynamicEventsReducer from "./features/dynamicEvents/dynamicEventsSlice";
import configReducer from "./features/config/configSlice";
import terminalReducer from "./features/code-editor-terminal/terminalSlice";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "terminal",
    storage,
    whitelist: ["commandHistory"], // Only persist commandHistory
};

const persistedTerminalReducer = persistReducer(persistConfig, terminalReducer);

const rootReducer = combineReducers({
    chats: chatReducer,
    messages: messageReducer,
    ui: uiReducer,
    functions: functionsReducer,
    user: userReducer,
    settings: settingsReducer,
    recipes: recipeReducer,
    brokers: brokerReducer,
    socket: socketReducer,
    dynamicEvents: dynamicEventsReducer,
    config: configReducer,
    terminal: persistedTerminalReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
