import React from "react";

interface TodoItemProps {
    handleToggleTodo?: (id: number) => void;
    handleOnRemove?: (id: number) => void;
    todo?: any;
}

const TodoItem: React.FC<TodoItemProps> = ({
    handleToggleTodo = (f) => f,
    handleOnRemove = (f) => f,
    todo = {},
}) => {
    return (
        <div>
            <span
                className="removeItem"
                onClick={() => {
                    handleOnRemove(todo.id);
                }}
            >
                &#x274C;
            </span>
            <input
                type="checkbox"
                style={{ verticalAlign: "middle" }}
                id={`todo-${todo.id}`}
                checked={todo.completed}
                onChange={() => handleToggleTodo(todo.id)}
            />
            <label
                htmlFor={`todo-${todo.id}`}
                className={`item ${todo.completed ? "completed" : ""}`}
            >
                {todo.description}
            </label>
        </div>
    );
};

export default TodoItem;
