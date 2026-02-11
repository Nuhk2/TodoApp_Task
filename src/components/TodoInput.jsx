import { useState } from "react";

function TodoInput ({ onAdd }) {
    const [taskText, setTaskText] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!taskText.trim()) return;

        onAdd(taskText);
        setTaskText("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
            type="text"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            placeholder="Add your Todo Task"
            />
            <button type="submit">Add</button>
        </form>
        );
    }

    export default TodoInput;