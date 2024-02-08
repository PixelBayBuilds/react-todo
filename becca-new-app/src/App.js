import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TodoList from "./components/TodoList";
import AddTodoForm from "./components/AddTodoForm";
import styles from "./app.module.css";

async function fetchData(setTodoList, setIsLoading) {
	const viewName = "Grid%20view";
	const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/Default?view=${viewName}`;

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
		console.log("Airtable API Response:", result);
		const fetchedTodoList = result.records || [];
		console.log("Fetched Todo List from Airtable:", fetchedTodoList);

		const sortedTodoList = fetchedTodoList.sort((objectA, objectB) => {
			const titleA = (objectA.fields.title || "").toLowerCase();
			const titleB = (objectB.fields.title || "").toLowerCase();

			if (titleA < titleB) {
				return -1;
			} else if (titleA > titleB) {
				return 1;
			} else {
				return 0;
			}
		});

		const todos = sortedTodoList.map((record) => ({
			title:
				record.fields && record.fields.Title ? record.fields.Title : "Untitled",
			id: record.id,
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
	const [sortOrder, setSortOrder] = useState("asc");
	const [sortField, setSortField] = useState("Title");

	useEffect(() => {
		fetchData(setTodoList, setIsLoading, sortField, sortOrder);
	}, [sortField, sortOrder]);

	useEffect(() => {
		if (!isLoading) {
			localStorage.setItem("savedTodoList", JSON.stringify(todoList));
		}
	}, [todoList, isLoading]);

	const addTodo = (newTodo) => {
		// Index
		const insertIndex = todoList.findIndex((todo) => {
			if (sortOrder === "asc") {
				return todo[sortField] > newTodo[sortField];
			} else {
				return todo[sortField] < newTodo[sortField];
			}
		});

		// Insert the new task
		const updatedTodoList =
			insertIndex !== -1
				? [
						...todoList.slice(0, insertIndex),
						newTodo,
						...todoList.slice(insertIndex),
				  ]
				: [...todoList, newTodo];

		setTodoList(updatedTodoList);
	};

	const removeTodo = (id) => {
		const updatedTodoList = todoList.filter((todo) => todo.id !== id);
		setTodoList(updatedTodoList);
	};
	const toggleSortOrder = () => {
		setSortOrder((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : "asc"));
	};

	const handleSortFieldChange = (event) => {
		setSortField(event.target.value);
	};

	return (
		<Router>
			<div className={styles.appContainer}>
				<Routes>
					<Route
						path="/"
						element={
							<>
								<h1 className={styles.header}>Let's Get Work Done</h1>
								<div>
									<button onClick={toggleSortOrder}>
										Toggle Sort Order:{" "}
										{sortOrder === "asc" ? "Ascending" : "Descending"}
									</button>
									<label>
										Sort By:
										<select value={sortField} onChange={handleSortFieldChange}>
											<option value="Title">Title</option>
											<option value="createdTime">Created Time</option>
											{/* Add other fields as needed */}
										</select>
									</label>
								</div>
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
								<h1 className={styles.subText}>New Todo List</h1>
							</>
						}
					/>
				</Routes>
			</div>
		</Router>
	);
}

export default App;
