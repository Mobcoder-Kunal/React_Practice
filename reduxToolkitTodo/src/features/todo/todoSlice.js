// nanoid generates unique ID
// state ke andar milta hai "current state"

import { createSlice, nanoid } from '@reduxjs/toolkit'
import { act } from 'react'

const initialState = {
    todos: [{
        id: 1,
        text: "Learn redux"
    }]
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    // reducers contains property and functions and state, action is the syntax
    reducers: {
        addTodo: (state, action) => {
            const todo = {
                id: nanoid(),
                text: action.payload, // auto fetches text data from payload
            }
            state.todos.push(todo)
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload) // auto fetches id from payload
        },
        updateTodo: (state, action) => {
            // state.todos = state.todos.map((todo) => todo.id === action.payload ? { ...todo , text: action.payload} : todo)
            const todo = state.todos.find((todo) => todo.id === action.payload)
            if(todo) {
                todo.text = action.payload
            }
        },
    }
})

export const { addTodo, removeTodo, updateTodo } = todoSlice.actions

export default todoSlice.reducer