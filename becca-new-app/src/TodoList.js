import React from "react";
const todoList = [
	{ id: 1, title: "Read over assignments" },
	{ id: 2, title: "Exercise for 1 hour" },
	{ id: 3, title: "Make dinner" },
];
const TodoList = () => {
	return (
		<>
			<ul>
				{todoList.map((todoItem) => (
					<li key={todoItem.id}>{todoItem.title}</li>
				))}
			</ul>
		</>
	);
};
export default TodoList;
