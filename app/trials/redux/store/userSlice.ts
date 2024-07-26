// userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    matrixId: string | null;
}

const initialState: UserState = {
    matrixId: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setMatrixId: (state, action: PayloadAction<string>) => {
            state.matrixId = action.payload;
        },
    },
});

export const { setMatrixId } = userSlice.actions;

export default userSlice.reducer;
