import React, { useState } from "react";

const AddTodoForm = ({ onAddTodo }) => {
	const [todoTitle, setTodoTitle] = useState("");

	const handleTitleChange = (event) => {
		const newTodoTitle = event.target.value;
		setTodoTitle(newTodoTitle);
	};

	const handleAddTodo = (event) => {
		event.preventDefault();

		const newTodo = {
			title: todoTitle,
			id: Date.now(),
		};

		onAddTodo(newTodo);

		console.log(newTodo);

		setTodoTitle("");
	};

	return (
		<>
			<form onSubmit={handleAddTodo}>
				<label htmlFor="todoTitle">Title:</label>
				<input
					type="text"
					name="title"
					id="todoTitle"
					value={todoTitle}
					onChange={handleTitleChange}
				></input>
				<button type="submit">Add</button>
			</form>
		</>
	);
};

export default AddTodoForm;
