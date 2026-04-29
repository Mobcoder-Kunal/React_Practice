import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    user: { name: string, email: string } | null;
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<AuthState['user']>) => {
            state.user = action.payload;
            state.isAuthenticated = !!action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        },
    },
})

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;

// When you write PayloadAction<AuthState['user']>, TypeScript internally constructs a type that looks like this:

// TypeScript
// {
//   type: string;                    Added automatically by Redux
//   payload: {                       This part comes from your Generic!
//     name: string;
//     email: string;
//   } | null;
// }