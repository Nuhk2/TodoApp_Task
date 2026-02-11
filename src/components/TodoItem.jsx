import { useState, useEffect } from "react";

function TodoItem({ todo, onDelete, onToggle, onEdit }) {

    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(todo?.text || "");

    useEffect(() => {
        setEditText(todo?.text || "");
    }, [todo?.text]);

    const handleEdit = () => {
        if (editText.trim() === "") return;
        onEdit(todo.id, editText.trim());
        setIsEditing(false);
    };
    
     if (!todo) return null;

    return (
        <li> 
            <div className="todo-content">
                <input 
                  type="checkbox" 
                  checked={todo.completed} 
                  onChange={() => onToggle(todo.id)} 
                />
                {isEditing ? (
                  <input
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleEdit();
                      if (e.key === "Escape") { setIsEditing(false); setEditText(todo.text); }
                    }}
                    autoFocus
                  />
                ) : (
                  <span 
                    style={{ 
                      textDecoration: todo.completed ? 'line-through' : 'none',
                      color: todo.completed ? '#888' : 'white' 
                    }}
                  >
                    {todo.text}
                  </span>
                )}
            </div>

            {isEditing ? (
              <>
                <button onClick={handleEdit}>Save</button>
                <button onClick={() => { setIsEditing(false); setEditText(todo.text); }}>Cancel</button>
              </>
            ) : (
              <>
                <button onClick={() => setIsEditing(true)}>Edit</button>
                <button onClick={()=> onDelete(todo.id)}>Delete</button>
              </>
            )}
        </li>
    );
}

export default TodoItem;