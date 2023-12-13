import React, { useEffect, useState } from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";

function App() {
	const [todoList, setTodoList] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const dataPromise = new Promise((resolve, reject) => {
					setTimeout(() => {
						resolve({ data: { todoList: [] } });
					}, 2000);
				});

				dataPromise.then((result) => {
					const { todoList: fetchedTodoList } = result.data;
					setTodoList(fetchedTodoList);
					setIsLoading(false);
				});
			} catch (error) {
				setIsLoading(false);
			}
		};

		fetchData();
	}, []);
	useEffect(() => {
		if (!isLoading) {
			localStorage.setItem("savedTodoList", JSON.stringify(todoList));
		}
	}, [todoList, isLoading]);

	const addTodo = (newTodo) => {
		setTodoList((prevTodoList) => [...prevTodoList, newTodo]);
	};

	const removeTodo = (id) => {
		const updatedTodoList = todoList.filter((todo) => todo.id !== id);
		setTodoList(updatedTodoList);
	};

	return (
		<>
			<h1>Todo List</h1>
			<AddTodoForm onAddTodo={addTodo} />
			{isLoading ? (
				<p>Loading...</p>
			) : (
				<TodoList todoList={todoList} onRemoveTodo={removeTodo} />
			)}
		</>
	);
}

export default App;
