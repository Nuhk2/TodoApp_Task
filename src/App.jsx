import { useState, useEffect } from 'react'
import './App.css'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'

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

    };

  // Logic to Delete a todo item from the list
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Logic to toggle the completed status of a todo item
  const toggleComplete = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // Logic to edit a todo item in the list
  const editTodo = (id, newText) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, text: newText } : todo
    ));
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
    </div>
  );
  }

export default App
