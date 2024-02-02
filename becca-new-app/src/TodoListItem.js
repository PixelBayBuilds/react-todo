import React from "react";
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
export default TodoListItem;
