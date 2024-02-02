import React from "react";
import PropTypes from "prop-types";
import TodoListItem from "./TodoListItem";

const TodoList = ({ todoList, onRemoveTodo }) => {
	return (
		<ul>
			{todoList.map((todo) => (
				<TodoListItem key={todo.id} todo={todo} onRemoveTodo={onRemoveTodo} />
			))}
		</ul>
	);
};
TodoList.propTypes = {
	todoList: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			title: PropTypes.string.isRequired,
		})
	).isRequired,
	onRemoveTodo: PropTypes.func.isRequired,
};
export default TodoList;
