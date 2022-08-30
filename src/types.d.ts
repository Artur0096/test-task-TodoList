export interface ITodo {
  text: string;
  isDone: boolean;
  id: number;
}

export type TodoFilterType = "All" | "Done" | "Undone";
