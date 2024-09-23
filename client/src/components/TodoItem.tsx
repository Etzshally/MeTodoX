import React from 'react'
import { Todo } from '../types'
import { MdDeleteForever } from "react-icons/md";
import { FaCircleCheck } from "react-icons/fa6";

interface TodoItemProps {
    todo: Todo,
    markAsCompleted: (id: number) => void;
    deleteTodo: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, markAsCompleted, deleteTodo }) => {
    return (
        <>
            <div className='w-full flex shadow-xl rounded-xl flex-row justify-between py-5 px-2 items-center'>
                <div className='flex flex-row justify-start gap-2 items-center'>
                    <div className='flex flex-col'>
                        {!todo.isCompleted ? (
                            <input
                                onChange={() => markAsCompleted(todo._id)}
                                type="checkbox"
                                className="form-checkbox h-5 w-5 text-blue-600 rounded hover:ring-blue-500 hover:outline-none border-gray-300"
                            />
                        ) : (
                            <FaCircleCheck size={25} className='text-green-700' />
                        )}
                    </div>
                    <p className={`${todo.isCompleted ? 'line-through text-green-500' : ''}`}>{todo.data}</p>
                </div>
                <MdDeleteForever size={25} className='hover:text-red-500 z-50 transition-all ease-in-out delay-150 cursor-pointer' onClick={() => deleteTodo(todo._id)} />
            </div>
        </>
    )
}

export default TodoItem