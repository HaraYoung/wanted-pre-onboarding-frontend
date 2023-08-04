import React, { useEffect, useState } from "react";
import axios from "axios";

const Todo = () => {
  const API = "https://www.pre-onboarding-selection-task.shop";
  const accessToken = localStorage.getItem("access_token");
  const [todos, setTodos] = useState(null);
  let newTodo = "";
  const onChangeNewTodo = (e) => (newTodo = e.target.value);
  const postTodo = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API}/todos`,
        {
          todo: newTodo,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response);
      getTodos();
    } catch (error) {
      console.log(error);
    }
  };
  const getTodos = async () => {
    try {
      const response = await axios.get(`${API}/todos`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response);
      setTodos(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTodos();
  }, [newTodo]);

  return (
    <div>
      <div>Todo</div>
      <form onSubmit={postTodo}>
        <input data-testid="new-todo-input" onChange={onChangeNewTodo} />
        <button data-testid="new-todo-add-button">추가</button>
      </form>
      {todos &&
        todos.map((item) => (
          <li key={item.id}>
            <label>
              <input type="checkbox" />
              <span>{item.todo}</span>
            </label>
          </li>
        ))}
    </div>
  );
};

export default Todo;
