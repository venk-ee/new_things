import { useState } from 'react'
import './App.css'
import {Link, Route, Routes} from 'react-router-dom'


function Home() {
  return (
    <div>
      <h1>Home</h1>
    </div>
  )
}


function App() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="*" element={<h1>404 Not Found</h1>}/>
      </Routes>
    </div>
  )

}




export default App
