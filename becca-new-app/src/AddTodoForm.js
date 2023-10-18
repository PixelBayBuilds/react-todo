import React from "react";

const AddTodoForm = ({ onAddTodo }) => {
	const handleAddTodo = (event) => {
		event.preventDefault();
		const todoTitle = event.target.elements.title.value;
		onAddTodo(todoTitle);
		console.log(todoTitle);
		event.target.reset();
	};
	return (
		<>
			<form onSubmit={handleAddTodo}>
				<label htmlFor="todoTitle">Title:</label>
				<input type="text" name="title" id="todoTitle"></input>
				<button type="submit">Add</button>
			</form>
		</>
	);
};

export default AddTodoForm;
