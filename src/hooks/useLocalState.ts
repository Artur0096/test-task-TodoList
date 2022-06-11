import { useState, useEffect } from "react";

export const useLocalState = <T>(
  initialValue: T,
  key: string
): [T, (value: T) => void] => {
  const getValue = () => {
    const value = localStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    } else {
      return initialValue;
    }
  };

  const [todos, setTodos] = useState(getValue);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(todos));
  }, [todos]);

  return [todos, setTodos];
};
