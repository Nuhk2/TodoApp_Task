import TodoItem from "../components/TodoItem.jsx";

function TodoList({ todos, onDelete, onToggle, onEdit }) {

    return (
        <ul className="space-y-3">
            {todos.map(todo => (

                <TodoItem
                key={todo.id}
                todo={todo}
                onDelete={onDelete}
                onToggle={onToggle}
                onEdit={onEdit}
                />
            ))}
        </ul>
    );
}

export default TodoList;