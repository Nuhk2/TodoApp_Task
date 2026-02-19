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
        <li className="flex items-center gap-4 bg-slate-800 p-4 rounded-lg border border-slate-700 shadow-sm"> 
            <div className="flex items-left flex-1 min-w-0">
                <input 
                  type="checkbox" 
                  checked={todo.completed} 
                  onChange={() => onToggle(todo.id)} 
                  className="w-5 h-5 cursor-pointer flex-shrink-0"
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
                  <span className={`text-left break-words overflow-hidden flex-1 ${todo.completed ? 'line-through text-slate-500' : 'text-slate-200'}`}>
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