export interface ITodo {
  text: string;
  isDone: boolean;
}

export type TodoFilterType = "All" | "Done" | "Undone";
