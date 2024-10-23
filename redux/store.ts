import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";

import rootReducer from "./rootReducer";

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
            },
        }),
    // Middleware is optional to define here since Redux Toolkit includes Redux Thunk by default
    // but can be specified explicitly if you have custom middleware
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// Extending the Dispatch type to include ThunkAction helps with dispatching thunks without type errors.
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
