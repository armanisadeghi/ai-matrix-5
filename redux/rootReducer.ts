// redux/rootReducer.ts

import { combineReducers } from '@reduxjs/toolkit';
import chatReducer from './features/aiChats/chatSlice';
import messageReducer from './features/aiChats/messageSlice';
import uiReducer from './features/aiChats/uiSlice';
import functionsReducer from './features/functions/functionsSlice';
import userReducer from './features/user/userSlice';
import settingsReducer from './features/settings/settingsSlice';
import recipeReducer from './features/recipes/recipeSlice';
import brokerReducer from './features/broker/brokerSlice';
import socketReducer from './features/socket/socketSlice';
import dynamicEventsReducer from './features/dynamicEvents/dynamicEventsSlice';
import configReducer from './features/config/configSlice';

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

});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
