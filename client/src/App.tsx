import { useEffect, useState } from 'react'
import { Todo } from './types'
import TodoList from './components/TodoList'
import AddTodo from './components/AddTodo';
import axios from 'axios';

function App() {

  const [todos, setTodos] = useState<Todo[]>([])

  const getAllTodos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/todos');
      setTodos(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllTodos()
  }, [])

  const markAsCompleted = async (id: number) => {
    const res = await axios.put(`http://localhost:3000/todos/mark_ac/${id}`);
    if (res.status === 200) {
      getAllTodos();
    }
  };

  const deleteTodo = async (id: number) => {
    const res = await axios.delete(`http://localhost:3000/todos/${id}`);
    if (res.status === 200) {
      getAllTodos();
    }
  }

  const addTodo = async (data: string) => {
    const res = await axios.post(`http://localhost:3000/todos/create`, {
      data: data
    });
    if (res.status === 201) {
      getAllTodos();
    }
  }

  return (
    <>
      <div className='w-full min-h-screen flex flex-col p-5 justify-start items-center'>
        <h1 className='text-2xl'>MeTodox</h1>
        <AddTodo handleAddTodo={addTodo} />
        <TodoList todos={todos} deleteTodo={deleteTodo} markAsCompleted={markAsCompleted} />
      </div>
    </>
  )
}

export default App
