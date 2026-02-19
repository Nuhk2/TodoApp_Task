import { useState, useEffect } from 'react'
import './App.css'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'

import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {

  //Initialize the state from localStorage on first load
  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  // Logic for adding a new todo item to the list
  const addTodo =(text) => {

    const newTodo = {
      id: Date.now(),
      text: text,
      completed: false
    };
    setTodos([...todos, newTodo]);

    toast.success("Task Added! ",{
      position: "bottom-right",
      theme: "colored",

    });
    };

  // Logic to Delete a todo item from the list
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));

    toast.error("Task Deleted! ", {
      position: "bottom-right",
      theme: "colored",
    });
  };

  // Logic to toggle the completed status of a todo item
  const toggleComplete = (id) => {
    const todo = todos.find(todo => todo.id === id);
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));

    if (!todo.completed) {
      toast.success("Task Completed! ", {
        position: "bottom-right",
        theme: "colored",
      });
    } else {
      toast.info("Status changed, task pending ", {
        position: "bottom-right",
        theme: "colored",

      });
    }
  };

  // Logic to edit a todo item in the list
  const editTodo = (id, newText) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, text: newText } : todo
    ));

    toast.info("Task Edited!", {
      position: "bottom-right",
      theme: "colored",

      
    });
  };

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    
    <div className="app-container">
      <h1 className="text-3xl font-bold text-white p-4">My Task</h1>

      {/* Passing the function as a prop here to the TodoInput component so that it can call this function when a new todo is added */}
      <TodoInput onAdd={addTodo} />
      
      {/* Passing the data and deleting the function as props to the TodoList component so that it can display the list of todos and also call the delete function when a todo is deleted */}
      <TodoList
        todos={todos} 
        onDelete={deleteTodo} 
        onToggle={toggleComplete} 
        onEdit={editTodo}
      />
      
      <ToastContainer />
    </div>
    
  );
};

export default App
