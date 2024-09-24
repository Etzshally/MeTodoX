import { useEffect, useState } from 'react';
import { Todo } from './types';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';
import axios from 'axios';
import { Skeleton, Stack, useToast } from '@chakra-ui/react';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const toast = useToast();
  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);

  const getAllTodos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/todos');
      setTodos(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsFirstLoad(false);
    }
  };

  useEffect(() => {
    getAllTodos();
  }, []);

  const markAsCompleted = async (id: number) => {
    const res = await axios.put(`http://localhost:3000/todos/mark_ac/${id}`);
    if (res.status === 200) {
      toast({
        title: 'Todo completed.',
        description: 'Your todo has been marked as completed successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      getAllTodos();
    }
  };

  const deleteTodo = async (id: number) => {
    const res = await axios.delete(`http://localhost:3000/todos/${id}`);
    if (res.status === 200) {
      toast({
        title: 'Todo deleted.',
        description: 'Your todo has been deleted successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      getAllTodos();
    }
  };

  const addTodo = async (data: string) => {
    const res = await axios.post(`http://localhost:3000/todos/create`, {
      data: data,
    });
    if (res.status === 201) {
      getAllTodos();
    }
  };

  return (
    <>
      <div className="w-full min-h-screen flex flex-col p-5 justify-start items-center">
        <h1 className="text-2xl text-[#1d63a5]">MeTodox</h1>
        <AddTodo handleAddTodo={addTodo} />
        <Stack w="full" mt={5}>
          {isFirstLoad ? (
            [...Array(3)].map((_, i) => (
              <Skeleton key={i} height="40px" fadeDuration={1} />
            ))
          ) : (
            <TodoList todos={todos} deleteTodo={deleteTodo} markAsCompleted={markAsCompleted} />
          )}
        </Stack>
      </div>
    </>
  );
}

export default App;