import * as React from 'react';
todoList[
  { id: 1, title: 'Read over assignments'},
  { id: 2, title: 'Exercise for 1 hour'},
  { id: 3, title:  'Make dinner'}
];
function App() {
return (
<div>
<h1>Todo List</h1>
<ul>
  {list.map(function(item){
    return <li> {item.title}</li>
  })}
</ul>
</div>
);
}
export default App;

