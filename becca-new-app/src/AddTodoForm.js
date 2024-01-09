import React, { useState } from "react";
import InputWithLabel from "./InputWithLabel";

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
			id: Date.now(), // Assigning a unique ID using Date.now()
		};

		onAddTodo(newTodo);

		setTodoTitle("");
	};

	return (
		<InputWithLabel
			id="todoTitle"
			value={todoTitle}
			onChange={handleTitleChange}
			onSubmit={handleAddTodo}
		>
			Title:
		</InputWithLabel>
	);
};
export default AddTodoForm;
