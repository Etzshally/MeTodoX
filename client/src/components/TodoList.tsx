import React from 'react'
import { Todo } from '../types'
import TodoItem from './TodoItem';
import EmptyAnimation from "../assets/empty-anim.json"
import Lottie from "lottie-react";

interface TodoListProps {
    todos: Todo[];
    markAsCompleted: (id: number) => void;
    deleteTodo: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, markAsCompleted, deleteTodo }) => {
    return (
        <>
            <div className='flex flex-col justify-center gap-2 items-center w-full'>
                {todos?.map((todo, index) => (
                    <TodoItem todo={todo} markAsCompleted={markAsCompleted} deleteTodo={deleteTodo} key={index} />
                ))}
                {todos.length === 0 && (
                    <>
                        <Lottie animationData={EmptyAnimation} loop={true} />
                        <p>No Todos Found.</p>
                    </>
                )}
            </div>
        </>
    )
}

export default TodoList