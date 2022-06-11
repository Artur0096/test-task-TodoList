import { HTMLAttributes } from "react";
import { TodoFilterType } from "../types";
import Button from "@mui/material/Button";

interface TodoFilterProps extends HTMLAttributes<HTMLDivElement> {
  onButtonClick: (value: TodoFilterType) => void;
  active: string;
}

const buttons: TodoFilterType[] = ["All", "Done", "Undone"];

export const TodoFilter: React.FC<TodoFilterProps> = ({
  onButtonClick,
  active,
}) => {
  return (
    <div>
      {buttons.map((item, index) => {
        return (
          <Button
            key={index}
            variant="outlined"
            onClick={() => onButtonClick(item)}
            disabled={item === active}
          >
            {item}
          </Button>
        );
      })}
    </div>
  );
};
