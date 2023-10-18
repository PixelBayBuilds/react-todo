import React from "react";
import TodoListItem from "./TodoListItem";

const todoList = [
	{ id: 1, title: "Read over assignments" },
	{ id: 2, title: "Exercise for 1 hour" },
	{ id: 3, title: "Make dinner" },
];
const TodoList = () => {
	return (
		<>
			<ul>
				{todoList.map((todo) => (
					<TodoListItem key={todo} todo={todo} />
				))}
			</ul>
		</>
	);
};

export default TodoList;
