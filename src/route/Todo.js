import React, { useEffect, useState } from "react";
import { useNavigate, useMatch } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const TodoContainer = styled.div`
  text-align: center;
  padding: 0.5em;
`;
const InputItem = styled.input`
  background-color: transparent;
  border: none;
  border-bottom: 2px solid #f4d160;
  padding: 0.5em;
  color: ${(props) => props.color};
  margin-right: 0.5em;
  width: ${(props) => props.width};
`;
const ButtonItem = styled.button`
  padding: 0.5em;
  border: none;
  border-radius: 4px;
  background-color: ${(props) => props.color};
  margin: 0 0.2em;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  font-weight: bold;
  cursor: pointer;
`;
const TodoList = styled.li`
  background-color: #daf5ff;
  width: 90%;
  color: #25316d;
  border-radius: 4px;
  margin: 0.5em 0;
  padding: 0.3em 0;
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 10px;
`;
const TodoItem = styled.label`
  display: flex;
  align-items: center;
  padding-left: 1em;
  input[type="checkbox"] {
    display: inline-block;
    width: 20px;
    height: 20px;
    accent-color: #48829e;
    margin-right: 0.5em;
  }
`;
const TodoText = styled.span`
  display: inline-block;
  text-align: left;
  width: 80%;
  padding: 0 0.2em;
  margin: 0 0.5em;
  font-weight: bold;
`;
const BtnContainer = styled.span``;

const Todo = () => {
  const API = "https://www.pre-onboarding-selection-task.shop";
  const accessToken = localStorage.getItem("access_token");
  const navigate = useNavigate();
  const todoMatch = useMatch("todo");
  useEffect(() => {
    if (!accessToken) {
      if (todoMatch) navigate("/signin");
    }
  }, []);

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
    if (accessToken) getTodos();
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
      //todo가 추가되면 input 비우기
      document.getElementById("post-input").value = "";
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
    <TodoContainer>
      <h1>Todo</h1>
      <form onSubmit={postTodo}>
        <InputItem
          data-testid="new-todo-input"
          id="post-input"
          onChange={onChangeNewTodo}
          color="#f6f4eb"
          width="50%"
        />
        <ButtonItem data-testid="new-todo-add-button" color="#F4D160">
          추가
        </ButtonItem>
      </form>
      <ul>
        {todos &&
          todos.map((item, index) => (
            <TodoList key={item.id}>
              <TodoItem>
                <input
                  type="checkbox"
                  checked={item.isCompleted}
                  onChange={(e) => {
                    onChangeTodoEdit(e.target.checked, item.id, item.todo);
                    isCompleted = e.target.checked;
                  }}
                />
                {isEdit[index] ? (
                  <InputItem
                    type="text"
                    data-testid="modify-input"
                    defaultValue={item.todo}
                    onChange={(e) => {
                      editInputValue = e.target.value;
                    }}
                    color="#25316d"
                    width="100%"
                  />
                ) : (
                  <TodoText>{item.todo}</TodoText>
                )}
              </TodoItem>
              {isEdit[index] ? (
                <BtnContainer>
                  <ButtonItem
                    data-testid="submit-button"
                    onClick={() => {
                      if (editInputValue === "") onClickEdit(index);
                      else
                        onChangeTodoEdit(isCompleted, item.id, editInputValue);
                    }}
                    color="#9BE8D8"
                  >
                    제출
                  </ButtonItem>
                  <ButtonItem
                    data-testid="cancel-button"
                    onClick={() => onClickEdit(index)}
                  >
                    취소
                  </ButtonItem>
                </BtnContainer>
              ) : (
                <BtnContainer>
                  <ButtonItem
                    data-testid="modify-button"
                    onClick={() => onClickEdit(index)}
                    color="#9BE8D8"
                  >
                    수정
                  </ButtonItem>
                  <ButtonItem
                    data-testid="delete-button"
                    onClick={() => deleteTodo(item.id)}
                    color="#FF6666"
                  >
                    삭제
                  </ButtonItem>
                </BtnContainer>
              )}
            </TodoList>
          ))}
      </ul>
    </TodoContainer>
  );
};

export default Todo;
