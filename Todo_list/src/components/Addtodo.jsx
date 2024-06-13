import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../features/todoSlice';

function AddTodo() {
    const [input, setInput] = useState('');
    const dispatch = useDispatch();

    const addTodoHandler = (e) => {
        e.preventDefault();
        if (input.trim() !== '') {
            dispatch(addTodo(input));
            setInput('');
        }
    };

    return (
        <div className="flex justify-center items-center bg-gray-900">
            <form
                onSubmit={addTodoHandler}
                className="space-x-3 mt-12 bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col sm:flex-row items-center"
            >
                <input
                    className="bg-gray-700 rounded border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-2 px-4 leading-8 transition-colors duration-200 ease-in-out mb-4 sm:mb-0 sm:mr-4 flex-grow"
                    type="text"
                    placeholder="Enter a Todo"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button
                    type="submit"
                    className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg transition-colors duration-200 ease-in-out"
                >
                    Add Todo
                </button>
            </form>
        </div>
    );
}

export default AddTodo;
