import React, { useState } from "react";
import PropTypes from "prop-types";
import InputWithLabel from "./InputWithLabel";
import styles from "./InputWithLabel.module.css";

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
			className={styles.input}
			id="todoTitle"
			value={todoTitle}
			onChange={handleTitleChange}
			onSubmit={handleAddTodo}
		>
			Today's Task:
		</InputWithLabel>
	);
};
AddTodoForm.propTypes = {
	onAddTodo: PropTypes.func.isRequired,
};

export default AddTodoForm;
