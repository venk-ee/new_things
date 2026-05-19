import { useState,useEffect } from 'react'
import './App.css'
import {Link, Route, Routes} from 'react-router-dom'



function App() {

  useEffect(()=>{
    console.log("use effect");
    try{
      fetch("https://jsonplaceholder.typicode.com/posts");
    }catch (error){
      console.error("error", error);
    }
  },[])

}



export default App
