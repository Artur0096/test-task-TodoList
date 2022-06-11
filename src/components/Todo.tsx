import { HTMLAttributes } from "react";
import { ITodo } from "../types";
import styled from "styled-components";
import Checkbox from "@mui/material/Checkbox";

interface TodoProps extends HTMLAttributes<HTMLDivElement> {
  list: ITodo[];
  onChangeStatus: (index: number) => void;
}

interface TaskTextProps {
  completed?: boolean;
}

const TodoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const TaskText = styled.p<TaskTextProps>`
  font-size: 18px;
  text-decoration: ${(props) => (props.completed ? "line-through" : "none")};
  color: ${(props) => (props.completed ? "lightgray" : "black")};
`;

export const Todo: React.FC<TodoProps> = ({ list, onChangeStatus }) => {
  return (
    <>
      {list.map((item, index) => {
        return (
          <TodoContainer key={index}>
            <Checkbox
              checked={item.isDone}
              onChange={() => onChangeStatus(index)}
            />
            <TaskText completed={item.isDone}>{item.text}</TaskText>
          </TodoContainer>
        );
      })}
    </>
  );
};
