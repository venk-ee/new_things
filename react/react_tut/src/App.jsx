import { useState } from 'react'
import './App.css'

// component = function that returns jsx

function Greeting({ name }) {
  return (<div>
    <h1>Hello my self {name}</h1>
  </div>)
}

function App() {
  const name = "venkat"
  // let showgreeting=false
 //rather than flage  use  state
  const[showgreeting,setshowgreeting]=useState(false)
  const handleClick = () => {
    // alert("hi")
    if(showgreeting){
      setshowgreeting(false)
    }
    else
    {
      setshowgreeting(true)
    }
  }

  return (
    <div>
      <button onClick={handleClick}>Toggle greeating</button>
      {showgreeting && <Greeting name={name}/>}
      
    </div>
  )
}


export default App
