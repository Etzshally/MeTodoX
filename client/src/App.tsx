import { useEffect, useState } from 'react';
import { Todo } from './types';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import AddTodo from './components/AddTodo';
import EmptyAnimation from "./assets/empty-anim.json"
import Lottie from "lottie-react";
import TodoItem from './components/TodoItem';

function App() {
  const [numOfTodos, setNumOfTodos] = useState<number>(0);
  const [newTodos, setNewTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);
  const toast = useToast();

  const getAllTodos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/todos');
      let n_todos: Todo[] = response.data.filter((todo: Todo) => !todo.isCompleted);
      let c_todos: Todo[] = response.data.filter((todo: Todo) => todo.isCompleted);
      setNumOfTodos(response.data.length);
      setNewTodos(n_todos);
      setCompletedTodos(c_todos);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllTodos();
  }, []);

  const markAsCompleted = async (id: string) => {
    try {
      const res = await axios.put(`http://localhost:3000/todos/mark_ac/${id}`);
      if (res.status === 200) {
        toast({
          title: 'Todo completed.',
          description: 'Your todo has been marked as completed successfully.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        getAllTodos();  // Refresh the todos
      }
    } catch (error) {
      console.log(error);
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

  const deleteTodo = async (id: string) => {
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

  const handleOnDragEnd = (result: any) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId === "newTodos" && destination.droppableId === "completedTodos") {
      const draggedTodo = newTodos[source.index];

      markAsCompleted(draggedTodo._id);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col p-5 justify-start items-center">
      <h1 className="text-2xl text-[#1d63a5]">MeTodox</h1>

      {numOfTodos > 0 && (
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <div className="flex w-full flex-col gap-5 mt-10 md:flex-row justify-center items-center">
            <Droppable droppableId="newTodos">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="flex-1 border-2 border-blue-500 rounded-lg bg-white p-6 shadow-lg min-h-[300px] w-full"
                >
                  <h2 className="text-xl font-semibold text-blue-600 mb-4">Todos</h2>
                  {newTodos.length === 0 ? (
                    <p className="text-gray-500">No todos available</p>
                  ) : (
                    newTodos.map((todo, index) => (
                      <Draggable
                        key={todo._id}
                        draggableId={todo._id}
                        index={index}
                      >
                        {(provided) => (
                          <TodoItem key={todo._id} provided={provided} deleteTodo={deleteTodo} markAsCompleted={markAsCompleted} todo={todo} />
                        )}
                      </Draggable>
                    ))
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <Droppable droppableId="completedTodos">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="flex-1 border-2 border-green-500 rounded-lg bg-white p-6 shadow-lg min-h-[300px] w-full"
                >
                  <h2 className="text-xl font-semibold text-green-600 mb-4">Completed Todos</h2>
                  {completedTodos.length === 0 ? (
                    <p className="text-gray-500">No completed todos yet</p>
                  ) : (
                    completedTodos.map((todo, index) => (
                      <TodoItem key={todo._id} deleteTodo={deleteTodo} markAsCompleted={markAsCompleted} todo={todo} />
                    ))
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </DragDropContext>
      )}

      {numOfTodos === 0 && (
        <>
          <Lottie animationData={EmptyAnimation} loop={true} />
          <p>No Todos Found.</p>
        </>
      )}

      <AddTodo handleAddTodo={addTodo} />
    </div>
  );
}

export default App;