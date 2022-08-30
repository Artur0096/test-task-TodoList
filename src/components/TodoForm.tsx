import { HTMLAttributes, useState } from "react";
import { ITodo } from "../types";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import styled from "styled-components";

interface TodoFormProps extends HTMLAttributes<HTMLFormElement> {
  onAdd: (item: ITodo) => void;
}

const FormContainer = styled.form`
  display: flex;
  gap: 10px;
  justify-content: center;
  div {
    width: 100%;
  }
`;

export const TodoForm: React.FC<TodoFormProps> = ({ onAdd }) => {
  const [input, setInput] = useState<string>("");

  const addNewTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input) {
      return;
    }
    onAdd({id: Math.floor(Math.random() *100), text: input, isDone: false });
    setInput("");
  };

  return (
    <>
      <FormContainer onSubmit={addNewTask} style={{ display: "flex" }}>
        <TextField
          size="small"
          type="text"
          value={input}
          label="New todo"
          onChange={(e) => setInput(e.target.value)}
        />
        <Button variant="contained" type="submit">
          Add
        </Button>
      </FormContainer>
    </>
  );
};
