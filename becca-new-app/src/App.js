import React from 'react';
const todoList = [
  { id: 1, title: 'Read over assignments'},
  { id: 2, title: 'Exercise for 1 hour'},
  { id: 3, title:  'Make dinner'}
];
function App() {
return (
<div>
<h1>Todo List</h1>
<ul>
  {todoList.map(function(todoItem){
    return <li key={todoItem.id}>{todoItem.title}</li>
  })}
</ul>
</div>
);
}
export default App;

