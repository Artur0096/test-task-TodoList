import { HTMLAttributes, useState } from "react";
import { ITodo } from "../types";
import styled from "styled-components";
import Checkbox from "@mui/material/Checkbox";
import { LinearProgress } from '@mui/material';
import { DragDropContext, Droppable, Draggable, DropResult, OnDragEndResponder } from "react-beautiful-dnd";

interface TodoProps extends HTMLAttributes<HTMLDivElement> {
  list: ITodo[];
  onChangeStatus: (index: number) => void;
  onDragEnd:(result: any) => void;
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


export const Todo: React.FC<TodoProps> = ({ list, onChangeStatus,onDragEnd}) => {
  const [ todo, setTodo ] = useState(list)
  let checkedItems: number = 0;
  for(let i = 0; i<list.length; i++){
    if(list[i].isDone){
      checkedItems = checkedItems + 1
    }
  }
  console.log(checkedItems)
  return (
    <>
    <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="todo">
          {(provided) => (
            <div className="todo" {...provided.droppableProps} ref={provided.innerRef}>
              {list.map((item, index) => {
                console.log(item)
              
                return (
                  <Draggable key={item.id} draggableId={item.text} index={index}>
                    {(provided) => (
											<><div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <TodoContainer key={index}>
                          <Checkbox
                            checked={item.isDone}
                            onChange={() => onChangeStatus(index)} />
                          <TaskText completed={item.isDone}>{item.text}</TaskText>
                        </TodoContainer>
                  </div>
                  </>
                    )}
              </Draggable>
            );
          })}
          {provided.placeholder}
          </div>
          )}
            </Droppable>
      </DragDropContext>
      <>    
          <p>{(checkedItems/list.length)*100}%</p>  
          <LinearProgress variant="determinate" value={(checkedItems/list.length)*100}/>
     </>
    </>
  );
};
function setTodos(items: unknown[]) {
  throw new Error("Function not implemented.");
}

