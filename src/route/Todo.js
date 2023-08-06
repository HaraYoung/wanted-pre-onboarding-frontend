import React, { useEffect, useState } from "react";
import axios from "axios";

const Todo = () => {
  const API = "https://www.pre-onboarding-selection-task.shop";
  const accessToken = localStorage.getItem("access_token");
  const [todos, setTodos] = useState(null);
  let newTodo = "";
  const [isEdit, setIsEdit] = useState([]);
  const onChangeNewTodo = (e) => (newTodo = e.target.value);

  const getTodos = async () => {
    try {
      const response = await axios.get(`${API}/todos`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response);
      setTodos(response.data);
      setIsEdit(new Array(response.data.length).fill(false));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTodos();
  }, [newTodo]);
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

  const onClickEdit = (index) => {
    const newIsEdit = [...isEdit];
    newIsEdit[index] = !newIsEdit[index];
    setIsEdit(newIsEdit);
  };
  const putTodosIsCompleted = async (isCheck, id, todo) => {
    try {
      const response = await axios.put(
        `${API}/todos/${id}`,
        {
          todo: todo,
          isCompleted: isCheck,
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
  let isCompleted = false;
  let editInputValue = "";
  const onChangeTodoEdit = (isCheck, id, todo) => {
    putTodosIsCompleted(isCheck, id, todo);
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API}/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      getTodos();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div>Todo</div>
      <form onSubmit={postTodo}>
        <input data-testid="new-todo-input" onChange={onChangeNewTodo} />
        <button data-testid="new-todo-add-button">추가</button>
      </form>
      <ul>
        {todos &&
          todos.map((item, index) => (
            <li key={item.id}>
              <label>
                <input
                  type="checkbox"
                  checked={item.isCompleted}
                  onChange={(e) => {
                    onChangeTodoEdit(e.target.checked, item.id, item.todo);
                    isCompleted = e.target.checked;
                  }}
                />
                <span>{item.todo}</span>
              </label>
              {isEdit[index] ? (
                <span>
                  <input
                    data-testid="modify-input"
                    defaultValue={item.todo}
                    onChange={(e) => (editInputValue = e.target.value)}
                  />
                  <button
                    data-testid="submit-button"
                    onClick={(e) =>
                      onChangeTodoEdit(isCompleted, item.id, editInputValue)
                    }
                  >
                    제출
                  </button>
                  <button
                    data-testid="cancel-button"
                    onClick={() => onClickEdit(index)}
                  >
                    취소
                  </button>
                </span>
              ) : (
                <span>
                  <button
                    data-testid="modify-button"
                    onClick={() => onClickEdit(index)}
                  >
                    수정
                  </button>
                  <button
                    data-testid="delete-button"
                    onClick={() => deleteTodo(item.id)}
                  >
                    삭제
                  </button>
                </span>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Todo;
