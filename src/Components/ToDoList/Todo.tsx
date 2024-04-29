import React, { useState, useEffect } from "react";
import "./todo.css";
import Button from "../Button";
import Title from "../Title";
import Error from "../Error";
import TextInput from "../TextInput";

interface TodoItem {
    id: number;
    description: string;
    completed: boolean;
}

const Todo: React.FC = () => {
    const [todos, setTodos] = useState<TodoItem[]>(() => {
        try {
            const storedTodos = localStorage.getItem("todos");
            if (storedTodos) {
                return JSON.parse(storedTodos);
            }
        } catch (error) {
            setError("Error loading todos from localStorage.");
        }
        return [];
    });
    const [newTodo, setNewTodo] = useState<string>("");
    const [filter, setFilter] = useState<string>("all");
    const [error, setError] = useState<string>("");

    useEffect(() => {
        try {
            localStorage.setItem("todos", JSON.stringify(todos));
        } catch (error) {
            setError("Error saving todos to localStorage.");
        }
    }, [todos]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewTodo(event.target.value);
    };

    const handleAddTodo = () => {
        if (newTodo.trim() !== "") {
            const newTodoItem: TodoItem = {
                id: Date.now(),
                description: newTodo.trim(),
                completed: false,
            };
            setTodos([...todos, newTodoItem]);
            setNewTodo("");
        }
    };

    const handleToggleTodo = (id: number) => {
        const updatedTodos = todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        setTodos(updatedTodos);
    };

    const filteredTodos = todos.filter((todo) => {
        if (filter === "all") return true;
        if (filter === "active") return !todo.completed;
        if (filter === "completed") return todo.completed;
        return true;
    });

    const handleOnRemove = (id: number) => {
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
    };

    const filters: any = ["all", "active", "completed"];

    return (
        <div className="todo-container">
            <Title>Todo List</Title>
            <Error error={error} />
            <TextInput
                value={newTodo}
                handleChange={handleInputChange}
                placeholder="Enter a new todo"
            />
            <Button handleClass="add-button" handleClick={handleAddTodo}>
                Add Todo
            </Button>
            <div className="filter-buttons">
                {filters.map((filterType: string) => (
                    <Button
                        handleClass={filter === filterType ? "active" : ""}
                        handleClick={() => setFilter(filterType)}
                    >
                        {filterType}
                    </Button>
                ))}
            </div>
            <div>
                {filteredTodos.length ? (
                    filteredTodos.map((todo) => (
                        <div key={todo.id}>
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
                                className={`item ${
                                    todo.completed ? "completed" : ""
                                }`}
                            >
                                {todo.description}
                            </label>
                        </div>
                    ))
                ) : (
                    <div>no item</div>
                )}
            </div>
        </div>
    );
};

export default Todo;
