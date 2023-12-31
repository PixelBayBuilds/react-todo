import React, { useEffect, useState } from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";

const useSemiPersistentState = () => {
	const initialTodoList =
		JSON.parse(localStorage.getItem("savedTodoList")) || [];
	const [todoList, setTodoList] = useState(initialTodoList);

	useEffect(() => {
		localStorage.setItem("savedTodoList", JSON.stringify(todoList));
	}, [todoList]);

	return [todoList, setTodoList];
};
function App() {
	const [todoList, setTodoList] = useSemiPersistentState();
	const addTodo = (newTodo) => {
		setTodoList((prevTodoList) => [...prevTodoList, newTodo]);
	};

	return (
		<>
			<h1>Todo List</h1>
			<AddTodoForm onAddTodo={addTodo} />
			<TodoList todoList={todoList} />
		</>
	);
}
export default App;
