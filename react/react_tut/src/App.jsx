import { useState } from 'react'
import './App.css'

function TodoList (){
  const todos=[
    {id:1,text:"learn react"},
    {id:2,text:"understand props"},
    {id:3,text:"master states & events"}
  ]

  return (
    <div>
    <h2>My To Do List</h2>
    <ul>
      {todos.map((todo)=>
        <li key={todo.id}>{todo.text}</li>
      
    )}

    </ul>
    </div>
  )
}

function App() {
  return(
    <div>
    <TodoList/>
    </div>
  )

}




export default App
