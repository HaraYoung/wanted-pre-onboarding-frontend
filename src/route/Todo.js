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
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.4) 3px 3px 6px 0px inset,
      ${(props) => props.color} -3px -3px 6px 1px inset;
  }
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

const Todo = () => {
  const API = "https://www.pre-onboarding-selection-task.shop"; //기본 API URL
  const accessToken = localStorage.getItem("access_token"); //로그인시 발급되는 토큰
  const navigate = useNavigate();
  const todoMatch = useMatch("todo");
  //화면이 처음 마운트될 때 JWT 토큰 확인
  useEffect(() => {
    //access_token이 로컬 스토리지에 없다면 
    if (!accessToken) {
      //todo 페이지일 경우 signin 페이지로 리다이렉트
      if (todoMatch) navigate("/signin");
    }
  }, []);
  const [todos, setTodos] = useState(null); //todo list가 저장될 상태 값
  let newTodo = ""; //추가되는 todo의 text
  const [isEdit, setIsEdit] = useState([]); //todos의 각 아이템의 수정 버튼 클릭 여부 boolean값 배열
  //add todo input change event
  const onChangeNewTodo = (e) => (newTodo = e.target.value);
  //todo list 불러오는 함수
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
  //추가되는 todo가 있을 때마다 todo list를 불러오는 useEffect
  useEffect(() => {
    //accessToken이 있는 경우에만 getTodos실행
    if (accessToken) getTodos();
  }, [newTodo]);
  //todo list 추가하는 함수
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
      //todo가 추가되면 todo list를 불러오고 add input 비움
      getTodos();
      document.getElementById("post-input").value = "";
    } catch (error) {
      console.log(error);
    }
  };
  //클릭된 todo의 isEdit 상태 값 변경
  const onClickEditStateChange = (index) => {
    const newIsEdit = [...isEdit];
    newIsEdit[index] = !newIsEdit[index];
    setIsEdit(newIsEdit);
  };
  //todo를 수정하는 함수
  const putTodo = async (isCheck, id, todo) => {
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
      //todo가 추가되면 todo list를 불러오고 editInputValue 값 비움
      getTodos();
      editInputValue = "";
    } catch (error) {
      console.log(error);
    }
  };
  let editInputValue = ""; //수정하는 todo의 text
  //edit todo input change event
  const onChangeEditTodoText = (e) => (editInputValue = e.target.value);
  //putTodo를 호출하는 함수
  const onChangeTodoEdit = (isCheck, id, todo) => {
    putTodo(isCheck, id, todo);
  };
  //todo list 삭제하는 함수
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API}/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      //todo가 삭제되면 todo list 불러옴
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
                  }}
                />
                {isEdit[index] ? (
                  <InputItem
                    type="text"
                    data-testid="modify-input"
                    defaultValue={item.todo}
                    color="#25316d"
                    width="80%"
                    onChange={onChangeEditTodoText}
                  />
                ) : (
                  <TodoText>{item.todo}</TodoText>
                )}
              </TodoItem>
              {isEdit[index] ? (
                <span>
                  <ButtonItem
                    data-testid="submit-button"
                    color="#9BE8D8"
                    onClick={() => {
                      //기존 todo text에서 수정되는 값이 없다면 취소 버튼과 동일하게 동작
                      if (editInputValue === "") onClickEditStateChange(index);
                      else
                        onChangeTodoEdit(
                          item.isCompleted,
                          item.id,
                          editInputValue
                        );
                    }}
                  >
                    제출
                  </ButtonItem>
                  <ButtonItem
                    data-testid="cancel-button"
                    onClick={() => onClickEditStateChange(index)}
                  >
                    취소
                  </ButtonItem>
                </span>
              ) : (
                <span>
                  <ButtonItem
                    data-testid="modify-button"
                    color="#9BE8D8"
                    onClick={() => onClickEditStateChange(index)}
                  >
                    수정
                  </ButtonItem>
                  <ButtonItem
                    data-testid="delete-button"
                    color="#FF6666"
                    onClick={() => deleteTodo(item.id)}
                  >
                    삭제
                  </ButtonItem>
                </span>
              )}
            </TodoList>
          ))}
      </ul>
    </TodoContainer>
  );
};

export default Todo;
