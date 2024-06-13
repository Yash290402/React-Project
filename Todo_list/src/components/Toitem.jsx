import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { remove, toggle, update } from '../features/todoSlice';

function Toitem() {
    const todos = useSelector(state => state.todos);
    const dispatch = useDispatch();
    const [editableTodoId, setEditableTodoId] = useState(null);
    const [editText, setEditText] = useState('');

    const handleEditClick = (todo) => {
        if (todo.completed) return;

        if (editableTodoId === todo.id) {
            dispatch(update({ id: todo.id, text: editText }));
            setEditableTodoId(null);
            setEditText('');
        } else {
            setEditableTodoId(todo.id);
            setEditText(todo.text);
        }
    };

    const handleEditSubmit = (id) => {
        if (editText.trim()) {
            dispatch(update({ id, text: editText }));
            setEditableTodoId(null);
            setEditText('');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900">
            <div className="w-full max-w-lg bg-gray-800 p-6 rounded-lg shadow-lg">
                {todos.length === 0 ? (
                    <p className="text-white text-center mt-4">No todos available</p>
                ) : (
                    <ul className="list-none">
                        {todos.map((todo) => (
                            <li
                                className="mt-4 flex justify-between items-center bg-gray-700 px-4 py-2 rounded"
                                key={todo.id}
                            >
                                <input
                                    type="checkbox"
                                    checked={todo.completed}
                                    onChange={() => dispatch(toggle(todo.id))}
                                    className="form-checkbox h-5 w-5 text-indigo-600"
                                    aria-label={`Mark ${todo.text} as ${todo.completed ? 'incomplete' : 'complete'}`}
                                />

                                {editableTodoId === todo.id ? (
                                    <input
                                        type="text"
                                        value={editText}
                                        onChange={(e) => setEditText(e.target.value)}
                                        onBlur={() => handleEditSubmit(todo.id)}
                                        className="bg-transparent text-white border-b-2 border-white focus:outline-none"
                                        autoFocus
                                    />
                                ) : (
                                    <div className={`text-white ${todo.completed ? "line-through" : ""}`}>
                                        {todo.text}
                                    </div>
                                )}

                                <div className="flex space-x-2">
                                    <button
                                        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
                                        onClick={() => handleEditClick(todo)}
                                        disabled={todo.completed}
                                    >
                                        {editableTodoId === todo.id ? "📁" : "✏️"}
                                    </button>
                                    <button
                                        onClick={() => dispatch(remove(todo.id))}
                                        className="text-white bg-red-500 border-0 py-1 px-4 focus:outline-none hover:bg-red-600 rounded text-md"
                                        aria-label={`Remove ${todo.text}`}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-6 h-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default Toitem;
