import { useState } from 'react'
import './App.css'



function App() {

  const[name,setname]=useState('')

  function handlechange(event){
    const value=event.target.value;
    setname(value);
  }

  return (
    <div>
      <input type="text" placeholder='name...' onChange={handlechange}/>
      
    </div>
  )
}


export default App
