import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Todo from "./Todo";

describe("Todo", () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it("should render input field and add button", () => {
        render(<Todo />);
        expect(
            screen.getByPlaceholderText("Enter a new todo")
        ).toBeInTheDocument();
        expect(screen.getByText("Add Todo")).toBeInTheDocument();
    });

    it("should add a new todo when add button is clicked", () => {
        render(<Todo />);
        const input = screen.getByPlaceholderText("Enter a new todo");
        const addButton = screen.getByText("Add Todo");
        fireEvent.change(input, { target: { value: "New todo" } });
        fireEvent.click(addButton);
        expect(screen.getByText("New todo")).toBeInTheDocument();
    });

    it("should mark todo as completed when checkbox is clicked", () => {
        render(<Todo />);
        const input = screen.getByPlaceholderText("Enter a new todo");
        const addButton = screen.getByText("Add Todo");
        fireEvent.change(input, { target: { value: "New todo" } });
        fireEvent.click(addButton);
        const checkbox = screen.getByLabelText("New todo");
        fireEvent.click(checkbox);
        expect(checkbox).toBeChecked();
    });

    it("should filter todos based on status", () => {
        render(<Todo />);
        const input = screen.getByPlaceholderText("Enter a new todo");
        const addButton = screen.getByText("Add Todo");
        fireEvent.change(input, { target: { value: "New todo" } });
        fireEvent.click(addButton);
        fireEvent.change(input, { target: { value: "Another todo" } });
        fireEvent.click(addButton);
        fireEvent.change(input, { target: { value: "Completed todo" } });
        fireEvent.click(addButton);
        const completedCheckbox = screen.getByLabelText("Completed todo");
        fireEvent.click(completedCheckbox);

        fireEvent.click(screen.getByText("completed"));
        expect(screen.getByText("Completed todo")).toBeInTheDocument();
        expect(screen.queryByText("New todo")).not.toBeInTheDocument();
        expect(screen.queryByText("Another todo")).not.toBeInTheDocument();

        fireEvent.click(screen.getByText("active"));
        expect(screen.getByText("New todo")).toBeInTheDocument();
        expect(screen.getByText("Another todo")).toBeInTheDocument();
        expect(screen.queryByText("Completed todo")).not.toBeInTheDocument();

        fireEvent.click(screen.getByText("all"));
        expect(screen.getByText("New todo")).toBeInTheDocument();
        expect(screen.getByText("Another todo")).toBeInTheDocument();
        expect(screen.getByText("Completed todo")).toBeInTheDocument();
    });
});
