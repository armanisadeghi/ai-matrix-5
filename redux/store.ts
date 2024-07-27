import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

export const store = configureStore({
    reducer: rootReducer,
    // Middleware is optional to define here since Redux Toolkit includes Redux Thunk by default
    // but can be specified explicitly if you have custom middleware
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// Extending the Dispatch type to include ThunkAction helps with dispatching thunks without type errors.
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
