import { fireEvent, render, screen } from "@testing-library/react";
import { TodoForm } from "./TodoForm";

const onAdd = jest.fn();

describe("Todo Form component", () => {
  test("Input rendered", () => {
    render(<TodoForm onAdd={onAdd} />);
    expect(screen.getByLabelText("New todo")).toBeInTheDocument();
  });

  test("Button rendered", () => {
    render(<TodoForm onAdd={onAdd} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("Initial input is empty", () => {
    render(<TodoForm onAdd={onAdd} />);
    expect(screen.getByLabelText("New todo")).toHaveValue("");
  });

  test("Input is working", () => {
    render(<TodoForm onAdd={onAdd} />);
    const input = screen.getByLabelText("New todo");
    fireEvent.change(input, {
      target: { value: "text" },
    });

    expect(input).toHaveValue("text");
  });

  test("Button Add is not working when input is empty", () => {
    render(<TodoForm onAdd={onAdd} />);
    const btn = screen.getByRole("button");

    fireEvent.click(btn);
    expect(onAdd).not.toHaveBeenCalled();
  });

  test("Button Add is working when input is not empty", () => {
    render(<TodoForm onAdd={onAdd} />);
    const btn = screen.getByRole("button");
    const input = screen.getByLabelText("New todo");

    fireEvent.change(input, { target: { value: "text" } });

    fireEvent.click(btn);
    expect(onAdd).toHaveBeenCalledTimes(1);
  });

  test("Input clears when button Add is pressed", () => {
    render(<TodoForm onAdd={onAdd} />);
    const btn = screen.getByRole("button");
    const input = screen.getByLabelText("New todo");

    fireEvent.change(input, { target: { value: "text" } });

    fireEvent.click(btn);
    expect(input).toHaveValue("");
  });
});
