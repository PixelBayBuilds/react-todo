import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TodoList from "./components/TodoList";
import AddTodoForm from "./components/AddTodoForm";
import styles from "./app.module.css";

async function fetchData(setTodoList, setIsLoading, sortField, sortOrder) {
	const viewName = "Grid%20view";
	const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/Default?view=${viewName}&sort[0][field]=${sortField}&sort[0][direction]=${sortOrder}`;

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

		const todos = fetchedTodoList.map((record) => ({
			title:
				record.fields && record.fields.title ? record.fields.title : "Untitled",
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
	const [sortField, setSortField] = useState("title");

	useEffect(() => {
		fetchData(setTodoList, setIsLoading, sortField, sortOrder);
	}, [sortField, sortOrder]);

	useEffect(() => {
		if (!isLoading) {
			localStorage.setItem("savedTodoList", JSON.stringify(todoList));
		}
	}, [todoList, isLoading]);

	const addTodo = async (newTodo) => {
		// Add the new todo to the existing list
		const updatedTodoList = [...todoList, newTodo];

		// Sort the todoList based on current sortOrder and sortField
		const sortedTodoList = updatedTodoList.sort((a, b) => {
			const valueA = (a[sortField] || "").toLowerCase();
			const valueB = (b[sortField] || "").toLowerCase();

			if (sortOrder === "asc") {
				return valueA.localeCompare(valueB);
			} else {
				return valueB.localeCompare(valueA);
			}
		});

		// Update the state with the sorted todoList
		setTodoList(sortedTodoList);
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
											<option value="title">Title</option>
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
