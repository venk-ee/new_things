import { useState,useEffect } from 'react'
import './App.css'
import {Link, Route, Routes} from 'react-router-dom'
import AuthContext from './AuthContext'


function Home() {
  const {user} = useContext(AuthContext)
  return (
    <div>
      <h1>Home</h1>
    </div>
  )
}

window.addEventListener('storage', () => {
  console.log('Storage changed')
})

window.addEventListener('mosemove',()=>{
  console.log('Mouse moved')
})

function App() {
  const [user, setUser] = useState({name:"kenny",age:23})
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        
      </nav>
    <AuthContext.Provider value={null} >
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="*" element={<h1>404 Not Found</h1>}/>
      </Routes>
    </AuthContext.Provider>
    </div>
  )

}




export default App
