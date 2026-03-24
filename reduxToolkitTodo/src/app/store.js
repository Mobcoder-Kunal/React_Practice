// redux toolkit mai reducers ko slices bolte hai.
// stores mai reducers ki knowledge dete hai.

import { configureStore } from "@reduxjs/toolkit";
import todoReducer from '../features/todo/todoSlice'

export const store = configureStore({
    reducer: todoReducer
})