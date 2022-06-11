import React, { useState } from "react";
import { Todo } from "./components/Todo";
import { TodoFilter } from "./components/TodoFilter";
import { TodoForm } from "./components/TodoForm";
import Button from "@mui/material/Button";
import styled from "styled-components";
import { ITodo, TodoFilterType } from "./types";
import { useLocalState } from "./hooks/useLocalState";

const TodoAppContainer = styled.div`
  width: 600px;
  padding: 20px 30px;
  display: grid;
  gap: 10px 0;
  box-shadow: 0 3px 10px 1px rgba(0, 0, 0, 0.2);
`;

const App: React.FC = () => {
  const [filterType, setFilterType] = useState<TodoFilterType>("All");

  const [todos, setTodos] = useLocalState<ITodo[]>([], "todos");

  const changeStatus = (index: number) => {
    const newTodos = todos.map((item, i) => {
      if (i === index) {
        return { ...item, isDone: !item.isDone };
      } else {
        return item;
      }
    });
    setTodos(newTodos);
  };

  const addNewTask = (item: ITodo) => {
    setTodos([...todos, item]);
  };

  const clearCompleted = () => {
    setTodos(todos.filter((item) => item.isDone === false));
  };

  const filterTodosFunction = () => {
    return todos.filter((item) => {
      switch (filterType) {
        case "Done":
          return item.isDone === true;
        case "Undone":
          return item.isDone === false;
        default:
          return item;
      }
    });
  };

  return (
    <TodoAppContainer>
      <TodoForm onAdd={addNewTask} />
      <TodoFilter onButtonClick={setFilterType} active={filterType} />
      <Todo list={filterTodosFunction()} onChangeStatus={changeStatus} />
      <Button variant="contained" onClick={clearCompleted}>
        Clear completed
      </Button>
    </TodoAppContainer>
  );
};

export default App;
