import React from "react";
import PropTypes from "prop-types";
import TodoListItem from "./TodoListItem";

const TodoList = ({ todoList, onRemoveTodo }) => {
	console.log(todoList);
	return (
		<ul>
			{todoList.map((todo) => (
				<TodoListItem key={todo.id} todo={todo} onRemoveTodo={onRemoveTodo} />
			))}
		</ul>
	);
};

TodoList.propTypes = {
	onRemoveTodo: PropTypes.func.isRequired,
	todoList: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			title: PropTypes.string, // Title is not marked as required here
		})
	).isRequired,
};

export default TodoList;
