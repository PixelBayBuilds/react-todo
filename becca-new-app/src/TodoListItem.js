import React from "react";
import styles from "./TodoListItem.module.css";

const TodoListItem = ({ todo, onRemoveTodo }) => {
	return (
		<li key={todo.id} className={styles.TodoListItem}>
			{todo.title}{" "}
			<button type="button" onClick={() => onRemoveTodo(todo.id)}>
				Remove
			</button>
		</li>
	);
};
export default TodoListItem;
