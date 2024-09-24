import React from 'react'
import { Todo } from '../types'
import { MdDeleteForever } from "react-icons/md";
import { FaCircleCheck } from "react-icons/fa6";
import { Badge } from '@chakra-ui/react';
import { formatTimeSince } from '../helpers';

interface TodoItemProps {
    todo: Todo,
    markAsCompleted: (id: number) => void;
    deleteTodo: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, markAsCompleted, deleteTodo }) => {
    return (
        <>
            <div className='w-full bg-white relative flex shadow-xl rounded-xl flex-row justify-between py-[30px] px-2 items-center'>
                <div className='flex flex-row justify-start gap-2 items-center'>
                    <div className='flex flex-col'>
                        {!todo.isCompleted ? (
                            <input
                                onChange={() => markAsCompleted(todo._id)}
                                type="checkbox"
                                className="form-checkbox h-5 w-5 text-blue-600 rounded hover:ring-blue-500 hover:outline-none border-gray-300"
                            />
                        ) : (
                            <FaCircleCheck size={25} className='text-[#1d63a5]' />
                        )}
                    </div>
                    <p className={`${todo.isCompleted ? 'line-through text-wrap text-[#1d63a5]' : ''}`}>{todo.data}</p>
                </div>
                <MdDeleteForever size={25} className='text-red-500 hover:text-red-800 z-50 transition-all ease-in-out delay-75 cursor-pointer' onClick={() => deleteTodo(todo._id)} />
                <Badge className='absolute right-2 top-1' colorScheme='blue'>{formatTimeSince(todo.createdAt)}</Badge>
            </div>
        </>
    )
}

export default TodoItem