import { createSlice, nanoid } from "@reduxjs/toolkit";

// createSlice simplifies the creation of Redux actions and reducers by combining them into a single slice. This reduces boilerplate code and makes the Redux logic more concise and easier to manage.

const initialState = {
    todos: [{
        id: 1,
        text: "hello world",
        completed: false,
    }]
}
// Define the initial state.
// Ensure the reducers work with this state structure.


export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {

        // Contain functions like add,remove etc..

        // add functionality
        addTodo: (state, action) => {
            const todo = {
                id: nanoid(),
                text: action.payload,
                completed: false,
            }
            state.todos.push(todo);
        },

        // toggled functions
        toggle: (state, action) => {
            const todo = state.todos.find(todo => todo.id === action.payload)
            if (todo) {
                todo.completed = !todo.completed
            }
        },

        // remove functionality
        remove: (state, action) => {
            // use filter to remove
            state.todos = state.todos.filter(todo => todo.id !== action.payload);
        },

        // update functionality
        update: (state, action) => {
            const { id, text } = action.payload;
            const todo = state.todos.find(todo => todo.id === id);
            if (todo) {
                todo.text = text;
            }
        }

    }
})

export const { addTodo, remove, update, toggle } = todoSlice.actions

export default todoSlice.reducer
