import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import styles from "./app.module.css";

async function fetchData(setTodoList, setIsLoading) {
	const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/Default`;

	const options = {
		method: "GET",
		headers: {
			Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
		},
	};

	try {
		const response = await fetch(url, options);

		if (!response.ok) {
			throw new Error(`Error: ${response.status}`);
		}

		const result = await response.json();
		const fetchedTodoList = result.records || [];

		const todos = fetchedTodoList.map((todo) => ({
			title: todo.fields.title,
			id: todo.id,
		}));

		setTodoList(todos); // Set application's todoList

		setIsLoading(false);
	} catch (error) {
		console.error("Error fetching data:", error);
		setIsLoading(false);
	}
}

function App() {
	const [todoList, setTodoList] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		fetchData(setTodoList, setIsLoading);
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
		<Router>
			<Routes>
				<Route
					path="/"
					element={
						<>
							<h1>Let's Get Work Done</h1>
							<AddTodoForm onAddTodo={addTodo} />
							{isLoading ? (
								<p>Loading...</p>
							) : (
								<TodoList todoList={todoList} onRemoveTodo={removeTodo} />
							)}
						</>
					}
				/>
				{/* This is the new Route*/}
				<Route
					path="/new"
					element={
						<>
							<h1>New Todo List</h1>
						</>
					}
					className={styles.App}
				/>
			</Routes>
		</Router>
	);
}

export default App;
