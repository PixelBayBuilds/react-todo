import React from "react";
import PropTypes from "prop-types";
import styles from "./TodoListItem.module.css";

const TodoListItem = ({ todo, onRemoveTodo }) => {
	return (
		<li key={todo.id} className={styles.bodyText}>
			{todo.title}{" "}
			<button
				type="button"
				className={styles.removeButton}
				onClick={() => onRemoveTodo(todo.id)}
			>
				Remove
			</button>
		</li>
	);
};
TodoListItem.propTypes = {
	onRemoveTodo: PropTypes.func.isRequired,
};
export default TodoListItem;
